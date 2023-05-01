---
title: "Linux 中 /proc 文件系统内容详述"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "400"
date: "2020-07-14 09:06:35"
---

Linux 下的 `/proc` 文件系统中提供了许多有用的信息，除了基本的CPU使用率、版本号等，你甚至还可以在这里直接看到内核的输出。下面这张表，简单列举 `/proc` 中文件的含义：

| 文件名 | 含义 |
| --- | --- |
| num | 这些数字表示系统当前正在运行进程的进程号，里面包含对应进程相关的多个信息文件。<br /> |
| acpi | ACPI（高级配置和电源接口）支持操作系统设置和控制各个硬件部件。 ACPI 可以取代 PnP 和 APM。 它提供有关电池、AC 适<br />配器、温度、风扇和系统事件（例如 “合上机盖” 或 “电池电量低”）的信息。 |
| buddyinfo | 用于诊断内存碎片问题的相关信息文件； |
| bus |  |
| cgroups | cgroups(Control Groups) 是 linux 内核提供的一种机制，这种机制可以根据需求把一系列系统任务及其子任务整合(或分隔)到按资源划分等级的不同组内，从而为系统资源管理提供一个统一的框架。简单说，cgroups 可以限制、记录任务组所使用的物理资源。本质上来说，cgroups 是内核附加在程序上的一系列钩子(hook)，通过程序运行时对资源的调度触发相应的钩子以达到资源追踪和限制的目的。 |
| cmdline | 在启动时传递至内核的相关参数信息，这些信息通常由lilo或grub等启动管理工具进行传递； |
| consoles |  |
| cpuinfo | 处理器的相关信息的文件； |
| crypto | 系统上已安装的内核使用的密码算法及每个算法的详细信息列表； |
| devices | 系统已经加载的所有块设备和字符设备的信息，包含主设备号和设备组（与主设备号对应的设备类型）名； |
| diskstats | 每块磁盘设备的磁盘I/O统计信息列表；（内核2.5.69以后的版本支持此功能） |
| dma | 每个正在使用且注册的ISA DMA通道的信息列表； |
| driver | 内核当前支持的执行域（每种操作系统独特“个性”）信息列表； |
| execdomains | Linux内核当前支持的execution domains |
| fb | 帧缓冲设备列表文件，包含帧缓冲设备的设备号和相关驱动信息； |
| filesystems | 当前被内核支持的文件系统类型列表文件，被标示为nodev的文件系统表示不需要块设备的支持；通常mount一个设备时，如果没有指定文件系统类型将通过此文件来决定其所需文件系统的类型； |
| fs |  |
| interrupts | X86或X86_64体系架构系统上每个IRQ相关的中断号列表；多路处理器平台上每个CPU对于每个I/O设备均有自己的中断号； |
| iomem | 每个物理设备上的记忆体（RAM或者ROM）在系统内存中的映射信息； |
| ioports | 当前正在使用且已经注册过的与物理设备进行通讯的输入-输出端口范围信息列表；如下面所示，第一列表示注册的I/O端口范围，其后表示相关的设备； |
| irq | 为每个注册的irq创建一个以irq编号为名字的子目录 |
| kallsyms | 内核符号表（kernel symbol table）作用，变量名或者函数名组成，每一项是符号和地址的序对，就像域名和ip地址 |
| kcore | 系统使用的物理内存，以ELF核心文件（core file）格式存储，其文件大小为已使用的物理内存（RAM）加上4KB；这个文件用来检查内核数据结构的当前状态，因此，通常由GBD通常调试工具使用，但不能使用文件查看命令打开此文件； |
| keys | 如果一个进程希望了解它可以查看哪些密钥，它可以通过读取 /proc/keys 获得这些信息。在配置内核时，必须启用这个文件，因为它允许任何用户列出密钥数据库。  |
| key-users |  |
| kmsg | 此文件用来保存由内核输出的信息，通常由/sbin/klogd或/bin/dmsg等程序使用，不要试图使用查看命令打开此文件； |
| kpagecount |  |
| kpageflags |  |
| loadavg | 保存关于CPU和磁盘I/O的负载平均值，其前三列分别表示每1秒钟、每5秒钟及每15秒的负载平均值，类似于uptime命令输出的相关信息；第四列是由斜线隔开的两个数值，前者表示当前正由内核调度的实体（进程和线程）的数目，后者表示系统当前存活的内核调度实体的数目；第五列表示此文件被查看前最近一个由内核创建的进程的PID； |
| locks | 保存当前由内核锁定的文件的相关信息，包含内核内部的调试数据；每个锁定占据一行，且具有一个惟一的编号；如下输出信息中每行的第二列表示当前锁定使用的锁定类别，POSIX表示目前较新类型的文件锁，由lockf系统调用产生，FLOCK是传统的UNIX文件锁，由flock系统调用产生；第三列也通常由两种类型，ADVISORY表示不允许其他用户锁定此文件，但允许读取，MANDATORY表示此文件锁定期间不允许其他用户任何形式的访问； |
| mdstat | 保存RAID相关的多块磁盘的当前状态信息； |
| meminfo | 系统中关于当前内存的利用状况等的信息，常由free命令使用；可以使用文件查看命令直接读取此文件，其内容显示为两列，前者为统计属性，后者为对应的值； |
| misc |  |
| modules | 当前装入内核的所有模块名称列表，可以由lsmod命令使用，也可以直接查看； |
| mounts -> self/mounts | 在内核2.4.29版本以前，此文件的内容为系统当前挂载的所有文件系统，在2.4.19以后的内核中引进了每个进程使用独立挂载名称空间的方式，此文件则随之变成了指向/proc/self/mounts（每个进程自身挂载名称空间中的所有挂载点列表）文件的符号链接；/proc/self是一个独特的目录，后文中会对此目录进行介绍； |
| mtrr |  |
|  net -> self/net |  |
| pagetypeinfo |  |
| partitions | 块设备每个分区的主设备号（major）和次设备号（minor）等信息，同时包括每个分区所包含的块（block）数目； |
| sched_debug |  |
| schedstat |  |
| scsi |  |
| self -> 22742 |  |
| slabinfo | 在内核中频繁使用的对象（如inode、dentry等）都有自己的cache，即slab pool，而/proc/slabinfo文件列出了这些对象相关slap的信息；详情可以参见内核文档中slapinfo的手册页； |
| softirqs |  |
| stat | 实时追踪自系统上次启动以来的多种统计信息；如下所示，其中，<br />“cpu”行后的八个值分别表示以1/100（jiffies）秒为单位的统计值（包括系统运行于用户模式、低优先级用户模式，运系统模式、空闲模式、I/O等待模式的时间等）；<br />“intr”行给出中断的信息，第一个为自系统启动以来，发生的所有的中断的次数；然后每个数对应一个特定的中断自系统启动以来所发生的次数；<br />“ctxt”给出了自系统启动以来CPU发生的上下文交换的次数。<br />“btime”给出了从系统启动到现在为止的时间，单位为秒；<br />“processes (total_forks) 自系统启动以来所创建的任务的个数目；<br />“procs_running”：当前运行队列的任务的数目；<br />“procs_blocked”：当前被阻塞的任务的数目； |
| swaps | 当前系统上的交换分区及其空间利用信息，如果有多个交换分区的话，则会每个交换分区的信息分别存储于/proc/swap目录中的单独文件中，而其优先级数字越低，被使用到的可能性越大；下面是作者系统中只有一个交换分区时的输出信息； |
| sys | 与 /proc下其它文件的“只读”属性不同的是，管理员可对/proc/sys子目录中的许多文件内容进行修改以更改内核的运行特性，事先可以使用“ls -l”命令查看某文件是否“可写入”。写入操作通常使用类似于“echo  DATA > /path/to/your/filename”的格式进行。需要注意的是，即使文件可写，其一般也不可以使用编辑器进行编辑。<br />/proc/sys/debug 子目录<br />此目录通常是一空目录；<br />/proc/sys/dev 子目录<br />为系统上特殊设备提供参数信息文件的目录，其不同设备的信息文件分别存储于不同的子目录中，如大多数系统上都会具有的/proc/sys/dev /cdrom和/proc/sys/dev/raid（如果内核编译时开启了支持raid的功能） 目录，其内存储的通常是系统上cdrom和raid的相关参数信息文件。 |
|  sysrq-trigger |  |
| sysvipc |  |
|  timer_list |  |
| timer_stats |  |
| tty |  |
| uptime | 系统上次启动以来的运行时间，如下所示，其第一个数字表示系统运行时间，第二个数字表示系统空闲时间，单位是秒； |
| version | 当前系统运行的内核版本号，在作者的RHEL5.3上还会显示系统安装的gcc版本，如下所示； |
| vmallocinfo |  |
| vmstat | 当前系统虚拟内存的多种统计数据，信息量可能会比较大，这因系统而有所不同，可读性较好；下面为作者机器上输出信息的一个片段；（2.6以后的内核支持此文件） |
| zoneinfo | 内存区域（zone）的详细信息列表，信息量较大 |

<a name="8nynb"></a>
## 参考文献

- [深入理解linux系统下proc文件系统内容](https://www.cnblogs.com/cute/archive/2011/04/20/2022280.html)
- [使用 /proc 文件系统来访问 Linux 内核的内容](https://www.ibm.com/developerworks/cn/linux/l-proc.html)
- [/proc/acpi详细介绍](https://blog.csdn.net/ye1223/article/details/85039029)
- [linux cgroups 简介](https://www.cnblogs.com/sparkdev/p/8296063.html)
- [Linux之proc详解](https://www.cnblogs.com/defias/p/3428330.html)
- [/proc/irq和/proc/interrupts详解](https://blog.csdn.net/ye1223/article/details/85050498)
- [内核符号表和kallsyms](https://blog.csdn.net/metasearch/article/details/38685859)
- [管理密钥的内核 API](http://abcdxyzk.github.io/posts/19/)

我的博客即将同步至腾讯云 + 社区，邀请大家一同入驻：https://cloud.tencent.com/developer/support-plan?invite_code=21yjpwt8mhhc0