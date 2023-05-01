---
title: "计算 Linux CPU 利用率"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "404"
date: "2020-07-15 18:01:00"
---


在 Linux 系统中的 `/proc/stat` 文件中存储了CPU 活动的信息，该文件中的所有值都是从系统启动开始累计到当前时刻。不同内核版本中该文件的格式可能不大一致，以下通过实例来说明数据该文件中各字段的含义。<br />

```bash
$ cat /proc/stat 
cpu  1594121 406 1239990 396233700 162305 0 3641 0 0 0
cpu0 761327 194 604191 198151599 83873 0 1789 0 0 0
cpu1 832793 211 635798 198082101 78432 0 1852 0 0 0
intr 985115307 38 10 0 0 58 0 3 0 0 0 0 36 15 0 0 0 0 0 0 0 0 0 0 0 0 2473171 42 0 862348 0 57 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt 1896726060
btime 1592793001
processes 63407
procs_running 1
procs_blocked 0
softirq 191297272 3 90057502 70 10686595 0 0 34 51485476 0 39067592
```
第一行的数值表示的是CPU总的使用情况，所以我们只要用第一行的数字计算就可以了。下表解析第一行各数值的含义：

| 参数 | 解析（单位：jiffies） | 当前值 |
| :---: | :---: | :---: |
| name | 设备名。 | cpu |
| user | 从系统启动开始累计到当前时刻，处于用户态的运行时间，不包含 nice值为负进程。 | 1594121 |
| nice | 从系统启动开始累计到当前时刻，nice值为负的进程所占用的CPU时间。 | 406 |
| system | 从系统启动开始累计到当前时刻，处于核心态的运行时间。 | 1239990 |
| idle | 从系统启动开始累计到当前时刻，除IO等待时间以外的其它等待时间。 | 396233700 |
| iowait | 从系统启动开始累计到当前时刻，IO等待时间。 | 162305 |
| irq | 从系统启动开始累计到当前时刻，硬中断时间。 | 0 |
| softirq | 从系统启动开始累计到当前时刻，软中断时间。 | 3641 |
| stealstolen | 从系统启动开始累积到当前时刻，在虚拟环境运行时花费在其他操作系统的时间。 | 0 |
| guest | 从系统启动开始累积到当前时刻，在Linux内核控制下的操作系统虚拟cpu花费的时间。 | 0 |
| guest_nice | 从系统启动开始累积到当前时刻，在Linux内核控制下的操作系统虚拟cpu花费在nice进程上的时间。 | 0 |



> 注：jiffies是内核中的一个全局变量，用来记录自系统启动一来产生的节拍数，在 `linux` 中，一个节拍大致可理解为操作系统进程调度的最小时间片，不同 `linux` 内核可能值有不同，通常在 `1ms` 到 `10ms` 之间


<br />`totalCpuTime`  =  `user`  +  `nice` + `system` + `idle` + `iowait` + `irq` + `softirq` + `stealstolen` + `guest` + `guest_nice` <br />cpu使用率计算：

