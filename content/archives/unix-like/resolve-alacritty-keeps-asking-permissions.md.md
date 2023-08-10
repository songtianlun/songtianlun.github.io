---
title: "解决 m1 macOS 下 Alacritty 解决不断请求权限问题"
date: 2022-10-17T11:29:39Z
description: "一行命令解决 Alacritty 不断请求权限问题."
categories: ["技术笔记集","macOS 笔记集"]
tags: ["unix", "darwin", "macos", "alacritty"]
draft: false
---

m1 芯片的 MacBook 在效能方面很强，但终端这一开发者最常用的工具却表现不佳，每次打开都会相比 x86 慢半拍。

终端的硬件需求并不高，因此推测这是 Rosetta 转译或是终端照搬了 `x86` 源码，没有针对 `arm64` 做优化导致。

[Alacritty](https://github.com/alacritty/alacritty) 是一款使用 rust 实现的跨平台的 OpengL 虚拟终端。相比 macOS 自带的终端以及 iterm2 运行效率更高。

截止 2022年10月17日，该项目在 Github 已经获得了 `42.4k` star，可见其受欢迎程度。

软件的安装和定制请自行查找文档，本文介绍解决其不断请求权限的问题。

![](https://imagehost-cdn.frytea.com/images/2022/10/17/2022101721359188e368b4c402ea6ec.png)

即使给了全盘权限，使用 Alacritty 时还是会不断弹出该警告，查看 GitHub 问题清单发现有不少人遇到该问题，推测是证书问题，解决方法也很简单：

```bash
$ sudo codesign --force --deep --sign - /Applications/Alacritty.app
```

运行过后，就不会再弹出警告，问题解决。

## 参考文献

- [ Alacritty keeps asking for permissions #5840 ](https://github.com/alacritty/alacritty/issues/5840)