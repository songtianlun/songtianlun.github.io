---
title: "Vim 对比文件差异 | Linux 下同屏查看文件差异并修改"
categories: [ "编程开发" ]
tags: [ "vim" ]
draft: false
slug: "594"
date: "2021-11-08 12:31:37"
---

在 windows 下有如 Beyond Compare 这样的文本对比工具，而在 Linux 其实预装了很好用的文本对比工具 → `vimdiff`

使用方法很简单：

```bash
vimdiff [options] file1 file2 [file3 [file4]]
```

比如这样：

```bash
vimdiff Release Release.new
```

效果是这样的：

![https://imagehost-cdn.frytea.com/images/2021/11/08/2021-11-08-12-28-16e0dfc839621b06b8.png](https://imagehost-cdn.frytea.com/images/2021/11/08/2021-11-08-12-28-16e0dfc839621b06b8.png)

可以使用 `Ctrl + w + 方向键 # 切换到前／下／上／后一个窗格` 切换窗格，使用 `i` 进行编辑，操作同多窗口 `Vim` ，使用起来很方便，效果很惊艳，效率很高。

## 参考文献

- [Vim 多窗口、多文件之间切换](https://www.frytea.com/technology/unix-like/cmd/vim/vim-mult-windows-switch/) By Frytea
- [vim同屏观察两个文件得diff](https://blog.csdn.net/weixin_40829917/article/details/80897260)