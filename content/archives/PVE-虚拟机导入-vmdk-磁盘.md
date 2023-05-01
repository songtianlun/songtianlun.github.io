---
title: "PVE 虚拟机导入 vmdk 磁盘"
categories: [ "技术" ]
tags: [ "PVE" ]
draft: false
slug: "736"
date: "2023-02-01 09:45:31"
---

1. 先把磁盘镜像上传到 pve 服务器中，若空间不足可挂载本地存储；
2. 把 `vmdk` 转为 `qcow2`

```text
qemu-img convert -O qcow2 test.vmdk test.qcow2
```

注：`-O` 是大写的字母 `O`

3. 使用 `qm importdisk` 命令导入

```bash
$ qm importdisk  <vmid> <images-name> <storage pool>  --format=<disk-fs> 

# vmid：vm的id 例如102
# images-name：磁盘镜像的名字
# storage poll: 存储磁盘镜像的位置，一般写存储的名称，如pve01data
# disk-fs: 磁盘镜像格式  raw/vmdk/qcow2
```

## 参考文献

- [vmware vmdk虚拟机导入到proxmox ve](https://zhuanlan.zhihu.com/p/467105568)
- [import VM from ESXi 6.0 - Proxmox Forums](https://forum.proxmox.com/threads/import-vm-from-esxi-6-0.107151/)
- [Migration of servers to Proxmox VE](https://pve.proxmox.com/wiki/Migration_of_servers_to_Proxmox_VE#Physical-to-Virtual_.28P2V.29)



