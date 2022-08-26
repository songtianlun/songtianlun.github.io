---
title: "变废为宝 ｜ 旧电脑变云数据中心 ｜ Esxi 配置"
categories: [ "技术价值" ]
tags: [ "Esxi" ]
draft: false
slug: "448"
date: "2020-09-04 11:43:05"
---

VMware Inc. 是虚拟机软件行业的老大，vSphere 是在VMware数据中心产品下的一套软件，ESXi, vSphere client 和 vCeneter 都是 vSphere 的组件。ESXi是 vSphere 中最重要的一个组件。ESXi 是虚拟化服务。所有的虚拟机都是运行在 ESXi 服务上面。为了安装，管理和访问这些虚拟机，你需要另外的 vSphere 套件，也就是 vSphere client 或 vCenter。vSphere client允许管理员访问 ESXi 服务并管理虚拟机。vSphere client 是安装在客户机(也就是管理员的笔记本)上面。vSphere client 被用来连接 ESXi 服务器和管理任务。

今天这篇文章就来介绍如何在一台旧电脑上安装 Esxi 6.7 并激活。

## 安装步骤

### 第一步，准备Esxi 镜像

镜像可以去官网直接下载：

官网产品下载地址：[https://my.vmware.com/cn/web/vmware/downloads/#all_products](https://my.vmware.com/cn/web/vmware/downloads/#all_products)

![https://imagehost-cdn.frytea.com/20200904112816.png](https://imagehost-cdn.frytea.com/20200904112816.png)

大概在这个位置可以找到下载地址，您需要具有VMware账号才可以完成正常的下载。

### 第二步，将镜像写入U盘等介质

您可以选择U盘或是光盘等介质，使用 **[UltraISO软碟通](https://cn.ultraiso.net/xiazai.html)** 等软件。或是直接使用PE选择ISO启动，选择您喜欢的方式即可。

### 第三步，安装

旧电脑关机，将您准备好的写入 ESXI 系统镜像的安装介质插入旧电脑，之后选择使用这一介质引导启动即可。

详细的安装步骤就不列了，基本上就是一路下一步，中间没有什么复杂的操作。

### 第四步，配置

安装结束后，移除安装介质，启动电脑。

如果一切顺利，屏幕上会显示当前web面板的登录地址，使用局域网内的设备登录即可。

![https://imagehost-cdn.frytea.com/20200904113430.png](https://imagehost-cdn.frytea.com/20200904113430.png)

### 第五步，激活

博主在安装时选择的是 6.7 版本，属于预览版，需要授权码激活。

![https://imagehost-cdn.frytea.com/20200904113852.png](https://imagehost-cdn.frytea.com/20200904113852.png)

在这里输入授权码，即可完成激活。博主在网上找到一个激活码，成功激活。

VMware vSphere 6 Enterprise Plus：  `0A65P-00HD0-3Z5M1-M097M-22P7H` 

到这里，安装已经结束，后面根据需求，创建虚拟机即可。

![https://imagehost-cdn.frytea.com/20200904114112.png](https://imagehost-cdn.frytea.com/20200904114112.png)

至此，旧电脑摇身一变成为简单的云数据中心，再高大上一些就是完成了云计算私有化部署。当然也可以创建一个虚拟机跑 OpenWrt ，达到旁路由的效果，后面再更新 Esxi 下配置 OpenWrt 的教程。

## 参考文献

- [vSphere, ESXi 和 vCenter 的区别](https://zhuanlan.zhihu.com/p/32873934)
- [VMware-ESXi-6.7.0许可证](https://blog.51cto.com/jameszhan/2314626)
- [下载 VMware vSphere Hypervisor (ESXi)](https://my.vmware.com/cn/web/vmware/downloads/info/slug/datacenter_cloud_infrastructure/vmware_vsphere_hypervisor_esxi/6_5)
- [免费下载UltraISO软碟通官方中文版](https://cn.ultraiso.net/xiazai.html)