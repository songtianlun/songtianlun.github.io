---
title: "Tmux 使用笔记"
categories: [ "技术价值" ]
tags: [ "linux","tmux" ]
draft: false
slug: "585"
date: "2021-10-13 14:30:27"
---

Tmux 是一个终端复用器（terminal multiplexer），用起来就离不开。网上有很多 Tmux 使用指南，但是用下来发现还是自己整理一遍才能真正的记住，于是有了这篇文章，本文意在整理 tmux 最常用操作，详细的操作指南请移步 「[tmux(1) manual page](https://man.openbsd.org/OpenBSD-current/man1/tmux.1)」。

## 基本概念

tmux采用C/S模型构建，输入tmux命令就相当于开启了一个服务器，此时将 **新建一个会话(`session`)，会话中默认新建一个窗口(`window`)，窗口中默认新建一个面板  (`pane`)** 。

- 一个 `tmux` `session` 可以包含多个 `window`， `window` 默认充满 `session` 。
- 一个 `window` 又可以包含多个 `pane` ，且都处于同一界面下。

## 常用操作

> 以下按照 Ctrl 和 Alt 的简写记录，周知。
`C -> Ctrl`
`A -> Alt`
> 
- 新建和断开

```bash
tmux               # 新建一个无名称的会话
tmux new -s demo   # 新建一个名称为demo的会话
tmux detach        # 断开当前会话，会话在后台运行

tmux a             # 默认进入第一个会话
tmux a -t <>       # 进入之前的会话

tmux kill-session -t demo # 关闭demo会话
tmux ls                   # 查看所有会话

C-b d    # 断开当前会话
C-b C-Z  # 挂起当前会话

C-b c    # 新建 window
C-b &    # 关闭当前窗口（关闭前需输入y or n确认）

C-b "    # 下侧新建面板
C-b %    # 右侧新建面板
C-b x    # 关闭当前面板（关闭前需输入y or n确认）
```

- 切换会话

```bash
C-b 0~9  # 切换到指定 window
C-b p    # 切换到上一 window
C-b n    # 切换到下一 window
C-b f    # 快速定位到 window（输入关键字匹配窗口名称）

C-b s    # 显示 session 列表，用于选择并切换
C-b w    # 显示 windows 列表，用于且切换窗口
C-b q    # 显示 pane 编号，在编号消失前输入对应的数字可切换面板

C-b ←↑→↓ # 移动光标切换 pane
C-b ;    # 切换到上一 pane
C-b o    # 切换到下一 pane
```

- 调整布局

```bash
C-b !          # 将当前 pane 拆分为一个独立 window
C-b z          # 最大化当前面板，重复一次恢复正常（v1.8版本新增）
C-b {          # 向前置换当前面板
C-b }          # 向后置换当前面板
C-b C-o        # 顺时针旋转当前窗口中的所有面板
C-b A-o        # 逆时针旋转当前窗口中的所有面板
C-b space      # 在自带的面板布局中循环切换
C-b A + ←↑→↓   # 以5个单元格为单位调整当前面板边缘
C-b C + ←↑→↓   # 以1个单元格为单位调整当前面板边缘（Mac下被系统快捷键覆盖）
```

## 参考文献

- [Tmux 使用教程 by 阮一峰](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
- [Tmux使用手册 by 路易斯](http://louiszhai.github.io/2017/09/30/tmux/)
- [tmux(1) manual page](https://man.openbsd.org/OpenBSD-current/man1/tmux.1)