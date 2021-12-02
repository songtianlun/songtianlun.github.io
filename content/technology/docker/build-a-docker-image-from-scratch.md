---
title: "从零构建 Docker 镜像 | 基于 busybox 制作 | 深入理解 Docker 镜像构建"
date: 2021-11-26T16:16:40+08:00
description: "基于 busybox 无依赖的构建带有基础 unix 工具集的 docker 镜像."
categories: ["技术笔记集","Linux 笔记","国产化笔记"]
tags: ["linux", "uos", "docker", "SW", "busybox", "rootfs"]
draft: false
---

## 前置知识

- `Dockerfile` 中可以通过 `FROM scratch` 引用一个docker内置的 **空镜像**；
- `Docker` 容器的内核都是 **共享** 宿主操作系统的 **内核**，容器启动后 `docker` 会自动在容器内建立系统目录： `dev` , `etc` , `proc` , `run` , `sys` 及系统文件；
- `Docker` 容器内是一个 **隔离** 的基于宿主系统内核的运行环境（或理解为操作系统）。Docker 内的操作系统是以 **动态库、静态库、可执行程序及其他资源文件** 形态体现，如CentOS就是将CentOS的各种系统库、工具库及程序文件打包成Docker镜像。
- 一个最小的能在 `Docker` 运行的程序可以通过静态编译实现，由于没有任何依赖（包括操作系统依赖，不含内核），可以直接在一个只包含该程序的 `Docker` 容器中启动起来；
- 而一个动态编译的程序，通常引用了 **系统库** 和其他 **第三方库**。其中系统库主要有： `ld-linux` , `libdl` , `libm` , `libc` , `libm`。这种情况下，就必须按照linux约定将系统库及第三方库放到镜像的 `/lib` 或 `/lib64` 目录下（现代系统通常都用64位，64位库放到 `/lib64` 下，注意  `/lib64` 是到 `/usr/lib64` 的软链接）。如果依赖库不全，docker 容器启动的时候会报错： `standard_init_linux.go:175: exec user process caused "no such file or directory`。

