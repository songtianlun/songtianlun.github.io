---
title: "Windows CMD 换肤"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "518"
date: "2021-03-03 09:28:25"
---

由于经常使用到 Windows 下的 CMD 终端进行各种操作，特别是集成了 Ubuntu 子系统之后，在 Windows 平台上进行 C 开发更方便了。为了呼出 WSL 子系统，我习惯在 CMD 下进行，可默认皮肤不够美观，为了让自己心情愉悦，检索了一番换肤方法，并在此简单记录。

## 环境准备

首先下载换肤工具：[ColorTool](https://github.com/microsoft/terminal/releases/tag/1904.29002)

解压后在 CMD 下进入解压后的目录，运行例如以下命令即可：

```

C:\Users\lenovo\Downloads\ColorTool>ColorTool.exe -b schemes\OneHalfDark.itermcolors

```

## 效果预览

目录中提供了几种配色，在这里简单展示一下效果：

- deuteranopia.itermcolors

![](https://imagehost-cdn.frytea.com/images/2021/03/03/20210303092451b722d9761b91feae.png)

- OneHalfDark.itermcolors

![](https://imagehost-cdn.frytea.com/images/2021/03/03/202103030925107721cf96cdcf782b.png)

- OneHalfLight.itermcolors

![](https://imagehost-cdn.frytea.com/images/2021/03/03/202103030925456a86e4bfd8813029.png)

- solarized_dark.itermcolors

![](https://imagehost-cdn.frytea.com/images/2021/03/03/20210303092604071efabd48b3fdd8.png)

- solarized_light.itermcolors

![](https://imagehost-cdn.frytea.com/images/2021/03/03/2021030309262733c5c9ddae1a6104.png)

个人比较喜欢 `OneHalfDark.itermcolors` 这一款，你最喜欢哪一个呢？

## 参考文献

- [ColorTool-README](https://github.com/microsoft/terminal/tree/main/src/tools/ColorTool)
- [cmd 更换主题配色](https://blog.csdn.net/weixin_42737761/article/details/100182200)
