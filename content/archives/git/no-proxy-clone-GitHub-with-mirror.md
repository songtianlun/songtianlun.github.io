---
title: "无代理国内镜像加速 GitHub 资源拉取"
date: 2021-12-15T15:32:54+08:00
description: "一种非代理加速拉取 github 资源的方法."
categories: ["技术笔记集","Git 笔记集"]
tags: ["linux", "git"]
draft: false
---

常见的github加速方法如修改 `hosts` 文件、魔法上网、设置 `proxy` 等方法在此不在赘述，本文主要介绍在不进行多余网络配置（即不使用代理）的情况下，直接使用提供了github国内镜像服务的网站进行github各种资源拉取加速，在这里向各位提供github国内镜像服务的大佬们致敬。

## 加速地址一览

- **[fastgit.org](https://hub.fastgit.org/)：**[https://doc.fastgit.org/](https://doc.fastgit.org/)
- **cnpmjs.org：**[https://github.com.cnpmjs.org/](https://github.com.cnpmjs.org/)
- **gitclone.com：**[https://gitclone.com/](https://gitclone.com/)
- **gitee：**[https://gitee.com/mirrors](https://gitee.com/mirrors)
- GitHub 文件加速：[https://gh.api.99988866.xyz/](https://gh.api.99988866.xyz/)
- Github仓库加速：[https://github.zhlh6.cn/](https://github.zhlh6.cn/)
- Github仓库加速：[http://toolwa.com/github/](http://toolwa.com/github/)

## 加速 `clone`

```bash
# 方法一：手动替换地址
#原地址
$ git clone https://github.com/kubernetes/kubernetes.git
#改为
$ git clone https://github.com.cnpmjs.org/kubernetes/kubernetes.git
#或者
$ git clone https://hub.fastgit.org/kubernetes/kubernetes.git
#或者
$ git clone https://gitclone.com/github.com/kubernetes/kubernetes.git

# 方法二：配置git自动替换
$ git config --global url."https://hub.fastgit.org".insteadOf https://github.com
# 测试
$ git clone https://github.com/kubernetes/kubernetes.git
# 查看git配置信息
$ git config --global --list
# 取消设置
$ git config --global --unset url.https://github.com/.insteadof
```

## 加速 `release`

```bash
# 原地址
wget https://github.com/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
# 加速下载方法一
wget https://download.fastgit.org/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
# 加速下载方法二
wget https://hub.fastgit.org/goharbor/harbor/releases/download/v2.0.2/harbor-offline-installer-v2.0.2.tgz
```

## 加速 `raw`

```bash
# 原地址
$ wget https://raw.githubusercontent.com/kubernetes/kubernetes/master/README.md
# 加速下载方法一
$ wget https://raw.staticdn.net/kubernetes/kubernetes/master/README.md
# 加速下载方法二
$ wget https://raw.fastgit.org/kubernetes/kubernetes/master/README.md
```

## 参考文献

- Github国内mirror加速：[https://blog.csdn.net/networken/article/details/105122778](https://blog.csdn.net/networken/article/details/105122778)
- git clone 加速，只需1秒就可提升几十倍速度，亲测有效：[https://blog.csdn.net/u013066730/article/details/107164870](https://blog.csdn.net/u013066730/article/details/107164870)
- FastGit 简体中文指南：[https://doc.fastgit.org/zh-cn/](https://doc.fastgit.org/zh-cn/)
- GitHub中国加速访问：[https://github.com/chenxuhua/issues-blog/issues/3](https://github.com/chenxuhua/issues-blog/issues/3)