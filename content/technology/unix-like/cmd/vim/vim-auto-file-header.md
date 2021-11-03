---
title: "VIM 文件自动添加头部注释的方法"
date: 2021-11-03T14:13:38+08:00
description: "一种 vim 创建文件时自动添加头部注释的方法"
categories: ["技术笔记集","vim 配置集"]
tags: ["linux", "vim"]
draft: false
---

修改 `/etc/vimrc` 或 `~/.vimrc`，在文件最后添加以下内容：

```bash
" 当新建 .h .c .hpp .cpp .mk .sh等文件时自动调用SetTitle 函数
autocmd BufNewFile *.[ch],*.hpp,*.cpp,Makefile,*.mk,*.sh exec ":call SetTitle()"
" 加入注释 
func SetComment()
        call setline(1,"/*================================================================")
        call append(line("."),   "*   Copyright (C) ".strftime("%Y")." IEucd Inc. All rights reserved.")
        call append(line(".")+1, "*   ")
        call append(line(".")+2, "*   文件名称：".expand("%:t"))
        call append(line(".")+3, "*   创 建 者：SongTL, songtianlun@comleader.com.cn")
        call append(line(".")+4, "*   创建日期：".strftime("%Y年%m月%d日"))
        call append(line(".")+5, "*   描    述：")
        call append(line(".")+6, "*")
        call append(line(".")+7, "================================================================*/")
        call append(line(".")+8, "")
        call append(line(".")+9, "")
endfunc
" 加入shell,Makefile注释
func SetComment_sh()
        call setline(3, "#================================================================")
        call setline(4, "#   Copyright (C) ".strftime("%Y")." IEucd Inc. All rights reserved.")
        call setline(5, "#   ")
        call setline(6, "#   文件名称：".expand("%:t"))
        call setline(7, "#   创 建 者：SongTL, songtianlun@comleader.com.cn")
        call setline(8, "#   创建日期：".strftime("%Y年%m月%d日"))
        call setline(9, "#   描    述：")
        call setline(10, "#")
        call setline(11, "#================================================================")
        call setline(12, "")
        call setline(13, "")
endfunc
" 定义函数SetTitle，自动插入文件头 
func SetTitle()
        if &filetype == 'make'
                call setline(1,"")
                call setline(2,"")
                call SetComment_sh()

        elseif &filetype == 'sh'
                call setline(1,"#!/system/bin/sh")
                call setline(2,"")
                call SetComment_sh()

        else
             call SetComment()
             if expand("%:e") == 'hpp'
                  call append(line(".")+10, "#ifndef _".toupper(expand("%:t:r"))."_H")
                  call append(line(".")+11, "#define _".toupper(expand("%:t:r"))."_H")
                  call append(line(".")+12, "#ifdef __cplusplus")
                  call append(line(".")+13, "extern \"C\"")
                  call append(line(".")+14, "{")
                  call append(line(".")+15, "#endif")
                  call append(line(".")+16, "")
                  call append(line(".")+17, "#ifdef __cplusplus")
                  call append(line(".")+18, "}")
                  call append(line(".")+19, "#endif")
                  call append(line(".")+20, "#endif //".toupper(expand("%:t:r"))."_H")

             elseif expand("%:e") == 'h'
                call append(line(".")+10, "#pragma once")
             elseif &filetype == 'c'
                call append(line(".")+10,"#include \"".expand("%:t:r").".h\"")
             elseif &filetype == 'cpp'
                call append(line(".")+10, "#include \"".expand("%:t:r").".h\"")
             endif
        endif
endfun
```

使用效果：

![https://imagehost-cdn.frytea.com/20200720192515.png](https://imagehost-cdn.frytea.com/20200720192515.png)

## 参考文献

- [vim创建程序文件自动添加头部注释](https://blog.csdn.net/luzhenrong45/article/details/53021748)
- [vim 配置文件.vimrc](https://www.jianshu.com/p/c8f4bbe048ac)
- [如何取消vim粘贴时自动注释功能](https://www.cnblogs.com/unixart/articles/5975812.html)
- [vi技巧之自动给新建的文件添加头部注释](https://blog.csdn.net/daoshuti/article/details/66970506)
- [Vim 自动文件头注释与模板定义](https://blog.fazero.me/2015/09/15/%E8%AE%A9%E7%BB%88%E7%AB%AF%E8%B5%B0%E4%BB%A3%E7%90%86%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95/)