---
title: "Paralles Desktop 修改虚拟机用户密码"
categories: [ "技术" ]
tags: [ "macOS","Paralles Desktop" ]
draft: false
slug: "726"
date: "2023-01-11 10:42:51"
---

最近在使用 Paralles Desktop 过程中，发现一旦忘记用户密码，是一件挺麻烦的事情。尝试各种方法打不开 grub 启动菜单。

后来发现可以使用其提供的命令工具修改用户密码，很好用，在此记录：

```bash
# 首先获取虚拟机 UUID
$ prlctl list
UUID                                    STATUS       IP_ADDR         NAME
{fdf05394-dc61-4d07-b6e5-e81ef5277a64}  running      -               Ubuntu 22.04 ARM64

# 设定用户密码
$ prlctl set fdf05394-dc61-4d07-b6e5-e81ef5277a64 --userpasswd <USERNAME>:<PASSWORD>
Authentication tokens updated successfully.
Success. The operation was successfully completed.

The VM has been successfully configured.
```

## 参考文献

- [ MAC中Parallels Desktop windows忘记密码的解决办法](https://www.cnblogs.com/luojinping/p/3336350.html)