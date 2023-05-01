---
title: "PVE 删除/离开集群"
categories: [ "技术" ]
tags: [ "PVE" ]
draft: false
slug: "753"
date: "2023-03-16 19:34:59"
---

## 删除节点

```bash
cd /etc/pve/nodes
rm -rf ***
pvecm delnode ***
```

## 离开集群

```
# 离线的节点操作
systemctl stop pve-cluster.service
systemctl stop corosync.service
pmxcfs -l
rm /etc/pve/corosync.conf
rm -rf /etc/corosync/*
killall pmxcfs
systemctl start pve-cluster.service
cd /etc/pve/nodes
ls
rm -rf /etc/pve/nodes/***
pvecm delnode ***

 
# 正常的节点操作：
cd /etc/pve/nodes
rm -rf ***
pvecm delnode ***
```

## Reference

* [PVE Proxmox Virtual Environment 学习笔记（五）集群节点故障](https://www.cnblogs.com/jackadam/p/15763362.html)

