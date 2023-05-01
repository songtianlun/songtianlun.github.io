---
title: "根本解决C程序 ignoring return value of ‘***’"
categories: [ "技术" ]
tags: [ "C" ]
draft: false
slug: "641"
date: "2022-11-02 13:22:00"
---

最近在移植一个 C 项目时出现如下报错：

```
xxxxxx.c:990:4: error: ignoring return value of ‘chroot’, declared with attribute warn_unused_result [-Werror=unused-result]
  990 |    chroot("/");
```

之所以报错等级为 Error ，是因为 GCC 编译具有参数 `-Werror`，将警告当作错误：

```
gcc -std=gnu99 -Wall -Werror -Wno-unknown-pragmas -Wno-strict-aliasing -Wpedantic -g -O2 -Wl,-z,relro -I. -D_FILE_OFFSET_BITS=64 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -I/usr/include/fuse -c -o xxxxxx.o xxxxxx.c -MMD -MT pmxcfs.o -MF xxxxxx.o.d
```

去掉这一编译参数治标不治本。最根本的解决办法是去源码找到出问题的地方，处理一下返回值，或者这样手动忽略错误，并辅以注释：

```c
- chown(RUNDIR, 0, cfs.gid);
+ # TODO 临时处理，忽略返回值
+ # 后期需根据实际情况处理错误码
+ if(chown(RUNDIR, 0, cfs.gid)){};
```

再次编译解决。

## 参考文献

- [Warning: ignoring return value of 'scanf', declared with attribute warn_unused_result](https://stackoverflow.com/questions/7271939/warning-ignoring-return-value-of-scanf-declared-with-attribute-warn-unused-r)