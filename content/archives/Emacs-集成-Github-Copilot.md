---
title: "Emacs 集成 Github Copilot"
categories: [ "技术" ]
tags: [ "github","emacs","Copilot" ]
draft: false
slug: "738"
date: "2023-02-09 22:21:22"
---

[copilot.el](https://github.com/zerolfx/copilot.el)  是一个**非官方**实现的 Github Copilot 插件，实测在 x86/arm64 、macos/debian 下均可使用，下面介绍最关键的几个配置步骤。

## 准备

- Emacs >= 27
- 安装 node.js
- emacs 安装好 `e`, `editorconfig` 插件

以上是对您环境最基础的要求，确认无误后继续下一步。

## 配置 copilot.el

官方可以直接引用 github 链接作为插件，但考虑到网络环境问题，在这里使用手动克隆代码库来引用。

运行以下命令将 copilot.el 克隆到 emacs 配置文件夹：

```bash
$ cd ~/.emacs.d
$ git clone https://github.com/zerolfx/copilot.el.git
```

克隆完毕后，在 emacs 配置中将 copilot.el 载入，并配置一些必要的内容：

比如将以下内容写入 `~/.emacs.d/init.el`

```lisp
;;copilot
(add-to-list 'load-path
	     (expand-file-name (concat user-emacs-directory "copilot.el")))
(require 'copilot)
;; copilot automatically provide completions
(add-hook 'prog-mode-hook 'copilot-mode)

; complete by copilot first, then auto-complete
(defun my-tab ()
  (interactive)
  (or (copilot-accept-completion)
      (ac-expand nil)))

(with-eval-after-load 'auto-complete
  ; disable inline preview
  (setq ac-disable-inline t)
  ; show menu if have only one candidate
  (setq ac-candidate-menu-min 0))
  
(define-key copilot-completion-map (kbd "<tab>") 'copilot-accept-completion)
(define-key copilot-completion-map (kbd "TAB") 'copilot-accept-completion)
```

以上配置均来自代码库最基础的配置，可以实现最直观的功能。

## 使用

配置完毕后即可开始使用，首先需要登陆：

```bash
# 登陆
M-x copilot-login
```

如果一切顺利，完成授权，就可以开始使用了。

重启 Emacs，尝试一下吧：

![](https://imagehost-cdn.frytea.com/images/2023/02/09/8a083d78aeaf20f8d36058276e8d4e9b55a868592dabd654.png)

## 参考文献

- [Setting up GitHub Copilot in Emacs](https://www.irfanhabib.com/2022-04-26-setting-up-github-copilot-in-emacs/)
- [zerolfx](https://github.com/zerolfx)/[copilot.el](https://github.com/zerolfx/copilot.el)
  

