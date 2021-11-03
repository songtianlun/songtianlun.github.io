---
title: "Vim 版本升级（Vim8）"
date: 2021-11-03T14:17:50+08:00
description: "源码编译安装新版 vim 的方法"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

## 安装步骤

### 第一步，下载源码

到[Vim官方Github仓库](https://github.com/vim/vim/releases)下载目前最新的Vim Release版本

```bash
wget https://codeload.github.com/vim/vim/tar.gz/v8.2.1258
```

### 第二步，解压

```bash
$ mv v8.2.1258  vim-v8.2.1258.tar.gz
$ tar -xvzf vim-v8.2.1258.tar.gz
```

### 第三步，编译安装

```bash
$ cd vim-8.2.1258/
$ ./configure --prefix=$HOME/.local --enable-python3interp=yes && make && make install
```

- 这里注意一下我们需要用configure配置一下安装的路径，将Vim8安装到自己账户的目录下，避免干扰到系统上的其他用户
- `--enable-python3interp=yes` 添加 python3 支持

在这里可能会遇到 `no terminal library found` 错误：

```bash
no terminal library found
checking for tgetent()… configure: error: NOT FOUND!
      You need to install a terminal library; for example ncurses.
      Or specify the name of the library with –with-tlib.
```

解决方法：

```
# Ubuntu下解决方法：
$ sudo apt install libncurses5-dev

# CentOS 下
$ yum install ncurses-devel.x86_64

# 完成后重新进行这一步，建议删除
```

### 第四步，链接

利用alias将vim指令定向到刚刚安装的vim8，同时修改.bashrc确保之后一直能生效

```bash
alias vim='~/.local/bin/vim'
echo "alias vim='~/.local/bin/vim'" >> ~/.bashrc
```

### 第五步，检查

```bash
vim --version
```

## 参考文献

- [CentOS7 上Vim8升级安装指南](https://blog.csdn.net/Kexiii/article/details/83928540)
- [CentOS 编译vim no terminal library found](https://blog.csdn.net/cuijianzhi/article/details/78652745)