---
title: "Vim 多窗口、多文件之间切换"
date: 2021-11-03T14:24:33+08:00
description: "介绍 vim 多窗口以及多文件之间的切换方法"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

## 一、vim 多文件、多窗口

1.  `vim` 还没有启动的时候在终端里输入：

`vim file1 file2 ... filen` 便可以打开所有想要打开的文件

2. `vim` 已经启动时输入：

`:e file`

可以再打开一个文件，并且此时vim里会显示出file文件的内容。

3. 同时显示多个文件：

`:sp`         //水平切分窗口

`:vsplit`     //垂直切分窗口

## 二、vim 多端切换

1.  文件间切换

`Ctrl+6`  //两文件间的切换

`:bn`      //下一个文件

`:bp`      //上一个文件

`:ls`       //列出打开的文件，带编号

`:b1~n`  //切换至第n个文件

对于用(v)split在多个窗格中打开的文件，这种方法只会在当前窗格中切换不同的文件。

2. 在窗格间切换的方法

`Ctrl + w + 方向键` ——切换到前／下／上／后一个窗格

`Ctrl + w + h/j/k/l`  ——同上

`Ctrl + ww` ——依次向后切换到下一个窗格中

## 参考文献

- vim打开多窗口、多文件之间的切换：[https://blog.csdn.net/qq_22716879/article/details/50810449](https://blog.csdn.net/qq_22716879/article/details/50810449)