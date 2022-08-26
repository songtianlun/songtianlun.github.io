---
title: "deb 软件包里都有什么"
categories: [ "技术价值" ]
tags: [ "deepin","Ubuntu","debian","deb" ]
draft: false
slug: "591"
date: "2021-10-28 11:32:28"
---

日常工作学习常常会在 Debian 系操作系统中完成，特别是最近自己开始打包、安装，发现 .deb 安装包甚至可以包含内核，且 Debian 就是通过这种方式来管理内核的，那么 deb 软件包中究竟有那些内容呢？

**deb**是 [Debian](https://zh.wikipedia.org/wiki/Debian)[软件包](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E5%8C%85) 格式，[文件扩展名](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D) 为**.deb**，跟*Debian*的命名一样，deb也是因Debra Murdock（Debian创始人[Ian Murdock](https://zh.wikipedia.org/wiki/Ian_Murdock)的前妻）而得名。处理这些包的经典程序是 [dpkg](https://zh.wikipedia.org/wiki/Dpkg) ，经常是通过 [apt](https://zh.wikipedia.org/wiki/Apt) 来运作。

流行的的 Ubunut，国内的 Deepin、麒麟等操作系统都是使用这一软件包格式进行软件包管理和分发的，今天就来简单探索一下 deb 软件包中都有什么东西。

这里以 dpkg 软件包为例，看一下这其中都包括了那些内容：

```bash
$ ar t dpkg_1.19.7_amd64.deb
debian-binary
control.tar.gz
data.tar.xz
$ ar x dpkg_1.19.7_amd64.deb
$ ls
control.tar.gz  data.tar.xz  debian-binary  dpkg_1.19.7_amd64.deb
$ tar tJf data.tar.xz | head -n 16
...
./etc/dpkg/
./etc/dpkg/dpkg.cfg
./etc/dpkg/dpkg.cfg.d/
...
$ tar tJf control.tar.xz
...
./control
...
$ cat debian-binary
2.0
```

使用 `ar` （建立，修改档案或从档案中抽取成员的软件工具）可以看到 `Debian` 包的 **`ar`** 存档格式由三个文件组成：

- `debian-binary` : 指定软件包格式版本，在 Debian Buster 中它仍然是2.0版本。
- `control.tar.xz` : 包含所有可用的 **元信息**，比如包的 **名称** 和 **版本**，以及在(取消)安装之前、期间或之后运行的一些脚本。
- **`data.tar.xz`, `data.tar.bz2`, `data.tar.gz` : 包含要从包中提取的所有文件; 这是存储可执行文件、库、文档等的地方。**

这就是 deb 软件包中包含的内容，想要更详细的了解其中内容推荐大家阅读 《[Debian管理员手册](https://www.debian.org/doc/manuals/debian-handbook/)》，必将受益匪浅。

## 参考文献

- **[第 5 章 包管理系统：工具和基本原则](https://www.debian.org/doc/manuals/debian-handbook/packaging-system.zh-cn.html)** By 《Debian管理员手册》
- [deb By Wikipedia](https://zh.wikipedia.org/wiki/Deb)
- [深度操作系统 By Wikipedia](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)
- [deepin 国际排名 By distroWatch](https://distrowatch.com/table.php?distribution=deepin)