---
title: "Arch Linux 高分屏缩放方案"
categories: [ "技术" ]
tags: [ "linux","arch linux" ]
draft: false
slug: "742"
date: "2023-03-02 23:09:06"
---

linux 下高分屏适配当前在 macos/windows/Linux 中的排位尚属末尾，采用整数倍缩放效果尚好（例如 100%、200%），但是若是使用非整数倍缩放（125%、175%）常常会体会到窗口模糊。

这一问题当前没有比较好的解决方案，但是可以使用字体缩放的方式绕过，效果尚可。

如果你在使用 GNOME 桌面，可以通过安装 gnome tweaks 软件来调整字体缩放率：

![](https://imagehost-cdn.frytea.com/images/2023/02/28/20230228110710b24f5d4dab7162eb.png)

这样就可以在高分屏下获得一个比较好的效果，手边这台 MacBook air 中的一台采用 GNOME 的 arch linux 虚拟机，使用全分辨率的情况下，整个显示效果还算可以接受：

![](https://imagehost-cdn.frytea.com/images/2023/02/28/202302281110130db5ef601c251de4.png)

## Reference

- [Linux 高分屏缩放方案(分数缩放) - V2ex](https://www.v2ex.com/t/862295)
  

