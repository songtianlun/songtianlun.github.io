---
title: 'LXC 直通硬盘'
date: '2023-05-06T10:29:03.050Z'
tags: ['LXC']
created: '2023-05-06T09:09:59.446Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:11, 27th 五月 2023 -->

# LXC 直通硬盘

lxc 直通磁盘大致需要以下步骤：

* 配置 cgroup 规则，赋予 lxc 容器对应硬件的权限；
* 如果使用 cgroup 2，需要将配置文件中的 `lxc.cgroup` 改为 `lxc.cgroup2` ；
* 之后通过主副设备号将硬盘挂载到 LXC 容器中的对应位置；

使用这条命令看到磁盘、wwn以及主:次设备号：

```bash
# 使用 lsblk -h 看到更多格式
$ lsblk -o name,wwn,MAJ:MIN
NAME                  WWN                MAJ:MIN
sda                   0x5002538e728014d6   8:0
├─sda1                0x5002538e728014d6   8:1
├─sda2                0x5002538e728014d6   8:2
└─sda3                0x5002538e728014d6   8:3
  ├─openeuler-root                       253:0
  ├─openeuler-var                        253:1
  ├─openeuler-var_log                    253:2
  └─openeuler-home                       253:3
sdb                   0x5000c500eda070c8   8:16
sdc                   0x5000c500eda93f3c   8:32
sdd                   0x5000c500eda94c15   8:48
sde                   0x5000c500edacae3b   8:64
```

## LXC 直通磁盘步骤

### 确定硬盘id和关系

```
ls -al /dev/sd*
#或者
ls -al /dev/disk/by-label
```

反正最后比如我想找我的`sda1`设备，那我得到了以下输出：

```
# ls -al /dev/sda
brw-rw---- 1 root disk 8, 0 Dec 19 11:16 /dev/sda1
# ls -al /dev/sda1
brw-rw---- 1 root disk 8, 1 Dec 19 11:16 /dev/sda1
```

可以看出，`sda=> 8,0` `sda1=>8,1`

### 绑定硬盘

继续编辑lxc配置文件,添加：

```
lxc.cgroup.devices.allow: b 8:0 rwm
lxc.cgroup.devices.allow: b 8:1 rwm
```

这个`8:0`和`8:1`就是刚才我们得到的。

### 设置自动挂载脚本

在`pve`中，创建`/var/lib/lxc/ID/mount-hook.sh`文件，其中ID就是你的lxc的ID：

```
#!/bin/sh
mknod -m 777 ${LXC_ROOTFS_MOUNT}/dev/sda b 8 0
mknod -m 777 ${LXC_ROOTFS_MOUNT}/dev/sda1 b 8 1
```

然后`chmod +x` 一下，然后在`lxc配置文件`中添加：

```
lxc.autodev: 1
lxc.hook.autodev: /var/lib/lxc/ID/mount-hook.sh
```

然后根据我们要挂载的设备，再添加一行(有个教程说不用，但是我加上了，然后成功了）：

```
lxc.mount.entry: /dev/sda1 /dev/sda1 bind,create=dir,optional 0 0
```

至此，可以启动容器了。

### PVE 硬盘直通

要将硬盘直通给 pve 管理的虚拟机，最简单使用下面的命令：

```bash
# 下面两种方式均可，风险点不同
qm set 101 --scsi1 /dev/disk/by-id/nvme-INTEL_SSDPE2KX020T8_BTLJ039307142P0BGN
qm set 101 --scsi1 /dev/sdb
```

## References

* [LXC直通硬盘](https://www.mereith.com/post/86)
* [LXC Linux系统容器](https://yunfwe.cn/2019/09/23/2019/LXC%20Linux%E7%B3%BB%E7%BB%9F%E5%AE%B9%E5%99%A8/)
* [Proxmox VE pve硬盘直通 ](https://foxi.buduanwang.vip/virtualization/1754.html/)