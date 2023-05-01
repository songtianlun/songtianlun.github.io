---
title: "Proxmox VE (PVE) 销毁集群"
categories: [ "技术" ]
tags: [ "PVE" ]
draft: false
slug: "628"
date: "2022-04-14 10:43:42"
---

当 pve 集群某节点出现问题时，可能导致所有主机均无法连接到 WEB 管理后台，此时可以尝试以下方法将正常节点的集群状态销毁，在需要时重建集群，从而保证仍在线节点可用：

```bash
systemctl stop pve-cluster corosync
pmxcfs -l
rm /etc/corosync/*
rm /etc/pve/corosync.conf
killall pmxcfs
systemctl start pve-cluster
```

## 参考文献

- **[Proxmox VE - Login failed. Please try again. By PVE Forum](https://forum.proxmox.com/threads/proxmox-ve-login-failed-please-try-again.55488/post-437733)**