---
title: "Libvirt domblkinfo 命令源码跟踪记 (GDB)"
date: 2021-12-06T14:03:38+08:00
description: "使用 GDB 跟踪 libvirt 命令执行过程的具体执行细节."
categories: ["技术笔记集","虚拟化笔记集"]
tags: ["linux", "libvirt", "GDB"]
draft: false
---

最近发现环境中 KVM 虚拟机磁盘利用率查不准，使用 virsh 命令查看磁盘使用情况得到如下结果：

```bash
# virsh domblkinfo 20 vda --human
Capacity:       2.000 GiB
Allocation:     2.000 GiB
Physical:       2.000 GiB
```

显然是有问题的，正常的数值三个应该不通，进入系统查看磁盘使用率也仅有 2% 左右，因此试图通过检查源码的方式查看是否正确。

- libvirt: 5.6.0
- os: Centos

## 跟踪记录

首先找到 libvirtd 的 PID：

```bash
ps -aux | grep libvirtd
root      1907  0.0  0.0 1385796 25116 ?       Ssl  Aug26   5:22 /usr/sbin/libvirtd --timeout 120
```

使用 GDB 开始跟踪他：

```bash
gdb libvirtd 1907
```

首先在源码中全局搜索 `domblkinfo` 关键字，找到该命令的执行函数： `tools/virsh-domain-monitor.c→cmdDomblkinfo` 。

分析源码找到获取信息的函数 `src/libvirt-domain.c -> virDomainGetBlockInfo` ：

```bash
if (virDomainGetBlockInfo(dom, device, &info, 0) < 0)
    goto cleanup;

if (!cmdDomblkinfoGet(ctl, &info, &cap, &alloc, &phy, human))
    goto cleanup;
vshPrint(ctl, "%-15s %s\n", _("Capacity:"), cap);
vshPrint(ctl, "%-15s %s\n", _("Allocation:"), alloc);
vshPrint(ctl, "%-15s %s\n", _("Physical:"), phy);
```

这其中的 info 包含了所需信息，看一下填充该字段的 `virDomainGetBlockInfo` 函数实现，用 GDB 跟一下它吧.

### 跟踪 `src/libvirt-domain.c -> virDomainGetBlockInfo`

先打个断点：

```bash
(gdb) break virDomainGetBlockInfo
Breakpoint 1 at 0x7f4d4394a760: file libvirt-domain.c, line 6094.
```

再打开一个终端，执行一下命令：

```bash
[root@compute-01 ~]# virsh list
 Id   Name                State
-----------------------------------
 2    instance-000001b6   running
 3    instance-000001b8   running
 4    instance-000001b9   running

[root@compute-01 ~]# virsh domblkinfo 4 vda
```

此时会发现终端卡住了，看一下 GDB 已经将程序中断，单步调试看一下：

```bash
[Switching to Thread 0x7f4d32ef0700 (LWP 1918)]

Breakpoint 1, virDomainGetBlockInfo (domain=domain@entry=0x7f4cfc00aeb0, disk=0x7f4cfc00cc60 "vda", 
    info=info@entry=0x7f4d32eefac0, flags=0) at libvirt-domain.c:6094
6094    {
(gdb) n
6097        VIR_DOMAIN_DEBUG(domain, "info=%p, flags=0x%x", info, flags);
(gdb) n
6094    {
(gdb) n
6097        VIR_DOMAIN_DEBUG(domain, "info=%p, flags=0x%x", info, flags);
(gdb) n
6099        virResetLastError();
(gdb) n
6101        if (info)
(gdb) n
6102            memset(info, 0, sizeof(*info));
(gdb) n
6104        virCheckDomainReturn(domain, -1);
(gdb) n
6105        virCheckNonEmptyStringArgGoto(disk, error);
(gdb) n
6106        virCheckNonNullArgGoto(info, error);
(gdb) n
6110        if (conn->driver->domainGetBlockInfo) {
(gdb) n
6112            ret = conn->driver->domainGetBlockInfo(domain, disk, info, flags);
(gdb) s
qemuDomainGetBlockInfo (dom=0x7f4cfc00aeb0, path=0x7f4cfc00cc60 "vda", info=0x7f4d32eefac0, flags=0)
    at qemu/qemu_driver.c:12413
12413   {
```

发现在 6112 行跳到了另一个函数，继续跟踪它.

