---
title: "dnsmasq 多网卡分网段配置"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "784"
date: "2023-05-01 00:06:39"
---

在 dnsmasq 的配置文件 `/etc/dnsmasq.conf` 中使用类似下面的配置：

```
bind-interfaces
dhcp-range=eth1,10.192.10.50,10.192.10.200,12h
dhcp-range=eth2,10.192.20.50,10.192.20.200,12h
dhcp-range=eth3,10.192.30.50,10.192.30.200,12h
dhcp-option=option:dns-server,119.29.29.29
```

接口实现一个 dnsmasq 实例，同时在多张网卡启动 DHCP 服务，并分配不同网段的 IP 地址。

