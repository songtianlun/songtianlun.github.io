---
title: "virsh 批量克隆虚拟机"
categories: [ "技术" ]
tags: [ "libvirt" ]
draft: false
slug: "747"
date: "2023-03-12 13:21:17"
---


```bash
# 快速克隆
virt-clone --auto-clone --original vm-euler --name vm-euler-2
```

批量克隆

```bash
for i in {1..64}; do virt-clone --auto-clone --original vm-euler --name vm-euler-$i ; done &
```

## Reference

* [virt-clone(1) - Linux man page](https://linux.die.net/man/1/virt-clone)

