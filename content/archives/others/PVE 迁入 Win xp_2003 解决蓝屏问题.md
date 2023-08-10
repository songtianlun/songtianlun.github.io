---
title: 'PVE 迁入 Win xp/2003 解决蓝屏问题'
date: '2023-05-12T02:47:52.758Z'
tags: ['PVE']
created: '2023-05-11T09:01:18.729Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:05, 27th 五月 2023 -->

# PVE 迁入 Win xp/2003 解决蓝屏问题

Windows xp/2003 或是 Windows Server 2003 之类的老旧系统使用迁移工具迁入 PVE 集群后，即使配置了 IDE 总线磁盘，还是可能出现蓝屏问题。

![](https://imagehost-cdn.frytea.com//images/2023/05/11/s74gtk-2.png)

该问题给出两种解决方案，第一种为论坛提供，第二种则是衍生于第一种，避免了直接修改源主机注册表。

## 方案一：

根据 Proxmox VE 论坛的一篇 [旧贴](https://forum.proxmox.com/threads/windows-2003-server-0x000007b.7585/post-43388)：

> 0x000007b means that the controller has changed. I didn't try to move SCSI-based systems, but with IDE ones it helped to install the default IDE driver, then reboot the system on the old host, then shut it down and clone the image.
> 
> 0x000007b 表示控制器已更改。我没有尝试移动基于SCSI的系统，但对于基于IDE的系统，安装默认的IDE驱动程序有所帮助，然后在旧主机上重新启动系统，然后关闭它并克隆映像。

这里提到特别需要注意的一件事就是 [mergeide.reg](https://pve.proxmox.com/wiki/Migration_of_servers_to_Proxmox_VE#Prepare_Windows)，该注册表脚本用于**注入了 IDE 驱动程序**。

在迁移 windows server 2003 到 PVE 时需要遵循的基本步骤如下：

1. Run mergeide.reg on the physical machine | 在物理机上运行mergeide.reg。
2. Turn off physical machine, do not boot it up. | 关闭物理机器，不要启动它。
3. Copy the physical machine disks to the virtual disks | 将物理机的磁盘复制到虚拟磁盘。
4. Turn on vm using ide for the boot drive it should boot up fine since you previously injected ide drivers using mergeide.reg | 使用 IDE 启动驱动器打开虚拟机，由于之前已经使用 mergeide.reg 注入了 IDE 驱动程序，因此它应该可以正常启动。

> As others mentioned you should change to virtio after you get the vm to work.
> 
> 正如其他人提到的那样，当成功运行虚拟机后，应该更改为virtio。

## 方案二

如果担心直接修改源主机注册表，导致主机损坏，可以尝试该方案。

步骤大致如下：

1. 使用迁移工具将源机器迁移到超融合集群内；
2. 使用 [微PE](<https://www.wepe.com.cn/download.html>) 启动该虚拟机；
3. 在 PE 环境中运行方案一给出的注册表脚本  [mergeide.reg](<https://pve.proxmox.com/wiki/Migration_of_servers_to_Proxmox_VE#Prepare_Windows>)；
4. 尝试使用磁盘启动。

> 为方便使用，我将 `微PE` 和 `mergeide.reg` 制作成两个 ISO，只需要加载两个 ISO ，并将 `微 PE` 作为第一启动顺序即可。
> 
> 在这里下载：
> 
> - <https://res.frytea.com/OS/WePE>

## References

* [windows 2003 server 0x000007b](https://forum.proxmox.com/threads/windows-2003-server-0x000007b.7585/)
* [Migration of servers to Proxmox VE](https://pve.proxmox.com/wiki/Migration_of_servers_to_Proxmox_VE#Prepare_Windows)
* [Proxmox VE – Paravirtualized Drivers & Windows 2003 virtual machines – Part 1](http://c-nergy.be/blog/?p=1032)
* [Migrate windows server 2003 vmware to proxmox](https://forum.proxmox.com/threads/migrate-windows-server-2003-vmware-to-proxmox.45148/)
* [Paravirtualized Block Drivers for Windows](https://pve.proxmox.com/wiki/Paravirtualized_Block_Drivers_for_Windows)
* [Windows 2003 32bits cpu usage peaks / freeze due to hardware interrupts](https://forum.proxmox.com/threads/windows-2003-32bits-cpu-usage-peaks-freeze-due-to-hardware-interrupts.15862/)