---
title: "Windows 禁用 AppXSVC 解决 CPU 占用高问题"
categories: [ "技术" ]
tags: [ "windows" ]
draft: false
slug: "606"
date: "2021-12-16 11:26:36"
---

在一台虚拟机上安装了 Windows 10 lstc 2021 版，启动后发现 CPU 占用率一直居高不下，查看任务管理器发现是一个叫 `wsapp` 的系统服务服务占用 CPU 过高，搜索后发现对应的是 `AppX Deployment Service` 系统服务，是用来提供 微软应用商店服务服务的。

这就很奇怪了，lstc 没有预装微软应用商店呀，因此也**不能使用常规方法将其关闭**，实测在**服务管理器**中也无法直接关闭。

## 解决方法

后面我发现其实可以通过修改注册表的方式去禁用该服务，方法很简单：

### Step1 打开注册表编辑器

两种方法可以打开：

1. 在任务栏上的搜索框中，键入**regedit**，然后选择"注册表编辑器 (桌面应用) 结果。
2. 右键单击"**开始"，** 然后选择"**运行"。** 在**"打开："框中键入 regedit，**然后选择"确定**"。**

### Step2 禁用服务

首先在注册表编辑器中找到这一项：

`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\AppXSvc`

之后在右侧找到 `Start` 将值由原本的 `3` 改为 `4` 即可。

![https://imagehost-cdn.frytea.com/images/2021/12/16/image46a917cd3ecedee5.png](https://imagehost-cdn.frytea.com/images/2021/12/16/image46a917cd3ecedee5.png)

大概像图片中这样。

最后重启即可！

### Step3 查看效果

重启后查看任务管理器，发现再也没有长期占用 CPU 50% 以上的 `AppXSVC` 服务了。

![https://imagehost-cdn.frytea.com/images/2021/12/16/image0e48aeaeec65f56a.png](https://imagehost-cdn.frytea.com/images/2021/12/16/image0e48aeaeec65f56a.png)

结束。

## 参考文献

- [AppX Deployment Service (AppXSVC) always runs at Startup despite set as Manual. How comes?](https://social.technet.microsoft.com/Forums/en-US/b2bc8708-3a21-4b07-abf6-e9359e3e7961/appx-deployment-service-appxsvc-always-runs-at-startup-despite-set-as-manual-how-comes?forum=win10itprosetup)
- [在 Windows 10 中如何打开注册表编辑器](https://support.microsoft.com/zh-cn/windows/%E5%9C%A8-windows-10-%E4%B8%AD%E5%A6%82%E4%BD%95%E6%89%93%E5%BC%80%E6%B3%A8%E5%86%8C%E8%A1%A8%E7%BC%96%E8%BE%91%E5%99%A8-deab38e6-91d6-e0aa-4b7c-8878d9e07b11)
- **[wsappx是什么进程？wsappx占用cpu磁盘过高可以关闭吗？](https://www.xitmi.com/2625.html)**