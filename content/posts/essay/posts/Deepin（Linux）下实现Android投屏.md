---
title: "Deepin（Linux）下实现Android投屏"
categories: [ "编程开发" ]
tags: [ "android","deepin","linux" ]
draft: false
slug: "34"
date: "2019-06-18 08:39:00"
---

# Deepin（Linux）下实现Android投屏

最近需要演示自己的安卓开发作品，因此需要在自己的主力操作系统（Deepin）上实现安卓投屏，之后才好连接电脑在班级里演示。找寻一圈之后终于发现了开源的Linux端投屏神器`Scrcpy`. 因此在这里简单记录配置过程，方便后用。

项目源码：[Scrcpy的GitHub](https://github.com/Genymobile/scrcpy)

## 简单说明

Scripe支持桌面全平台。
> It works on GNU/Linux, Windows and MacOS.

但是在这里主要记录下Linux下的Deepin系统配置。

<!--more-->

## 配置过程

官方没有为Deepin的Debian提供安装包，因此需要自己通过源码编译。

主要步骤如下（Deepin下）：

第一步：安装依赖

```
# runtime dependencies
sudo apt install ffmpeg libsdl2-2.0.0

# client build dependencies
sudo apt install make gcc pkg-config meson ninja-build \
                 libavcodec-dev libavformat-dev libavutil-dev \
                 libsdl2-dev

# server build dependencies
sudo apt install openjdk-8-jdk
```

第二步：下载源码

地址：[https://github.com/Genymobile/scrcpy/releases](https://github.com/Genymobile/scrcpy/releases)

![](http://photo-frytea.test.upcdn.net/20190618082856.png)

第三步：将源码解压后右键在终端打开

第四步：编译安装软件

编译：

```
meson x --buildtype release --strip -Db_lto=true
cd x
ninja
```

说明：我个人在这一步出现了问题导致编译失败，后来我在深度社区找到了答案，应该是由于没有配置ANDROID—HOME的环境变量导致的，配置变量需要进行如下操作：
```
1.安装android-studio
2.设置环境变量
export ANDROID_HOME=~/Android/Sdk/
3.同意许可

cd ~/Android/Sdk/tools/bin
./sdkmanager --licenses
```
注：本人没有测试，因为为了效率直接使用了热心网友编译好的，后期抽时间再编译一次再补充。

安装：
```
sudo ninja install
```

第五步：使用

USB使用：
1.数据线连上手机，打开USB调试
2.终端输入：
```
scrcpy
```
![](http://photo-frytea.test.upcdn.net/20190618081212.png)

Wifi使用：
设置无线投屏就是在usb连接情况下，执行  以下命令
1    adb tcpip 5555 
2    adb connect 手机ip:5555
3    拔掉usb线（此时adb 连接方式已经调整为监听tcpip连接，监听端口是5555）
4    运行scrcpy命令

To switch back to USB mode: adb usb.
切换到USB模式：	`adb usb`。

## 简易配置

上文提到为了方便，我在deepin社区找到了热心网友打包好的scripe，直接就可以使用，在这里简单写一下免编译操作步骤：

![](http://photo-frytea.test.upcdn.net/20190618082148.png)

步骤一：下载软件包

[下载scrcpy](http://frytea-data.test.upcdn.net/scrcpy.tar.gz)

步骤二：解压

这是在deepin-15.10.1中编译后的两个文件
```
/── usr
   └── local
       ├── bin
       │   └── scrcpy
       └── share
           └── scrcpy
               └── scrcpy-server.jar
```


步骤三：复制上面文件夹到系统根目录，合并
![](http://photo-frytea.test.upcdn.net/20190618082506.png)

步骤四：安装依赖

```
sudo apt-get install android-tools-adb ffmpeg libsdl2-2.0.0
```

步骤五：使用
略，同上。

## sh脚本

为了方便实用，写了两个很简单的sh脚本，方便使用。

scrcpy-usb.sh
```
#! /bin/sh
scrcpy
```
scrcpy-wifi.sh
```
#! /bin/sh
adb tcpip 5555
adb connect 192.168.1.100:5555
scrcpy
adb usb
```

## 注意事项
1. 关开usb调试。在我使用过程中我发现，使用wifi连接后如果直接使用usb链接就无法使用，需要开关usb调试。另外如果连接着usb线也无法进行wifi链接。

## 参考文献

- [Android投屏软件scrcpy使用](https://bbs.deepin.org/forum.php?mod=viewthread&tid=178520)
- [在Deepin上安装Android投屏软件scrcpy的方法](https://ywnz.com/linuxsj/5137.html)
- [scrcpy：用电脑显示和控制Android设备的命令行工具](https://ywnz.com/linuxsj/2625.html)
- [Open Source Project: Scrcpy now works wirelessly!](https://www.genymotion.com/blog/open-source-project-scrcpy-now-works-wirelessly/)