---
title: "解决ClashR打开配置空白"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "341"
date: "2020-06-16 22:24:53"
---

由于做程序设计常常会需要国外网站，因此一个靠谱的代理非常有必要。

此前写过一篇 [私有 vpn 搭建工具集合及靠谱的 vpn 提供商](https://blog.frytea.com/archives/39/).

最近发现 ClashR 这款很好用的代理客户端，客户端可以在我的资源站下载：[Frytea's Res](https://res.frytea.com/Application/).

## 问题重现

在这里记录一个最近遇到的问题，打开后配置界面一片空白，搜寻一圈后在GitHub找到解决方案，在此简单记录。

## 解决方案

删除Home Directory目录下Profiles文件夹，重启APP。

![image8f7cfd62e8fca98f.png](https://imagehost-cdn.frytea.com/images/2020/06/16/image8f7cfd62e8fca98f.png)

在常规界面的用户文件夹，点击进入即可。

## 参考文献

- [配置界面空白 #360](https://github.com/Fndroid/clash_for_windows_pkg/issues/360)