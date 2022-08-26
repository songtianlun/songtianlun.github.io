---
title: "Linux 下 Sysstat 系统监控程序详解"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "402"
date: "2020-07-14 13:58:00"
---

`Sysstat` 包包含许多商业单位共有的各种实用程序，用于监控系统性能和使用活动:

- `iostat`  (1) 报告设备、分区和网络文件系统的CPU统计和硬盘吞吐效率的数据。 # 核心工具
- `mpstat`  (1) 报告单个或组合处理器相关的统计数据。
- `pidstat`  (1) 报告Linux任务 (进程) 的统计信息: I/O、CPU、内存等。
- `tapestat`  (1) 报告连接到系统的磁带驱动器的统计信息。
- `cifsiostat`  (1) 报告CIFS统计。
- `sysstat`  (5) 只是sysstat配置文件的手动页面，给出了sysstat命令使用的环境变量的含义。

`Sysstat` 还包含您可以通过 `cron` 或 `systemd` 计划收集和记录性能和活动数据的工具:

- `sar`  (1) 收集、报告和保存系统活动信息 (CPU、内存、磁盘、中断、网络接口、TTY、内核表等)。 # 数据统计核心工具
- `sadc`  (8) 是系统活动数据收集器，用作sar的后端。
- `sa1`  (8) 在系统活动每日数据文件中收集并存储二进制数据。它是sadc的前端，设计为从cron或systemd运行。
- `sa2`  (8) 撰写每日活动总结报告。它是从cron或systemd运行的sar的前端。
- `sadf`  (1) 以多种格式 (CSV、XML、JSON等) 显示由sar收集的数据，并可用于与其他程序的数据交换。该命令还可用于为sar使用SVG (可伸缩矢量图形) 格式收集的各种活动绘制图形。
<a name="zPQl4"></a>
## 1 性能及运行状况监控
<a name="ubSyn"></a>
### 1.1 isstat
使用方法： `iostat [ options ] [ <interval> [ <count> ] ]` 
```bash
$ iostat --help
Usage: iostat [ options ] [ <interval> [ <count> ] ]
Options are:
[ -c ] [ -d ] [ -h ] [ -k | -m ] [ -N ] [ -s ] [ -t ] [ -V ] [ -x ] [ -y ] [ -z ]
[ { -f | +f } <directory> ] [ -j { ID | LABEL | PATH | UUID | ... } ]
[ --dec={ 0 | 1 | 2 } ] [ --human ] [ -o JSON ]
[ [ -H ] -g <group_name> ] [ -p [ <device> [,...] | ALL ] ]
[ <device> [...] | ALL ]
```
参数释义：<br />`-c`  : 仅显示cpu的状态<br />`-d`  : 仅显示存储设备的状态，不可以和-c一起使用<br />`-k`  : 默认显示的是读入读出的block信息，用-k可以改成KB大小来显示 -m<br />`-t`  : 显示日期<br />`-p device | ALL`  : device为某个设备或者某个分区，如果使用ALL，就表示要显示所有分区和设备的信息<br />`-x`  : 显示扩展状态，显示更多内容<br />举例：每一秒钟打印一次CPU状态，打印3次
```bash
$ iostat -c 1 3
Linux 3.10.0-957.21.3.el7.x86_64 (frytea-dev-test)      07/14/2020      _x86_64_        (2 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.40    0.00    0.31    0.00    0.00   99.29



avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    0.50    0.00    0.00   99.50



avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.50    0.00    0.00    0.00    0.00   99.50
```
距离：显示详细信息
```bash
iostat -x
Linux 3.10.0-957.21.3.el7.x86_64 (frytea-dev-test)      07/14/2020      _x86_64_        (2 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.40    0.00    0.31    0.00    0.00   99.29

Device            r/s     rkB/s   rrqm/s  %rrqm r_await rareq-sz     w/s     wkB/s   wrqm/s  %wrqm w_await wareq-sz     d/s     dkB/s   drqm/s  %drqm d_await dareq-sz     f/s f_await  aqu-sz  %util
vda              0.01      0.14     0.00   0.06    1.19    16.99    0.65      5.88     0.21  24.79    7.65     9.02    0.00      0.00     0.00   0.00    0.00     0.00    0.00    0.00    0.00   0.01
```
说明：<br />`rrqm/s` : 每秒进行 merge 的读操作数目。即 delta(rmerge)/s<br />`wrqm/s` : 每秒进行 merge 的写操作数目。即 delta(wmerge)/s<br />`r/s` : 每秒完成的读 I/O 设备次数。即 delta(rio)/s<br />`w/s` : 每秒完成的写 I/O 设备次数。即 delta(wio)/s<br />`rsec/s` : 每秒读扇区数。即 delta(rsect)/s<br />`wsec/s` : 每秒写扇区数。即 delta(wsect)/s<br />`rkB/s` : 每秒读K字节数。是 rsect/s 的一半，因为每扇区大小为512字节。(需要计算)<br />`wkB/s` : 每秒写K字节数。是 wsect/s 的一半。(需要计算)<br />`avgrq-sz` : 平均每次设备I/O操作的数据大小 (扇区)。delta(rsect+wsect)/delta(rio+wio)<br />`avgqu-sz` : 平均I/O队列长度。即 delta(aveq)/s/1000 (因为aveq的单位为毫秒)。<br />`await` : 平均每次设备I/O操作的等待时间 (毫秒)。即 delta(ruse+wuse)/delta(rio+wio)<br />`svctm` : 平均每次设备I/O操作的服务时间 (毫秒)。即 delta(use)/delta(rio+wio)<br />`%util` : 一秒中有百分之多少的时间用于 I/O 操作，或者说一秒中有多少时间 I/O 队列是非空的。<br />`delta(use)/s/1000`  (因为use的单位为毫秒)如果 %util 接近 100%，说明产生的I/O请求太多，I/O系统已经满负荷，该磁盘可能存在瓶颈。<br />`idle` 小于70% IO压力就较大了,一般读取速度有较多的wait.  #CPU空闲等待时间
<a name="HpTYv"></a>
### 1.2 mpstat
使用方法：mpstat [ options ] [ <interval> [ <count> ] ]
```bash
$ mpstat --help
Usage: mpstat [ options ] [ <interval> [ <count> ] ]
Options are:
[ -A ] [ -n ] [ -u ] [ -V ]
[ -I { SUM | CPU | SCPU | ALL } ] [ -N { <node_list> | ALL } ]
[ --dec={ 0 | 1 | 2 } ] [ -o JSON ] [ -P { <cpu_list> | ALL } ]
```
举例：查看所有处理器统计数据
```bash
$ mpstat -P ALL 1 3
Linux 3.10.0-957.21.3.el7.x86_64 (frytea-dev-test)      07/14/2020      _x86_64_        (2 CPU)

11:35:24 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:35:25 AM  all    0.50    0.00    0.50    0.00    0.00    0.00    0.00    0.00    0.00   99.00
11:35:25 AM    0    1.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00
11:35:25 AM    1    0.00    0.00    1.00    0.00    0.00    0.00    0.00    0.00    0.00   99.00

11:35:25 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:35:26 AM  all    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
11:35:26 AM    0    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00
11:35:26 AM    1    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00    0.00  100.00

11:35:26 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:35:27 AM  all    0.00    0.00    0.99    0.00    0.00    0.00    0.00    0.00    0.00   99.01
11:35:27 AM    0    0.00    0.00    0.99    0.00    0.00    0.00    0.00    0.00    0.00   99.01
11:35:27 AM    1    0.00    0.00    0.99    0.00    0.00    0.00    0.00    0.00    0.00   99.01

Average:     CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
Average:     all    0.17    0.00    0.50    0.00    0.00    0.00    0.00    0.00    0.00   99.33
Average:       0    0.33    0.00    0.33    0.00    0.00    0.00    0.00    0.00    0.00   99.33
Average:       1    0.00    0.00    0.67    0.00    0.00    0.00    0.00    0.00    0.00   99.33
```
说明：

