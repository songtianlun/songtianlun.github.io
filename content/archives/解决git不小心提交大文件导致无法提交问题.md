---
title: "解决git不小心提交大文件导致无法提交问题"
categories: [ "技术" ]
tags: [ "git" ]
draft: false
slug: "406"
date: "2020-07-17 15:37:55"
---


在一次不小心向GitHub提交了一个1GB文件后，出现一个令人崩溃的错误：
```bash
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: a22b6b202ddb6da3e2795ca71663de19
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File system_status/test_26457 is 1024.00 MB; this exceeds GitHub's file size limit of 100.00 MB
```
更崩溃的是，在此之后又进行了几次提交，可不能因为这次手误丢掉几次提交成果呀。<br />在网上浏览一圈后找到解决方法：
```bash
git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch system_status/test_26457'
```
大概原理是，删除大文件，重新生成commit，但运行后又出现问题：
```bash
Cannot rewrite branches: You have unstaged changes.
```
之后找到一种较为暴力的解决方法：
```bash
git stash
```
> 在网上找到关于这段命令(git 储藏)的使用场景：
> - 发现有一个类是多余的，想删掉它又担心以后需要查看它的代码，想保存它但又不想增加一个脏的提交。这时就可以考虑git stash。
> - 使用git的时候，我们往往使用分支（branch）解决任务切换问题，例如，我们往往会建一个自己的分支去修改和调试代码, 如果别人或者自己发现原有的分支上有个不得不修改的bug，我们往往会把完成一半的代码commit提交到本地仓库，然后切换分支去修改bug，改好之后再切换回来。这样的话往往log上会有大量不必要的记录。其实如果我们不想提交完成一半或者不完善的代码，但是却不得不去修改一个紧急Bug，那么使用git stash就可以将你当前未提交到本地（和服务器）的代码推入到Git的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修Bug，等到修完Bug，提交到服务器上后，再使用git stash apply将以前一半的工作应用回来。
> - 经常有这样的事情发生，当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。解决这个问题的办法就是git stash命令。储藏(stash)可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。

解决后，再次修复，重新提交，完成！
```bash
$ git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch system_status/test_26457'
Rewrite 11983344a8934d6e9a7a1e225e6d0f6daf3923a4 (15/21)rm 'system_status/test_26457'
Rewrite 49ac22cd47b0504350d3643ff77b09b14f01ed03 (16/21)rm 'system_status/test_26457'
Rewrite 8a721565399d929514e3ed4661ea7c938074eb32 (17/21)rm 'system_status/test_26457'
Rewrite 6e9e291690bdd9923daef62a18d08229dc30a320 (21/21)
Ref 'refs/heads/master' was rewritten
$ git push
```
<a name="2K4ZN"></a>
## 参考文献

- [问题解决：Git报错 GH001: Large files detected. You may want to try Git Large File Storage.](https://blog.csdn.net/qq_43827595/article/details/105673569)
- [简单粗暴改写 git commit 作者信息](http://azaleasays.com/2014/03/01/change-the-author-of-commits-in-git/)
- [git-stash用法小结](https://www.cnblogs.com/tocy/p/git-stash-reference.html)
