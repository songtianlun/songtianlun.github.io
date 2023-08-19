---
title: 'iperf3 网络性能测试'
date: '2023-07-31T07:46:53.829Z'
tags: ['iperf3']
created: '2023-07-31T07:42:33.062Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '3'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 12:15, 19th 八月 2023 -->

# iperf3 网络性能测试

## 快速测试

### 经典测试

```bash
# 服务端执行
$ iperf3 -s

# 客户端执行
$ iperf3 -c 192.168.1.*
# 默认单线程 tcp 测试，使用 5201 端口
```

### 进行上下行带宽测试（TCP双向传输）

```bash
#iperf3 -c 192.168.0.120 -d -t 60
```

### 测试多线程TCP吞吐量

如果没有指定发送方式，iPerf客户端只会使用单线程。

```bash
#iperf3 -c 192.168.0.120 -P 30 -t 60
```

### 测试多线程UDP吞吐量

如果没有指定发送方式，iPerf客户端只会使用单线程。

```bash
#iperf3 -u -c  192.168.1.1 -b 5M -P 30 -t 60
```

### 测试上下行带宽（UDP双向传输）

```bash
#iperf3 -u -c  192.168.1.1 -b 100M -d -t 60
```

## iperf3常用参数（测试足够了）

（1）-s,–server：iperf服务器模式，默认启动的监听端口为5201，eg：iperf -s

（2）-c,–client host：iperf客户端模式，host是server端地址，eg：iperf -c 222.35.11.23

（3）-i，–interval：指定每次报告之间的时间间隔，单位为秒，eg：iperf3 -c 192.168.12.168 -i 2

（4）-p，–port：指定服务器端监听的端口或客户端所连接的端口，默认是5001端口。

（5）-u，–udp：表示采用UDP协议发送报文，不带该参数表示采用TCP协议。

（6）-l，–len：设置读写缓冲区的长度，单位为 Byte。TCP方式默认为8KB，UDP方式默认为1470字节。通常测试 PPS 的时候该值为16，测试BPS时该值为1400。

（7）-b，–bandwidth [K|M|G]：指定UDP模式使用的带宽，单位bits/sec，默认值是1 Mbit/sec。

（8）-t，–time：指定数据传输的总时间，即在指定的时间内，重复发送指定长度的数据包。默认10秒。

（9）-A：CPU亲和性，可以将具体的iperf3进程绑定对应编号的逻辑CPU，避免iperf进程在不同的CPU间调度。

## References

* [iperf3使用方法详解](https://zhuanlan.zhihu.com/p/314727150)