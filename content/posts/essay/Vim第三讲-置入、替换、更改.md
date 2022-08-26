---
title: "Vim第三讲 置入、替换、更改"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "393"
date: "2020-07-03 18:05:52"
---

## 3.1 置入类命令

```bash
** 输入 p 将最后一次删除的内容置入光标之后。 **
# example
---> b) Violets are blue,
---> c) Intelligence is learned,
---> d) Can you learn too?
---> |a) Roses are red,
$ dd
|
---> b) Violets are blue,
---> c) Intelligence is learned,
---> d) Can you learn too?
$ p
|---> a) Roses are red,
---> b) Violets are blue,
---> c) Intelligence is learned,
---> d) Can you learn too?
```

## 3.2 替换

```bash
** 输入 r 和一个字符替换光标所在位置的字符。**
# example
--->  Whan this lime was t|uoed in, someone presswd some wrojg keys!
--->  When this line was typed in, someone pressed some wrong keys!
$ ry
--->  Whan this lime was t|yoed in, someone presswd some wrojg keys!
--->  When this line was typed in, someone pressed some wrong keys!
```

## 3.3 更改

```bash
** 要改变文本直到一个单词的末尾，请输入 ce **
# example
---> This line has a few w|ptfd that mrrf changing usf the change operator.
---> This line has a few words that need changing using the change operator.
$ ce ords
---> This line has a few words| that mrrf changing usf the change operator.
---> This line has a few words that need changing using the change operator.
$ <Esc>
```

## 3.4 使用c更改更多

```bash
** 更改类操作符可以与删除中使用的同样的动作配合使用。 **\
# example
---> The end of this line needs |some help to make it like the second.
---> The end of this line needs to be corrected using the  c$  command.
$ c$ to be corrected using the  c$  command.
---> The end of this line needs to be corrected using the  c$  command.|
---> The end of this line needs to be corrected using the  c$  command.
$ <Esc>
```

## 总结

1. 要重新置入已经删除的文本内容，请按小写字母 `p` 键。该操作可以将已删除
的文本内容置于光标之后。如果最后一次删除的是一个整行，那么该行将置
于当前光标所在行的下一行。
2. 要替换光标所在位置的字符，请输入小写的 `r` 和要替换掉原位置字符的 `新字
符` 即可。
3. 更改类命令允许您改变从当前光标所在位置直到动作指示的位置中间的文本。
比如输入 `ce` 可以替换当前光标到单词的末尾的内容；输入 `c$` 可以替换当
前光标到行末的内容。
4. 更改类命令的格式是：

    ```
    c   [number]   motion
    ```