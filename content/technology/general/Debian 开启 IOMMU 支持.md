---
title: 'Debian 开启 IOMMU 支持'
date: '2023-07-22T02:11:50.826Z'
tags: ['Debian']
created: '2023-07-17T08:27:01.653Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '1'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 10:11, 22nd 七月 2023 -->

# Debian 开启 IOMMU 支持

```
vi /etc/default/grub
```

找到 `GRUB_CMDLINE_LINUX_DEFAULT="quiet"` 修改为

* intel: `GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"`
* AMD: `GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on"`

保存并退出，输入以下命令：

```
update-grub
```

最后重启生效。

## References

* [充分利用手头小机器，从Debian开始搭建aio(Debian11+PVE7+OMV)傻瓜式教程](https://post.smzdm.com/p/a5d30l8x/)
* [PCI(e) Passthrough - PVE](https://pve.proxmox.com/wiki/PCI(e)_Passthrough)