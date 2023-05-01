---
title: "Windows Update服务启动弹出“拒绝访问的解决方案"
categories: [ "技术" ]
tags: [ "windows" ]
draft: false
slug: "49"
date: "2019-04-13 22:25:00"
---


## 概述

说起 windows 自动更新相信这是让很多人又爱又恨的东西，爱在于它可以带给我们更新更安全的系统，让我们的生活添加一些新意；而恨就在于其常常在我们不知情的情况下强行开始更新并运行很久的时间。

作者对于 windows 自动更新忍无可忍，从注册表层关闭了 windows 自动更新；但是当时年少无知，只图一时爽快，确实很长的一段时间没有再更新，但是当有一天我需要自动更新的时候却发现自动更新的服务怎么也打不开了，具体表现在开启 windows update 服务会提示拒绝访问

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413122206.png)

经过多次的探索，终于在今天成功开启了自动更新，并开始了一次漫长的更新，第一次感觉到了自动更新是多麽的开心！！在这里记录下这一过程，会开启，会关闭，才算真正学会这一大法，本文介绍方法反之即可作为彻底禁用自动更新的办法！

<!--more-->

## 基本步骤

1. 通过“Win”+ “R”组合键，打开运行窗口，输入“regedit”，然后点击“Enter”键。
   ![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413221400.png)
2. 在注册表中找到“计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WaaSMedicSvc”然后在“WaaSMedicSvc”的右侧找到“Start”
   ![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413221452.png)

之后鼠标右键修改数值，将修改项修改为数字“4”，代表着“禁用”，以此类推，可知“1”、“2”、“3”代表着什么。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413221700.png)

> 1→ 自动（延迟启动）
> 2→ 自动
> 3→ 手动
> 4→ 禁用

直接修改其中的数值即可实现开启、关闭自动更新，比如我现在想要开启自动更新就修改为`2`。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413221845.png)

如果此时直接点击确定提示拒绝访问，也许是因为当前登陆的账户没有修改该值的权限，此时只需选中 Start，单击菜单栏编辑 → 权限。为当前用户添加`完全控制`权限即可。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413222139.png)

最后，重启，完成！
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190413222212.png)

## 参考文献

- [WIN10禁用更新，不是办法的办法！](https://yu72.com/tech/7890.html)