### 跟踪 `src/qemu/qemu_driver.c -> qemuDomainGetBlockInfo`

```bash
(gdb) n
12421       virCheckFlags(0, -1);
(gdb) n
12413   {
(gdb) n
12414       virQEMUDriverPtr driver = dom->conn->privateData;
(gdb) n
12421       virCheckFlags(0, -1);
(gdb) n
12419       qemuBlockStatsPtr entry = NULL;
(gdb) n
12414       virQEMUDriverPtr driver = dom->conn->privateData;
(gdb) n
12421       virCheckFlags(0, -1);
(gdb) n
12423       if (!(vm = qemuDomObjFromDomain(dom)))
(gdb) n
12426       cfg = virQEMUDriverGetConfig(driver);
(gdb) n
12428       if (virDomainGetBlockInfoEnsureACL(dom->conn, vm->def) < 0)
(gdb) n
12431       if (qemuDomainObjBeginJob(driver, vm, QEMU_JOB_QUERY) < 0)
(gdb) n
12434       if (!(disk = virDomainDiskByName(vm->def, path, false))) {
(gdb) n
12440       if (virStorageSourceIsEmpty(disk->src)) {
(gdb) n
12448       if (!virDomainObjIsActive(vm)) {
(gdb) n
12460       if (qemuDomainBlocksStatsGather(driver, vm, path, true, &entry) < 0)
(gdb) n
12463       if (!entry->wr_highest_offset_valid) {
(gdb) n
12466           if (virStorageSourceGetActualType(disk->src) == VIR_STORAGE_TYPE_FILE &&
(gdb) n
12468               info->allocation = entry->physical;
(gdb) n
12466           if (virStorageSourceGetActualType(disk->src) == VIR_STORAGE_TYPE_FILE &&
(gdb) p info->allocation
$2 = 0
(gdb) n
12470               info->allocation = entry->wr_highest_offset;
(gdb) n
12484       if (entry->physical == 0 || info->allocation == 0 ||
(gdb) p info->allocation
$3 = 32870912
(gdb) p entry->wr_highest_offset
$4 = 32870912
```

至此，我们知道了 `info -> allocation` 的值来自 `entry->wr_highest_offset` ，接下来查看源码， `entry->wr_highest_offset` 的值应该是在这里被赋予的：

```bash
if (qemuDomainBlocksStatsGather(driver, vm, path, true, &entry) < 0)
  goto endjob;
```

下面将断点打在 `qemuDomainBlocksStatsGather` 看一下其中的 `entry->wr_highest_offset` 是在哪里被赋值.

### 跟踪 `src/qemu/qemu_driver.c -> qemuDomainBlocksStatsGather`

将之前的断点删除，打上新的断点

```bash
(gdb) info breakpoints 
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00007f4d4394a760 in virDomainGetBlockInfo at libvirt-domain.c:6094
        breakpoint already hit 1 time
(gdb) delete 1
(gdb) break qemuDomainBlocksStatsGather
Breakpoint 2 at 0x7f4d208e3700: file qemu/qemu_driver.c, line 11427.
```

之后在 GDB continue ，之后一直按回车，直到程序正常运行了，再执行一下获取磁盘信息的命令，继续跟踪。

```bash
Breakpoint 1, qemuDomainBlocksStatsGather (driver=driver@entry=0x7f4d180f99b0, vm=0x7f4d100b8890, 
    path=path@entry=0x7f4d0c00ae50 "vda", capacity=capacity@entry=true, retstats=retstats@entry=0x7f4d336f0980)
    at qemu/qemu_driver.c:11427
11427   {
(gdb) n
11428       qemuDomainObjPrivatePtr priv = vm->privateData;
(gdb) 
11429       bool blockdev = virQEMUCapsGet(priv->qemuCaps, QEMU_CAPS_BLOCKDEV);
(gdb) 
11439       if (*path) {
(gdb) 
11440           if (!(disk = virDomainDiskByName(vm->def, path, false))) {
(gdb) 
11445           if (blockdev) {
(gdb) 
11448               if (!disk->info.alias) {
(gdb) 
11458       qemuDomainObjEnterMonitor(driver, vm);
(gdb) 
11459       nstats = qemuMonitorGetAllBlockStatsInfo(priv->mon, &blockstats, false);
(gdb) 
11461       if (capacity && nstats >= 0) {
(gdb) 
11465               rc = qemuMonitorBlockStatsUpdateCapacity(priv->mon, blockstats, false);
(gdb) 
11468       if (qemuDomainObjExitMonitor(driver, vm) < 0 || nstats < 0 || rc < 0)
(gdb) 
11471       if (VIR_ALLOC(*retstats) < 0)
(gdb) 
11474       if (entryname) {
(gdb) 
11475           if (!(stats = virHashLookup(blockstats, entryname))) {
(gdb) 
11481           **retstats = *stats;
(gdb) p stats
$12 = (qemuBlockStats *) 0x7f4d0c001000
(gdb) p *stats
$13 = {rd_req = 712, rd_bytes = 17435136, wr_req = 130, wr_bytes = 418816, rd_total_times = 527027278, 
  wr_total_times = 86798718, flush_req = 20, flush_total_times = 94396427, capacity = 2147483648, 
  physical = 2147483648, wr_highest_offset = 32870912, wr_highest_offset_valid = true, write_threshold = 0}
(gdb) c
Continuing.
```

