---
title: "从零构建 Docker 镜像 | 申威下从零构建 debian 并打包为 docker"
date: 2021-12-02T10:24:39+08:00
description: "基于 debootstrap 从零生成最小 debian 并制作 docker 镜像."
categories: ["技术笔记集","Linux 笔记集","国产化笔记"]
tags: ["linux", "uos", "docker", "SW", "debootstrap", "rootfs"]
draft: false
---

> [debootstrap](https://packages.debian.org/debootstrap) 是一个可以快速获得基本 Debian 系统的一个工具, 你可以将 Debootstrap 看作是一种特殊的安装工具. 她不同于 Debian Installter , 不需要安装用的CD/DVD ISO, 仅需连接到 Debian 软件仓库, [软件仓库简介(英文)](https://wiki.debian.org/What_is_a_repository%3F) . 无论你是否使用 Debian , 只要是任何的 Linux/GNU 发行版, 例如 Fedora/Gentoo/Arch/OpenSUSE, 甚至是 Ubuntu , 均可运行 debootstrap .
> 

申威 `CPU` 是从指令集（派生自 `Alpha` ）层面就是自成体系，区别于当前主流的 `X86` 架构或是 `Arm` 架构，故当前人们常用的软件均无法直接在申威架构CPU上使用，必须基于源码重新编译、移植甚至重新适配开发。

我在此前分别撰文介绍了申威环境下的 Docker 编译安装（《[申威（神/声）（SW）1621 + UOS 20 编译安装 Docker | 容器国产化适配](https://www.frytea.com/technology/docker/sw-1621-with-uos20-compiler-installed-docke/)》）以及基于 busybox 制作申威下可用 Docker 镜像的方法（《[从零构建 Docker 镜像 | 基于 busybox 制作 | 深入理解 Docker 镜像构建](https://www.frytea.com/technology/docker/build-a-docker-image-from-scratch/)》）。基于前面两种方法只是可以跑起来 Docker 并测试其容器运行状态，还并不能承担真实业务，因此本文介绍一种使用 Debian 提供的 `debootstrap` 工具自行制作 rootfs（也可理解为最小化 debian ）的方法。

基于这个镜像，就可以去自行构建实际使用的镜像了。

> 根据申威论坛的说法，当前申威平台 『Deepin UOS 上 debootstrap 可用』
> 

## 环境说明

- OS: `UOS 20 1021 12011.101`
- CPU: `SW_64` `SW1621`

## 制作方法

首先为当前执行的系统安装 `debootstrap` 工具：

```bash
sudo apt-get install debootstrap
```

如果您的 UOS 或 deepin 能够正常使用，软件源配置正常，应该可以直接安装该工具，之后使用该工具生成最小 debian 系统。

```bash
# 首先准备一个目录
mkdir rootfs-debian
# 执行下面命令在该目录下构建最小系统
sudo debootstrap --no-check-gpg eagle ./rootfs-debian  http://sh-packages.chinauos.com/desktop-professional/1010
```

以上命令是我在我的环境下使用的命令，不同的操作系统可能会有所不同。

执行后我得到了一个形如这样的目录结构，其中填充了必要的软件包：

```bash
$ tree rootfs-debian/ -d -L 1
rootfs-debian/
├── bin -> usr/bin
├── boot
├── dev
├── etc
├── home
├── lib -> usr/lib
├── media
├── mnt
├── opt
├── proc
├── root
├── run
├── sbin -> usr/sbin
├── srv
├── sys
├── tmp
├── usr
└── var

18 directories
```

## 命令说明

对于 debootstrap 命令的使用方法，详见 `man`，下面简单介绍一下：

```bash
# 整个 debootstrap 的命令结构如下
debootstrap --arch <ARCH> <VERSION> <DIRECTORY>  <MIRROR>
# ARCH: 目標系統的 CPU 架構，常用的有 i386、amd64、armel、armhf 等，SW_64在 UOS 下无需指定，会自动判断。
# VERSION: Debian 的版本
#    可以使用稳定版本（wheezy）、永远的测试版（sid）、更不稳定的（testing）等，详见 Debian 官网。
# DIRECTORY: 安装的目录，根据自己的需求设定
# MIRROR: 下载 Debian 套件的软件源服务器，申威+UOS 需要特别提供该组合软件源的服务地
```

我在制作初期遇到的两个问题分别是：

- `arch` 不知道如何指定，根据 `/proc/cpuinfo` 来看应该是 `SW_64`
- 找不到可用的镜像源。

先来说说 `arch` 的指定，使用 `arch` 命令看架构名称是 `sw_64`：

```bash
user@user-SW:~$ arch
sw_64
```

后面与厂商沟通了解到 UOS 或 deepin 下该参数可省略，因为 `debootstrap` 会自动去获取宿主及平台作为目标平台。

之后的比较困难的是 `<VERSION>` 和 `<MIRROR>` 部分，通过查看 `/etc/apt/sources.list` ，了解到我的环境下系统代号为 `fou` ，但是使用该代号找不到对应执行脚本。后来发现 UOS 桌面版代号为 `eagle` ，使用这个代号暂时可用。

**软件源** 部分，这一点比较关键， `deboostrap` 可以创建基本的 `rootfs` 目录架构，但是真的要跑起来就需要将必要的软件包填充进去，因此必须要找到支持我们的 CPU 架构和对应版本代号的软件源仓库才行，关于这一点，我在申威论坛找到了一篇帖子，内容可以参考：

```bash
UOS-SW-公网仓库

桌面

1.101x仓库地址：
deb http://sh-packages.chinauos.com/desktop-professional/1010 eagle main contrib non-free
2.102x仓库地址：
deb http://sh-packages.chinauos.com/desktop-professional/1020 eagle/sp2 main contrib non-free
3.103x仓库地址：
deb http://sh-packages.chinauos.com/desktop-professional/1032 eagle/sp3 main contrib non-free
4.104x仓库地址：
deb http://sh-packages.chinauos.com/desktop-professional/1040 eagle/sp4 main contrib non-free

服务器：

1.deepin15.4仓库地址：
deb http://sh-packages.chinauos.com/server-enterprise-bd fou/sp1 main contrib non-free
2.101x仓库地址：
deb http://sh-packages.chinauos.com/server-enterprise-710 fou/sp1 main contrib non-free
3.102x仓库地址:
deb http://sh-packages.chinauos.com/server-enterprise/1020 fou/sp2 main contrib non-free
4.1030仓库地址(B1-3):
deb http://sh-packages.chinauos.com/server-enterprise/1030 fou/sp3 main contrib non-free
5.1030仓库地址(B4-5版本使用：查看cat /etc/product-info 时间为7月17日后的)：
deb http://sh-packages.chinauos.com/server-enterprise/1032 fou/sp3 main contrib non-free
6.1040仓库地址：
deb http://sh-packages.chinauos.com/server-enterprise/1040 fou/sp4 main contrib non-free
```

实测在我的环境下必须使用 `http://sh-packages.chinauos.com/desktop-professional/1010` 这个源才可，其他的均出现找不到对应 `Release` 文件的问题。

如果你跟我遇到一样的问题，只需要确定 `arch` 和版本代号后把这些仓库地址挨个试一下，都是申威的仓库应该问题不大，况且当前最大的问题是先跑起来。

## 制作 Docker

如果上面的过程没有问题，现在你就拥有了一个最小文件系统，下面基于此制作一个 docker 镜像并运行，后面可以基于该镜像制作业务容器。

```bash
# 打包并导入docker
sudo tar --numeric-owner -cpf rootfs-debian.tar -C rootfs-debian .
sudo cat rootfs-debian.tar | sudo docker import - base-debian

# 尝试运行
sudo docker run -i -t base-debian /bin/bash
```

使用这个方法制作的镜像体积相比于直接打包当前系统要小很多：

```bash
$ sudo docker images                                                                                      
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
uos-eagle                    latest              1caa81ad354b        22 hours ago        399MB
curos                        latest              1113e49df40d        5 days ago          4.26GB
```

上面是我分别直接打包系统和使用 `deboostrap` 制作的镜像，打包系统的镜像达到了 `4.26GB` ，压缩后也要 `1G+`，使用工具制作的系统仅有 `399MB`，相比来看已经小了很多。使用该方法制作的镜像体积已经有了比较大的改善，但还是无法比肩官方给出的基础镜像，后面还可以指定排除元素的方式进一步精简，这是下一步需要做的事情了。

之所以非要打包系统作镜像，是因为所需要的业务是使用 `perl` 脚本语言写成，其运行必须依赖操作系统运行环境。通过这次探索，我也对人们常说的『go是云原生时代的语言』有了体会。因为 go 默认就是静态编译，只需要再加几个参数把依赖的底层组建也编译进来，打包时直接使用 `scratch` 镜像从零构建，完全不需要使用操作系统基础镜像，出来的体积就是惊人的小了。

至此，本文结束，若有问题请留言，需要探索的还有很多。

## 参考文献

- **[使用 debootstrap 建立完整的 Debian 系統.org](https://github.com/KingBing/blog-src/blob/master/%E4%BD%BF%E7%94%A8%20debootstrap%20%E5%BB%BA%E7%AB%8B%E5%AE%8C%E6%95%B4%E7%9A%84%20Debian%20%E7%B3%BB%E7%B5%B1.org)**
- **[Ubuntu使用debootstrap制作Docker镜像](https://blog.csdn.net/kongxx/article/details/52618517)**
- **[如何自行构建sw_64平台的docker镜像](https://forum.developer.wxiat.com/forum.php?mod=viewthread&tid=420&highlight=UOS) By 申威生态社区**
- **[UOS-SW-公网仓库](https://forum.developer.wxiat.com/forum.php?mod=viewthread&tid=387&highlight=UOS) By 申威生态社区**
- [Debootstrap](https://wiki.debian.org/zh_CN/Debootstrap) By Debian