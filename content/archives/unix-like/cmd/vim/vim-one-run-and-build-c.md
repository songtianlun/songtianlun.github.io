---
title: "Vim 一键编译运行 C/C++"
date: 2021-11-03T14:30:19+08:00
description: "一种按键映射自动编译运行 C/C++ 的方法"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

下面这段 `vimrc` 配置提供了一个按键映射，实现一键编译运行 C/C++

**参考脚本：**

```vimrc
" Compile function
noremap r :call CompileRunGcc()<CR>
function! CompileRunGcc()
  execute "w"
  if &filetype == 'c'
    if !isdirectory('build')
      execute "!mkdir build"
    endif
    execute "!gcc % -o build/%<"
    execute "!time ./build/%<"
  endifendfunction
```

第1行把编译函数映射到“r”这个按键，可以一键执行编译函数。

第2行开始定义编译函数CompileRunGcc()。

第3行保存文件。

第4行判断当前文件是否是c文件。

第5行判断当前路径下是否存在“build”这个文件夹。

第6行，如果没有“build”这个文件夹就创建，若存在就会继续往下执行。

第5、6行比较中重要，目的是把编译好的二进制文件放到“build”这个文件夹下，防止污染当前的工作目录。

## 参考文献

- Vim一键编译运行C，且不污染当前工作目录：[https://zhuanlan.zhihu.com/p/161521556](https://zhuanlan.zhihu.com/p/161521556)