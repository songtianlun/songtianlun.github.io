---
title: "PVE 手动创建 lvm-thin-pool 加入多磁盘"
categories: [ "技术" ]
tags: [ "PVE" ]
draft: false
slug: "748"
date: "2023-03-12 13:21:21"
---

新建存储池，包括多块硬盘

```bash
lsblk
pvcreate /dev/sdb /dev/sdc /dev/sdd
vgcreate thin-pool /dev/sdb /dev/sdc /dev/sdd
lvcreate -T thin-pool/data -l +99%FREE
pvesm add lvmthin thin-pool-data --content rootdir,images --thinpool data --vgname thin-pool
```

## Reference

* [adding a disk and set it as lvm-thin: help needed, please](https://forum.proxmox.com/threads/adding-a-disk-and-set-it-as-lvm-thin-help-needed-please.111724/)

