---
title: "PVE 内核模块 pve-kernal 编译安装方法"
date: 2021-12-06T14:29:16+08:00
description: "介绍 pve 虚拟化系统内核的编译安装方法."
categories: ["技术笔记集","虚拟化笔记集"]
tags: ["linux", "pve", "make", "debian"]
draft: false
---

以 pve-release-6.x ，基于 debian buster 为例：

- Step1: 配置国内 PVE 镜像源

```bash
# 配置 pve 软件包国内镜像源
$ echo "deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian buster pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list
$ wget https://enterprise.proxmox.com/debian/proxmox-ve-release-6.x.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-6.x.gpg
```

- Setp2：安装依赖包

Install build dependencies (i got these from the pve-kernel/debian/control file):

```bash
apt install asciidoc-base automake bc bison cpio debhelper dh-python file flex gcc git kmod libdw-dev libelf-dev libiberty-dev libnuma-dev libpve-common-perl libslang2-dev libssl-dev libtool lintian lz4 perl-modules python-minimal rsync sed sphinx-common tar xmlto zlib1g-dev
```

- Step3：获取 pve-kernel 源码

Clone proxmox-kernel

```bash
git clone https://git.proxmox.com/git/pve-kernel.git
```

- Step4：初始化子项目

initialize the submodules

```bash
make submodule
```

If that fails Fabian told me that you have cd in each submodule and do "git fetch --tags"

- Step5：编译

```bash
make
```

It will build with ALL cores

会自动编译，不需要设置多线程，它会自动调用多线程编译。编译完当前目录的 `.deb` 包就是内核包，直接使用 `dpkg -i` 安装即可。

## Q&A

- `dwarves_1.20 too old` `pahole version v1.12 is too old, need at least v1.16`

```bash
echo 'deb http://ftp.de.debian.org/debian sid main' > /etc/apt/sources.list
sudo apt-get update
sudo install dwarves
```

- 磁盘空间不足，扩容

```bash
# 查看当前磁盘的分区形式，确定新磁盘的盘符
$ fdisk -l
# 开始分区(以 /dev/vda 为例)
$ fdisk /dev/vda
# 键入 n 继续，保持默认即可
# 键入 p 查看分区
# 键入 w 将分区写入分区表
# 将分区表同步到系统
$ partprobe
# 设置新分区的格式(以 /dev/xvda6 为例)
$ mkfs -t ext4 /dev/xvda6
# 将新分区挂载 (以 /opt 为例)
$ mount /dev/xvda6 /opt
# 查看挂载结果
$ df -TH
```

## 参考文献

- [[TUTORIAL] Building the PVE kernel on Proxmox VE 6.x](https://forum.proxmox.com/threads/building-the-pve-kernel-on-proxmox-ve-6-x.76137/) by r.jochum
- [用在 AMD64 上 dwarves_1.20-1_amd64.deb 的下载页面](https://packages.debian.org/sid/amd64/dwarves/download)
- [Linux磁盘扩容后处理（fdisk）](https://support.huaweicloud.com/usermanual-dss/dss_01_2310.html) by 华为云
- [（二）编译PVE内核5.10.6-1-pve及安装内核补丁fullconeNat](https://blog.csdn.net/w946612410/article/details/113842949)
- [Proxmox 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/proxmox/) By **[tuna](https://mirrors.tuna.tsinghua.edu.cn/)**
- [Package Repositories](https://pve.proxmox.com/wiki/Package_Repositories) By [PVE](https://pve.proxmox.com/)