---
title: "VirtualBox无限嵌套方法 | 虚拟机套娃"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "429"
date: "2020-08-15 11:18:14"
---

接上文，最近研究移动办公环境，采用VirtualBox虚拟机环境，由于一些桌面办公软件必须采用Windows系统，因此采用VirtualBox虚拟出一台ltsc版的win10系统，此时需要再搭建一个Linux编程环境，如果独立再开虚拟机，就无法共享win10虚拟机的vpn，之后发现VirtualBox其实是可以无限嵌套的，在此记录方法。

如果不开启嵌套虚拟化，在虚拟机中再创建虚拟机是会报错的，提示您强制关闭硬件虚拟化。此时关闭虚拟机，在物理机上运行如下命令（记得替换路径和虚拟机名称）：

```jsx
C:\Program Files\Oracle\VirtualBox>VBoxManage.exe  modifyvm "PortableWindows10" --nested-hw-virt on
```

之后会发现嵌套虚拟化已经被打开，之后在虚拟机中就可以新建虚拟机了！

![https://imagehost-cdn.frytea.com/20200815111355.png](https://imagehost-cdn.frytea.com/20200815111355.png)

附上一张套娃效果图：

![https://imagehost-cdn.frytea.com/20200815111547.png](https://imagehost-cdn.frytea.com/20200815111547.png)

## 参考文献

- VirtualBox 6.1 开启嵌套虚拟化：[https://blog.csdn.net/u012997311/article/details/104543452](https://blog.csdn.net/u012997311/article/details/104543452)