---
title: "Linux下文件系统技巧 | 统计个数 | 只见文件或目录"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "439"
date: "2020-08-24 10:42:00"
---

## 统计个数

查看某目录下文件的个数

```bash
$ ls -l | grep "^-" | wc -l

# example
$ ls -l /etc | grep "^-" | wc -l
134
```

或

```bash
$ find ./company -type f | wc -l

# Example 
$ sudo find /etc -type f | wc -l
3829
```

查看某目录下文件的个数，包括子目录里的。

```bash
$ ls -lR | grep "^-" | wc -l

# example
$ sudo ls -lR /etc | grep "^-" | wc -l
3822
```

查看某文件夹下目录的个数，包括子目录里的。

```bash
$ ls -lR | grep "^d" | wc -l

# Example
$ sudo ls -lR /etc | grep "^d" | wc -l
1175
```

说明：

```jsx
ls -l
```

长列表输出该目录下文件信息(注意这里的文件，不同于一般的文件，可能是目录、链接、设备文件等)

```jsx
grep "^-"
```

这里将长列表输出信息过滤一部分，只保留一般文件，如果只保留目录就是 `^d`

```jsx
wc -l
```

统计输出信息的行数，因为已经过滤得只剩一般文件了，所以统计结果就是一般文件信息的行数，又由于一行信息对应一个文件，所以也就是文件的个数。

## 其他技巧

只显示目录名， `grep` 与 `^` 之间有空格

```jsx
ls -l | grep ^
```

只显示文件

```jsx
ls -l | grep ^-
```

统计当能目录下的文件数

```jsx
ls -l | grep ^- | wc -l
```

## 参考文献

- [转: Linux下统计目录及子目录文件个数](https://blog.csdn.net/lllxy/article/details/3278170)