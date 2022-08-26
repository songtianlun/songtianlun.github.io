---
title: "Vim第二讲 删除、重复、撤销"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "392"
date: "2020-07-03 18:05:38"
---

## 2.1 简单命令

```bash
** 输入 dw 可以从光标处删除至一个单词的末尾。**
# example
---> Tha words don't |belong paper in this sentence.
$ dw
---> Tha words don't paper in this sentence.
```

## 2.2 更多删除

```bash
** 输入 d$ 从当前光标删除到行末。**
# example
---> |Somebody typed the end of this line twice. end of this line twice.
$ d$
---> |
```

## 2.3 命令和对象

```bash
许多改变文本的命令都由一个操作符和一个动作构成。
  使用删除操作符 d 的删除命令的格式如下：

        d   motion

  其中：
    d      - 删除操作符。
    motion - 操作符的操作对象(在下面列出)。

  简单的动作列表：
    w - 从当前光标当前位置直到下一个单词起始处，不包括它的第一个字符。
    e - 从当前光标当前位置直到单词末尾，包括最后一个字符。
    $ - 从当前光标当前位置直到当前行末。

  因此输入 de 会从当前光标位置删除到单词末尾。
```

## 2.4 重复动作计数器

```bash
** 在动作前输入数字会使它重复那么多次。 **
# example
---> This is just a |line with words you can move around in.
  1. 输入 2w 使光标向前移动两个单词。
---> This is just a line with |words you can move around in.
  2. 输入 3e 使光标向前移动到第三个单词的末尾。
---> This is just a line with words you can| move around in.
  3. 输入 0 (数字零) 移动光标到行首。
---> |This is just a |line with words you can move around in.
```

## 2.5 删除更多

```bash
# 使用格式
d   number(数字)   motion
# example
--->  this |ABC DE line FGHI JK LMN OP of words is Q RS TUV cleaned up.
$ d2w
--->  this |line FGHI JK LMN OP of words is Q RS TUV cleaned up.
$ d3e
--->  this line  |OP of words is Q RS TUV cleaned up.
```

## 2.6 删除整行

```bash
** 输入 dd 可以删除整一个当前行。 **
# exmample
--->  |1)  Roses are red,
--->  2)  Mud is fun,
--->  3)  Violets are blue,
--->  4)  I have a car,
--->  5)  Clocks tell time,
--->  6)  Sugar is sweet
--->  7)  And so are you.
$ dd
|--->  2)  Mud is fun,
--->  3)  Violets are blue,
--->  4)  I have a car,
--->  5)  Clocks tell time,
--->  6)  Sugar is sweet
--->  7)  And so are you.
$ 2dd
|--->  4)  I have a car,
--->  5)  Clocks tell time,
--->  6)  Sugar is sweet
--->  7)  And so are you.
```

## 2.7 撤销命令

```bash
** 输入 u 来撤消最后执行的命令，输入 U 来撤消对整行的修改。 **
** CTRL-R 重做被撤消的命令 **
```

## 总结

1. 欲从当前光标删除至下一个单词，请输入： `dw`
2. 欲从当前光标删除至当前行末尾，请输入： `d$`
3. 欲删除整行，请输入： `dd`
4. 欲重复一个动作，请在它前面加上一个数字： `2w`
5. 在正常模式下修改命令的格式是：
`operator [number] motion`
其中：
`operator` - 操作符，代表要做的事情，比如 d 代表删除
`[number]` - 可以附加的数字，代表动作重复的次数
`motion` - 动作，代表在所操作的文本上的移动，例如 w 代表单词(word)，
`$` 代表行末等等。
6. 欲移动光标到行首，请按数字0键： `0`
7. 欲撤消以前的操作，请输入： `u`  (小写的u)
欲撤消在一行中所做的改动，请输入： `U` (大写的U)
欲撤消以前的撤消命令，恢复以前的操作结果，请输入： `CTRL-R`