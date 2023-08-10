---
title: "vim 代码折叠之设置默认代码不折叠"
date: 2021-11-03T14:22:02+08:00
description: "简单介绍 vim 代码折叠及配置"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

配置 `foldmethod` 可以定义折叠方式，有6种可选方式：

```
1. manual //手工定义折叠
2. indent //用缩进表示折叠
3. expr //用表达式来定义折叠
4. syntax //用语法高亮来定义折叠
5. diff //对没有更改的文本进行折叠
6. marker //用标志折叠
```

我选用 `syntax` 来定义折叠，这种方式比较简单，但是当配置完这个值后，你打开代码，就会发现 `vim` 默认把所有代码都折叠了，这显然不是我想要的，google一番后找到办法，设置 `foldlevelstart` 为99后，打开默认没有折叠。

配置：

```vimrc
"使用语法高亮定义代码折叠
set foldmethod=syntax

"打开文件时默认不折叠代码
set foldlevelstart=99
```

## 参考文献

- [vim的代码折叠：设置默认代码不折叠](https://www.cnblogs.com/huanlei/archive/2012/04/03/2430633.html)