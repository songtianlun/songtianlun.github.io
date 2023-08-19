---
title: 'vim 分割窗口打开内建 shell'
date: '2023-07-25T09:23:36.456Z'
tags: ['vim']
created: '2023-07-25T09:16:24.383Z'
creator: 'songtianlun'
modifier: 'songtianlun'
bag: 'default'
revision: '5'
---

<!-- Exported from TiddlyWiki at 12:16, 19th 八月 2023 -->

# vim 分割窗口打开内建 shell

`Neovim` 和 `Vim >= 8.2` 通过 `:ter[minal]` 命令原生支持此功能。

有关详细信息，请参阅文档中的 [terminal-window](https://github.com/vim/vim/blob/master/runtime/doc/terminal.txt)。

![](https://imagehost-cdn.frytea.com/images/2023/07/25/shvf54-2.png)

对了，如果想要退出 terminal 模式，您应该按下 `CTRL+ CTRL+n` 。请参阅 `:help terminal-emulator` 获取更多建议。

## References

* [How can I open a Shell inside a Vim Window?](https://stackoverflow.com/questions/2782752/how-can-i-open-a-shell-inside-a-vim-window)
* [Exit from Terminal mode in Neovim/Vim 8](https://vi.stackexchange.com/questions/4919/exit-from-terminal-mode-in-neovim-vim-8)