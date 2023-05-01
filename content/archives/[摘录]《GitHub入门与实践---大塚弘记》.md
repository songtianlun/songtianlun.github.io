---
title: "[摘录]《GitHub入门与实践 - 大塚弘记》"
categories: [ "阅读摘录" ]
tags: [  ]
draft: false
slug: "694"
date: "2022-12-17 11:02:13"
---

GitHub入门与实践
大塚弘记
13个笔记


◆ 第1章 欢迎来到GitHub的世界

>> GitHub公司总部位于美国旧金山，拥有一只不知是章鱼还是猫的吉祥物octocat（图1.1）。

>> GitHub除提供Git仓库的托管服务外，还为开发者或团队提供了一系列功能，帮助其高效率、高品质地进行代码编写

>> 理解Git，是熟练运用GitHub的关键所在。


◆ 第2章 Git的导入

>> 在当时的开源环境下，虽然已经有数款版本管理软件被开发出来，但功能和性能都差强人意。加之Git是由Linus Torvalds亲自着手开发的，可以说在功能与性能方面无可挑剔。程序员们愿意接受Git，很大程度上取决于这个背景。


◆ 第4章 通过实际操作学习Git

>> 要修改上一条提交信息，可以使用git commit --amend命令。

>> git log --graph命

>> 这个小小的变更就没必要先执行git add命令再执行git commit命令了，我们用git commit -am命令来一次完成这两步操作。

>> 用上述方式执行git rebase命令，可以选定当前分支中包含HEAD（最新提交）在内的两个最新历史记录为对象，并在编辑器中打开。

>> git remote add——添加远程仓库

>> -u参数可以在推送的同时，将origin仓库的master分支设置为本地仓库当前分支的upstream（上游）

>> Pro Git￼由就职于GitHub公司的Scott Chacon￼执笔，是一部零基础的Git学习资料。

>> LearnGitBranching￼是学习Git基本操作的网站（图4.9）。注重树形结构的学习方式非常适合初学者使用

>> 通过tryGit￼我们可以在Web上一边操作一边学习Git的基本功能（图4.10）。很可惜该教程只有英文版。

