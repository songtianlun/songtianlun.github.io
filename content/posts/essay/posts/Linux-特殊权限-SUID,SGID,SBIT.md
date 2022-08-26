---
title: "Linux 特殊权限 SUID,SGID,SBIT"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "454"
date: "2020-09-16 10:05:00"
---

setuid 和 setgid 分别是 set uid ID upon execution 和 set group ID upon execution 的缩写。我们一般会再次把它们缩写为 suid 和 sgid。它们是控制文件访问的权限标志(flag)，它们分别允许用户以可执行文件的 owner 或 owner group 的权限运行可执行文件。

## SUID

当 s 出现在文件拥有者的 x 权限上时，就被称为 SETUID BITS 或 SETUID 。

```bash
$ ls -ld /usr/bin/passwd 
-rwsr-xr-x 1 root root 68208 May 28 06:37 /usr/bin/passwd
```

其特点如下：

- SUID 权限仅对二进制可执行文件有效
- 如果执行者对于该二进制可执行文件具有 x 的权限，执行者将具有该文件的所有者的权限
- 本权限仅在执行该二进制可执行文件的过程中有效

## **SGID**

当 s 标志出现在用户组的 x 权限时称为 SGID。SGID 的特点与 SUID 相同

当一个目录设置了 SGID 权限后，它具有如下功能：

1. 用户若对此目录具有 r 和 x 权限，该用户能够进入该目录
2. 用户在此目录下的有效用户组将变成该目录的用户组
3. 若用户在此目录下拥有 w 权限，则用户所创建的新文件的用户组与该目录的用户组相同

## **SBIT**

其实 SBIT 与 SUID 和 SGID 的关系并不大。**SBIT 是 the restricted deletion flag or sticky bit 的简称。**SBIT 目前只对目录有效，用来阻止非文件的所有者删除文件。

权限信息中最后一位 t 表明该目录被设置了 SBIT 权限。SBIT 对目录的作用是：当用户在该目录下创建新文件或目录时，仅有自己和 root 才有权力删除。

```bash
$ ls -ld /tmp
drwxrwxrwt 12 root root 4096 Sep 16 01:50 /tmp
```

## 设置 SUID、SGID、SBIT 权限

```bash
$ chmod u+s testfile # 为 testfile 文件加上 SUID 权限。
$ chmod g+s testdir  # 为 testdir 目录加上 SGID 权限。
$ chmod o+t testdir  # 为 testdir 目录加上 SBIT 权限。
```

## 参考文献

- [Linux 特殊权限 SUID,SGID,SBIT](https://www.cnblogs.com/sparkdev/p/9651622.html)：[https://www.cnblogs.com/sparkdev/p/9651622.html](https://www.cnblogs.com/sparkdev/p/9651622.html)