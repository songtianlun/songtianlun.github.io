---
title: "Esxi安装LEDE(OpenWrt) ｜ 旧电脑变旁路由"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "449"
date: "2020-09-04 12:09:00"
---

在上篇文章中介绍了如何将旧电脑变成私有云计算数据中心，今天就来讲讲如何在这个数据中心安装一个 OpenWrt ，使其摇身一变为庞路由。

在继续之前简单介绍 LEDE 和 OpenWrt 的区别：

> LEDE是16年5月份开始的一个OpenWrt fork，2018年，二者宣布合并。

简单介绍完毕，下面来介绍一下如何在 Esxi 上安装 LEDE 。

## 安装步骤

### 第一步，镜像准备

推荐去 LEDE 官方下载：

LEDE_X64_fw867： [https://firmware.koolshare.cn/LEDE_X64_fw867/](https://firmware.koolshare.cn/LEDE_X64_fw867/)

![https://imagehost-cdn.frytea.com/20200904114828.png](https://imagehost-cdn.frytea.com/20200904114828.png)

理论上下载 `*img.gz` 或是 直接下载 `*.vmdk` 都是可以的，在这里介绍压缩版安装方法，直接下载镜像的请直接跳过第二步。

### 第二步，镜像转盘

- MacOS方法

```bash
# 安装 brew
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 安装 qemu
brew install qemu

# 转盘
qemu-img convert -f raw -O vmdk ~/Downloads/openwrt-15.05-x86-64-combined-ext4.img openwrt-15.05-x86-64-combined-ext4.vmdk
```

- Windows 方法

windows下转盘工具：StarWindConverter.exe：[https://www.starwindsoftware.com/tmplink/starwindconverter.exe](https://www.starwindsoftware.com/tmplink/starwindconverter.exe)

### 第三步，创建虚拟机

虚拟机基本配置：

![https://imagehost-cdn.frytea.com/20200904115636.png](https://imagehost-cdn.frytea.com/20200904115636.png)

虚拟机资源配置：

首先删除现有硬盘，选择添加现有硬盘：

![https://imagehost-cdn.frytea.com/20200904115736.png](https://imagehost-cdn.frytea.com/20200904115736.png)

之后创建一个文件夹，将上一步生成的虚拟硬盘文件上传上去，之后选中，继续

![https://imagehost-cdn.frytea.com/20200904115811.png](https://imagehost-cdn.frytea.com/20200904115811.png)

结束后先不要开机，编辑虚拟机，进行以下操作：

1. 调高默认硬盘大小（大于原有大小即可）；
2. 修改控制器位置为IDE控制器。

![https://imagehost-cdn.frytea.com/20200904120010.png](https://imagehost-cdn.frytea.com/20200904120010.png)

如果不进行上述配置，虚拟机应该是启动不起来的。

### 第四步，配置LEDE

完成上述步骤，虚拟机应该可以正常启动，之后从虚拟机管理界面进入虚拟机管理控制台，根据需求修改网卡配置，我这里要采用 DHCP 因此进行如下操作：

```bash
# 修改网口服务，让其自动获取IP
vi /etc/config/network
# 内容如下：
config interface 'lan'
	option type 'bridge'
	option ifname 'eth0'
	option proto 'dhcp'
	option dns '114.114.114.114 223.5.5.5'

# 修改完重启
reboot
```

之后通过如下命令查看虚拟机的IP：

```bash
ifconfig | more
```

### 第五步，后台管理

完成上述配置，通过虚拟机IP就可以进入LEDE的后台了：

![https://imagehost-cdn.frytea.com/20200904120507.png](https://imagehost-cdn.frytea.com/20200904120507.png)

OpenWrt提供了丰富的插件，可以尽情折腾。

![https://imagehost-cdn.frytea.com/20200904120630.png](https://imagehost-cdn.frytea.com/20200904120630.png)

您还可以在这里安装一个clash服务器，后面会写文章介绍LEDE安装clash的方法。

## 参考文献

- [Vmware ESXI 安装Openwrt / LEDE 软路由系统实战](https://tnext.org/5828.html)
- [koolshare Lede X64 Nuc](https://firmware.koolshare.cn/LEDE_X64_fw867/)
- [VMware ESXi 6.7 安装LEDE](https://blog.csdn.net/kxwinxp/article/details/90166223)
- [openwrt和lede有何区别？](https://www.zhihu.com/question/62052812)
- [OpenWrt on VMware HowTo](https://openwrt.org/docs/guide-user/virtualization/vmware)
- [请问各位lede系统和openwrt有啥区别](https://koolshare.cn/thread-144977-1-1.html)
- [macOS安装Homebrew](https://blog.csdn.net/q383965374/article/details/80404314)