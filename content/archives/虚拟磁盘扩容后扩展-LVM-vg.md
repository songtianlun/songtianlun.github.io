---
title: "虚拟磁盘扩容后扩展 LVM vg"
categories: [ "技术" ]
tags: [ "linux","LVM" ]
draft: false
slug: "763"
date: "2023-03-29 18:42:08"
---

## 新空间分区

在使用 fdisk 工具将新增的磁盘空间分配到 LVM PV 上时，您需要按照以下步骤操作：

1. 运行 `fdisk -l` 命令查看系统中当前可用的磁盘和分区信息。
2. 运行 `fdisk /dev/sdX` 命令（其中 sdX 表示要调整大小的磁盘），以编辑该磁盘的分区表。
3. 使用命令 `p` 查看磁盘分区表，确定要修改的分区号码。
4. 使用命令 `n` 创建一个新的分区。按照提示输入分区类型、起始和结束位置等信息即可。请注意，新分区的起始位置必须与现有的 LVM PV 的终止位置相同。
5. 使用命令 `t` 更改新分区的类型。选择类型 8e，以便将其设置为 LVM 分区类型。
6. 使用命令 `w` 将新的分区表写入磁盘，并退出 fdisk 工具。
7. 运行 `pvresize /dev/sdXn` 命令（其中 sdXn 表示新创建的 LVM PV 分区设备文件名）以将新分区添加到现有的 LVM 物理卷中。

完成以上步骤后，您可以使用 lvextend 命令扩展逻辑卷的大小，并使用 resize2fs 命令调整文件系统大小以反映新的逻辑卷大小。

## 扩展 vg

```bash
# 查看 vg
vgs
# 将物理卷添加到存储池
vgextend <vg name> /dev/sdd
```

## 创建 lv

```bash
# 类似这样创建 lv
lvcreate -L 10G -n lv_var_log vg0
mkfs.xfs /dev/mapper/vg0-lv_var_log
```

