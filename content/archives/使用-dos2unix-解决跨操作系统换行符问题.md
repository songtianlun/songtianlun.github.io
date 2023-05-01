---
title: "使用 dos2unix 解决跨操作系统换行符问题"
categories: [ "技术" ]
tags: [ "windows","emacs","dos2unix","unix" ]
draft: false
slug: "728"
date: "2023-01-16 08:29:00"
---

`dos2unix` 是将 `Windows` 格式文件转换为 `Unix/Linux` 格式的实用命令。

> `unix2dos` 则是和 `dos2unix` 互为孪生的一个命令，将 `Linux&Unix` 格式文件转换为 `Windows` 格式文件的命令。

各个操作系统安装方法如下：

```bash
OS X
    brew install dos2unix
Debian
    apt-get install dos2unix 
Ubuntu
    apt-get install dos2unix 
Alpine
    apk add dos2unix 
Arch Linux
    pacman -S dos2unix 
Kali Linux
    apt-get install dos2unix 
CentOS
    yum install dos2unix 
Fedora
    dnf install dos2unix 
Windows (WSL2)
    sudo apt-get update sudo apt-get install dos2unix 
Raspbian
    apt-get install dos2unix 
Dockerfile
    dockerfile.run/dos2unix 
Docker
    docker run cmd.cat/dos2unix dos2unix
```

下面以 [15分钟学会Emacs Lisp](https://learnxinyminutes.com/docs/zh-cn/elisp-cn/) 教学源文件为例展示效果。

```bash
$ dos2unix learn-emacs-lisp-zh.el
dos2unix: converting file learn-emacs-lisp-zh.el to Unix format...
```

转换前后的对比如下：

> 上方是转换后的文件，下方是转换前的文件，使用 Emacs 打开。

![](https://imagehost-cdn.frytea.com/images/2023/01/15/202301151422045894f5ed3a790256c.png)

可以看到，转换前该文件使用的是 Windows 风格的换行符，转换后该文件使用 Unix 风格换行符。

> Unix 系统中：每行结尾只有 "<换行>"，即 `\n`；
> Windows 系统中：每行结尾是 "<回车><换行>"，即 `\r\n`；
> Mac 系统中：每行结尾是 "<回车>"，即 `\r`"。

## 参考文献

- [dos2unix - Command Not Found](https://command-not-found.com/dos2unix)
- [Linux、Windows 和 Mac 中的换行符对比](https://www.cnblogs.com/cnjavahome/p/8893813.html)
- [Linux命令学习总结：dos2unix - unix2dos](https://www.cnblogs.com/kerrycode/p/5077969.html)

