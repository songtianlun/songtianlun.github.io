---
title: "Git 常用操作"
date: 2021-12-15T15:21:48+08:00
description: "记录常用 git 操作命令，方便速查."
categories: ["技术笔记集","Git 笔记集"]
tags: ["linux", "git"]
draft: false
---

```bash
# 注：若没有标记“远程”，则默认为操作本地分支。

# 检查当前状态 
$ git status

# 避免协同时自动生成 merge commit （把远程最新的 commit 以变基的方式同步到本地）
$ git pull --rebase

# 跟踪新文件（.标识当前目录下所有文件，也可指定文件）
$ git add .

# 删除暂存区文件(修改.gitignore 后需移除暂存区生效)
$ git rm --cached README

# 查看变化
$ git diff

# 提交更新
$ git commit -m "Story 182: Fix benchmarks for speed"

# 新增分支
$ git branch newBranchName

# 切换分支
$ git checkout newBranchName

# 修改分支名
$ git branch -m oldBranchName newBranchName

# 新增分支并切换至新分支
$ git checkout -b newBranchName

# 将新分支内容合并至当前分支
$ git merge newBranchName

# 删除(本地)分支
$ git branch -d newBranchName

# 将本地分支推送到远端(若不存在则新建)
$ git push origin localBranchName:remoteBranchName

# 删除(远程)分支
$ git push origin :deleteBranchName

# 从远程拉取分支
git checkout -b localBranchName origin/remoteBranchName
# 如果不成功，执行 git fetch，再重试

# 集中撤销提交
# 不删除工作空间改动代码，撤销commit，不撤销git add .
git reset --soft HEAD~1

# 不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
git reset --mixed HEAD~1

# 删除工作空间改动代码，撤销commit，撤销git add .
git reset --hard HEAD~1

# 回退到指定 commit 版本
git reset --hard 1094a

# 查看节点树
git log --oneline --graph --decorate --all
```

## 参考文献

- [2.2 Git 基础 - 记录每次更新到仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)
- [3.2 Git 分支 - 分支的新建与合并](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
- [git新增、修改、删除本地和远程分支](https://blog.csdn.net/weboof/article/details/100517928)
- [git fetch命令](https://www.yiibai.com/git/git_fetch.html)
- [git commit之后，想撤销commit](https://www.cnblogs.com/lfxiao/p/9378763.html)