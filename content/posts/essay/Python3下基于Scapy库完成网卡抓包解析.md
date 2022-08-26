---
title: "Python3下基于Scapy库完成网卡抓包解析"
categories: [ "技术价值" ]
tags: [ "python" ]
draft: false
slug: "451"
date: "2020-09-07 14:55:08"
---

Scapy是一个可以让用户发送、侦听和解析并伪装网络报文的Python程序。这些功能可以用于制作侦测、扫描和攻击网络的工具。

在 `Python` 代码中可以通过 `sniff` 函数调用抓包分析，并对抓到的包进行回调操作。

### `Sniff` 方法定义：

```python
sniff(count=0,
      store=1,
      offline=None,
      prn=None,
      filter=None,
      L2socket=None,
      timeout=None,
      opened_socket=None,
      stop_filter=None,
      iface=None)
```

```python
count:抓取报的数量，设置为0时则一直捕获
store:保存抓取的数据包或者丢弃，1保存，0丢弃
offline:从pcap文件中读取数据包，而不进行嗅探，默认为None
prn:为每个数据包定义一个回调函数，通常使用lambda表达式来写回调函数
filter:过滤规则，可以在里面定义winreshark里面的过滤语法，使用 Berkeley Packet Filter (BPF)语法，具体参考：[http://blog.csdn.net/qwertyupoiuytr/article/details/54670477](http://blog.csdn.net/qwertyupoiuytr/article/details/54670477)
L2socket:使用给定的L2socket
timeout:在给定的事件后停止嗅探，默认为None
opened_socket:对指定的对象使用.recv进行读取
stop_filter:定义一个函数，决定在抓到指定的数据之后停止
iface:指定抓包的网卡,不指定则代表所有网卡
```

### filter语法

```python
type(定义了类型)
可选值：host, net, port, portrange
例如：
host hostnameA
net 172.31            //相当于172.31.0.0/16,又例如：192.168.1相当于192.168.1.0/24
port 80
portrange 6000-6010

dir(direction，定义了传输方向)
可选值：src, dst, src or dst, src and dst
例如：
src net 172.31
src or dst port 21

proto(protocol定义了网络协议)
可选值：ether, fddi, tr, wlan, ip, ip6, arp, rarp, decnet, tcp, udp, icmp
(fddi, tr, wlan是ether的别名, 包结构很类似)
例如：
ether src hostnameA
arp net 172.31
udp portrange 7000-8000

连接词：and, or, not
例如：
tcp or udp
not icmp
```

## 示例代码

```python
#!/usr/bin/python3
# -*- coding: UTF-8 -*-

from scapy.all import *

def pack_callback(packet):
    print ( packet.show() )
    if packet['Ether'].payload:
        print (packet['Ether'].src)
        print (packet['Ether'].dst)
        print (packet['Ether'].type)

    if packet['ARP'].payload:
        print (packet['ARP'].psrc)
        print (packet['ARP'].pdst)
        print (packet['ARP'].hwsrc)
        print (packet['ARP'].hwdst)
    time.sleep(2)

filterstr="arp"

sniff(filter=filterstr,prn=pack_callback, iface='eth0', count=0)
```

## 参考文献

- Scapy’s documentation： [https://scapy.readthedocs.io/en/latest/index.html](https://scapy.readthedocs.io/en/latest/index.html)
- Scapy 中文文档： [https://wizardforcel.gitbooks.io/scapy-docs/content/](https://wizardforcel.gitbooks.io/scapy-docs/content/)
- python scapy 网卡抓包：[https://www.cnblogs.com/wangjq19920210/p/10089055.html](https://www.cnblogs.com/wangjq19920210/p/10089055.html)
- Scapy Sniffer的用法：[https://blog.csdn.net/qwertyupoiuytr/article/details/54670489](https://blog.csdn.net/qwertyupoiuytr/article/details/54670489)
- Scapy Sniffer的filter语法：[https://blog.csdn.net/qwertyupoiuytr/article/details/54670477](https://blog.csdn.net/qwertyupoiuytr/article/details/54670477)
- lambda函数、Scapy Sniffer用法：[https://zhuanlan.zhihu.com/p/42533185](https://zhuanlan.zhihu.com/p/42533185)
- Python 变量类型：[https://www.runoob.com/python/python-variable-types.html](https://www.runoob.com/python/python-variable-types.html)
- Python 字典(Dictionary)： [https://www.runoob.com/python/python-dictionary.html](https://www.runoob.com/python/python-dictionary.html)