---
title: "Linux 下 Shell 命令寻址顺序"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "544"
date: "2021-07-06 16:32:10"
---

## 起源

当出现 `PATH` 下有一个与系统命令重名的命令时，先执行哪一个呢？当 `PATH` 下有多个重名命令，会执行哪一个呢？这就涉及到 SHELL 执行命令的寻找顺序。

## 默认顺序

shel在执行命令时，并不是直接就在PATH路径中查找，而是按照固定的位置依次寻找命令。

**搜索顺序如下，**

1、别名，使用 **alias** 创建的命令。

2、关键字，如if，for。

3、函数

4、内置命令，如cd，pwd等

5、外部命令，在PATH路径中寻找

## 指定位置

如果我想执行的是我自己的程序cd呢？或者跳过1，2，3直接执行内置命令呢？那么这时候就用到**command**和**builtin**这两个命令了。

- `command` ，执行PATH下的命令。
- `builtin` ，执行内置命令。

## PATH中的查找顺序

linux执行命令时在 `PATH` 中的查找顺序是从前往后查找的。

如 `/dir1` 和 `/dir2` 目录下有同一个文件 `test` ，执行 `export PATH=/dir1:/dir2:$PATH` 之后，由于 `dir1` 在 `dir2` 前面，所以执行 test 时会执行 dir1 中的 test

所以一个比较好的习惯是，导出 `PATH` 时将新增的路径放在前面如：

```bash
export PATH=/xxx:$PATH
```

## 参考文献

- [Linux--shell寻找命令的顺序](https://blog.csdn.net/iPenX/article/details/78546808)
- [linux执行命令时在PATH中的查找顺序](http://luopeng.org/?p=60)