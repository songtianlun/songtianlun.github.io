---
title: "Arch Linux ARM 安装 electron 版微信"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "741"
date: "2023-02-19 10:39:42"
---

偶然逛 ArchWiki 的 [微信](https://wiki.archlinuxcn.org/zh-hans/%E5%BE%AE%E4%BF%A1) 页面，发现在 Arch 下提供了很多种运行微信的方案，在我的 ARM 版 ARCH 下搜索了一下，发现提供了一个基于 electron 直接可用的微信：

```bash
$ sudo pacman -Ss wechat  
archlinuxcn/electronic-wechat-uos-bin v2.3.1.fix-2  
   Linux 下更好用的微信客户端. 更多功能, 更少bug. 使用Electron构建, 利用UOS请求头修复了登陆问题.  
archlinuxcn/wine-wechat-setup 1.2-1  
   Setup and run WeChat Windows version with Wine (Chinese version)
```

安装 electron 版的尝试一下：

```bash
$ sudo pacman -S electronic-wechat-uos-bin
```

安装没有任何困难，直接安装，运行起来发现是可以正常使用的：

![](https://imagehost-cdn.frytea.com/images/2023/02/19/2023021910354867e236e6acd516bb.png)

扫码登录，毫无障碍：

![](https://imagehost-cdn.frytea.com/images/2023/02/19/20230219103815a19fd600ccf7716e.png)

简单看了一下，应该是基于网页版的，目前是可以正常使用。

如果这个方案不行，还可以尝试一下 wine 版的。

总之，在 Linux 下使用微信，应该是不成问题了。


