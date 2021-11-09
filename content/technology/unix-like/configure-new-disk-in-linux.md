---
title: "Linux 下新硬盘分区、格式化、挂载全流程"
date: 2021-11-09T07:49:13Z
description: "解决无法打开远程服务器 virt-manager 等图形窗口软件的方法."
categories: ["技术笔记集","Linux 笔记"]
tags: ["linux", "fdisk", "mount", "lsblk"]
draft: false
---

互联网上搜索到的 Linux 环境新磁盘配置方法资料质量都不尽如人意，因此自己整理了一份，日常 Linux 磁盘分区时查阅足够了，主要是用到了 `fdisk` 命令。

## `fdisk` 基本使用

新增硬盘后，在linux系统下输入 `fdisk -l` 命令查看当前磁盘信息：

```bash
$ sudo fdisk -l                                                         
...
Disk /dev/ram0: 4.8 GiB, 5120000000 bytes, 10000000 sectors                                   
Units: sectors of 1 * 512 = 512 bytes                                                         
Sector size (logical/physical): 512 bytes / 8192 bytes                                        
I/O size (minimum/optimal): 8192 bytes / 8192 bytes
...
Disk /dev/sda: 465.8 GiB, 500107862016 bytes, 976773168 sectors                               
Disk model: ST500DM002-1BD14                                                                  
Units: sectors of 1 * 512 = 512 bytes                                                         
Sector size (logical/physical): 512 bytes / 4096 bytes                                        
I/O size (minimum/optimal): 4096 bytes / 4096 bytes                                          
Disklabel type: gpt
Disk identifier: C16B3C7C-2596-448D-A4BA-4A7554CD734A                                        

Device     Start       End   Sectors   Size Type                                             
/dev/sda1   2048 976773119 976771072 465.8G Linux filesystem                                 
...

Disk /dev/sdc: 3.7 TiB, 4000787030016 bytes, 7814037168 sectors
Disk model: ST4000NM000A-2HZ
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
...
```

注意看最下面多了一块 `3.7TB` 的硬盘 `sdc` ，下面用命令： `fdisk /dev/sdc` 给新硬盘进行分区：

```bash
$ sudo fdisk /dev/sdc

Welcome to fdisk (util-linux 2.33.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

The old LVM2_member signature will be removed by a write command.

Device does not contain a recognized partition table.
The size of this disk is 3.7 TiB (4000787030016 bytes). DOS partition table format cannot be used on drives for volumes larger than 2199023255040 bytes for 512-byte sectors. Use GUID partition table format (GPT).

Created a new DOS disklabel with disk identifier 0xe461c452.

Command (m for help):
```

进入 `fdisk` 命令，输入 `m` 可以看到该命令的帮助：

```bash
Command (m for help): m                                                              

Help:

  DOS (MBR)
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag

  Generic
   d   delete a partition
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table
   i   print information about a partition

  Misc
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)

  Script
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes
                                                                                             
  Create a new label                                                                         
   g   create a new empty GPT partition table                                                
   G   create a new empty SGI (IRIX) partition table                                         
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table
```

## 创建分区表

进行分区前需要先明确采用分区表的格式，目前主流的有 MBR 和 GPT ，二者的区别可以自行搜索，总结两点：

- MBR 兼容性较好，兼容所有windows，但单盘最大 2TB ；
- GPT 是一种新格式，最大支持18EB的大容量，但并不是所有的windows都支持。

知道上面两点就够了，这里我使用在 Linux 服务器上，不需要考虑 windows 兼容性，此外是一块 4T 盘，因此采用 GPT 进行分区，下面两种方式请根据自己的需要选择。

### 采用GUID(GPT)分区结构

如果使用 GPT 则输入 `g` 创建一张新的空 GPT 格式分区表。

```bash
ommand (m for help): g
Created a new GPT disklabel (GUID: D53735F6-8E14-504D-BDA5-89DB97A770DF).                    
The old LVM2_member signature will be removed by a write command.
```

之后输入 `n` 进行分区，

```bash
Command (m for help): n
```

