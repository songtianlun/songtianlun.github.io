---
title: "Git 回滚到某个 commit 上及返回主分支"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "479"
date: "2020-11-13 11:39:24"
---

## 1. 代码回退

首先要用 `git log` 查看回到的版本，然后用以下命令，将本地代码回退到某个版本：

```bash
git reset --hard HEAD^        回退到上个版本
git reset --hard commit_id    退到/进到 指定 commit_id
```

如果需要将回退的某个版本提交远程，可执行以下命令：

```bash
git push origin HEAD --force
```

回滚之后，想恢复到新的版本怎么办？

1. 用`git reflog`打印你记录你的每一次操作记录

> `git reflog` 可以查看所有分支的所有操作记录（包括 `commit` 和 `reset` 的操作），包括已经被删除的 `commit` 记录， `git log` 则不能察看已经删除了的 `commit` 记录，而且跟进结果可以回退道某一个修改。

## 2. 返回主分支

```bash
git checkout master
```

## 参考文献

- git回滚到某个commit 上和 返回最新的版本git：[https://www.cnblogs.com/yu-hailong/p/10681905.html](https://www.cnblogs.com/yu-hailong/p/10681905.html)
- [转]Git 代码撤销、回滚到任意版本（当误提代码到本地或master分支时）：[https://www.cnblogs.com/wangcp-2014/p/11160125.html](https://www.cnblogs.com/wangcp-2014/p/11160125.html)
- git回滚到任意版本：[https://my.oschina.net/dabird/blog/1523267](https://my.oschina.net/dabird/blog/1523267)
- git-代码撤销、回滚到任意版本（git回滚命令reset、revert的区别）：[http://element-ui.cn/article/show-126884.aspx](http://element-ui.cn/article/show-126884.aspx)