---
title: "解决 Win10 热点无法上网及与 Hyper-V 虚拟网卡冲突问题"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "514"
date: "2021-02-26 16:49:38"
---

最近给 Win10 电脑加装了一个无线网卡，想要开热点使用，但是发现手机连上之后显示无法联网，在这里记录解决办法。

首先查看一下当前电脑上网使用的网卡是哪一张，我当前使用的是 Hyper-V 虚拟的一个桥接网卡 `vEthernet (NetBridge)` 开启 wifi 热点后新增的网卡是 ` 本地连接* 12` 。

现在进入上网网卡的属性，进入共享标签，发现 Internet 连接共享是关闭状态，现在将它打开，并将家庭网络连接指定为 wifi 热点的网卡，确认即可。

再次尝试连接即可。

> 补充：开启连接共享时报错 "无法启用 internet 连接共享，为 lan 连接配置的 ip 地址需要使用自动 ip 寻址" ，将不需要的 Vmware 虚拟网卡卸载后解决，猜测可能是占用了某些共享需要用到的网段导致。

## 参考文献

- [解决使用 Win10 共享移动热点无法连接互联网的问题](https://github.com/Ruikuan/blog/issues/51)
- [win10 无法启用 internet 连接共享，为 lan 连接配置的 IP 地址需要使用自动 ip 寻址。](https://www.cnblogs.com/handsome1013/p/13957581.html)
