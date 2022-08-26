---
title: "【趣味操作】Terminals显示带有酷炫linux标志的基本硬件信息"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "168"
date: "2019-10-21 17:39:00"
---

![77DEA736-675A-4501-9002-2F81E22731B3.jpeg](http://frytea-data.test.upcdn.net/77DEA736-675A-4501-9002-2F81E22731B3.jpeg#shadow)

!!!
<center>

[tag outline] Photo by Sai Kiran Anagani on Unsplash [/tag]

</center>
!!!

你是否还对 Linux 系统看上去“可怕”的命令行望而却步呢？其实在它看似“简陋”的背后，拥有着无限强大的功能性、拓展性甚至趣味性。今天就来介绍一款有意思的命令，使用它你就可以看到字符串背后的美好！

下面介绍两款可用于显示Linux标志及基础硬件信息的命令，分别是`ScreenFetch`和`Linux_Logo/linuxlogo`，二者都可以实现上述需求，这篇文章将会从安装、使用和截图三个方面介绍，使用方面在此仅介绍最简单的使用，更多高级操作欢迎去到其所属的`GitHub仓库`探索，此外还可以从`引用文献`中发现更多有有意思的东西。

# ScreenFetch

screenFetch 是一个能够在截屏中显示系统/主题信息的命令行脚本。它可以在 Linux，OS X，FreeBSD 以及其它的许多类Unix系统上使用。

[tip type="info"]
这个方便的 Bash 脚本可以用来生成那些漂亮的终端主题信息和用 ASCII 构成的发行版标志，就像如今你在别人的截屏里看到的那样。它会自动检测你的发行版并显示 ASCII 版的发行版标志，并且在右边显示一些有价值的信息。 
--- 来自 man 手册的说明
[/tip]

GitHub传送门: <https://github.com/KittyKatt/screenFetch>

## install

```bash
# Debian/Ubuntu/Mint
$ sudo apt-get install screenfetch

# Mac OS X
$ brew install screenfetch

# FreeBSD
$ sudo pkg install sysutils/screenfetch

# Fedora
$ sudo dnf install screenfetch

# universal
$ wget https://github.com/KittyKatt/screenFetch/archive/master.zip
$ unzip master.zip
$ sudo mv screenFetch-master/screenfetch-dev /usr/bin/screenfetch

```

## use

```bash
# Simple use
$ screenfetch
```

## screenshot

![83FEFE13-3611-4C4F-8277-105AEF59EB41.jpeg](http://frytea-data.test.upcdn.net/83FEFE13-3611-4C4F-8277-105AEF59EB41.jpeg)

![B311A013-B4B7-43FF-A8EF-C197774C9FDD.jpeg](http://frytea-data.test.upcdn.net/B311A013-B4B7-43FF-A8EF-C197774C9FDD.jpeg)

# Linux_Logo

linuxlogo or linux_logo is a Linux command line utility that generates a color ANSI picture of Distribution logo with a few system information.


GitHub传送门: <https://github.com/deater/linux_logo>

## Install

```bash
# Debian/Ubuntu/Mint
$ apt-get install linuxlogo

# Centos/RHEL/旧版 Fedora
$ yum install linux_logo

# Fedora Linux v22+ 或更新版本
$ dnf install linux_logo
```

## Use

```bash
$ linux_logo
```

## Screenshot

![5282D417-8A13-4092-A927-076CD70AE44D.jpeg](http://frytea-data.test.upcdn.net/5282D417-8A13-4092-A927-076CD70AE44D.jpeg)

![CA4BB70B-8210-4B1A-8257-614D530ACE0E.jpeg](http://frytea-data.test.upcdn.net/CA4BB70B-8210-4B1A-8257-614D530ACE0E.jpeg)

# Quote

* [用 screenfetch 和 linux_logo 显示带有酷炫 Linux 标志的基本硬件信息](https://linux.cn/article-6510-1.html)
* [LinuxLogo – A Command Line Tool to Print Color ANSI Logos of Linux Distributions](https://u.nu/2cth/)

注1: 如果您手边没有可用于操作的 `Linux` 系统，欢迎来到本站提供的 `instantbox` 中体验 `Linux` 的魅力。在 `instantbox` 中，您可以快速开启一个全新的 `Linux` 系统环境(如 `Ubuntu/Centos/Arch Linux/Debian/Fedora/Alpine`)，并通过浏览器直接使用它，环境最长保留24小时，过期自动销毁，仅用于体验功能，切勿滥用！
传送门：<https://shell.frytea.com/>

注2: 更多Linux使用技巧欢迎来到我的知识库检索，我会在日常使用过程中不断完善，如有错误欢迎指正！

Frytea’s Wiki 传送门：<https://wiki.frytea.com/>