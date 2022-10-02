---
title: "Ubuntu 安装 Android Studio"
categories: [ "编程开发" ]
tags: [ "android" ]
draft: false
slug: "284"
date: "2019-12-24 17:25:00"
---

网上关于 `Linux`  环境下安装  `Android Studio` 的教程很多，但是因发行版的不同而异，在这里记录使用官网提供的打包好的安装包安装在 `Zorin` 系统上并创建快捷方式的方法：

第一步：官网下载安装包

传送门：<https://developer.android.com/studio>

第二步：将压缩包解压并移动到 `/opt` 目录下 ：

```bash
$ tar -zxvf android-studio-ide-191.6010548-linux.tar.gz
$ mv android-studio-ide-191.6010548-linux/android-studio /opt/
```

第三步：创建快捷方式

```
$ sudo vim /usr/share/applications/android_studio.desktop
```

写入如下内容：

```bash
Desktop Entry]
Name=AndroidStudio
Type=Application
Icon=/opt/android-studio/bin/studio.png
Exec=sh /opt/android-studio/bin/studio.sh
Name[zh_CN]=androidstudio.desktop
```

在程序列表就可以看到软件图标了。

## 参考文献

 - [Ubuntu创建Android Studio快捷方式](https://blog.csdn.net/fesdgasdgasdg/article/details/69042367)
 - [如何在Ubuntu 18.04上安装Android Studio](https://www.linuxidc.com/Linux/2018-12/156056.htm)
 - [Tar打包、压缩与解压缩到指定目录的方法](https://blog.csdn.net/bluishglc/article/details/5841416)