选择分区表编号，根据提示目前最多可以创建128个分区，保持默认即可：

```bash
Partition number (1-128, default 1):
```

之后选择该分区的起始磁盘数，这里可自定义也可不做选择，如无特殊需求强烈建议选择默认：

```bash
First sector (2048-7814037134, default 2048):
```

接下来是定义该分区的大小，默认使用整个，直接回车：

```bash
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-7814037134, default 7814037134):         
```

创建成功：

```bash
Created a new partition 1 of type 'Linux filesystem' and of size 3.7 TiB.
```

最后记得 `w` 将分区表写入硬盘。

### 采用DOS(MBR)分区结构

如果使用 MBR 则输入 `o` 创建一张新的空 MBR 格式分区表：

```bash
Command (m for help): o
The size of this disk is 3.7 TiB (4000787030016 bytes). DOS partition table format cannot be used on drives for volumes larger than 2199023255040 bytes for 512-byte sectors. Use GUID partition table format (GPT).

Created a new DOS disklabel with disk identifier 0xe3e2291c.
The old LVM2_member signature will be removed by a write command.
```

输入 `n` 进行分区：

```bash
Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
```

> 一块物理硬盘只能有: 一到四个主分区(但其中只能有一个是活动的主分区),或一到三个主分区,和一个扩展分区。分别对应hda1,hda2,hda3,hda4.
Linux 中规定，每一个硬盘设备最多能有 4 个主分区（其中包含扩展分区）构成，任何一个扩展分区都要占用一个主分区号码，也就是在一个硬盘中，主分区和扩展分区一共最多是 4 个。
—— 《**[Linux主分区，扩展分区，逻辑分区的联系和区别](https://www.cnblogs.com/w-wfy/p/8870598.html)**》
> 

总接下来就是一块物理硬盘至少有一个主分区，在这里我只需要一个分区，因此下面将这块硬盘全部划为主分区：

```bash
Select (default p): p
```

之后选择该主分区为**第几个主分区**，由于是新盘，这里输入1来分第一个主分区：

```bash
Partition number (1-4, default 1): 1
```

之后选择该分区的起始磁盘数，这里可自定义也可不做选择，如无特殊需求强烈建议选择默认：

```bash
First sector (2048-4294967295, default 2048):
```

接下来是定义该分区的大小，如果按默认（按回车）即是使用全部可用存储额，也可以是用 `M` 或 `m` 单位结尾的数字(大写M是大B的意思，如果输入1M实际上是X8也就是8m的空间)，这里我保持默认：

```bash
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-4294967294, default 4294967294): 

Created a new partition 1 of type 'Linux' and of size 2 TiB.
```

可以看到即使硬盘是 4TB，采用 MBR 后只能使用其中的 2TB 空间，其他的就浪费了。

最后记得 `w` 将分区表写入硬盘。

## 后续操作（重要）

完成分区后，记得输入 `w` 写入分区：

```bash
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

写入分区表成功后会退出 `fdisk` 交互界面。

再看一眼磁盘信息：

```bash
$ sudo fdisk -l
...
Disk /dev/sdc: 3.7 TiB, 4000787030016 bytes, 7814037168 sectors
Disk model: ST4000NM000A-2HZ
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 74A6DB69-8C91-654F-9F61-A9F38D7F2A34

Device     Start        End    Sectors  Size Type
/dev/sdc1   2048 7814037134 7814035087  3.7T Linux filesystem
...
```

没问题后进行**格式化**，如果没有特殊需求就采用 `ext4` ：

> **第四代扩展文件系统**（英语：Fourth extended filesystem，缩写为**ext4**）是[Linux](https://zh.wikipedia.org/wiki/Linux)系统下的[日志文件系统](https://zh.wikipedia.org/wiki/%E6%97%A5%E8%AA%8C%E6%AA%94%E6%A1%88%E7%B3%BB%E7%B5%B1)，是[ext3](https://zh.wikipedia.org/wiki/Ext3)文件系统的后继版本 —— [ext4 By Wikipedia](https://zh.wikipedia.org/wiki/Ext4)。
> 

```bash
$ sudo mkfs.ext4 /dev/sdc1
mke2fs 1.44.5 (15-Dec-2018)
Creating filesystem with 976754384 4k blocks and 244195328 inodes
Filesystem UUID: 87746749-1922-4682-9b4e-3a67be1d9498
Superblock backups stored on blocks: 
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
        4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968, 
        102400000, 214990848, 512000000, 550731776, 644972544

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information: done
```

## 磁盘挂载

之后将磁盘挂载到需要的位置，一般会选择挂载在 `/mnt` ，我在这里由于涉及到多用户，将硬盘挂载我用户目录下的一个文件夹下：

```bash
sudo mount /dev/sdc1 /home/songtianlun/data
```

直接挂载，重启后配置会丢失，可以修改 `/etc/fstab` 配置文件配置**开机自动挂载**，该配置文件的格式如下：

```bash
$ cat /etc/fstab 
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda7 during installation
UUID=4ae9f128-7cee-48fd-998c-4257e394fa4a /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/sda1 during installation
UUID=A5EB-573A  /boot/efi       vfat    umask=0077      0       1
/swapfile                                 none            swap    sw              0       0

# /dev/sda1
/dev/sda1    /    ext4	rw,relatime	0	1
UUID=4ae9f128-7cee-48fd-998c-4257e394fa4a /               ext4    errors=remount-ro 0       1
```

格式大概是这样的：

```bash
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# 要挂载的分区设备号	挂载点	文件系统类型	挂载选项	是否备份	是否检测
```

如果需要设备号，可以使用 `blkid` 命令获取：

```bash
$ blkid
/dev/sda1: UUID="e943af1e-72cf-4b72-b444-859b9610256f" TYPE="ext4" PARTUUID="161a8c3f-871d-45f6-a25f-466bf16f6035"
```

实测下面这两种都是可以挂载的：

```bash
UUID=4ae9f128-7cee-48fd-998c-4257e394fa4a /               ext4    errors=remount-ro     0       1
/dev/sda1       /               ext4            rw,relatime     0       1
```

写好配置后可以使用该命令生效（挂载 `/etc/fstab` 中所有档案）：

```bash
mount -a
```

下次重启设备就不需要再手动挂载该磁盘了。

## 磁盘状态

使用 `lsblk` 看一下当前硬盘的树形结构：

```bash
$ lsblk 
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 465.8G  0 disk 
└─sda1   8:1    0 465.8G  0 part /
sdc      8:32   0   3.7T  0 disk 
└─sdc1   8:33   0   3.7T  0 part /home/songtianlun/data
```

使用 `df-h` 看看使用率：

```bash
$ df -h
文件系统        容量  已用  可用 已用% 挂载点
/dev/sda1       459G  8.6G  427G    2% /
...
/dev/sdc1       3.6T   89M  3.4T    1% /home/songtianlun/data
```

## 参考文献

- [linux系统下添加新硬盘、分区及挂载全过程详解](https://bbs.huaweicloud.com/blogs/detail/155984)
- [Linux如何为新硬盘分区并挂载(mount)到指定目录下](https://www.4spaces.org/how-to-mount-new-disk-on-linux/)
- [Linux 磁盘管理 By 菜鸟教程](https://www.runoob.com/linux/linux-filesystem.html)
- [Linux下mount挂载新硬盘和开机自动挂载](https://www.cnblogs.com/sirdong/p/11969148.html)
- [硬盘分区时GPT和MBR的区别/选择](https://www.cnblogs.com/EasonJim/p/6056121.html)
- [Linux主分区，扩展分区，逻辑分区的联系和区别](https://www.cnblogs.com/w-wfy/p/8870598.html)
- [Linux学习16-磁盘分区MSDOS与GPT的区别](https://blog.csdn.net/free050463/article/details/81876521)
- [全局唯一标识分区表（GPT） By Wikipediua](https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8)
- [分区表 By Wikipedia](https://zh.wikipedia.org/wiki/%E5%88%86%E5%8C%BA%E8%A1%A8)
- [ext4 By Wikipedia](https://zh.wikipedia.org/wiki/Ext4)