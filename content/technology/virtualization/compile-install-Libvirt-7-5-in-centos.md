---
title: "Centos7.6 下编译安装 Libvirt 7.5"
date: 2021-12-06T14:06:56+08:00
description: "介绍 centos 下编译安装 libvirt7.5的方法，类比于 debian系，同时包含 libvirt 经典安装方式."
categories: ["技术笔记集","虚拟化笔记"]
tags: ["linux", "libvirt", "make", "centos"]
draft: false
---

`libvirt` 是目前使用最为广泛的对KVM虚拟机进行管理的工具和 `API` 。 `Libvirtd` 是一个 `daemon` 进程，可以被本地的 `virsh` 调用，也可以被远程的 `virsh` 调用， `Libvirtd` 调用 `qemu-kvm` 操作虚拟机。下面介绍 Centos7.6 下编译安装 Libvirt 7.5 的方法。

## 环境准备

```bash
yum install -y meson gcc qemu-kvm
```

## 编译步骤-7.5

首先下载源码文件：

```bash
# Compiling a release tarball
wget https://libvirt.org/sources/libvirt-7.5.0.tar.xz
tar -xvf libvirt-7.5.0.tar.xz
cd libvirt-7.5.0
```

编译前可以查看一下当前系统下 virsh 的安装位置

```bash
[root@compute-01 stl]# find / -name "virsh"
/usr/bin/virsh
```

可以看到是安装在 `.usr/bin` 这个 `PATH` 路径下，因此在编译安装时，可使用如下命令指定安装位置（默认安装在 `/usr/local/bin` 目录下）：

```bash
$ meson build --prefix=/usr
$ ninja -C build
$ sudo ninja -C build install
```

下面是官网给出的几种安装模式，包括直接使用 release 包安装，安装到您的个人目录下，或是根据系统自动安装到相应位置，可以按需选择。

```bash

# Compiling a release tarball
$ xz -dc libvirt-x.x.x.tar.xz | tar xvf -
$ cd libvirt-x.x.x
$ meson build

$ meson build [possible options]
$ ninja -C build
$ sudo ninja -C build install

# build & install libvirt to your home directory
$ meson build --prefix=$HOME/usr
$ ninja -C build
$ sudo ninja -C build install

# To produce a build that is compatible with normal OS vendor prefixes, use
$ meson build -Dsystem=true
$ ninja -C build
```

## 编译步骤-5.6

```bash
wget https://libvirt.org/sources/libvirt-5.6.0.tar.xz
tar -xvf

cd libvirt-5.6.0
./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var
$ make -j32
$ sudo make install
```

## 疑难解决

- ERROR: Program 'rpcgen portable-rpcgen' not found

```bash
wget https://github.com/thkukuk/rpcsvc-proto/releases/download/v1.4.2/rpcsvc-proto-1.4.2.tar.xz
./configure --sysconfdir=/etc &&
make
make install
```

- Program 'rst2html5 [rst2html5.py](http://rst2html5.py/) rst2html5-3' not found

```bash
$ yum install python -y
$ pip install rst2html5
```

- Dependency "glib-2.0" not found, tried pkgconfig and cmake

```bash
yum install glib2-devel
```

- Dependency "gnutls" not found, tried pkgconfig and cmake

```bash
yum install gnutls-devel
```

- Dependency "libxml-2.0" not found, tried pkgconfig and cmake

```bash
yum install libxml2-devel -y
```

- 致命错误：rpc/rpc.h：没有那个文件或目录

```bash
yum -y install libtirpc-devel
# 修改生成的编译配置文件
find / -name "rpc.h"
vim meson.build
# 在 headers 增加 rpc 头文件绝对路径

headers = [
  ...
  '/usr/include/tirpc/rpc/rpc.h',
]
```

- `parser error : Double hyphen within comment: <!-- This file is auto-generated from keymaps.csv`

解决方法：找到报错的 `*.html.in` 文件报错行出，将报错的 `--` 改为 `-` 即可。

- 编译后没有 vir-install 命令

```bash
yum install virt-install
```

- systemd 无法启动

`libvirtd.service` 存在于 `/usr/lib/systemd/system/` 文件夹下，而在 `/etc/systemd/system/` 文件夹下有该文件的软连接，表明这是自动启动的。

尝试启动该服务时会报错，因为其中指定环境变量有问题，其中的大部分内容不需要改动，就是下面的文件的路径需要改，因为手动编译安装的libvirt安装路径在 `/usr/local/sbin/libvirtd` 或是 `/usr/sbin/libvirtd` ，修改以下两处：

```bash
[Service]
...
EnvironmentFile=/etc/sysconfig/libvirtd
ExecStart=/usr/sbin/libvirtd $LIBVIRTD_ARGS
...
```

需根据您系统中实际位置查找到对应位置，如果按照本文建议流程则路径同上，否则需自行查找，之后再次尝试启动即可，有可能需要重新加载一下服务。

```bash
systemctl daemon-reload
systemctl reload libvirtd
systemctl start libvirtd
```

即可启动成功，若不成功请留言。

- virt-manager 启动提示 `virt qemu-sock no such file or directory`

检查后应该是 `virtqemud` 服务没起来导致的，编译安装默认生成的服务路径在 `/usr/local/*` 下，而我们指定了安装在默认位置 `/usr` ，参考 systemd 无法启动的解决方法即可解决该问题。

首先看一下 `/usr/sbin/virtqemud` 这个文件是存在的，下面继续操作，首先使能该服务。

