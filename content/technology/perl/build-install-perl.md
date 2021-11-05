---
title: "Perl 编译安装 （Linux）"
date: 2021-11-05T01:20:18Z
description: "Centos 下演示编译安装 Perl 环境的方法."
categories: ["技术笔记集","Perl 笔记"]
tags: ["linux", "perl"]
draft: false
---

**Perl**是[高端](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E8%AF%AD%E8%A8%80)、[通用](https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80)、[解释型](https://zh.wikipedia.org/wiki/%E7%9B%B4%E8%AD%AF%E8%AA%9E%E8%A8%80)、[动态](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80)的[编程语言家族](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80)。Perl借用了[C](https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80)、[sed](https://zh.wikipedia.org/wiki/Sed)、[awk](https://zh.wikipedia.org/wiki/AWK)、[shell](https://zh.wikipedia.org/wiki/Unix_shell)脚本、[Lisp](https://zh.wikipedia.org/wiki/Lisp)以及很多其他编程语言的特性。其中最重要的特性是Perl内部集成了[正则表达式](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)的功能，以及巨大的第三方代码库[CPAN](https://zh.wikipedia.org/wiki/CPAN)。

Perl语言应用广泛，涵盖[CGI](https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E7%BD%91%E5%85%B3%E6%8E%A5%E5%8F%A3)、图形编程、系统管理、网络编程、金融、生物等领域。由于其灵活性，Perl被称为[脚本语言](https://zh.wikipedia.org/wiki/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80)中的[瑞士军刀](https://zh.wikipedia.org/wiki/%E7%91%9E%E5%A3%AB%E5%86%9B%E5%88%80)。

在 Linux 发行版下使用指定包管理软件，常常只能安装指定的perl，如果需要安装特定版本 perl，就需要编译安装，下面以 Centos 环境为例介绍编译安装 Perl 的方法。

## 编译方法

- Step1: 安装依赖并获取源码

```bash
$ yum -y install make
$ yum -y install gcc

# 源码从这里获取： http://www.cpan.org/src/5.0/
# 以 perl 5.28.1 为例
$ wget http://www.cpan.org/src/5.0/perl-5.28.1.tar.gz
$ tar -xzf perl-5.28.1.tar.gz
$ cd perl-5.28.1
```

- Step2: 编译安装

```bash
$ ./Configure -des -Dprefix=$HOME/localperl
$ make
$ make test
$ make install
$ ln -s $HOME/localperl/bin/perl /usr/bin/perl
```

- Step3: 检测

```bash
perl -v
```

## 参考文献

- [Perl](https://zh.wikipedia.org/wiki/Perl) By Wikipedia
- [http://www.cpan.org/src/5.0/](http://www.cpan.org/src/5.0/)
- **[Perl 编译安装](https://blog.csdn.net/weixin_33843409/article/details/93010639)**
- **[How to build perl from source on Linux](https://perlmaven.com/how-to-build-perl-from-source-code)**