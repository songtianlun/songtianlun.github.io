---
title: "Ubuntu下为vim安装YouCompleteMe插件"
categories: [ "技术" ]
tags: [ "vim" ]
draft: false
slug: "419"
date: "2020-07-26 19:17:00"
---

## 前提条件

- 已安装 Vundle  (参考 [Vim安装插件管理器Vundle](https://blog.frytea.com/archives/419/)）
- Vim 版本 ≥ Vim 7.4.1578+ （查看 `vim --version`）

## 安装

第一步，使用Vundle安装YouCompleteM

在.vimrc中添加以下内容

```jsx
Plugin 'Valloric/YouCompleteMe'
```

然后拉取源码（或是 `:PluginInstall` 也可）

```bash
$ cd ~/.vim/bundle
#./install.py需要克隆，不能直接下载zip压缩包
$ git clone https://github.com/Valloric/YouCompleteMe.git
```

第二步，拉取依赖（包括可能用到的工具）

```bash
$ cd YouCompleteMe
$ git submodule update --init --recursive
$ sudo apt install cmake
$ sudo apt install clang
$ sudo apt-get install python3-dev
```

第三步，安装代码提示

```bash
# 仅安装支持Python的版本：
$ ./install.py

# 安装支持C语言家族的版本：
$ ./install.py --clang-completer

# 安装支持go语言的版本：
$ ./install.py --go-completer

# 安装支持Js、Java、Python、go所有语言的版本：
$ ./install.py --all
```

第四步，添加.vimrc配置

```bash
$ vim .vimrc
```

```bash
let g:ycm_global_ycm_extra_conf='~/.vim/.ycm_extra_conf.py'
```

第五步，测试

[]()

## 参考文献

- [ubuntu下vim安装YouCompleteMe教程](https://segmentfault.com/a/1190000019949732)
- [vim YouCompleteMe: ERROR: Python headers are missing in /usr/include/python2.7. #1](https://github.com/nodejh/dotfiles/issues/1)
- [vim插件YouCompleteMe安装](https://juejin.im/entry/5c3249346fb9a04a04412d55)
- [Vim自动补齐插件YouCompleteMe安装指南(2019年最新)-Vim插件(15)](https://vimjc.com/vim-youcompleteme-install.html)
- [YouCompleteMe unavailable: requires Vim compiled with Python 2.x support](https://www.cnblogs.com/wangjq19920210/p/11576836.html)