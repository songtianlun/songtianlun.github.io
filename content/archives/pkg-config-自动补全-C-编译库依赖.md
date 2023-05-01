---
title: "pkg-config 自动补全 C 编译库依赖"
categories: [ "技术" ]
tags: [ "linux","C" ]
draft: false
slug: "719"
date: "2023-01-05 08:43:52"
---

pkg-config 是一个在源代码编译时查询已安装的库的使用接口的计算机工具软件。

## 工作原理

其工作原理如下：
当安装一个库时（例如从[RPM](https://zh.wikipedia.org/wiki/RPM%E5%A5%97%E4%BB%B6%E7%AE%A1%E7%90%86%E5%93%A1 "RPM套件管理员")，[deb](https://zh.wikipedia.org/wiki/Deb "Deb")或其他二进制包管理系统），会包括一个后缀名为 `pc` 的文件，它会放入某个文件夹下（依赖于你的系统设置）。
例如，在 `Linux` 为该软件的库文件所在文件夹 `lib` 之下的子文件夹 `pkgconfig` 。
并把该子文件夹加入 `pkg-config` 的环境变量 `PKG_CONFIG_PATH` 作为搜索路径，例如在 `bash` 配置文件中加入一行：

```bash
$ export PKG_CONFIG_PATH=/usr/local/`库的名字`/lib/pkgconfig:$PKG_CONFIG_PATH
```

在这个.pc文件里包含有数个条目。这些条目通常包含用于其他使用这个库的程序编译时需要的库设置，以及[头文件](https://zh.wikipedia.org/wiki/%E5%A4%B4%E6%96%87%E4%BB%B6 "头文件")的位置，版本信息和一个简介。

这是一个用于[libpng](https://zh.wikipedia.org/w/index.php?title=Libpng&action=edit&redlink=1 "Libpng（页面不存在）")的.pc文件的样例:

```pc
prefix=/usr/local  
 exec_prefix=${prefix}  
 libdir=${exec_prefix}/lib  
 includedir=${exec_prefix}/include  
    
 Name: libpng12  
 Description: Loads and saves PNG files  
 Version: 1.2.8  
 Libs: -L${libdir} -lpng12 -lz  
 Cflags: -I${includedir}/libpng12
```

这个文件告诉我们这些库可以在/usr/local/lib找到，头文件可以在/usr/local/include里找到，库的名字是libpng12并且版本号是1.2.8。它也提供了用于编译依赖于libpng的源代码时需要的链接器参数。

这儿是一个编译时使用pkg-config的样例:

```bash
gcc -o test test.c $(pkg-config --libs --cflags libpng)
```


`pkg-config` 同其他命令一样，有很多选项，不过我们一般只会用到 `--libs` 和 `--cflags` 选项，分别用于搜索指定头文件和库文件。

在 Makefile 中则是这样来用：

```Makefile
...
DEPENDENCIES=libcpg libcmap libquorum libqb glib-2.0 fuse sqlite3 librrd

CFLAGS += -I.
CFLAGS += $(shell pkg-config --cflags ${DEPENDENCIES})

LDFLAGS += $(shell pkg-config --libs ${DEPENDENCIES})

.c.o:
        $(CC) $(CFLAGS) -c -o $@ $< -MMD -MT $@ -MF $@.d
...
```

## 参考文献

- [pkg-config - WikiPedia](https://zh.wikipedia.org/zh-hans/Pkg-config)
- [pkg-config原理及用法](https://www.cnblogs.com/sddai/p/10266624.html)

