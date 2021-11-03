---
title: "Tcpdump"
date: 2021-11-03T14:37:08+08:00
description: "一个运行在命令行下的抓包工具."
categories: ["技术笔记集","Linux 命令集"]
tags: ["linux","tcpdump"]
draft: false
---

本文整理转自：[tcpdump参数解析及使用详解](https://blog.csdn.net/hzhsan/article/details/43445787)

## **tcpdump介绍**

[tcpdump](http://en.wikipedia.org/wiki/Tcpdump) 是一个运行在命令行下的抓包工具。它允许用户拦截和显示发送或收到过网络连接到该计算机的TCP/IP和其他数据包。tcpdump 适用于大多数的类Unix系统操作系统(如linux,BSD等)。类Unix系统的 tcpdump 需要使用libpcap这个捕捉数据的库就像 windows下的WinPcap。

## tcpdump命令格式

Tcpdump的大概形式如下:

```jsx
tcpdump –i eth0 ’port 1111‘ -X -c 3
```

- `X` 告诉 `tcpdump` 命令，需要把协议头和包内容都原原本本的显示出来（tcpdump会以16进制和ASCII的形式显示），这在进行协议分析时是绝对的利器。

`tcpdump` 采用命令行方式，它的命令格式为：

```jsx
tcpdump [ -adeflnNOpqStvx ] [ -c 数量 ] [ -F 文件名 ]
[ -i 网络接口 ] [ -r 文件名] [ -s snaplen ]
[ -T 类型 ] [ -w 文件名 ] [表达式 ]
```

## tcpdump 参数

`-a`：将网络地址和广播地址转变成名字；

`-d`：将匹配信息包的代码以人们能够理解的汇编格式给出；

`-dd`：将匹配信息包的代码以c语言程序段的格式给出；

`-ddd`：将匹配信息包的代码以十进制的形式给出；

`-e`：在输出行打印出数据链路层的头部信息，包括源mac和目的mac，以及网络层的协议；

`-f`：将外部的Internet地址以数字的形式打印出来；

`-l`：使标准输出变为缓冲行形式；

`-n`：指定将每个监听到数据包中的域名转换成IP地址后显示，不把网络地址转换成名字；

`-nn`：指定将每个监听到的数据包中的域名转换成IP、端口从应用名称转换成端口号后显示

`-t`：在输出的每一行不打印时间戳；

`-v`：输出一个稍微详细的信息，例如在ip包中可以包括ttl和服务类型的信息；

`-vv`：输出详细的报文信息；

`-c`：在收到指定的包的数目后，tcpdump就会停止；

`-F`：从指定的文件中读取表达式,忽略其它的表达式；

`-i`：指定监听的网络接口；

`-p`：将网卡设置为非混杂模式，不能与host或broadcast一起使用

`-r`：从指定的文件中读取包(这些包一般通过-w选项产生)；

`-w`：直接将包写入文件中，并不分析和打印出来；

`-s`：snaplen snaplen表示从一个包中截取的字节数。0表示包不截断，抓完整的数据包。默认的话 tcpdump 只显示部分数据包,默认68字节。

`-T`：将监听到的包直接解释为指定的类型的报文，常见的类型有rpc （远程过程调用）和snmp（简单网络管理协议；）

`-X`：告诉tcpdump命令，需要把协议头和包内容都原原本本的显示出来（tcpdump会以16进制和ASCII的形式显示），这在进行协议分析时是绝对的利器。

## 过滤解析包长度

tcpdump 支持 `protocol[x:x]` 表达式，用于指定某协议[起始偏移量:数值类型长度],

如指定IP包长度大于100:

`tcpdump -i eth0 -n 'ip[2:2] > 100'` 

捕获tcp目标端口在10000和20000之间的包：

`tcpdump  -i eth0 -n  'tcp[2:2]>10000' and 'tcp[2:2]<20000'`

## 参考文献

- tcpdump参数解析及使用详解：[https://blog.csdn.net/hzhsan/article/details/43445787](https://blog.csdn.net/hzhsan/article/details/43445787)
- tcpdump 过滤数据包：[https://blog.csdn.net/wolfzhaoshuai/article/details/39992753](https://blog.csdn.net/wolfzhaoshuai/article/details/39992753)
- tcpdump指定捕包长度：[https://blog.csdn.net/rclijia/article/details/56677324](https://blog.csdn.net/rclijia/article/details/56677324)