---
title: "macOS12 使用 UTM 体验 macOS13"
date: 2022-11-03T14:44:16+08:00
description: "使用 UTM 在 macOS 12 下体验最新 macOS 13系统，附多图."
categories: ["技术笔记集","macOS 笔记集"]
tags: ["macOS", "ventura", "utm"]
draft: false
---

[UTM](https://getutm.app) 是苹果 IOS、macOS 生态下的一款开源的虚拟机软件，底层基于 QEMU 或 Apple 虚拟化，能够在苹果操作系统上以半虚拟化（同 CPU 架构）或全虚拟化（异构 CPU 系统）的形式运行 Linux、Windows 以及 macOS。

macOS 13 (Ventura) 是[苹果公司](https://zh.wikipedia.org/wiki/%E8%98%8B%E6%9E%9C%E5%85%AC%E5%8F%B8 "苹果公司")用于[麦金塔](https://zh.wikipedia.org/wiki/%E9%BA%A5%E9%87%91%E5%A1%94 "麦金塔")桌面操作系统[macOS](https://zh.wikipedia.org/wiki/MacOS "MacOS")的第19个[主要版本](https://zh.wikipedia.org/wiki/%E8%BB%9F%E4%BB%B6%E7%89%88%E6%9C%AC%E8%99%9F "软件版本号")，于2022年6月7日的[苹果全球开发者大会](https://zh.wikipedia.org/wiki/%E8%8B%B9%E6%9E%9C%E5%85%A8%E7%90%83%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%A7%E4%BC%9A "苹果全球开发者大会")（WWDC）上发布，成为[macOS 12 Monterey](https://zh.wikipedia.org/wiki/MacOS_Monterey "MacOS Monterey")的继任版本。此版macOS命名自[加州](https://zh.wikipedia.org/wiki/%E5%8A%A0%E5%B7%9E "加州")[南部](https://zh.wikipedia.org/wiki/%E5%8D%97%E5%8A%A0%E5%B7%9E "南加州")的滨海旅游胜地[范朵拉市](https://zh.wikipedia.org/wiki/%E6%96%87%E5%9B%BE%E6%8B%89_(%E5%8A%A0%E5%88%A9%E7%A6%8F%E5%B0%BC%E4%BA%9A%E5%B7%9E) "文图拉 (加利福尼亚州)")。

基于此前苹果系统的一些历史丑闻，导致本人在内的许多人对苹果推送的新固件保持谨慎态度。作为生产力存在的 macOS 更加需要小心谨慎了。

但一味的观望总是毫无进展的，还是上手体验一番最有说服力。虽然在 macOS 12 下使用 UTM 不可以直接启动 macOS 13 虚拟机，但是可以通过安装 macOS 12 虚拟机然后再更新到 macOS 13 的形式体验到最新的 macOS。

下面介绍方法和效果展示，多图预警！！

## 材料准备

为了安装 macOS 12 虚拟机，需要至少准备以下资源：

- [UTM](https://getutm.app)
- macOS12 IPSW 文件（约14GB）
- 大约 64GB 的磁盘空间

其中 UTM 用于启动虚拟机，按照官网的流畅安装即可，非常简单。

IPSW 文件可理解为苹果生态下的 ISO 镜像，其中包含所有系统资源，可通过 [这里](https://mrmacintosh.com)  或 [这里](https://ipsw.me)  下载到 macOS 12 系统镜像。

> IPSW（iPhone软件）是一种文件格式，用于为装有Apple芯片的设备安装iOS，iPadOS，tvOS，HomePod和最近的macOS固件。

需要注意的是，macOS 13 无法直接在 macOS 12 下启动，因此即使能够获取到 macOS 13 的 IPSW 文件，也无法启动。

磁盘空间需要预留至少 64GB，因为本人在尝试分配 64G 硬盘后，发现安装过程中几乎全部耗尽，如果空间不足会导致虚拟机卡死。

一切准备就绪，就可以开始了。

## 开始 Ventura 之旅

以下使用图片加注释的形式进行，按照图示一步一步走过来即可，赶时间也可以直接看图片效果：


![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032155554b74e6e39f8ca0b63.png)



![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032155634ad61a983e58634d2.png)

> 这一步载入 macOS IPSW 文件

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110321569716f96b3b852e5f5f4.png)

> 建议磁盘选择 64GB，32 GB 无法安装 macOS 13

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032152833e31df687dd5dd6e9.png)



![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032153167f6b72f43d8da7d99.png)

> 等待系统安装

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110321567409c1233129b278634.png)


![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110321355902e4aa38089c562eb.png)


![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032150037575bb546700a22d1.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110322028013502b5bb063cc963.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/20221103222994253a45c1b3884555d.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032229152a8bd5fdfdac871c1.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032230119f630c2209a0bf5f8.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032252228c495d23371f11397.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032254013c1905a329e6a546d.png)

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032255244bc4d3200e065d632.png)

> 登入 macOS 13

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110323024719eb4f7428ac7d5c5.png)

> 系统信息

![](https://imagehost-cdn.frytea.com/images/2022/11/03/202211032304735b0ed7bf994734470.png)

> 软件展示

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110323538276839edb1fd163154.png)

> 台前调度

![](https://imagehost-cdn.frytea.com/images/2022/11/03/2022110323554039758266c71664c9c.png)


## 总结

使用 UTM 足以体验所有 macOS13 的所有新功能，用来评估是否可以用于自己的日常工作，以及个人喜好，避免降级。

本文介绍了 UTM 配置 macOS 12 虚拟机并升级到 macOS 13 的全过程，展示了 macOS 13 变动较大的设置、时钟、天气以及台前调度等功能，希望对大家起到一些参考意义，若有问题欢迎留言。


## 参考文献
- [Install macOS Ventura Beta in a Virtual Machine on an M1 or M2 Mac with UTM](https://www.intego.com/mac-security-blog/install-macos-ventura-beta-in-a-virtual-machine-on-an-m1-or-m2-mac-with-utm/)
- [Mr. Macintosh](https://mrmacintosh.com/)
- [IPSW Downloads](https://ipsw.me/)
- [macOS Ventura - Apple](https://www.apple.com.cn/macos/ventura/)
- [macOS Ventura - Wikipedia](https://zh.wikipedia.org/zh-cn/MacOS_Ventura)
- [IPSW - Wikipedia](https://en.wikipedia.org/wiki/IPSW)
