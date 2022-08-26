---
title: "计算 Linux 内存使用率方法及C实现"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "405"
date: "2020-07-16 15:21:33"
---


<br />通过获取Linux中的 `/proc/stat` 文件中的内容可以获取系统内存的详细信息：
```bash
# cat /proc/meminfo 
MemTotal:        3880404 kB
MemFree:         3182248 kB
MemAvailable:    3396580 kB
Buffers:           39588 kB
Cached:           355616 kB
SwapCached:            0 kB
Active:           318708 kB
Inactive:         252380 kB
Active(anon):     176120 kB
Inactive(anon):      248 kB
Active(file):     142588 kB
Inactive(file):   252132 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB
SwapFree:              0 kB
Dirty:                 0 kB
Writeback:             0 kB
AnonPages:        175940 kB
Mapped:            54184 kB
Shmem:               488 kB
Slab:              62040 kB
SReclaimable:      48712 kB
SUnreclaim:        13328 kB
KernelStack:        2672 kB
PageTables:         6080 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     1940200 kB
Committed_AS:     615340 kB
VmallocTotal:   34359738367 kB
VmallocUsed:       14160 kB
VmallocChunk:   34359715580 kB
HardwareCorrupted:     0 kB
AnonHugePages:     36864 kB
CmaTotal:              0 kB
CmaFree:               0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       53120 kB
DirectMap2M:     3092480 kB
DirectMap1G:     3145728 kB
```
各字段含义见下表：

| 指标 | 作用 |
| --- | --- |
| MemTotal | 总内存大小 |
| MemFree | 空闲内存大小 |
| buffers/cached | 磁盘缓存的大小 |
| MemAvailable | 可用内存大小 |
| SwapTotal | 可用的swap空间的总的大小。 |
| SwapFree | 剩余swap空间的大小。 |
| Dirty | 需要写入磁盘的内存区大小。 |
| Writeback | 正在被写回磁盘的大小。 |
| AnonPages | 未映射页的内存大小。 |
| Mapped | 设备和文件等映射的大小。 |
| Slab | 内核数据结构slab的大小，可以减少申请和释放内存带来的消耗。 |

> 注Buffers 和 Cached的区别
> 

> Buffers 是指用来给块设备做的缓冲大小，他只记录文件系统的metadata以及 tracking in-flight pages. cached 是用来给文件做缓冲。
> 

> buffers 是值存储目录里面有什么内容，权限等等。 而cached直接用来记忆我们打开的文件，比如先后执行两次命令#man X ,你就可以明显的感觉到第二次的开打的速度快很多。 而buffers随时都在增加，比如先后两次使用ls /dev后，就会发现第二次执行的速度会较第一次快。 这就是buffers/chached的区别。

- 以内核态来讲， `buffers`  和 `cached`  是已经被使用的，可用内存就是 `MemAvailable`
```
MemUsed  = MemTotal - MemFree
```

- 以用户态来讲，`buffers`  和 `cached`  可被分配。
```
free = MemFree + Buffers + Cahched
```

- 本着监控应用对物理内存使用情况的目的采集，计算方法：
```
MemUsedPrec = 100*(MemTotal - MemFree - Buffers - Cahched)/MemTotal
```