- `%user`     显示在用户级别(application)运行使用 CPU 总时间的百分比。
- `%nice`     显示在用户级别，用于nice操作，所占用 CPU 总时间的百分比。
- `%system`  在核心级别(kernel)运行所使用 CPU 总时间的百分比。
- `%iowait`  显示用于等待I/O操作占用 CPU 总时间的百分比。
- `%irq`   显示在interval时间段内，硬中断占用的CPU总时间。
- `%soft`   显示在interval时间段内，软中断占用的CPU总时间。
- `%steal`   管理程序(hypervisor)为另一个虚拟进程提供服务而等待虚拟CPU的百分比。
- `%idle`     显示 CPU 空闲时间占用CPU总时间的百分比。
- `intr/s`  在internal时间段里，每秒CPU接收的中断的次数。
<a name="1eyEV"></a>
### 1.3 pidstat
```bash
pidstat -dl
Linux 3.10.0-957.21.3.el7.x86_64 (frytea-dev-test)      07/14/2020      _x86_64_        (2 CPU)

12:01:54 PM   UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s  Command
12:01:54 PM     0         1      0.11      0.58      0.05  /usr/lib/systemd/systemd --switched-root --system --deserialize 22 
12:01:54 PM     0        48      0.00      0.00      0.00  kworker/u4:1
12:01:54 PM     0       226      0.00      0.00      0.00  kworker/u4:2
12:01:54 PM     0       328      0.00      0.85      0.00  jbd2/vda1-8
12:01:54 PM     0       397      0.00      1.95      0.00  /usr/lib/systemd/systemd-journald 
12:01:54 PM     0       416      0.01      0.00      0.00  /usr/lib/systemd/systemd-udevd 
12:01:54 PM     0       496      0.00      0.01      0.00  /sbin/auditd 
12:01:54 PM     0       594      0.00      0.00      0.00  /usr/lib/systemd/systemd-logind 
12:01:54 PM   999       598      0.00      0.00      0.00  /usr/lib/polkit-1/polkitd --no-debug 
12:01:54 PM    81       599      0.00      0.00      0.00  /usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation 
12:01:54 PM   998       616      0.00      0.00      0.00  /usr/sbin/chronyd 
12:01:54 PM     0       659      0.00      0.00      0.00  /usr/sbin/atd -f 
12:01:54 PM     0       673      0.00      0.00      0.00  /sbin/agetty --keep-baud 115200,38400,9600 ttyS0 vt220 
12:01:54 PM     0       895      0.00      0.00      0.00  /usr/bin/python2 -Es /usr/sbin/tuned -l -P 
12:01:54 PM     0       898      0.00      0.04      0.00  /usr/sbin/rsyslogd -n 
12:01:54 PM     0      1110      0.01      1.80      0.02  /usr/sbin/sshd -D 
12:01:54 PM     0     13001      0.00      0.00      0.00  /usr/local/aegis/AliSecGuard/AliSecGuard 
12:01:54 PM     0     13646      0.00      0.01      0.00  /usr/sbin/crond -n 
12:01:54 PM     0     17624      0.00      0.02      0.00  /usr/local/aegis/aegis_update/AliYunDunUpdate 
12:01:54 PM     0     17651      0.00      0.00      0.00  /usr/local/aegis/aegis_client/aegis_10_83/AliYunDun 
12:01:54 PM     0     23766      0.00      0.00      0.00  /usr/sbin/aliyun-service 
12:01:54 PM     0     23924      0.00      0.02      0.00  -bash
```
<a name="SJKCX"></a>
### 1.4 tapestat
Tapestat报告提供连接到系统的每个磁带驱动器的统计信息。<br />使用方法： `tapestat [ options ] [ <interval> [ <count> ] ]` 
```bash
$ tapestat --help
Usage: tapestat [ options ] [ <interval> [ <count> ] ]
Options are:
[ --human ] [ -k | -m ] [ -t ] [ -V ] [ -y ] [ -z ]
[root@frytea-dev-test ~]# tapestat -k
```
<a name="Yg4vz"></a>
### 1.5 cifsiostat
CIFS报告提供每个装载的CIFS文件系统的统计信息。<br />使用方法： `cifsiostat [ options ] [ <interval> [ <count> ] ]` 
```bash
$ cifsiostat --HELO
Usage: cifsiostat [ options ] [ <interval> [ <count> ] ]
Options are:
[ --dec={ 0 | 1 | 2 } ] [ --human ] [ -h ] [ -k | -m ] [ -t ] [ -V ]
```
<a name="EN4ma"></a>
## 2 数据收集及统计
<a name="gOL2L"></a>
### 2.1 sar
sar 工具比较强大，既能收集系统CPU、硬盘、动态数据，也能显示动态显示，更能查看二进制数据文件；sar 的应用比较多，而且也比较复杂，数据更为精确。我们只了解一下常用的内容就行，大多数内容我们了解就行。
```bash
sar --help
Usage: sar [ options ] [ <interval> [ <count> ] ]
Main options and reports (report name between square brackets):
        -B      Paging statistics [A_PAGE]
        -b      I/O and transfer rate statistics [A_IO]
        -d      Block devices statistics [A_DISK]
        -F [ MOUNT ]
                Filesystems statistics [A_FS]
        -H      Hugepages utilization statistics [A_HUGE]
        -I { <int_list> | SUM | ALL }
                Interrupts statistics [A_IRQ]
        -m { <keyword> [,...] | ALL }
                Power management statistics [A_PWR_...]
                Keywords are:
                CPU     CPU instantaneous clock frequency
                FAN     Fans speed
                FREQ    CPU average clock frequency
                IN      Voltage inputs
                TEMP    Devices temperature
                USB     USB devices plugged into the system
        -n { <keyword> [,...] | ALL }
                Network statistics [A_NET_...]
                Keywords are:
                DEV     Network interfaces
                EDEV    Network interfaces (errors)
                NFS     NFS client
                NFSD    NFS server
                SOCK    Sockets (v4)
                IP      IP traffic      (v4)
                EIP     IP traffic      (v4) (errors)
                ICMP    ICMP traffic    (v4)
                EICMP   ICMP traffic    (v4) (errors)
                TCP     TCP traffic     (v4)
                ETCP    TCP traffic     (v4) (errors)
                UDP     UDP traffic     (v4)
                SOCK6   Sockets (v6)
                IP6     IP traffic      (v6)
                EIP6    IP traffic      (v6) (errors)
                ICMP6   ICMP traffic    (v6)
                EICMP6  ICMP traffic    (v6) (errors)
                UDP6    UDP traffic     (v6)
                FC      Fibre channel HBAs
                SOFT    Software-based network processing
        -q [ <keyword> [,...] | PSI | ALL ]
                System load and pressure-stall statistics
                Keywords are:
                LOAD    Queue length and load average statistics [A_QUEUE]
                CPU     Pressure-stall CPU statistics [A_PSI_CPU]
                IO      Pressure-stall I/O statistics [A_PSI_IO]
                MEM     Pressure-stall memory statistics [A_PSI_MEM]
        -r [ ALL ]
                Memory utilization statistics [A_MEMORY]
        -S      Swap space utilization statistics [A_MEMORY]
        -u [ ALL ]
                CPU utilization statistics [A_CPU]
        -v      Kernel tables statistics [A_KTABLES]
        -W      Swapping statistics [A_SWAP]
        -w      Task creation and system switching statistics [A_PCSW]
        -y      TTY devices statistics [A_SERIAL]
```
参数说明：<br />`-A`  显示所有历史数据，通过读取/var/log/sar目录下的所有文件，并把它们分门别类的显示出来；<br />`-b`  通过设备的I/O中断读取设置的吞吐率；<br />`-B`  报告内存或虚拟内存交换统计；<br />`-c`  报告每秒创建的进程数；<br />`-d`  报告物理块设备（存储设备）的写入、读取之类的信息，如果直观一点，可以和p参数共同使用，-dp<br />`-f`  从一个二进制的数据文件中读取内容，比如 sar -f filename<br />`-i`  interval 指定数据收集的时间，时间单位是秒；<br />`-n`  分析网络设备状态的统计，后面可以接的参数有 DEV、EDEV、NFS、NFSD、SOCK等。比如-n DEV<br />`-o`  把统计信息写入一个文件，比如 -o filename ；<br />`-P`  报告每个处理器应用统计，用于多处理器机器，并且启用SMP内核才有效；<br />`-p`  显示友好设备名字，以方便查看，也可以和-d和-n 参数结合使用，比如 -dp 或-np<br />`-r`  内存和交换区占用统计；<br />`-R` <br />`-t`  这个选项对从文件读取数据有用，如果没有这个参数，会以本地时间为标准 读出；<br />`-u`  报告CPU利用率的参数；<br />`-v`  报告inode,文件或其它内核表的资源占用信息；<br />`-w`  报告系统交换活动的信息； 每少交换数据的个数；<br />`-W`  报告系统交换活动吞吐信息；<br />`-x`  用于监视进程的，在其后要指定进程的PID值；<br />`-X`  用于监视进程的，但指定的应该是一个子进程ID<br />举例：查看网络设备的网络吞吐量
```bash
# sar -n DEV 2 4 
Linux 3.10.0-957.21.3.el7.x86_64 (frytea-dev-test)      07/14/2020      _x86_64_        (2 CPU)

12:00:50 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
12:00:52 PM      eth0      2.50      2.50      0.14      1.28      0.00      0.00      0.00      0.00
12:00:52 PM        lo      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00

12:00:52 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
12:00:54 PM      eth0      1.50      1.00      0.09      0.33      0.00      0.00      0.00      0.00
12:00:54 PM        lo      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00

12:00:54 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
12:00:56 PM      eth0      2.00      1.50      0.12      0.36      0.00      0.00      0.00      0.00
12:00:56 PM        lo      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00

12:00:56 PM     IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
12:00:58 PM      eth0      1.00      1.00      0.07      0.33      0.00      0.00      0.00      0.00
12:00:58 PM        lo      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00

Average:        IFACE   rxpck/s   txpck/s    rxkB/s    txkB/s   rxcmp/s   txcmp/s  rxmcst/s   %ifutil
Average:         eth0      1.75      1.50      0.11      0.58      0.00      0.00      0.00      0.00
Average:           lo      0.00      0.00      0.00      0.00      0.00      0.00      0.00      0.00
```
参数释义：<br />IFACE：设备名；<br />rxpck/s:每秒收到的包；<br />rxbyt/s：每秒收到的所有包的数量 ；<br />txbyt/s：每秒发送的所有包的数量 ；<br />txbyt/s：每秒发送的所有包的大小；<br />rxcmp/s：每秒收到数的据压缩包的数量；<br />txcmp/s :每秒传输的数据压缩包的数据；<br />rxmcst/s: 每秒收到的多播的包数量；
<a name="aRFx8"></a>
### 2.2 sadc
`sadc`  位于 `/usr/local/lib64/sa/` 目录中（Centos 7.6），如果你没有设置可执行路径，要用绝对路径来运行。<br />sdac只是一个搜集写入工具，并不直接回显于屏幕上。sadc 是把数据写在一个二进制的文件中，如果想查看数据内容，需要用sadf工具来显示。<br />使用方法： `/usr/local/lib64/sa/sadc [ options ] [ <interval> [ <count> ] ] [ <outfile> ]` 
```bash
$ /usr/local/lib64/sa/sadc --help
Usage: /usr/local/lib64/sa/sadc [ options ] [ <interval> [ <count> ] ] [ <outfile> ]
Options are:
[ -C <comment> ] [ -D ] [ -F ] [ -f ] [ -L ] [ -V ]
[ -S { INT | DISK | IPV6 | POWER | SNMP | XDISK | ALL | XALL } ]
```
举例： `/usr/local/lib/sa/sadc -`  （后面的“－”是必须的，少了会出乱码和报错），则会输出数据到 `/var/log/sa/` 目录下的一个文件中。
<a name="bMblR"></a>
### 2.3 sa1
Sa1 命令被设计为由cron命令自动启动。
<a name="xq4EY"></a>
### 2.4 sa2
Sa2 命令接受sar命令的大多数标志和参数。<br />Sa2 命令被设计为由cron命令自动启动。
<a name="murO5"></a>
### 2.5 sadf
sadf 能从二进制文件中提取sar所收集的数据；显示的格式不如sar直观，其主要用于导出为csv、xml等格式的文件，方便导入数据库或excel等程序.
<a name="Owm2P"></a>
## 参考文献

- [Systat Document](http://sebastien.godard.pagesperso-orange.fr/)
- [Linux下sysstat安装使用图文详解](https://www.linuxidc.com/Linux/2019-08/160082.htm)
