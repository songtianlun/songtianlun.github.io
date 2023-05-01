---
title: "tcpdump 过滤数据包长度"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "496"
date: "2020-12-15 14:31:23"
---

tcpdump 支持 `protocol[x:x]` 表达式，用于指定某协议[起始偏移量:数值类型长度],

如指定IP包长度大于100:

`tcpdump -i eth0 -n 'ip[2:2] > 100'` 

捕获tcp目标端口在10000和20000之间的包：

`tcpdump  -i eth0 -n  'tcp[2:2]>10000' and 'tcp[2:2]<20000'`

## 参考文献

- tcpdump 过滤数据包：[https://blog.csdn.net/wolfzhaoshuai/article/details/39992753](https://blog.csdn.net/wolfzhaoshuai/article/details/39992753)
- tcpdump指定捕包长度：[https://blog.csdn.net/rclijia/article/details/56677324](https://blog.csdn.net/rclijia/article/details/56677324)