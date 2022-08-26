---
title: "GDB 调试 QEMU 源码跟踪 QMP 协议执行"
categories: [ "编程开发" ]
tags: [ "QEMU","GDB" ]
draft: false
slug: "566"
date: "2021-09-03 09:53:08"
---

接上文，通过跟踪 libvirt 的源码，找到 `virsh domblkinfo` 最终是使用 [QMP](https://wiki.qemu.org/Documentation/QMP)  协议从 QEMU 获取到关键字为 `query-block` 的数据，其中带有 `wr_highest_offset` 字段，该字段被 libvirt 认定为 磁盘利用率中 `Allocation` 值的来源。

今天就尝试在 QEMU 中找到获取 `wr_highest_offset`  字段的方法。

## 环境准备

- QEMU 4.0
- Centos
- 鲲鹏 ARM

首先需要编译 QEMU 加入函数表，重新编译 QEMU在其中加入该字段即可，编译方法可以参考源码目录：

```bash
./configure --enable-debug
```

跟踪前需要定位到 QEMU 中填充该字段的函数，首先在源码中全局搜索 `wr_highest_offset` ，最终确定 `block/qapi.c` 文件中的 `bdrv_query_bds_stats` 函数最有可能是填充该字段的位置，下面就来跟踪这个函数的走向吧。

## 跟踪记录

一个虚拟机在宿主机中表现为一个 `QEMU` 的进程，在这里仅保留一个虚拟机，查询该虚拟机状态时 libvirt 回使用 `unix socket` 的方式发往该进程监听的 `unix socket` 服务。因此跟踪该虚拟机所在进程即可。

```bash
# ps -aux | grep qemu
qemu     2185346  0.6  0.5 3562240 333440 ?      Sl   10:05   2:20 /usr/bin/qemu-system-aarch64 -name guest=instance-000001bb,...imestamp=on
root     2472547  0.0  0.0 110784  2496 pts/3    S+   16:03   0:00 grep --color=auto qemu
```

GDB 开始跟踪：

```bash
gdb qemu-system-aarch64 2185346
```

在之前找到的目标函数处打上断点：

```bash
(gdb) b bdrv_query_bds_stats
```

之后 `c` 继续执行，尝试查询一下磁盘状态。

```bash
$ virsh domblkinfo 25 vda --human

Breakpoint 1, bdrv_query_bds_stats (bs=0x3b549940, blk_level=true) at /root/stl/qemu-4.0.0/block/qapi.c:509
509         BlockStats *s = NULL;
```

会发现终端卡住了，此时 gdb 中断了进程，说明我们找对函数了，下面我们继续追踪吧。

发现这个函数是在 `qmp_query_blockstats` 中被调用多次，最终得出结果。

```bash
544     }
(gdb) n
qmp_query_blockstats (has_query_nodes=false, query_nodes=false, errp=0xffffe3963110) at /root/stl/qemu-4.0.0/block/qapi.c:609
609                 s->has_device = true;
(gdb) p s->stats->wr_highest_offset 
$3 = 3072
```

下面主要就是跟着源码来看了，本文主要是讲了如何使用 GDB 跟踪 QEMU 源码，若有疑问欢迎留言。

## 参考文献

- [GDB调试qemu源码纪录](https://www.cnblogs.com/ck1020/p/7795242.html)