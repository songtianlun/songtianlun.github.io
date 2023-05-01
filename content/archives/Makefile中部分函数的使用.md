---
title: "Makefile中部分函数的使用"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "466"
date: "2020-10-14 22:55:08"
---

## `foreach`

一、作用

循环处理文件列表。

二、格式

`$(foreach var text commond)`

`var`：局部变量

`text`：文件列表，空格隔开，每一次取一个值赋值为变量var

`commond`：对var变量进行操作（一般会使用var变量，不然没意义），每次操作结果都会以空格隔开，最后返回空格隔开的列表。

## `wildcard`

功能是展开成一列所有符合由其参数描述的文 件名，文件间以空格间隔。你可以像下面所示使用这个命令：

`SOURCES= $(wildcard *.c)`

这行会产生一个所有以 `.c` 结尾的文件的列表，然后存入变量 `SOURCES` 里。当然你不需要一定要把结果存入一个变量。

## `notdir`

把展开的文件的路径去掉，只显示文件名而不包含其路径信息，例如：

`FILES =$(notdir $(SOURCES))`

这行的作用是把上面以 `.c` 结尾的文件的文件列表中附带的路径去掉，只显示符合条件的文件名。

## `patsubst`

（ patten substitude, 匹配替换的缩写）函数。它需要3个参数：第一个是一个需要匹配的式样，第二个表示用什么来替换它，第三个是一个需要被处理的由空格分隔的字列。例如，处理那个经过上面定义后的变量，

`OBJS = $(patsubst %.c，%.o，$(SOURCES))`

这行将处理所有在 `SOURCES` 列个中的字（一列文件名），如果它的 结尾是 `.c`  ，就用 `.o`  把 `.c` 取代。注意这里的 `%` 符号将匹配一个或多个字符，而它每次所匹配的字串叫做一个‘柄’(stem) 。在第二个参数里， % 被解读成用第一参数所匹配的那个柄。

## 参考文献

- Makefile中foreach函数使用方法：[https://blog.csdn.net/yanlaifan/article/details/71402771](https://blog.csdn.net/yanlaifan/article/details/71402771)
- Makefile中wildcard、notdir、patsubst函数的用法：[https://blog.csdn.net/zqj6893/article/details/9066225](https://blog.csdn.net/zqj6893/article/details/9066225)
- Makefile中的wildcard用法：Makefile中的wildcard用法：[https://blog.csdn.net/liangkaiming/article/details/6267357](https://blog.csdn.net/liangkaiming/article/details/6267357)