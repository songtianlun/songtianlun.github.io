---
title: "macOS 使用 arping 扫描 ip 冲突"
categories: [ "技术" ]
tags: [ "linux","macOS","arping" ]
draft: false
slug: "644"
date: "2022-11-07 14:51:47"
---

最近工作网络不稳定，多个常用 IP 出现冲突，就连 DHCP 获取到的 IP 也会立刻冲突，原因等待相关人员去解决，今天简单记录 macOS 下 IP 冲突检测的原因。

一般检查 IP 是否被占用的方法是使用 ping
```bash
$ ping 119.29.29.29
PING 119.29.29.29 (119.29.29.29): 56 data bytes
64 bytes from 119.29.29.29: icmp_seq=0 ttl=50 time=14.477 ms
64 bytes from 119.29.29.29: icmp_seq=1 ttl=50 time=15.033 ms
64 bytes from 119.29.29.29: icmp_seq=2 ttl=50 time=15.330 ms
^C
--- 119.29.29.29 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 14.477/14.947/15.330/0.354 ms
```

但是这种方法看不到ip冲突，如果出现多个机器占用同个 IP，可以利用arp协议查一下 MAC 地址：

```bash
# macOS 下这样安装
$ brew install arping
# 使用 alias 定义快速使用别名
$ alias arping='sudo /opt/homebrew/opt/arping/sbin/arping'
```

另外发现 m1 下的 `brew` 安装 `arping` 默认不会进入 `PATH` ，因此在这里手动设定一个别名，方便使用。

之后扫描，如果出现 IP 冲突，可以看到有多个 MAC 地址回应：

```bash
$ sudo /opt/homebrew/opt/arping/sbin/arping 192.168.5.79
Password:
ARPING 192.168.5.79
60 bytes from 6a:f2:77:bd:bf:16 (192.168.5.79): index=0 time=463.000 usec
60 bytes from 6a:29:af:20:80:7f (192.168.5.79): index=1 time=1.002 msec
60 bytes from 6a:f2:77:bd:bf:16 (192.168.5.79): index=2 time=582.000 usec
60 bytes from 6a:29:af:20:80:7f (192.168.5.79): index=3 time=1.182 msec
60 bytes from 6a:f2:77:bd:bf:16 (192.168.5.79): index=4 time=658.000 usec
60 bytes from 6a:29:af:20:80:7f (192.168.5.79): index=5 time=1.117 msec
60 bytes from 6a:f2:77:bd:bf:16 (192.168.5.79): index=6 time=772.000 usec
60 bytes from 6a:29:af:20:80:7f (192.168.5.79): index=7 time=1.096 msec
^C
--- 192.168.5.79 statistics ---
4 packets transmitted, 8 packets received,   0% unanswered (4 extra)
rtt min/avg/max/std-dev = 0.463/0.859/1.182/0.257 ms
```

还可以通过 arping 来查看是否 IP 被占用，有些机器会禁止 PING 检测，使用 arp 这类二层协议检测占用情况会更准确些。

## 参考文献

- [arping](https://wangchujiang.com/linux-command/c/arping.html)