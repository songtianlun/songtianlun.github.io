---
title: "两种终端跑分方法介绍 | Linux 下如何跑分"
date: 2021-11-17T01:20:21Z
description: "介绍两种 Linux 环境下测试硬件性能的方法."
categories: ["技术笔记集","Linux 笔记集"]
tags: ["linux", "unixbench", "geekbach"]
draft: false
---

在 Linux 环境下如何测试 CPU 等硬件和操作系统性能？目前看来常用的有 [UnixBench](https://github.com/kdlucas/byte-unixbench) 和 [GeekBach](https://www.geekbench.com/index.html)，前者源于 Unix，[GPL v2](https://github.com/kdlucas/byte-unixbench/blob/master/LICENSE.txt) 授权下的自由软件，GeekBach 是跨平台的知名跑分软件，但结果需要上传服务器通过网址查看。

下面简单介绍两种跑分软件使用方法。

## UnixBench

UnixBench 是最初的 BYTE UNIX 基准套件，经过多年的更新和修订。测试结果是一个系统指标，而非 CPU、 RAM 或磁盘指标。因此测试结果不仅取决于硬件，还取决于操作系统、库，甚至编译器，评分结果能够反映机器实际运行水平。

首先需要获取源码，方法有很多种：

- [http://byte-unixbench.googlecode.com/files/UnixBench5.1.3.tgz](http://byte-unixbench.googlecode.com/files/UnixBench5.1.3.tgz)
- [https://code.google.com/p/byte-unixbench/](https://code.google.com/p/byte-unixbench/)
- https://github.com/kdlucas/byte-unixbench
- [https://gitee.com/songtianlun/byte-unixbench](https://gitee.com/songtianlun/byte-unixbench)

软件依赖以下软件包，大部分系统中都自带了，若却是可自行安装：

```bash
libx11-dev 
libgl1-mesa-dev 
libxext-dev 
perl  
perl-modules 
make
gcc
```

这里以国内的 gitee 镜像源为例说明使用方法：

```bash
$ git clone https://gitee.com/songtianlun/byte-unixbench
$ cd byte-unixbench
$ cd UnixBench
$ make
$ ./Run
```

这里贴一个我的 Ubuntu 台式机跑分截图：

```bash
   #    #  #    #  #  #    #          #####   ######  #    #   ####   #    #
   #    #  ##   #  #   #  #           #    #  #       ##   #  #    #  #    #
   #    #  # #  #  #    ##            #####   #####   # #  #  #       ######
   #    #  #  # #  #    ##            #    #  #       #  # #  #       #    #
   #    #  #   ##  #   #  #           #    #  #       #   ##  #    #  #    #
    ####   #    #  #  #    #          #####   ######  #    #   ####   #    #

   Version 5.1.3                      Based on the Byte Magazine Unix Benchmark

   Multi-CPU version                  Version 5 revisions by Ian Smith,
                                      Sunnyvale, CA, USA
   January 13, 2011                   johantheghost at yahoo period com

------------------------------------------------------------------------------
   Use directories for:
      * File I/O tests (named fs***) = /home/songtianlun/dev/byte-unixbench/UnixBench/tmp
      * Results                      = /home/songtianlun/dev/byte-unixbench/UnixBench/results
------------------------------------------------------------------------------

Wide character in print at ./Run line 1643.
Wide character in printf at ./Run line 1674.

1 x Dhrystone 2 using register variables  1 2 3 4 5 6 7 8 9 10

1 x Double-Precision Whetstone  1 2 3 4 5 6 7 8 9 10

1 x Execl Throughput  1 2 3

1 x File Copy 1024 bufsize 2000 maxblocks  1 2 3

1 x File Copy 256 bufsize 500 maxblocks  1 2 3

1 x File Copy 4096 bufsize 8000 maxblocks  1 2 3

1 x Pipe Throughput  1 2 3 4 5 6 7 8 9 10

1 x Pipe-based Context Switching  1 2 3 4 5 6 7 8 9 10

1 x Process Creation  1 2 3

1 x System Call Overhead  1 2 3 4 5 6 7 8 9 10

1 x Shell Scripts (1 concurrent)  1 2 3

1 x Shell Scripts (8 concurrent)  1 2 3
Wide character in printf at ./Run line 1574.

12 x Dhrystone 2 using register variables  1 2 3 4 5 6 7 8 9 10

12 x Double-Precision Whetstone  1 2 3 4 5 6 7 8 9 10

12 x Execl Throughput  1 2 3

12 x File Copy 1024 bufsize 2000 maxblocks  1 2 3

12 x File Copy 256 bufsize 500 maxblocks  1 2 3

12 x File Copy 4096 bufsize 8000 maxblocks  1 2 3

12 x Pipe Throughput  1 2 3 4 5 6 7 8 9 10

12 x Pipe-based Context Switching  1 2 3 4 5 6 7 8 9 10

12 x Process Creation  1 2 3

12 x System Call Overhead  1 2 3 4 5 6 7 8 9 10

12 x Shell Scripts (1 concurrent)  1 2 3

12 x Shell Scripts (8 concurrent)  1 2 3
Wide character in printf at ./Run line 1574.

========================================================================
   BYTE UNIX Benchmarks (Version 5.1.3)

   System: iEUCD-DP: GNU/Linux
   OS: GNU/Linux -- 5.11.0-40-generic -- #44~20.04.2-Ubuntu SMP Tue Oct 26 18:07:44 UTC 2021
   Machine: x86_64 (x86_64)
   Language: en_US.utf8 (charmap="UTF-8", collate="UTF-8")
   CPU 0: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 1: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 2: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 3: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 4: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 5: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 6: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 7: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 8: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 9: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 10: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 11: Intel(R) Core(TM) i7-8700 CPU @ 3.20GHz (6400.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   14:50:16 up 1 day,  6:34,  1 user,  load average: 2.20, 1.98, 1.52; runlevel 2021-11-15

------------------------------------------------------------------------
Benchmark Run: 二 11月 16 2021 14:50:16 - 15:18:54
12 CPUs in system; running 1 parallel copy of tests

Dhrystone 2 using register variables       54416494.5 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                     9192.6 MWIPS (9.9 s, 7 samples)
Execl Throughput                               5124.7 lps   (29.8 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        782614.2 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          210870.1 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       2288003.4 KBps  (30.0 s, 2 samples)
Pipe Throughput                             1107551.7 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                 218157.6 lps   (10.0 s, 7 samples)
Process Creation                               8658.4 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                  11185.4 lpm   (60.0 s, 2 samples)
Shell Scripts (8 concurrent)                   6116.3 lpm   (60.0 s, 2 samples)
System Call Overhead                         632358.4 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0   54416494.5   4662.9
Double-Precision Whetstone                       55.0       9192.6   1671.4
Execl Throughput                                 43.0       5124.7   1191.8
File Copy 1024 bufsize 2000 maxblocks          3960.0     782614.2   1976.3
File Copy 256 bufsize 500 maxblocks            1655.0     210870.1   1274.1
File Copy 4096 bufsize 8000 maxblocks          5800.0    2288003.4   3944.8
Pipe Throughput                               12440.0    1107551.7    890.3
Pipe-based Context Switching                   4000.0     218157.6    545.4
Process Creation                                126.0       8658.4    687.2
Shell Scripts (1 concurrent)                     42.4      11185.4   2638.1
Shell Scripts (8 concurrent)                      6.0       6116.3  10193.8
System Call Overhead                          15000.0     632358.4    421.6
                                                                   ========
System Benchmarks Index Score                                        1628.9

------------------------------------------------------------------------
Benchmark Run: 二 11月 16 2021 15:18:54 - 15:49:27
12 CPUs in system; running 12 parallel copies of tests

Dhrystone 2 using register variables      362748151.2 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                    85731.9 MWIPS (11.0 s, 7 samples)
Execl Throughput                              29218.2 lps   (29.6 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks       1434940.2 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          378005.3 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       4404508.3 KBps  (30.0 s, 2 samples)
Pipe Throughput                             7215234.9 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                1435757.8 lps   (10.0 s, 7 samples)
Process Creation                              81282.6 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                   4810.3 lpm   (60.1 s, 2 samples)
Shell Scripts (8 concurrent)                   7468.5 lpm   (60.1 s, 2 samples)
System Call Overhead                        4259945.6 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0  362748151.2  31083.8
Double-Precision Whetstone                       55.0      85731.9  15587.6
Execl Throughput                                 43.0      29218.2   6794.9
File Copy 1024 bufsize 2000 maxblocks          3960.0    1434940.2   3623.6
File Copy 256 bufsize 500 maxblocks            1655.0     378005.3   2284.0
File Copy 4096 bufsize 8000 maxblocks          5800.0    4404508.3   7594.0
Pipe Throughput                               12440.0    7215234.9   5800.0
Pipe-based Context Switching                   4000.0    1435757.8   3589.4
Process Creation                                126.0      81282.6   6451.0
Shell Scripts (1 concurrent)                     42.4       4810.3   1134.5
Shell Scripts (8 concurrent)                      6.0       7468.5  12447.5
System Call Overhead                          15000.0    4259945.6   2840.0
                                                                   ========
System Benchmarks Index Score                                        5674.5
```

可以看到，单核跑分结果 1628.9 ，多核结果 5674.5 。炮分时可以用身边其他设备的分数作对比衡量跑分机器性能。

## GeekBach

**[官网](https://www.geekbench.com/index.html)**下载，跑完后通过地址查看分数即可，这里贴上部分的执行截图：

```bash
$ cd Geekbench-5.4.3-Linux/
$ ls
geekbench5  geekbench.plar  geekbench_x86_64
$ ./geekbench_x86_64 
Geekbench 5.4.3 Tryout : https://www.geekbench.com/

Geekbench 5 requires an active Internet connection when in tryout mode and 
automatically uploads benchmark results to the Geekbench Browser.

Buy a Geekbench 5 license from the Primate Labs Store to enable offline use 
and unlock other features:

  https://store.primatelabs.com/v5

Enter your Geekbench 5 license using the following command line:

  ./geekbench_x86_64 --unlock <email> <key>

  Running Gathering system information
System Information
  Operating System              Ubuntu 20.04.3 LTS
  Kernel                        Linux 5.11.0-40-generic x86_64
  Model                         LENOVO 90M2CTO1WW
  Motherboard                   LENOVO 3176
  BIOS                          LENOVO M2YKT19A

Processor Information
  Name                          Intel Core i7-8700
  Topology                      1 Processor, 6 Cores, 12 Threads
  Identifier                    GenuineIntel Family 6 Model 158 Stepping 10
  Base Frequency                4.60 GHz
  L1 Instruction Cache          32.0 KB x 6
  L1 Data Cache                 32.0 KB x 6
  L2 Cache                      256 KB x 6
  L3 Cache                      12.0 MB

Memory Information
  Size                          15.5 GB

...
```

同样用 Ubuntu 台式机跑了一遍，可以在 [这里](https://browser.geekbench.com/v5/cpu/11025782) 查看跑分结果：

![https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_09-146ca4e3cb743ea3d4.png](https://imagehost-cdn.frytea.com/images/2021/11/17/2021-11-17_09-146ca4e3cb743ea3d4.png)

Linux 环境下我个人倾向于使用开源软件 Unixbench ，可以直接在终端查看结果，无需联网。

至此，本文介绍了 Linux 环境下的跑分方法。

## 参考文献

- [unixbench By 百度百科](https://baike.baidu.com/item/unixbench/896484#reference-[2]-9182257-wrap)
- [Unixbench 一键执行脚本](http://www.vpsmark.com/article-1.html)
- [UnixBench By root Wiki](https://www.root-wiki.de/wiki/UnixBench)
- [kdlucas](https://github.com/kdlucas)/[byte-unixbench](https://github.com/kdlucas/byte-unixbench)
- [非常实用的Linux主机跑分指南](https://post.smzdm.com/p/a27l8pd7/)
- [GeekBach](https://www.geekbench.com/index.html)