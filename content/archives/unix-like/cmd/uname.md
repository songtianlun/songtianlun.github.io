---
title: "Uname"
date: 2021-10-31T11:47:24+08:00
description: "打印当前计算机和操作系统的名称、版本及其他细节."
categories: ["技术笔记集","Linux 命令集"]
tags: ["linux","uname"]
draft: false
---

**uname**（*unix name*的简写）是一个[Unix](https://zh.wikipedia.org/wiki/Unix)和[类Unix](https://zh.wikipedia.org/wiki/%E7%B1%BBUnix%E7%B3%BB%E7%BB%9F)[操作系统](https://zh.wikipedia.org/wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)上的[程序](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A8%8B%E5%BA%8F)，可以打印当前计算机和操作系统的名称、版本及其他细节[^1]。

[^1]: [uname](https://zh.wikipedia.org/wiki/Uname) By Wikipedia

不加参数时默认行为等价于 `uname -s`，使用 `-a` 可打印所有信息，其内容对应如下：

```bash
$ uname
Linux hci 5.4.73-1-pve #1 SMP PVE 5.4.73-1 (Mon, 16 Nov 2020 10:52:16 +0100) x86_64 GNU/Linux
↑↑↑↑↑ ↑↑↑ ↑↑↑↑↑↑↑↑↑↑↑↑ ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ↑↑↑↑↑↑ ↑↑↑↑↑↑↑↑↑
  1    2        3                                4                              5       6

1 -> kernal name
2 -> node name
3 -> kernal release
4 -> kernal version
5 -> machine hardware name
6 -> operating system
```

在 unix-like 系统（如 Debian） 上使用 `man uname` 查看到的帮助信息如下：

```bash
**NAME
       uname - print system information

SYNOPSIS
       uname [OPTION]...

DESCRIPTION
       Print certain system information.  With no OPTION, same as -s.

       -a, --all
              print all information, in the following order, except omit -p and -i if unknown:

       -s, --kernel-name
              print the kernel name

       -n, --nodename
              print the network node hostname

       -r, --kernel-release
              print the kernel release

       -v, --kernel-version
              print the kernel version

       -m, --machine
              print the machine hardware name

       -p, --processor
              print the processor type (non-portable)

       -i, --hardware-platform
              print the hardware platform (non-portable)

       -o, --operating-system
              print the operating system

       --help display this help and exit

       --version
              output version information and exit

AUTHOR
       Written by David MacKenzie.

REPORTING BUGS
       GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
       Report uname translation bugs to <https://translationproject.org/team/>

COPYRIGHT
       Copyright  ©  2018  Free  Software Foundation, Inc.  License GPLv3+: GNU GPL version 3 or later
       <https://gnu.org/licenses/gpl.html>.
       This is free software: you are free to change and redistribute it.  There is  NO  WARRANTY,  to
       the extent permitted by law.

SEE ALSO
       arch(1), uname(2)

       Full documentation at: <https://www.gnu.org/software/coreutils/uname>
       or available locally via: info '(coreutils) uname invocation'**
```

## 参考文献

- [uname](https://zh.wikipedia.org/wiki/Uname) By Wikipedia