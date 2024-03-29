---
title: "虚拟机 img 镜像密码修改"
categories: [ "技术" ]
tags: [ "QEMU","libvirt" ]
draft: false
slug: "567"
date: "2021-09-03 15:29:19"
---

本文介绍使用 `libguestfs-tools` 修改镜像文件密码的方法。

## 步骤

```bash
# 环境
# CentOS Linux release 7.9.2009 (AltArch)
# 鲲鹏 ARM 服务器
```

### 第一步：检查并修改qemu访问虚拟机镜像的权限

修改 qemu 配置文件 `/etc/libvirt/qemu.conf`，将 `user = "root"` 和 `group = "root"`  注释取消，并重启 libvirtd 或重启宿主机。

```bash
$ vim /etc/libvirt/qemu.conf
- #user = "root"
- #group = "root"
+ user = "root"
+ group = "root"

systemctl restart libvirtd
```

### 第二步：安装工具

```bash
# 安装libguestfs-tools
$ yum install libguestfs-tools 
$ systemctl start libvirtd
```

## 第三步：修改密码

```bash
# 以下两组命令貌似均可，但是实测我的环境仅第二个命令可用

$ virt-customize -a CentOS-7-x86_64-GenericCloud.qcow2 --root-password password:xxx
$ virt-sysprep --root-password password:123456 -a *.qcow2

# 若以下错误
# cannot access storage file (as uid:107, gid:107)permission denied
# 说明您第一步没有做，给一下权限再尝试

# 示例
[root@compute-arm-01 stl]$ virt-sysprep --root-password password:123456 -a bionic-server-cloudimg-arm64.img 
[   0.0] Examining the guest ...
[   5.4] Performing "abrt-data" ...
[   5.4] Performing "backup-files" ...
[   5.8] Performing "bash-history" ...
[   5.9] Performing "blkid-tab" ...
[   5.9] Performing "crash-data" ...
[   6.0] Performing "cron-spool" ...
[   6.0] Performing "dhcp-client-state" ...
[   6.0] Performing "dhcp-server-state" ...
[   6.0] Performing "dovecot-data" ...
[   6.0] Performing "logfiles" ...
[   6.1] Performing "machine-id" ...
[   6.2] Performing "mail-spool" ...
[   6.2] Performing "net-hostname" ...
[   6.2] Performing "net-hwaddr" ...
[   6.3] Performing "pacct-log" ...
[   6.4] Performing "package-manager-cache" ...
[   6.5] Performing "pam-data" ...
[   6.5] Performing "passwd-backups" ...
[   6.5] Performing "puppet-data-log" ...
[   6.6] Performing "rh-subscription-manager" ...
[   6.6] Performing "rhn-systemid" ...
[   6.7] Performing "rpm-db" ...
[   6.8] Performing "samba-db-log" ...
[   6.8] Performing "script" ...
[   6.8] Performing "smolt-uuid" ...
[   6.9] Performing "ssh-hostkeys" ...
[   6.9] Performing "ssh-userdir" ...
[   6.9] Performing "sssd-db-log" ...
[   7.0] Performing "tmp-files" ...
[   7.0] Performing "udev-persistent-net" ...
[   7.1] Performing "utmp" ...
[   7.1] Performing "yum-uuid" ...
[   7.1] Performing "customize" ...
[   7.2] Setting a random seed
virt-sysprep: warning: random seed could not be set for this type of guest
[   7.3] Setting the machine ID in /etc/machine-id
[   7.3] Setting passwords
[   8.7] Performing "lvm-uuids" ...
```

## 参考文献

- [为镜像img改密码](https://blog.csdn.net/yunqingshan/article/details/52894655)
- [qemu启动的虚拟机img修改密码](https://blog.csdn.net/u010094199/article/details/81938636)