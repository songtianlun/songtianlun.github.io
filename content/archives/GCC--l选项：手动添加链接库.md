---
title: "GCC -l选项：手动添加链接库"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "390"
date: "2020-07-03 10:06:02"
---

最近研究C语言CRC循环冗余校验，找到一个开源的库：

[lammertb/libcrc](https://github.com/lammertb/libcrc)

其中有实例代码，但是无论如何运行不起来，报错如下：

```bash
[root@frytea-dev-test examples]# gcc tstcrc.c -o tstcrc -L ~/libcrc/include
/tmp/ccEcajcY.o: In function `main':
tstcrc.c:(.text+0x2db): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x2f6): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x311): undefined reference to `update_crc_dnp'
tstcrc.c:(.text+0x330): undefined reference to `update_crc_sick'
tstcrc.c:(.text+0x34b): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x366): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x381): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x39c): undefined reference to `update_crc_kermit'
tstcrc.c:(.text+0x3b6): undefined reference to `update_crc_32'
tstcrc.c:(.text+0x42c): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x441): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x456): undefined reference to `update_crc_dnp'
tstcrc.c:(.text+0x46f): undefined reference to `update_crc_sick'
tstcrc.c:(.text+0x484): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x499): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x4ae): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x4c3): undefined reference to `update_crc_kermit'
tstcrc.c:(.text+0x4d7): undefined reference to `update_crc_32'
tstcrc.c:(.text+0x53d): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x554): undefined reference to `update_crc_16'
tstcrc.c:(.text+0x56b): undefined reference to `update_crc_dnp'
tstcrc.c:(.text+0x586): undefined reference to `update_crc_sick'
tstcrc.c:(.text+0x59d): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x5b4): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x5cb): undefined reference to `update_crc_ccitt'
tstcrc.c:(.text+0x5e2): undefined reference to `update_crc_kermit'
tstcrc.c:(.text+0x5f8): undefined reference to `update_crc_32'
collect2: error: ld returned 1 exit status
```

排查原因后发现是库没有连接，需要手动连接仓库下 `lib` 文件夹中的 `libcrc.a` 文件，运行如下编印命令成功编译：

```bash
gcc tstcrc.c -o tstcrc /root/libcrc/lib/libcrc.a
```

使用 `gcc` 究竟如何手动连接库呢，找到了一篇文章：

[GCC -l选项：手动添加链接库](http://c.biancheng.net/view/2382.html)

下面简单记录：

标准库的大部分函数通常放在文件 libc.a 中（文件名后缀 `.a` 代表“achieve”，译为“获取”），或者放在用于共享的动态链接文件 libc.so 中（文件名后缀 `.so` 代表“share object”，译为“共享对象”）。这些链接库一般位于 /lib/ 或 /usr/lib/，或者位于 `GCC` 默认搜索的其他目录。

当使用 `GCC` 编译和链接程序时， `GCC` 默认会链接 `libc.a` 或者 `libc.so`，但是对于其他的库（例如非标准库、第三方库等），就需要手动添加。

GCC 的 `-l` 选项（小写的 L）可以让我们手动添加链接库。

链接库的组成是怎样呢？以数学库为例，数学库的文件名是 `libm.a`。前缀 `lib` 和后缀 `.a` 是标准的， `m` 是基本名称，GCC 会在 `-l` 选项后紧跟着的基本名称的基础上自动添加这些前缀、后缀，s数学库中，基本名称为 `m`。

---

如多要连接其他目录中的库怎么办呢？

通常，GCC 会自动在标准库目录中搜索文件，例如 `/usr/lib`，如果想链接其它目录中的库，就得特别指明。有三种方式可以链接在 GCC 搜索路径以外的链接库，下面我们分别讲解。

1) 把链接库作为一般的目标文件，为 GCC 指定该链接库的完整路径与文件名。

例如，如果链接库名为 libm.a，并且位于 /usr/lib 目录，那么下面的命令会让 GCC 编译 main.c，然后将 libm.a 链接到 main.o：

[root@bogon demo]# gcc main.c -o main.out /usr/lib/libm.a

2) 使用 `-L` 选项，为 GCC 增加另一个搜索链接库的目录：

```bash
[root@bogon demo]# gcc main.c -o main.out -L/usr/lib -lm
```

可以使用多个 `-L` 选项，或者在一个 `-L` 选项内使用冒号分割的路径列表。

3) 把包括所需链接库的目录加到环境变量 `LIBRARYPATH` 中。

## 参考文献

- [LibCRC – Open Source CRC Library in C](https://www.libcrc.org/)
- [Linux 查看当前路径](https://blog.csdn.net/hudaweikevin/article/details/14161625)
- [GCC -l选项：手动添加链接库](http://c.biancheng.net/view/2382.html)
- [Error Deflate And Inflate With zLib](https://stackoverflow.com/questions/1632201/error-deflate-and-inflate-with-zlib)
- [lammertb/libcrc](https://github.com/lammertb/libcrc)