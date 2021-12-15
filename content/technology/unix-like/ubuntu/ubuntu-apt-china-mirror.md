---
title: "配置 Ubuntu 软件包管理 apt 的国内镜像源（Debian 系通用）"
date: 2021-11-05T00:46:42Z
description: "Ubuntu 软件包管理采用国内镜像源的配置方法."
categories: ["技术笔记集","Linux 笔记集"]
tags: ["linux", "ubuntu", "apt", "debian"]
draft: false
---

Ubuntu 是目前较为流行的 Linux 发行版，也是除 Win 桌面外几乎最佳的桌面操作系统，但是在国内使用时安装软件依赖包较慢。其实国内的知名高校和知名大厂都已经为他准备好了软件镜像源，下面就来介绍配置 Ubuntu 镜像源的方法。

## 配置方法

- Step1, 原文件备份

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

- Step2, 编辑源列表文件

```bash
sudo vim /etc/apt/sources.list
```

- Step3, 将原来的清单内容删除或注释，并增加镜像源地址，这里推荐 [清华出品的Tuna](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)，进入网站选择您的 Ubuntu 版本即可获取对应的源地址，粘贴即可，这里以 Ubuntu 20.04 为例：

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

- Step4, 保存生效

```bash
sudo apt-get update
```

该方法同样适用于 Debian 系统，因为 Ubuntu 实际上是基于 Debian 系统开发的，其软件包管理也是继承而来，配置 Debian 软件源只需找到对应软件源地址按照上面步骤替换即可。

Tuna 也有对 [Debian 的软件包镜像服务](https://mirrors.tuna.tsinghua.edu.cn/help/debian/) ，选择配置即可。

需要注意的是，一定要使用对应软件版本的软件镜像源，因为不同版本依赖的软件版本都有所不同，配置源错误有可能导致软件无法安装，请知悉。

## 参考文献

- [【Ubuntu】修改Ubuntu的apt-get源为国内镜像源的方法](https://blog.csdn.net/zgljl2012/article/details/79065174)
- **[Ubuntu 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) By Tuna**