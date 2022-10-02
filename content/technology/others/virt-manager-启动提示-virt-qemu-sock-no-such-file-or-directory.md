---
title: "virt-manager 启动提示 virt qemu-sock no such file or directory"
categories: [ "编程开发" ]
tags: [ "KVM" ]
draft: false
slug: "548"
date: "2021-07-09 18:08:00"
---

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

本文截取自，[前一篇文章](https://blog.frytea.com/archives/546/)，详细内容及上下文请[查看原文](https://blog.frytea.com/archives/546/)。