---
title: "PVE 批量创建、配置虚拟机 IP、网卡、启停及销毁"
categories: [ "技术" ]
tags: [ "linux","PVE" ]
draft: false
slug: "737"
date: "2023-02-08 08:46:10"
---

```bash
# 从模版批量派生，100 虚拟机仅需2 min
for i in {001..128}; do qm clone 336 11$i --name stl-ceph-bare-node$i --pool stl-ceph-cluster2; done

# 使用 cloud-init 批量配置 ip，需在模版提前装好 cloud-init 软件包并添加设备
for i in {1..128}; do num=`echo $i | awk '{printf("%03d",$0)}'`; qm set 10${num}  --ipconfig1 ip=10.24.88.$i/24,gw=10.24.88.254; done

# 批量断开网络接口
for i in {002..128}; do qm set 10$i --net0 virtio,link_down=1; done

# 批量开机
for i in {001..128}; do qm start 10$i; done

# 批量销毁
for i in {001..111}; do qm destroy 10$i; done
```

