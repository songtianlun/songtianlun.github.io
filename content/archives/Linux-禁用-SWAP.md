---
title: "Linux 禁用 SWAP"
categories: [ "技术" ]
tags: [ "linux","swap" ]
draft: false
slug: "722"
date: "2023-01-06 08:37:44"
---

在服务器和容器平台建议关闭 SWAP，避免内存交换影响服务器性能，甚至引发数据丢失。

一、不重启电脑，禁用启用swap，立刻生效

```
# 禁用命令

sudo swapoff -a

# 启用命令

sudo swapon -a

# 查看交换分区的状态
```

```
sudo free -m
```

二、重新启动电脑，永久禁用Swap

把根目录文件系统设为可读写

```
sudo mount -n -o remount,rw /
```

用vi修改/etc/fstab文件，在swap分区这行前加 # 禁用掉，保存退出

```
vi /etc/fstab

i      #进入insert 插入模式

:wq   #保存退出
```

```bash
mount -a
# 使 fstab 文件生效
```

重新启动电脑，使用free -m查看分区状态

```
reboot

sudo free -m
```

## 参考文献

- [linux 禁用 swap](https://www.cnblogs.com/whm-blog/p/10920881.html)
- [不用重启也能让fstab生效的一条命令](https://untitled.pw/software/linux/716.html)

