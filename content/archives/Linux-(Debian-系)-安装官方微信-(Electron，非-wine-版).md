---
title: "Linux (Debian 系) 安装官方微信 (Electron，非 wine 版)"
categories: [ "技术" ]
tags: [ "linux","debian","微信" ]
draft: false
slug: "677"
date: "2022-12-09 22:00:00"
---

使用 Linux 作为唯一主力系统的阻力之一，就来自于微信。

微信大概是目前大多数人都无法离开的软件，而在 Linux 下安装微信在此前是比较复杂的，这对于使用 Linux 工作生活存在一些障碍。

最近才发现微信有推出基于 Electron.js 的一款桌面程序，不需要依赖 Wine 那复杂和冗余的依赖，只需要装一个稍微“大”一点的 deb 包就可以。

而且因为是基于 deb，理论来说 debian 系操作系统，如 Ubuntu、Kali 等都是可以直接安装的。

软件可以从优麒麟官网的软件下载页面找到：

https://www.ubuntukylin.com/applications/106-cn.html

在这个页面直接下载就可以，不要在其他陌生的地方下载。

![](https://imagehost-cdn.frytea.com/images/2022/12/09/202212090940821ab6c959d3fde3f22.png)

下载下来之后看一下，一个平平无奇的 deb 软件包， debian 系操作系统直接 `dpkg -i xx.deb` 安装即可，基本不会出现依赖问题。

![](https://imagehost-cdn.frytea.com/images/2022/12/09/202212090940143372675f8d930f573.png)

实测在 kali 下正常使用。安装完成，就可以在软件清单找到微信了，直接打开即可，扫码登录即可使用。

不要抱有太高期待，现阶段只是能用。不过这对于大部分会考虑使用 linux 做主系统的人们来说，应该是够用了。

![](https://imagehost-cdn.frytea.com/images/2022/12/09/202212090944518646d3cef7b1c855b.png)

实际上在优麒麟官网还可以找到其他一些常用软件，可以看到 QQ 和微信还有提供一种 crosscover 版，也就是基于 wine 的，在 linux 运行 windows 的方式运行，这种方式也许功能会多一些，但依赖实在太多，配置复杂，用起来很繁琐，不推荐使用。

![](https://imagehost-cdn.frytea.com/images/2022/12/09/202212090948829c0f0cca7154a534f.png)

总结一下，当前国产操作系统发展越来越好，虽然与 windows、macos 的差距还很大，而且对于底层技术的掌控也比较有限，但这是一个很好的趋势，提升自己在 linux 下的工作能力，对于技术人员或是工作离不开计算机的人们来说，长期来看很有益处。

另外，在 linux 下几乎可实现所有想要的功能，相对 windows 或 macos 的直接使用，可以在这一过程中获得更多成就感。

## 参考文献

- [ubuntu20.04安装Linux原生的微信，请注意，这不是wine版本的微信](https://blog.csdn.net/ccsodefhy/article/details/123193936)
- [腾讯 Linux 原生微信官方版 2.1.1 正式发布，上架麒麟软件商店](https://www.ithome.com/0/595/918.htm)