> 注：前置知识来源于： 《**[基于busybox构建最小linux Docker镜像系统](https://blog.csdn.net/hknaruto/article/details/70229896)**》，文章主体根据实际情况发展推进。
> 

此前对 Docker 的理解仅仅停留在：**拉取一个基础镜像 → 拷入程序和运行库 → 运行**。但最近需要在 SW64 平台验证 Docker 并跑业务，软硬件供应商无法提供配套镜像站，因此需要从零做适配该架构的镜像。

> **申威**（英语：**ShenWei**或**Sunway**）是[江南计算技术研究所](https://zh.wikipedia.org/wiki/%E6%B1%9F%E5%8D%97%E8%AE%A1%E7%AE%97%E6%8A%80%E6%9C%AF%E7%A0%94%E7%A9%B6%E6%89%80)开发的微处理器系列。此种处理器所使用架构的细节仍然不得而知。申威原本属于Alpha阵营，指令集也是基于Alpha进行扩展。
> 

在该架构上所有的软件程序都需要使用源码重编，即使是 Docker 镜像也不例外，因为**该平台从 CPU 指令集开始就是独立的一套东西，与当前流行的 X86 ，ARM 无法通用**。

为了构建该平台的 Docker 测试镜像，有两种方案：

- 基于 busybox 构建带有常用 Linux 命令的镜像；
- 基于当前操作系统直接打包构建镜像。

为了从更底层了解 Docker 构建的原理和方法，本次介绍基于 busybox 构建的方法和流程。

## 构建环境

- CPU: `SW1621`
- OS: `Uniontech OS Server 20 Enterprise`

## 构建步骤

### Step1: 编译准备 busybox：

> **BusyBox**是一个遵循[GPL](https://zh.wikipedia.org/wiki/GPL)协议、以[自由软件](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94)形式发行的[应用程序](https://zh.wikipedia.org/wiki/%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F)。Busybox在单一的[可执行文件](https://zh.wikipedia.org/wiki/%E5%8F%AF%E6%89%A7%E8%A1%8C%E6%96%87%E4%BB%B6)中提供了精简的[Unix](https://zh.wikipedia.org/wiki/Unix)工具集，可运行于多款[POSIX](https://zh.wikipedia.org/wiki/POSIX)环境的操作系统，例如Linux（包括Android）、Hurd、FreeBSD等等。由于BusyBox可执行文件的文件比较小，使得它非常适合使用于[嵌入式系统](https://zh.wikipedia.org/wiki/%E5%B5%8C%E5%85%A5%E5%BC%8F%E7%B3%BB%E7%BB%9F)。作者将BusyBox称为“嵌入式Linux的瑞士军刀”。 —— [BusyBox By Wikipedia](https://zh.wikipedia.org/wiki/BusyBox)
> 

首先获取源码：

```bash
$ cd ~/kvm
$ wget https://busybox.net/downloads/busybox-1.32.1.tar.bz2
#下载备用链接: https://od.srpr.cc/acgg0/busybox-1.32.1.tar.bz2
# 可使用 --no-check-certificate 参数跳过证书验证
$ tar -jxvf busybox-1.32.1.tar.bz2    #解压
$ cd busybox-1.32.1
```

之后编译：

```bash
# 编译busybox
$ make menuconfig
#修改配置如下：(空格键勾选)
Settings –>
  Build Options
   [*] Build static binary（no share libs）

# 编译
$ make -j $((`nproc`-1))
# 这一步会将编译成果整理到 _install 目录下
$ sudo make install
```

至此，可以看到在 _install 下已经有了我们需要的最基本的目录结构以及配套最基础的 Unix 工具集 ：

```bash
$ tree ./_install/ -d
../_install/
├── bin
├── sbin
└── usr
    ├── bin
    └── sbin

5 directories
```

### Step2: 准备所有资源：

我们先将目录中所有内容拷贝到一个单独的文件夹中，方便后面制作镜像：

```bash
$ cp -r ../busybox-1.32.1/_install/* ~/minios
```

再完善几个目录：

```perl
mkdir usr/lib
mkdir usr/lib64
mkdir usr/local
mkdir usr/include
mkdir var/
mkdir var/lib
mkdir var/run
mkdir var/local
mkdir var/log
mkdir tmp
ln -s usr/lib lib
ln -s usr/lib64 lib64
```

最终大概是这个目录架构：

```bash
$ tree ./minios/ -d
./minios/
├── bin
├── lib -> usr/lib
├── lib64 -> usr/lib64/
├── sbin
├── tmp
├── usr
│   ├── bin
│   ├── include
│   ├── lib
│   ├── lib64
│   ├── local
│   └── sbin
└── var
    ├── lib
    ├── local
    ├── log
    └── run

17 directories
```

至此，构建镜像所需的内容已经准备完毕。

### Step3: 制作镜像 ：

首先编写 `Dockerfile` ，内容如下：

```perl
FROM scratch
MAINTAINER Tianlun Song
ADD ./ /
RUN rm /Dockerfile
```

之后制作镜像：

```perl
$ docker build -t minios .
Sending build context to Docker daemon  3.152MB
Step 1/4 : FROM scratch
 ---> 
Step 2/4 : MAINTAINER Tianlun Song
 ---> Running in 3a47980ef7e4
Removing intermediate container 3a47980ef7e4
 ---> 5e9c29f1462d
Step 3/4 : ADD ./ /
 ---> 2a1fa08aa40c
Step 4/4 : RUN rm /Dockerfile
 ---> Running in 29d515878dcb
Removing intermediate container 29d515878dcb
 ---> 18fe0bfbae07
Successfully built 18fe0bfbae07
Successfully tagged minios:latest
```

> 注意这一步编写 `Dockerfile` 到制作镜像都是在 `minios` 目录下完成的， `build` 时注意后面的 `.`，这是将当前目录作为构建上下文，千万不要搞错。
> 

如果一切顺利，这里应该就能看到制作好的镜像了。

```bash
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
minios              latest              18fe0bfbae07        32 minutes ago      2.94MB
```

### Step4: 启动镜像：

准备这么多，启动很简单：

```bash
$ docker run --rm -it minos /bin/sh
```

成功启动就可以看到一个最基本的 Unix 终端环境，并且可以使用 busybox 提供的这些最基本的命令。

```bash
/ # ls
bin      dev      etc      lib      lib64    linuxrc  proc     sbin     sys      tmp      usr      var
/ # ping 119.29.29.29
PING 119.29.29.29 (119.29.29.29): 56 data bytes
64 bytes from 119.29.29.29: seq=0 ttl=49 time=22.725 ms
64 bytes from 119.29.29.29: seq=1 ttl=49 time=21.562 ms
^C
--- 119.29.29.29 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 21.562/22.143/22.725 ms
/ # 
```

## 总结

本文介绍了基于 busybox 编译构建最基本 docker 镜像的方法，不受 CPU 架构的限制，通过这一过程也可加深对于 Docker 的理解，有问题欢迎留言。

## 参考文献

- [基于busybox构建最小linux Docker镜像系统](https://blog.csdn.net/hknaruto/article/details/70229896) By hkNaruto
- [深入理解 Linux 启动过程 | QEMU 启动 linux 内核和自制根文件系统](https://www.frytea.com/technology/unix-like/qemu-launch-linux-kernel-and-homemade-rootfs/) By Frytea
- [BusyBox](https://zh.wikipedia.org/wiki/BusyBox) By 维基百科
- [申威处理器](https://zh.wikipedia.org/wiki/%E7%94%B3%E5%A8%81%E5%A4%84%E7%90%86%E5%99%A8) By 维基百科
- [申威处理器](https://baike.baidu.com/item/%E7%94%B3%E5%A8%81%E5%A4%84%E7%90%86%E5%99%A8/9468374) By 百度百科
- [申威1621](http://www.swcpu.cn/show-190-254-1.html) By [swcpu.cn](http://swcpu.cn/)