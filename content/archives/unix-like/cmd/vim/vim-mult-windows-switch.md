---
title: "Vim 多窗口、多文件之间切换"
date: 2021-11-03T14:24:33+08:00
description: "介绍 vim 多窗口以及多文件之间的切换方法"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

## 一、vim 多文件、多窗口

```bash
$ vim file1 file2 ... filen # 打开所有想要打开的文件
```
或在 vim 中使用以下命令：
```vim
:e file     # 在当前 vim 中再打开一个文件，此时vim里会显示出file文件的内容。
:sp         # 水平切分窗口
:vsplit     # 垂直切分窗口
```

## 二、vim 多端切换

```vim
# 文件间切换
Ctrl+6  //两文件间的切换
:bn      //下一个文件
:bp      //上一个文件
:ls       //列出打开的文件，带编号
:b1~n  //切换至第n个文件

# 窗格间切换
Ctrl + w + 方向键    # 切换到前／下／上／后一个窗格
Ctrl + w + h/j/k/l  # 同上
Ctrl + ww           # 依次向后切换到下一个窗格中
# 注：对于用(v)split在多个窗格中打开的文件，这种方法只会在当前窗格中切换不同的文件。

```

## 参考文献

- [vim打开多窗口、多文件之间的切换](https://blog.csdn.net/qq_22716879/article/details/50810449)