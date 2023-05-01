---
title: "Linux 删除 LVM 步骤"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "723"
date: "2023-01-07 19:55:57"
---

以下为删除 LVM 步骤，需要按照顺序执行：

## Step1. 卸载文件系统

卸载 LV 上的文件系统。

a.执行命令 `mount –l` 命令查看目前LV挂载到本地的目录。
b. 执行 `umount` 挂载的目录卸载挂载在LV上的文件系统。

## Step2. 移除 LV

使用 `lvdisplay` 命令查询LV信息，获取需要删除 LV 的 LV name

使用 `lvremove LV name` 命令删除LV

```
# lvremove /dev/vg0/lv0

提示是否删除：

Do you really want to remove active logical volume "lv0"? [y/n]:

输入y 确认后显示如下信息，说明LV删除成功。

Logical volume "lv0" successfully removed
```

## Step3. 移除 VG

 删除VG。

```
# vgremove /dev/vg0
	
显示如下信息，说明PV删除成功。

Labels on physical volume "/dev/sda1" successfully wipedd
```

## Step4. 移除 PG

使用 pvremove 命令移除 PV

最后使用 fdisk 修改 ID

## 参考文献

- [LVM/删除LVM步骤](https://wjw465150.github.io/blog/Linux/my_data/LVM/%E5%88%A0%E9%99%A4LVM%E6%AD%A5%E9%AA%A4/noname.htm)
- [简述Linux删除LVM的过程](https://blog.csdn.net/Gao068465/article/details/121466890/)