```bash
$ systemctl enable virtqemud
Created symlink from /etc/systemd/system/multi-user.target.wants/virtqemud.service to /usr/local/lib/systemd/system/virtqemud.service.
Created symlink from /etc/systemd/system/sockets.target.wants/virtqemud.socket to /usr/local/lib/systemd/system/virtqemud.socket.
Created symlink from /etc/systemd/system/sockets.target.wants/virtqemud-ro.socket to /usr/local/lib/systemd/system/virtqemud-ro.socket.
Created symlink from /etc/systemd/system/sockets.target.wants/virtqemud-admin.socket to /usr/local/lib/systemd
```

创建了改服务的软连接，宣告自启，此时服务配置有问题，直接修改该软连接指定的文件

```bash
vim /usr/local/lib/systemd/system/virtqemud.service

# 类比 libvirtd 的修改这两行，指定正确服务位置

[Service]
...
EnvironmentFile=-/etc/sysconfig/virtqemud
ExecStart=/usr/sbin/virtqemud $VIRTQEMUD_ARGS
```

之后重新加载服务，再启动

```bash
systemctl daemon-reload
systemctl reload virtqemud
systemctl start virtqemud
```

不出意外的话就能启动了，若有问题请留言。

- 汇总需手动修改的服务

```bash
vim /usr/local/lib/systemd/system/libvirtd.service
vim /usr/local/lib/systemd/system/virtlogd.service
vim /usr/local/lib/systemd/system/virtqemud.service

[root@dev system]# ll /usr/local/lib/systemd/system/*.service
/usr/local/lib/systemd/system/libvirtd.service
/usr/local/lib/systemd/system/virtlockd.service
/usr/local/lib/systemd/system/virtlogd.service
/usr/local/lib/systemd/system/virtlxcd.service
-rw-r--r--. 1 root root  721  7月  5 17:21 /usr/local/lib/systemd/system/virtnetworkd.service
-rw-r--r--. 1 root root  643  7月  5 17:21 /usr/local/lib/systemd/system/virtnwfilterd.service
-rw-r--r--. 1 root root  607  7月  5 17:21 /usr/local/lib/systemd/system/virtproxyd.service
-rw-r--r--. 1 root root  623  7月  5 17:21 /usr/local/lib/systemd/system/virtsecretd.service
-rw-r--r--. 1 root root  677  7月  5 17:21 /usr/local/lib/systemd/system/virtstoraged.service
-rw-r--r--. 1 root root  626  7月  5 17:21 /usr/local/lib/systemd/system/virtvboxd.service

Description=Virtualization daemon
  8 Requires=virtlogd.socket
  9 Requires=virtlockd.socket
 10 Wants=systemd-machined.service
 11 Before=libvirt-guests.service
 12 After=network.target
 13 After=dbus.service
 14 After=iscsid.service
 15 After=apparmor.service
 16 After=local-fs.target
 17 After=remote-fs.target
 18 After=systemd-logind.service
 19 After=systemd-machined.service
```

- 检查 libvirtd 无法启动的原因

```bash
journalctl -xef -u libvirtd.service
```

- `configure: error: You must install device-mapper-devel/libdevmapper >= 1.0.0 to compile libvirt`

```bash
yum install device-mapper-devel
```

- `yum install libpciaccess-devel）`
- `Failed to get host power management capabilities`

```bash
yum -y install pm-utils
重启libvir
/etc/init.d/libvirt-bin restart
```

## 参考文献

- [libvirt Installation](https://libvirt.org/compiling.html)
- [使用 meson 编译代码](https://blog.csdn.net/CaspianSea/article/details/78848021)
- [Program rpcgen portable-rpcgen found: NO](https://gitlab.com/libvirt/libvirt/-/issues/95)
- [app-emulation/libvirt](https://packages.gentoo.org/packages/app-emulation/libvirt)
- [rpcsvc-proto-1.4.2](https://www.linuxfromscratch.org/blfs/view/cvs/basicnet/rpcsvc-proto.html)
- [data/meson.build:78:0: ERROR: Native dependency 'glib-2.0' not found](https://github.com/mesonbuild/meson/issues/4264)
- `yum list`
- [Libvirt 4.10.0编译安装](https://blog.csdn.net/sukysun125/article/details/89402782)
- [Linux下编译安装qemu和libvirt【转】](https://www.cnblogs.com/sky-heaven/p/8617879.html)
- [configure编译时提示：configure: error: you must configure in a separate build directory](https://blog.csdn.net/dbkmeteor/article/details/6764650)
- [# 编译 qemu，libvirt， qemu rpm 包和 libvirt rpm 包](https://blog.csdn.net/wziy520/article/details/113700059)
- [meson+ninja build系统，使用meson & ninja 编译C工程](https://blog.csdn.net/ambercctv/article/details/106108801)
- [手动编译安装Libvirt之后利用systemctl管理libvirtd服务](https://www.cnblogs.com/ck1020/p/6024039.html)
- [17.3 systemctl 针对 service 类型的配置文件](https://wizardforcel.gitbooks.io/vbird-linux-basic-4e/content/150.html)
- [Systemd 入门教程：实战篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)
- [centos7手动编译安装Libvirt常见问题](https://www.cnblogs.com/ck1020/p/6024087.html)
- [libvirt安装过程中遇到的问题](https://blog.csdn.net/heybob/article/details/24481397)
- [openstack安装libvir报错](https://blog.51cto.com/hobbylinux/970919)