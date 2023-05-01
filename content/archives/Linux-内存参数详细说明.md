---
title: "Linux 内存参数详细说明"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "403"
date: "2020-07-14 18:30:00"
---

在 Linux 下 `free` 命令可以看出系统当前内存状况，附上 `-k` , `-m` , `-g` 可以分别输出对应单位的内存状况：<br />
```bash
Usage:
 free [options]

Options:
 -b, --bytes         show output in bytes
 -k, --kilo          show output in kilobytes
 -m, --mega          show output in megabytes
 -g, --giga          show output in gigabytes
     --tera          show output in terabytes
     --peta          show output in petabytes
```
以某台 Linux Ecs 为例，运行 `free -m ` 后的输出如下：
```bash
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           3789         229         621           0        2937        3261
Swap:             0           0           0
```
这些值都是什么意思呢?<br />
<br />首先看行：<br />`Mem` ：表示物理内存统计<br />`Swap` ：表示硬盘上交换分区的使用情况（这里我们不去关心）<br />注：系统的总物理内存：3789M，但系统当前真正可用的内存并不是第一行 `free`  标记的 621M，它仅代表未被分配的内存。<br />
<br />接下来看列：<br />`total` :总计物理内存的大小。<br />`used` :已使用多大。<br />`free` :可用有多少。<br />`Shared` :多个进程共享的内存总额。<br />`Buffers/cached` :磁盘缓存的大小。

这大致就是 Linux 下内存各项参数的含义，还有更复杂的参数，未来遇到新的场景时再做补充。

---------------------    补充   ---------------------

```bash
cat /proc/meminfo 
MemTotal:        3880404 kB      //总内存
MemFree:          637548 kB      //空闲内存
MemAvailable:    3340664 kB
Buffers:          178760 kB      //给文件的缓冲大小
Cached:          2535436 kB      //高速缓冲存储器使用的大小
SwapCached:            0 kB      //被高速缓冲存储用的交换空间大小
Active:          1370440 kB      //活跃使用中的高速缓冲存储器页面文件大小
Inactive:        1506936 kB      //不经常使用的高速缓冲存储器页面文件大小
Active(anon):     163452 kB
Inactive(anon):      216 kB
Active(file):    1206988 kB
Inactive(file):  1506720 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB      //交换空间总大小
SwapFree:              0 kB      //空闲交换空间
Dirty:                76 kB      //等待被写回到磁盘的大小
Writeback:             0 kB      //正在被写回的大小
AnonPages:        163320 kB      //未映射的页的大小
Mapped:            65100 kB      //设备和文件映射的大小
Shmem:               492 kB      
Slab:             294180 kB      //内核数据结构缓存的大小，可减少申请和释放内存带来的消耗
SReclaimable:     278620 kB      //可收回slab的大小
SUnreclaim:        15560 kB      //不可收回的slab的大小15560 + 278620 = 294180
KernelStack:        2624 kB
PageTables:         5720 kB       //管理内存分页的索引表的大小
NFS_Unstable:          0 kB       //不稳定页表的大小
Bounce:                0 kB 
WritebackTmp:          0 kB
CommitLimit:     1940200 kB
Committed_AS:     586464 kB
VmallocTotal:   34359738367 kB    //虚拟内存大小
VmallocUsed:       14160 kB       //已经被使用的虚拟内存大小
VmallocChunk:   34359715580 kB
HardwareCorrupted:     0 kB
AnonHugePages:     10240 kB
CmaTotal:              0 kB
CmaFree:               0 kB
HugePages_Total:       0         //大页面的分配
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       98176 kB
DirectMap2M:     4096000 kB
DirectMap1G:     2097152 kB
```
<a name="WCSxT"></a>
## 参考文献

- [【查看内存参数详解】Linux free -m 详细说明](https://www.cnblogs.com/chinaifae/articles/10402515.html)
- [#cat /proc/meminfo 详解](https://www.jianshu.com/p/c2a8fb282327)
