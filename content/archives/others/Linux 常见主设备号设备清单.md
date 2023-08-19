---
title: 'Linux 常见主设备号设备清单'
date: '2023-05-18T02:34:59.073Z'
tags: ['Linux']
created: '2023-05-18T02:16:09.405Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:05, 27th 五月 2023 -->

# Linux 常见主设备号设备清单

在Linux系统中，设备通常通过主设备号和次设备号来标识。主设备号用于区分设备的大类，例如硬盘、字符设备等；次设备号用于在同一大类设备中区分不同的设备。以下是一些常见设备类型及其固定的主设备号：

|      设备类型     | 主设备号 |                  设备描述                 |
|---------------|------|---------------------------------------|
|    RAM disk   |   1  |           虚拟磁盘设备，其存储空间位于RAM中          |
|      TTY      |   4  |          控制台设备，如 tty1、tty2 等          |
| ttyS (串行端口设备) |   4  |         串行端口设备，如 ttyS0、ttyS1 等        |
|   lp (打印机设备)  |   6  |           打印机设备，如 lp0、lp1 等           |
|      硬盘设备     |   8  |      SATA、SCSI或USB硬盘，如 sda、sdb 等      |
|  loop device  |   7  |    用于挂载文件系统镜像文件的设备，如 loop0、loop1 等    |
|      软盘设备     |   2  |            软盘设备，如 fd0、fd1 等           |
|     cdrom     |  11  |        光盘驱动器设备，如 cdrom、cdrom1 等       |
|   sound card  |  14  | 音频设备，如 /dev/dsp（数字音频）、/dev/mixer（混音器） |

请注意，不同的Linux发行版和不同的设备驱动可能会有所不同，上述设备号只是在大部分系统中的常见设定。另外，对于磁盘设备，次设备号通常用于表示不同的磁盘或者同一磁盘的不同分区。例如，在 `/dev/sda` 设备中，`sda1`、`sda2` 等表示 `sda` 磁盘的不同分区，它们的主设备号相同，但次设备号不同。

更多设备号定义可以在 Linux 源码仓库 `Documentation/admin-guide/devices.txt` 路径下找到，比如 [这里](https://github.com/torvalds/linux/blame/master/Documentation/admin-guide/devices.txt)。

## Nvme

NVMe (Non-Volatile Memory Express) 是一种连接和访问闪存存储设备的接口规范，特别是通过 PCIe (Peripheral Component Interconnect Express) 接口的 SSDs (Solid State Drives)。

在 Linux 系统中，NVMe 设备通常具有 /dev/nvmeXnY 格式的设备文件名，其中 X 是控制器的编号，Y 是命名空间的编号。

NVMe 设备的主设备号是在设备驱动程序注册到内核时由内核动态分配的，因此，不同的系统，内核版本或配置可能会有所不同。在许多现代 Linux 系统中，NVMe 设备的主设备号可能是 259。

插入一块 NVMe 到 linux ，看到如下设备

```bash
$ ls -l /dev/nvme0*
crw------- 1 root root 243, 0  5月  4 12:01 /dev/nvme0
brw-rw---- 1 root disk 259, 0  5月  4 12:01 /dev/nvme0n1
brw-rw---- 1 root disk 259, 1  5月  4 12:01 /dev/nvme0n1p1
brw-rw---- 1 root disk 259, 2  5月  4 12:01 /dev/nvme0n1p2
brw-rw---- 1 root disk 259, 3  5月  4 12:01 /dev/nvme0n1p3
```

从上面的命令回显，你看到了一个 NVMe 控制器设备（/dev/nvme0）以及一个 NVMe 磁盘设备（/dev/nvme0n1）和该磁盘设备的三个分区（/dev/nvme0n1p1, /dev/nvme0n1p2, /dev/nvme0n1p3）。这里的每个设备文件对应一个不同的设备或设备分区。

以下是这些设备文件的详细解释：

* `/dev/nvme0`：这是 NVMe 控制器设备。它的主设备号是 243，表示它是一个字符设备（由前面的 'c' 表示）。这个设备文件允许系统进行低级别的、直接的 NVMe 操作，如发出 NVMe 命令或获取设备状态。大多数用户和应用程序不会直接使用这个设备文件，而是使用下面的块设备文件。
* `/dev/nvme0n1`：这是 NVMe 磁盘设备。它的主设备号是 259，表示它是一个块设备（由前面的 'b' 表示）。这个设备文件对应整个 NVMe 磁盘，你可以通过这个设备文件读写磁盘的任何位置，或者在其上创建文件系统。然而，如果磁盘已经被分区，通常会使用分区设备文件而不是这个设备文件。
* `/dev/nvme0n1p1, /dev/nvme0n1p2, /dev/nvme0n1p3`：这些是 NVMe 磁盘设备的分区。它们的主设备号也是 259，表示它们也是块设备。每个设备文件对应磁盘上的一个分区，你可以在这些设备文件上读写对应分区的数据，或者在其上创建文件系统。每个分区设备文件的次设备号（0, 1, 2）对应其分区的编号。

总的来说，这些设备文件提供了不同级别的访问方式，使得系统、应用程序和用户能够按需访问 NVMe 设备和其分区。

## Linux 源码定义

设备号的分配在早期的 Linux 内核版本中是静态的，设备号的列表可以在内核源代码的 `Documentation/admin-guide/devices.txt` 文件中找到。

但在现代的 Linux 内核中，许多设备的设备号是动态分配的，它们并不会直接在内核源代码中定义。例如，NVMe 设备的设备号是由内核在运行时动态分配的，这在内核源代码中没有明确的定义。不过，你仍然可以在 NVMe 驱动的源代码中找到关于如何注册设备和处理设备号的代码。NVMe 驱动的源代码通常位于 `drivers/nvme/host` 目录下。

特定的设备驱动程序，例如 SCSI 或者 NVMe，通常会在它们的代码中调用 `register_blkdev` 函数来注册一个块设备。这个函数会返回一个设备号，这就是设备在 `/dev` 目录下的设备文件的设备号。

例如，在 NVMe 驱动程序的代码中，你可能会看到类似以下的代码：

```c
nvme_major = register_blkdev(0, "nvme");
```

在这个例子中，`register_blkdev` 函数的第一个参数是 0，这意味着让内核动态分配一个设备号。函数的返回值就是分配给设备的主设备号。

然而，查看驱动程序的源代码并不能直接告诉你在特定系统上的设备号是什么，因为这取决于内核在运行时的动态分配。如果你需要知道特定设备的设备号，最准确的方式是在运行中的系统上查看 `/dev` 目录下的设备文件，例如使用 `ls -l` 命令。