---
title: "深入理解 Linux 启动过程 | QEMU 启动 linux 内核和自制根文件系统"
date: 2021-11-17T03:29:39Z
description: "故事开始的地方，深入 Linux 系统的启动流程，自己编译内核并制作根文件系统，并使用 QEMU 模拟启动."
categories: ["技术笔记集","Linux 笔记"]
tags: ["linux", "qemu", "busybox", "rootfs"]
draft: false
---

跟我一起来到故事开始的地方，深入 Linux 系统的启动流程，自己编译内核并制作根文件系统，并使用 QEMU 模拟启动。

## 前置知识

昨天看到阮老师两篇文章 《**[计算机是如何启动的？](https://www.ruanyifeng.com/blog/2013/02/booting.html)**》和 《**[Linux 的启动流程](https://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html)**》，对计算机的启动流程有了更加深入的理解，正好最近在做国产申威处理器的虚拟化支持性调研，称此机会深入了解一下 Linux 系统的启动流程，并使用 QEMU 模拟这一流程。

![https://imagehost-cdn.frytea.com/images/2021/11/17/imageb68194bae57a49fc.png](https://imagehost-cdn.frytea.com/images/2021/11/17/imageb68194bae57a49fc.png)

> 说明：本文介绍的方法同样可用于内核调试，但侧重于介绍 **使用 QEMU 模拟 Linux 的启动流程** 。本文核心内容参考了 [USTC **2021年春季**『操作系统原理与设计』](http://staff.ustc.edu.cn/~ykli/os2021/index.html) 课程实验，结合网络文献和自己的实验整理而来。
> 

如果对于 Linux 的启动流程不够熟悉，可以先看一下上面提到的文章，之后回到本文继续。

看过文章后应该对启动流程有了大概认识，本文会介绍自制一个简单的根文件系统，即 `initramfs` （基于 `ramfs` 的临时文件系统，一种以 `cpio` 格式压缩后的 `rootfs` 文件系统），如果对这个概念不太理解，可以来看一下 《 [USTC 2021年春季操作系统原理与设计](http://staff.ustc.edu.cn/~ykli/os2021/index.html) 课程实验一：编译运行Linux内核并通过QEMU+GDB调试》中 [实验说明](http://staff.ustc.edu.cn/~ykli/os2021/lab/lab1.pdf) 的『先导知识部分』。

本文会分别使用一个 **helloworld 程序** 和 **busybox** 分别生成根文件系统并启动。

简单说一下环境：

- 硬件平台： Lenovo 台式机
- 操作系统： `Ubuntu 20.04.3 LTS`
- 系统内核： `5.11.0-40-generic`
- QEMU： `QEMU emulator version 4.2.1 (Debian 1:4.2-3ubuntu6.18)`
- 实验内核： `4.9.263`
- busybox： `busybox-1.32.1`

## 模拟启动

下面介绍使用 QEMU 模拟启动内核和根文件系统的方法，让 Linux 启动流程有一个更加具体的认识。为了模拟启动，需要准备编译好的内核 `bzImage` 和根文件系统，下面分别介绍。

### 编译内核

本文使用 `linux-4.9.263` 版本内核为例，首先获取内核源码：

```bash
$ mkdir ~/kvm
$ cd ~/kvm
$ wget https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.9.263.tar.xz
#下载备用链接: https://od.srpr.cc/acgg0/linux-4.9.263.tar.xz
$ tar -Jvxf linux-4.9.263.tar.xz #解压
# 安装编译内核所需的依赖
$ sudo apt-get install git build-essential libelf-dev xz-utils libssl-dev bc libncurses5-dev libncursesw5-dev
```

准备好编译环境后，开始对接下来的编译做一个配置，这里提供两种方案，选一即可。

- 方案一： 精简配置，减少不必要的驱动编译(速度快，存储小)

```bash
cd ~/kvm/linux-4.9.263
wget https://gitee.com/songtianlun/USTC_OS/raw/master/term2021/lab1/.config 
# 备用链接:
# https://git.lug.ustc.edu.cn/gloomy/ustc_os/-/raw/master/term2021/lab1/.config 
# http://222.186.10.65:8080/directlink/3/.config
# https://raw.githubusercontent.com/ZacharyLiu-CS/USTC_OS/master/term2021/lab1/.config
# https://gitee.com/songtianlun/USTC_OS/raw/master/term2021/lab1/.config

# 说明：直接使用 USTC 提供的配置好的精简 .config ，可以用于快速看到效果，若想深入了解配置含义需自行查阅资料。
```

- 方案二： [内核配置( `make menuconfig` )详述](https://blog.csdn.net/fanle76/article/details/52330265)(编译时间较长，占空间)

```bash
cd ~/oslab/linux-4.9.263
make menuconfig   #本次实验直接选择Save,然后exit
```

有了内核编译配置，即可开始编译：

```bash
make -j $((`nproc`-1)) 
# 编译线程数的选择上，一种说法是使用(你的CPU核心数-1)个线程进行编译，一种说法是使用 CPU核心数*2，自行调整即可，只影响编译速度，对编译结果没有影响。

...
Kernel: arch/x86/boot/bzImage is ready  (#1)
# 最后出现这个即为成功，我们后面会启动这个 bzImage
```

### 制作根文件系统

在这里也提供两种方案，后面可以分别启动，实测均可启动成功。

- 方案一：自制简单 helloworld 程序：

这里写一个简单的 helloworld 程序，正常启动后在终端打印 `hello world!` ，源码如下：

```bash
/*************************************************************************
	> File Name: hello.c
	> Description: hello.c
	> Author: songtianlun
	> Mail: songtianlun@frytea.com 
	> Created Time: 2021-11-16 12:39:37
 ************************************************************************/
#include <stdio.h>
void main()
{
    printf("Hello World\n");
    printf("世界，你好！\n");
    printf("Hello World\n");
    fflush(stdout);
    while(1);
}
```

之后使用静态链接编译，使用 `cpio` 制作成 `rootfs`

```bash
$ cd ..
使用静态编译链接．
$ gcc -static -o helloworld hello.c
将helloworld制作成cpio
$ echo helloworld | cpio -o --format=newc > rootfs
1776 blocks
$ ls -la rootfs
-rw-rw-r-- 1 seijia seijia 909312 12月 21 13:15 rootfs
```

- 方案二：使用busybox生成：

> **BusyBox**是一个遵循[GPL](https://zh.wikipedia.org/wiki/GPL)协议、以[自由软件](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94)形式发行的[应用程序](https://zh.wikipedia.org/wiki/%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F)。Busybox在单一的[可执行文件](https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6)中提供了精简的[Unix](https://zh.wikipedia.org/wiki/Unix)工具集，可运行于多款[POSIX](https://zh.wikipedia.org/wiki/POSIX)环境的操作系统，例如Linux（包括Android）、Hurd、FreeBSD等等。由于BusyBox可执行文件的文件比较小，使得它非常适合使用于[嵌入式系统](https://zh.wikipedia.org/wiki/%E5%B5%8C%E5%85%A5%E5%BC%8F%E7%B3%BB%E7%BB%9F)。作者将BusyBox称为“嵌入式Linux的瑞士军刀”。 —— [BusyBox By Wikipedia](https://zh.wikipedia.org/wiki/BusyBox)
> 

首先获取源码：

```bash
$ cd ~/kvm
$ wget https://busybox.net/downloads/busybox-1.32.1.tar.bz2
#下载备用链接: https://od.srpr.cc/acgg0/busybox-1.32.1.tar.bz2
$ tar -jxvf busybox-1.32.1.tar.bz2
$ cd ~/kvm/busybox-1.32.1
```

之后编译并安装：

```bash
# 编译busybox
$ make menuconfig
#修改配置如下：(空格键勾选)
Settings –>
  Build Options
   [*] Build static binary（no share libs）

# 编译并安装
$ make -j $((`nproc`-1))
$ sudo make install
```

现在我们已经有了 busybox 相关的源程序，下面开始准备根文件系统：

```bash
cd ~/kvm/busybox-1.32.1/_install
sudo mkdir dev 
sudo mknod dev/console c 5 1
sudo mknod dev/ram b 1 0 
sudo touch init
```

> 这里的 `mknode` 分别创建了一个面向块设备和一个面向字符设备的特殊文件。
> 

将以下内容写入 `init`

```bash
#!/bin/sh
echo "INIT SCRIPT"
mkdir /proc
mkdir /sys
mount -t proc none /proc
mount -t sysfs none /sys
mkdir /tmp
mount -t tmpfs none /tmp
echo -e "\nThis boot took $(cut -d' ' -f1 /proc/uptime) seconds\n"
exec /bin/sh
```

下面开始生成 `rootfs`

```bash
# 首先为 init 赋予可执行权限
$ sudo chmod +x init
# 进入 busybox 编译成果目录
cd ~/kvm/busybox-1.32.1/_install
# 使用 cpio 制作成 rootfs，为区分方法一，这里使用另一个名称并压缩
find . -print0 | cpio --null -ov --format=newc | gzip -9 > ~/kvm/initramfs-busybox-x64.cpio.gz
# 注意：该命令一定要在busybox的 _install 目录下执行
# 注意：每次修改_install,都要重新执行该命令
```

### 启动

经过上述准备，终于要启动了！

根文件制作过程如果是采用了 **方案一** ，使用下面命令启动：

```bash
$ qemu-system-x86_64 -s \
    -kernel ./linux-4.9.263/arch/x86/boot/bzImage  \
    -initrd ./rootfs \
    -append "root=/dev/ram rdinit=/helloword"
# 注意指定正确的内核和根文件系统位置
```

![https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_11-15_1c71a5e8d7ec6eb0e.png](https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_11-15_1c71a5e8d7ec6eb0e.png)

可以看到启动成功后打印出了 hello world。

如果采用 **方案二** ，使用下面命令启动：

```bash
$ qemu-system-x86_64 -s \
    -kernel ./linux-4.9.263/arch/x86/boot/bzImage  \
    -initrd initramfs-busybox-x64.cpio.gz \
    --append "nokaslr root=/dev/ram init=/init"
# 注意指定正确的内核和根文件系统位置
```

![https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_11-15a11489946556119d.png](https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_11-15a11489946556119d.png)

使用 busybox 制作的 rootfs 提供了一些基础的命令可供使用。

## 总结

为了在 QEMU 中模拟 Linux 的启动流程，在网上找了许多教程，踩了很多坑，最后找到的 USTC 实验说明真是帮助很大，做完后对 Linux 启动流程有了更加深刻的理解，果然**在计算机的世界里，必须亲眼看到才能真正正确的理解**。希望这份教程能够帮到你。

## 参考文献

- [USTC 操作系统原理与设计 Operating System Principles and Implementation 2021年春季](https://github.com/ZacharyLiu-CS/USTC_OS/blob/master/term2021/lab1/lab1_compile_and_debug_linux_kernel.md#%E5%85%88%E5%AF%BC%E7%9F%A5%E8%AF%86)
- [实验一：编译运行Linux内核,制作initramfs，并通过qemu+gdb调试](https://github.com/ZacharyLiu-CS/USTC_OS/blob/master/term2021/lab1/lab1_compile_and_debug_linux_kernel.md#%E5%85%88%E5%AF%BC%E7%9F%A5%E8%AF%86)
- [mknod用法以及主次设备号](https://www.cnblogs.com/hnrainll/archive/2011/06/10/2077583.html)
- [Linux 的启动流程](https://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html) By 阮一峰
- [计算机是如何启动的？](https://www.ruanyifeng.com/blog/2013/02/booting.html) By 阮一峰
- [BusyBox By Wikipedia](https://zh.wikipedia.org/wiki/BusyBox)
- [第一步，用qemu启动linux内核，从跑个Helloworld开始](https://blog.csdn.net/sinat_22597285/article/details/53783221)
- [在qemu上运行BusyBox](https://www.cnblogs.com/wipan/p/9272255.html)
- [编译内核出现：cc1: error: code model kernel does not support PIC mode](https://blog.csdn.net/jasonLee_lijiaqi/article/details/84651138)
- [错误: fatal error: bits/libc-header-start.h: No such file or directory #include <bits/libc-header-start.h>](https://www.cnblogs.com/xuyaowen/p/libc-header-start.html)
- [qemu启动Linux内核](https://www.cwiki.cn/archives/qemu%E5%90%AF%E5%8A%A8linux%E5%86%85%E6%A0%B8)
- [QEMU + Busybox 模拟 Linux 内核环境](https://www.v4ler1an.com/2020/12/qemu/)
- [Qemu 模拟环境 By CTF Wiki](https://ctf-wiki.org/pwn/linux/kernel-mode/environment/qemu-emulate/)
- [Linux 内核编译步骤及配置详解](https://www.cnblogs.com/xiaocen/p/3717993.html)