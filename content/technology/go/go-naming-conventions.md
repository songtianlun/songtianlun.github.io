---
title: "Go 语言命名规范整理"
date: 2022-11-08T02:44:16+08:00
description: "GO 语言精简命名规范汇集."
categories: ["技术笔记集"]
tags: ["go"]
cover:
    image: "https://imagehost-cdn.frytea.com/images/2022/11/08/202211081715882a02e5b310c1ff688.png" # image path/url
    alt: "cover" # alt text
    #caption: "My first" # display caption under cover
    relative: true # when using page bundles set this to true
    hidden: false # only hide on current single page
draft: false
---

本文内容整理自《Go语言精进之路：从新手到高手的编程思想、方法和技巧1》。

GO 语言语法简单，容易上手，相关的代码风格约束也相对较少。但查阅网络发现排在前几的都总结的不是很好。

正好前期阅读了 《Go语言精进之路：从新手到高手的编程思想、方法和技巧1》 这本书，受益匪浅，特将其中命名规范部分做了整理分享出来，详情还是建议大家找来原书阅读。

下面是较重要的几条规范，推荐阅读。

## 1、包

> 对于Go中的包（package），一般建议以小写形式的单个单词命名。

原则：
（1）包名应尽量与包导入路径（import path）的最后一个路径分段保持一致；
（2）仅要考虑包自身的名字，还要兼顾该包导出的标识符（如变量、常量、类型、函数等）的命名。

## 2、变量、类型、函数和方法

> Go语言官方要求标识符命名采用驼峰命名法（CamelCase）

原则：

(1)为**变量、类型、函数和方法**命名时以**简单、短小**为首要原则；
(2) 保持变量声明与使用之间的**距离越近越好**，或者在第一次使用变量之前声明该变量；
(3) 变量名字中不要带有类型信息（原因见原则2）；
(4) 保持简短命名变量含义上的一致性，例如：

  - `i -> index, 
  - `v -> value`, 
  - `k -> key`, 
  - `t -> time`, 
  - `b -> byte`）

特征：

•  **循环和条件**变量多采用**单个字母**命名（如 `i`, `j`, `k`, `v` ）；
•  **函数/方法**的**参数**和**返回值**变量以**单个单词**或**单个字母**为主；
•  **方法**的命名以**单个单词**为主；
•  **函数**多以**多单词的复合词**进行命名；
•  **类型**多以**多单词的复合词**进行命名。

## 3、常量

原则：
（1）常量多使用多单词组合的方式命名；
（2）可以对名称本身就是全大写的特定常量使用全大写的名字 (如 `PI` )。

举例：
```go
// $GOROOT/src/net/http/request.go

const (
    defaultMaxMemory = 32 << 20 // 32 MB
)

// $GOROOT/src/math/sin.go
const (
    PI4A = 7.85398125648498535156E-1  // 0x3fe921fb40000000,
    PI4B = 3.77489470793079817668E-8  // 0x3e64442d00000000,
    PI4C = 2.69515142907905952645E-15 // 0x3ce8469898cc5170,
)

// $GOROOT/src/syscall/zerrors_linux_amd64.go
// 信号
const (
    SIGABRT   = Signal(0x6)
    SIGALRM   = Signal(0xe)
    SIGBUS    = Signal(0x7)
    SIGCHLD   = Signal(0x11)
    ...
)
```

## 4、接口

原则：
（1）Go语言的惯例是用“ `方法名+er` ”命名；
（2）Go语言推荐尽量定义小接口，并通过接口组合的方式构建程序。


举例：
```go
// $GOROOT/src/io/io.go

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Reader interface {
    Read(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}
```


## 总结

GO 语言语法相对简单，在降低代码风格方面做了很多工作。命名规范的意义在于遵守和使用，还是要在平时多多注意，有空多阅读标准库或其他优质代码，学习代码风格，体会其背后的深刻内涵。

本文是对《Go语言精进之路：从新手到高手的编程思想、方法和技巧1》书中命名规范部分做了整理总结，详细了解请查看原书内容。

本文内容仅用于学习之用，若有侵权请与我联系，立即删除。

## 参考文献

- 《Go语言精进之路：从新手到高手的编程思想、方法和技巧1》
- [Naming Conventions in Go: Short but Descriptive](https://betterprogramming.pub/naming-conventions-in-go-short-but-descriptive-1fa7c6d2f32a)