分析这一调用过程，发现我们跟踪的 `restats` 变量来自 `stats`，而该值在这一行被填充：

```bash
11475           if (!(stats = virHashLookup(blockstats, entryname))) {
```

值来自哈希表查询结果，从 `blockstats` 中查询 `entryname` ，而该哈希表在这两行被赋值：

```bash
11459       nstats = qemuMonitorGetAllBlockStatsInfo(priv->mon, &blockstats, false);
11465       rc = qemuMonitorBlockStatsUpdateCapacity(priv->mon, blockstats, false);
```

之后就可以跟踪源码了，经过一番探索，发现他们最终都调用了同一个函数来从 QEMU 获取设备信息，即 `src/qemu/qemu_monitor_json.c -> qemuMonitorJSONQueryBlock` ，看一下它的函数实现：

```c
static virJSONValuePtr
qemuMonitorJSONQueryBlock(qemuMonitorPtr mon)
{
    virJSONValuePtr cmd;
    virJSONValuePtr reply = NULL;
    virJSONValuePtr devices = NULL;

    if (!(cmd = qemuMonitorJSONMakeCommand("query-block", NULL)))
        return NULL;

    if (qemuMonitorJSONCommand(mon, cmd, &reply) < 0 ||
        qemuMonitorJSONCheckReply(cmd, reply, VIR_JSON_TYPE_ARRAY) < 0)
        goto cleanup;

    devices = virJSONValueObjectStealArray(reply, "return");

 cleanup:
    virJSONValueFree(cmd);
    virJSONValueFree(reply);
    return devices;
}
```

继续探索会发现 libvirt 在这里调用了 QEMU 提供的 [QMP](https://wiki.qemu.org/Documentation/QMP) 协议，其中的查询关键词为 `query-block` ，返回的结果中含有 `wr_highest_offset`  字段。

最终得到一张 libvirt 查询磁盘使用情况的调用栈示意图：

![https://imagehost-cdn.frytea.com/images/2021/09/02/domblkinfoac4ecdcf5caa1926.png](https://imagehost-cdn.frytea.com/images/2021/09/02/domblkinfoac4ecdcf5caa1926.png)

如果继续探索，可能就需要去跟踪 QEMU 源码了，下篇文章见。

## 参考文献

- [使用gdb debug libvirt 心得](https://blog.csdn.net/yadehuiyin/article/details/80799267)
- [GDB常用命令](https://blog.csdn.net/Roland_Sun/article/details/42460663)
- [GDB禁用和删除断点](http://c.biancheng.net/view/8219.html)
- [qmp—QEMU Machine Protocol介绍_北方南方-程序员宅基地](https://www.cxyzjd.com/article/u011414616/80055615)
- [QMP ( qemu monitor protocol ) and Different ways of accessing it](https://www.humblec.com/qmp-qemu-monitor-protocol-and-different-ways-of-accessing-it/)
- [Unix Socket - Server Examples](https://www.tutorialspoint.com/unix_sockets/socket_server_example.htm)
- [About QEMU](https://qemu-project.gitlab.io/qemu/about/index.html)
- [QEMU QMP Reference Manual](https://qemu-project.gitlab.io/qemu/interop/qemu-qmp-ref.html)

## 附件

[libvirt-domblkinfo-命令源码调用栈 .xmind](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e7a26db-20df-49e5-af27-7c89c2426cc0/libvirt-domblkinfo-命令源码调用栈_.xmind)