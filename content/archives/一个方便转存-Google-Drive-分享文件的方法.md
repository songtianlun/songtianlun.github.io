---
title: "一个方便转存 Google Drive 分享文件的方法"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "301"
date: "2020-01-30 11:40:00"
---

用过 Google Drive (以下简称GD) 的朋友们应该都清楚，GD 分享的文件可以一键添加到自己的云盘中，速度很快，一度让我感觉 Google 好牛，但仔细一看会发现这并不是将文件转存到自己的 GD 中，以大神分享的爱情公寓5资源为例：

![2020-01-30-11-22-39-eb6691c425cbb3e1.png](https://imagehost-cdn.frytea.com/images/2020/01/30/2020-01-30-11-22-39-eb6691c425cbb3e1.png)

如上图所示，我已经将该资源通过 GD 提供的一键保存按钮将资源放在我的云盘，我已经可以在我的云盘看到，但是仔细看文件详情，目前我还是以分享的方式查看，文件所有者还是共享者。

## 方法一

为了解决这一问题，有多种方法，最直接的一种就是直接在文件上右键，制作一个拷贝，这样一来， GD 就为我们拷贝一份放在了我们的云盘。

![2020-01-30-11-26-01-d8d4773485ac2507.png](https://imagehost-cdn.frytea.com/images/2020/01/30/2020-01-30-11-26-01-d8d4773485ac2507.png)

这一方法很简单直接，但是问题也显而易见，就是对文件夹执行该操作。

除了这一方法，还有一种较为专业，操作起来也较为复杂，但是可以对任何文件进行转存，可以批量处理。

## 方法二

本方法基于 `rclone` ，需准备一台境外大带宽服务器，安装 rclone，绑定云盘，然后使用命令一键转存：

`rclone copy gdvideo:/Movies/Grab/爱情公寓5 onedrivee5:/Public/Video/ -P`

这样的方式可以在云盘内或是云盘间转存文件，灵活方便，功能强大，为问题在于门槛较高。

使用 Rclone 还可以 [Linux 下使用 rclone 挂载网盘到本地](https://blog.frytea.com/archives/31/)



## 总结

本文介绍了两种转存 GD 分享文件到自己 GD 的方法，GD 普通用户使用方法三即可，高级用户可使用方法二，普通少文件方法一即可，此外还有其他方法欢迎一起探索！

全文完。