<a name="Y0hU5"></a>
## 黑洞
![](https://cdn.nlark.com/yuque/0/2020/png/376635/1594882565362-cc7dfec0-7ca2-4591-ab34-1d2b6ff5ef07.png#align=left&display=inline&height=92&margin=%5Bobject%20Object%5D&originHeight=245&originWidth=400&size=0&status=done&style=none&width=150)    经过一番计算，发现 `/proc/meminfo` 中的数据无论如何无法与 `free` 中的内容对应，尤其是在 `used` 部分。经过一番信息检索，得出一个结论， `free` 命令中的数值是按照 `/proc/meminfo` 中的数据，根据一定算法计算所得，并且新版旧版的 `free` 所输出内容也不一致。因此按照 `proc/meminfo` 中的数据计算内存使用率是更加精确的。<br />进一步探索，会发现 Linux 存在一个内存黑洞，在某博主博客找到如下描述：
> 追踪Linux系统的内存使用一直是个难题，很多人试着把能想到的各种内存消耗都加在一起，kernel text、kernel modules、buffer、cache、slab、page table、process RSS…等等，却总是与物理内存的大小对不上，这是为什么呢？因为Linux kernel并没有滴水不漏地统计所有的内存分配，kernel动态分配的内存中就有一部分没有计入/proc/meminfo中。
> —— 《[/PROC/MEMINFO之谜](http://linuxperf.com/?p=142)》

综上原因，计算Linux内存使用率也就没有必要去细扣每个数值的含义了，大致了解如下内容即可：

- MemTotal：总内存大小
- MemFree： 空闲内存大小
- buffers/cached： 磁盘缓存的大小
- MemAvailable： 可用内存大小

而计算内存使用率只需按照这个方法计算：
```bash
实际可挪用的内存数: free+cache+buffer,
实际可使用的内存数: used-cache-buffer (total-free-cache-buffer)。
内存占用率：(total-available) / total * 100 
```
<a name="CIYtd"></a>
## C实现
同样的， 先定义一个结构体用于存放相关数据：
```bash
struct MEM_INFO
{
    unsigned int total;
    unsigned int free;
    unsigned int buffers;
    unsigned int cached;
    unsigned int swap_cached;
    unsigned int swap_total;
    unsigned int swap_free;
    unsigned int available;
};
typedef struct MEM_INFO Mem_info;
```
之后定义函数，用于获取及计算内存数据：
```bash
void  get_mem_occupy (Mem_info *o)
{
    FILE* fpMemInfo = fopen("/proc/meminfo", "r");
	if (NULL == fpMemInfo)
	{
		return ;
	}
	int i = 0;
	int value;
	char name[1024];
	char line[1024];
	int nFiledNumber = 2;
	int nMemberNumber = 5;
	while (fgets(line, sizeof(line) - 1, fpMemInfo))
	{
		if (sscanf(line, "%s%u", name, &value) != nFiledNumber)
		{
			continue;
		}
		if (0 == strcmp(name, "MemTotal:"))
		{
			++i;
			o->total = value;
		}
		else if (0 == strcmp(name, "MemFree:"))
		{
			++i;
			o->free = value;
		}
        else if (0 == strcmp(name, "MemAvailable:"))
		{
			++i;
			o->available = value;
		}
		else if (0 == strcmp(name, "Buffers:"))
		{
			++i;
			o->buffers = value;
		}
		else if (0 == strcmp(name, "Cached:"))
		{
			++i;
			o->cached = value;
		}
		if (i == nMemberNumber)
		{
			break;
		}
	}
    // system("free");
    // system("cat /proc/meminfo");
    // printf("MemTotal      : %d\n",o->total);
    // printf("MemFree       : %d\n",o->free);
    // printf("MemAvailable  : %d\n",o->available);
    // printf("MemBuffers    : %d\n",o->buffers);
    // printf("MemCached     : %d\n",o->cached);
    // printf("MemSwapCached : %d\n",o->swap_cached);
    // printf("MemSwapTotal  : %d\n",o->swap_total);
    // printf("MemSwapFree   : %d\n",o->swap_free);
	fclose(fpMemInfo);
}

float cal_mem_occupy(Mem_info *o)
{
    return (100.0 * (o->total - o->available) / o->total);
}
```
最后调用即可：
```bash
    Mem_info omem;
    while(1)
    {
        // printf("-------------------- Mem occupy -------------------\n");
        get_mem_occupy(&omem);
        printf("Mem Usage(%): %8.4f\n", cal_mem_occupy(&omem));
        printf("\n");
    }
```
<a name="EFj9x"></a>
## 参考文献

- [Linux CPU、内存、磁盘、使用率计算](https://www.jianshu.com/p/541d8efcbb78)
- [正确计算linux系统内存使用率](https://my.oschina.net/lvhuizhenblog/blog/864710)
- [/PROC/MEMINFO之谜](http://linuxperf.com/?p=142)
- [free命令的正确读取方式](https://blog.csdn.net/u012375924/article/details/79721211)
- [通过/proc/meminfo实时获取系统内存使用情况](https://langzi989.github.io/2016/12/19/%E9%80%9A%E8%BF%87-proc-meminfo%E5%AE%9E%E6%97%B6%E8%8E%B7%E5%8F%96%E7%B3%BB%E7%BB%9F%E5%86%85%E5%AD%98%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5/)
- [编程获取Linux的内存占用和CPU使用率](https://whoisnian.com/2020/01/30/%E7%BC%96%E7%A8%8B%E8%8E%B7%E5%8F%96Linux%E7%9A%84%E5%86%85%E5%AD%98%E5%8D%A0%E7%94%A8%E5%92%8CCPU%E4%BD%BF%E7%94%A8%E7%8E%87/)
- [Linux下系统内存使用率的计算方法](http://www.jackieathome.net/archives/519.html)
- [C语言监控linux系统 cpu 内存 IO 磁盘 网络信息 通过json发送到指定服务器](https://blog.csdn.net/qq_37421368/article/details/86243958)
- [C语言的字符串数组](https://blog.csdn.net/qq_34804120/article/details/80516245)
