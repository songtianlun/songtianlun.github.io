---
title: '解决 target is busy 的一种方法'
date: '2023-05-25T09:26:42.874Z'
tags: ['Linux']
created: '2023-05-25T09:12:54.042Z'
creator: 'songtianlun'
modifier: 'songtianlun'
bag: 'default'
revision: '3'
---

<!-- Exported from TiddlyWiki at 23:04, 27th 五月 2023 -->

# 解决 target is busy 的一种方法

最近手头一台 PVE 集群的 ceph 地址变化，导致 cephfs 挂载出现问题，当我尝试修正这一错误时，发现无论如何无法重新挂载：

```bash
$ ls /mnt/pve/cephfs
ls: cannot access '/mnt/pve/cephfs': Permission denied

$ umount /mnt/pve/cephfs
umount: /mnt/pve/cephfs: target is busy.
```

尝试传统的方法使用 `lsof` 和 `fuser` 命令找出占用者：

```bash
$ sudo lsof /mnt/pve/cephfs
lsof: WARNING: can't stat() ceph file system /mnt/pve/cephfs
      Output information may be incomplete.
lsof: status error on /mnt/pve/cephfs: Permission denied
$ sudo fuser -muv /mnt/pve/cephfs
Cannot stat /mnt/pve/cephfs: Permission denied
```

常用的方法都失效了，机器不可以随意重启，后来发现可以使用 `umount -l` 懒卸载：

```
$ ls -lha /mnt/pve/
ls: cannot access '/mnt/pve/cephfs': Permission denied
total 8.0K
drwxr-xr-x. 3 root root 4.0K May 25 07:12 .
drwxr-xr-x. 4 root root 4.0K Apr 26 02:04 ..
d?????????? ? ?    ?       ?            ? cephfs
$ umount -l /mnt/pve/cephfs
$ ls -lha /mnt/pve/
total 12K
drwxr-xr-x. 3 root root 4.0K May 25 07:12 .
drwxr-xr-x. 4 root root 4.0K Apr 26 02:04 ..
drwxr-xr-x. 2 root root 4.0K Apr 12 09:23 cephfs
```

`umount -l`命令是在Linux系统中卸载（unmount）文件系统时使用的一个选项，其中`-l`代表"lazy"（懒卸载）。

在常规的卸载过程中，如果有进程正在使用目标文件系统，那么卸载操作会失败并提示"target is busy"（目标正忙）。这是因为卸载文件系统时，任何正在使用该文件系统的进程都必须停止使用它。然而，有时候确定哪些进程正在使用文件系统并停止它们是困难的，或者可能中断重要的系统功能。

这时，"lazy"卸载就会很有用。当你执行`umount -l`命令时，系统会立即从文件系统层次结构中分离出目标文件系统，并在所有进程都停止使用这个文件系统时完成卸载操作。换句话说，`-l`选项使得卸载操作可以立即返回，即使有进程仍在使用文件系统。

这就是为什么`umount -l`可能对于你的问题有效的原因：即使有进程仍在使用`/mnt/pve/cephfs`，这个命令也可以使得卸载操作立即返回，并在后台完成卸载过程。然而，这并不保证所有的问题都可以被解决，因为如果有进程持续地打开新的文件，那么"lazy"卸载可能永远也不会完成。