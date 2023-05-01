---
title: "macOS 使用 dd 制作 USB 启动盘"
categories: [ "技术" ]
tags: [ "macOS" ]
draft: false
slug: "764"
date: "2023-03-30 22:39:40"
---

安装操作系统时，当前常用的方式是获取操作系统对应的 ISO 文件，并制作 U 盘启动盘，使用 U 盘引导系统进行安装。

当使用 MacOS 时，可以很方便的利用系统自带工具，完成上述工作，具体步骤如下。

首先获得操作系统镜像，推荐从官方进行下载 ISO 类型的镜像，下载到的文件名如 Win10_20H2_v2_Chinese(Simplified)_x64.iso、ubuntu-20.04.1-desktop-amd64.iso、CentOS-7-x86_64-DVD-2003.iso 等。

之后通过以下步骤制作启动盘

```bash
# 使用 diskutil 查看 U 盘设备 ID
$ diskutil list
...
/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:                                                   *15.5 GB    disk2
...

# 取消 U 盘挂载，否则在后续操作中可能会提示资源忙，无法进行启动盘制作
# 注意使用上面查询到的设备 ID，本例中为 /dev/disk2，一定注意不要写错
$ diskutil unmountDisk /dev/disk2
Unmount of all volumes on disk2 was successful

# 使用 dd 将操作系统镜像写入 U 盘
# if=file 代表要写入的源文件路径
# of=file 代表要写入的目标文件，此处为代表 U 盘的设备 ID，但注意，命令中使用的是 rdisk2 而不是 disk2，也可以使用 disk2，区别稍后再讲
# bs=n 代表同时设置输入输出的块大小，n 代表字节数，默认为 512，可以使用 b/k/m/g 等字母后缀代表不同的单位，如下面命令代表每个块大小为 1048576(1m) 字节
# 写入时间较长，过程中没有任何输出，最终成功结束时会输出统计信息
$ sudo dd if=/Users/alphahinex/Downloads/CentOS-7-x86_64-Minimal-2003.iso of=/dev/rdisk2 bs=1m
1035+0 records in
1035+0 records out
1085276160 bytes transferred in 415.019150 secs (2615003 bytes/sec)
```

写入完成后，会弹出 此电脑不能读取您插入的磁盘。 的提示，直接点 忽略 或 推出 即可，不要点 初始化...。

也可以使用 diskutil 将 U 盘弹出：

```bash
$ diskutil eject /dev/disk2
Disk /dev/disk2 ejected
```

制作好的启动盘，在 Mac 或 Windows 上都无法查看其中内容，但并不影响使用。

## References

* [MacOS 制作 USB 启动盘 - alphahinex](https://alphahinex.github.io/2021/01/10/mac-create-bootable-usb-stick/)
* [MacOS 制作 USB 启动盘](https://www.jianshu.com/p/826dc5445b75)