1. 请在一段时间内（推荐：必须大于0s，小于等于1s），获取两次cpu时间分配信息。
1. 计算两次的cpu总时间：total_2 - total_1
1. 计算两次的cpu剩余时间：idle_2 - idle_1
1. 计算两次的cpu使用时间：used = (total_2 - total_1) - (idle_2 - idle_1)
1. cpu使用率 = 使用时间 / 总时间 _ 100% = used / total _ 100%
```bash
us: User time       -> %us = (User + Nice) / totalCpuTime * 100%
sy: System time     -> %sy = (System + Hard Irq + SoftIRQ) / totalCpuTime
ni: Nick time       -> %ni = (Nice) / totalCpuTime * 100%
id: Idle time       -> %id = (Idle) / totalCpuTime * 100%
wa: Waiting time    -> %wa = (Waiting) / totalCputTime * 100%
hi: Hard Irq time   -> %hi = (Hard Irq) / totalCpuTime * 100%
si: SoftIrq time    -> %si = (SoftRQ) / totalCpuTime * 100%
st: Steal time      -> %st = (Steal) / totalCputTime * 100%
```
<a name="0m6Fn"></a>
## 程序实现（C）
首先定义一个结构体存放获取到的信息：
```c
struct CPU_INFO
{
    char name[10];
    unsigned int user;
    unsigned int nice;
    unsigned int system;
    unsigned int idle;
    unsigned int iowait;
    unsigned int irq;
    unsigned int softirq;
    unsigned int stealstolen;
    unsigned int guest;
    unsigned int guest_nice;
};
```
定义两个函数用于获取信息和计算：
```c
void  get_occupy (Cpu_info *o)
{
    FILE *fd;
    char buff[MAXBUFSIZE];
    fd = fopen ("/proc/stat", "r"); //这里只读取stat文件的第一行及cpu总信息，如需获取每核cpu的使用情况，请分析stat文件的接下来几行。
    fgets (buff, sizeof(buff), fd);
    // printf("get thr cpu info: %s", buff);
    sscanf (buff, "%s  %u %u %u %u %u %u %u %u %u %u", o->name, &o->user, &o->nice, &o->system, &o->idle, &o->iowait, &o->irq, &o->softirq, &o->stealstolen, &o->guest, &o->guest_nice);
    // printf("name=%s, user=%d, nice=%d, system=%d, idle=%d, iowait=%d, irq=%d, softirq=%d, stralstolen=%d, guest=%d, guest_nice=%d\n", o->name, o->user, o->nice, o->system, o->idle, o->iowait, o->irq, o->softirq, o->stealstolen, o->guest, o->guest_nice);
    fclose(fd);
}

float  cal_occupy (Cpu_info *o, Cpu_info *n)
{
    int ototal, ntotal;
    int oused, nused;

    ototal = (o->user + o->nice + o->system + o->idle + o->iowait + o-> irq + o-> softirq + o->stealstolen + o->guest + o->guest_nice);
    ntotal = (n->user + n->nice + n->system + n->idle + n->iowait + n-> irq + n-> softirq + n->stealstolen + n->guest + n->guest_nice);

    oused = ototal - o->idle;
    nused = ntotal - n->idle;

    // printf("ototal time: %d\n", ototal);
    // printf("ntotal time: %d\n", ntotal);

    // printf("oused time: %d\n", oused);
    // printf("nused time: %d\n", nused);

    return (100.0 * (nused - oused) / (ntotal - ototal));
}
```
最后主程序调用即可：
```c
Cpu_info ocpu,ncpu;
    printf("Start the new thread to monitor key system values.\n");
    while(1)
    {
        //获取cpu使用率
        get_occupy(&ocpu);
        sleep(1);
        get_occupy(&ncpu);
        printf("CPU Usage(%): %8.4f\n", cal_occupy(&ocpu, &ncpu));
    }
```
<a name="12p5M"></a>
## 参考文献

- [LINUX CPU利用率计算](https://blog.csdn.net/turkeyzhou/article/details/6709953)
- [Linux_CPU_Usage_Analysis.pdf](https://www.yuque.com/attachments/yuque/0/2020/pdf/376635/1594805660806-b531c61d-f10c-4b6b-86c2-021e7532c4b9.pdf?_lake_card=%7B%22uid%22%3A%221594805660617-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2020%2Fpdf%2F376635%2F1594805660806-b531c61d-f10c-4b6b-86c2-021e7532c4b9.pdf%22%2C%22name%22%3A%22Linux_CPU_Usage_Analysis.pdf%22%2C%22size%22%3A239710%2C%22type%22%3A%22application%2Fpdf%22%2C%22ext%22%3A%22pdf%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22lw671%22%2C%22card%22%3A%22file%22%7D)
- [Linux CPU、内存、磁盘、使用率计算](https://www.jianshu.com/p/541d8efcbb78)
