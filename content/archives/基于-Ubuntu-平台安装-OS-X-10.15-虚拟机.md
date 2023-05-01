---
title: "基于 Ubuntu 平台安装 OS X 10.15 虚拟机"
categories: [ "技术" ]
tags: [ "linux","vmware" ]
draft: false
slug: "302"
date: "2020-01-30 20:06:00"
---

OS X 系统启动时会识别计算机主板，针对非苹果电脑拒绝启动，就算是虚拟机，也有天然的限制不可以随便安装 OS X 虚拟机，本文就介绍了在 Ubuntu 平台上使用 VMware Workstation 安装 OS X 10.15

## 资源清单

- VMware Workstation Pro
- Unlock
- OS X 10.15 CDR镜像

本教程资源来源：

- VMware Workstation Pro： 自备
- Unlock：https://github.com/theJaxon/unlocker
- OS X 10.15 CDR镜像: [自己制作的 macOS Catalina 10.15.1 cdr文件，亲测可用](https://blog.sxbai.com/243.html)

## 简单流程

第一步：安装 Vmware 并 使用 Unlock 破解 OS X 系统安装限制。

第二步：新建虚拟机，选择准备好的 `*.cdr` 系统镜像，选择 `Apple OS X 10.15`

第三步：安装系统

![2020-01-30-20-05-22-16f67f7f0f139bec.png](https://imagehost-cdn.frytea.com/images/2020/01/30/2020-01-30-20-05-22-16f67f7f0f139bec.png)

注：进入 `mac实用工具` 后先进入磁盘工具，将刚刚分配好的虚拟磁盘抹掉格式化，结束后退出磁盘工具，再进入mac安装。其他步骤就很日常啦，有问题敬请留言！

详细步骤请参考：[如何在Windows上VMware上安装macOS Catalina 10.15](https://blog.sxbai.com/174.html)

![2020-01-30-21-18-17-2c3f9246d05ac691.png](https://imagehost-cdn.frytea.com/images/2020/01/30/2020-01-30-21-18-17-2c3f9246d05ac691.png)

## 安装 VMware tools

安装 VMware tools 时可能会遇到一个问题：无法在更新服务器上找到组件。请联系 VMware 技术支持或您的系统管理员。

在此通过手动安装的方式获得 工具并安装到虚拟机中。

首先资源：在这里找最新版本的MacOSvmtool : <https://softwareupdate.vmware.com/cds/vmw-desktop/fusion/ >

安装方法很简单，解压工具找到 `drawin.iso`使用 CD/DVD 的方式挂载进去安装即可！

详细步骤可参考：[Windows下VMmare黑苹果macOS Catalina 10.15虚拟机安装VMware tools工具](https://blog.csdn.net/qq_41855420/article/details/102756313)

## 参考文献

 - [如何在Windows上VMware上安装macOS Catalina 10.15](https://blog.sxbai.com/174.html)
 - [自己制作的 macOS Catalina 10.15.1 cdr文件，亲测可用](https://blog.sxbai.com/243.html)
 - [Windows下VMmare黑苹果macOS Catalina 10.15虚拟机安装VMware tools工具](https://blog.csdn.net/qq_41855420/article/details/102756313)
 - [用linux制作Mac OS U盘启动](https://blog.csdn.net/CaseCaffe/article/details/50334563)
 - [balena Etcher](https://www.balena.io/etcher/)
 - [VMWare虚拟机安装dmg格式的macOS操作系统](https://blog.csdn.net/a4019069/article/details/80585612)
 - [macOS Catalina 10.15.3 19D76 黑苹果原版Clover 5103安装镜像](https://imac.hk/clover-5103-macos-catalina-10-15-3-19d76.html)
