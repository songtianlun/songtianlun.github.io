---
title: "Ubuntu 安装 GitKraken 并汉化"
categories: [ "技术" ]
tags: [ "git","github","Ubuntu","gitkraken" ]
draft: false
slug: "613"
date: "2021-12-30 09:31:05"
---

GitKraken 是一款超好用的 git 可视化(gui)工具，但是官方不提供多语言支持，今天就以 Ubuntu 平台为例介绍一下安装方法。

## 安装及汉化

首先在 GitKraken 官网下载安装包：

- GitKraken 官网： [https://www.gitkraken.com/](https://www.gitkraken.com/)

如果是 debian 系操系统可下载其中的 deb 版本，之后安装即可。

至于汉化，使用 Github 上的 [k-skye](https://github.com/k-skye)/[gitkraken-chinese](https://github.com/k-skye/gitkraken-chinese) 这个仓库即可完成。

方法很简单，安装好之后，使用汉化语言包替换原有的语言包即可。

```bash
# 首先备份官方语言包
mv /usr/share/gitkraken/resources/app.asar.unpacked/strings.json /usr/share/gitkraken/resources/app.asar.unpacked/strings.json.bk
# 从github拉取资源并替换
wget https://github.com/k-skye/gitkraken-chinese/raw/master/strings_8.1.1.json -O /usr/share/gitkraken/resources/app.asar.unpacked/strings.json

# 如果在国内访问 github 有困难
# 可使用 fastgit 提供的 github 国内镜像拉取
wget https://hub.fastgit.org/k-skye/gitkraken-chinese/raw/master/strings_8.1.1.json -O /usr/share/gitkraken/resources/app.asar.unpacked/strings.json
```

之后重启 GitKraken 即可。

![https://imagehost-cdn.frytea.com/images/2021/12/30/image031b80c4bef3b2af.png](https://imagehost-cdn.frytea.com/images/2021/12/30/image031b80c4bef3b2af.png)

## 参考文献

- [k-skye](https://github.com/k-skye)/[gitkraken-chinese](https://github.com/k-skye/gitkraken-chinese)
- [wget下载到指定目录并指定文件名](https://blog.csdn.net/linmingan/article/details/80008035)