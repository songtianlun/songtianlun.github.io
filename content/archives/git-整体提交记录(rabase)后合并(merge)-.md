---
title: "git 整体提交记录(rabase)后合并(merge) "
categories: [ "技术" ]
tags: [ "git" ]
draft: false
slug: "783"
date: "2023-04-22 15:44:24"
---

> ⚠️ 无论是 `rebase` 还是 `merge` 都是一项危险操作，请确保充分理解的命令的含义，并确保每一行代码无误后再继续。
> 如果不确定，请一定记得做好数据备份！！！

为了合并 dev 分支到 master 分支，同时确保代码不丢失且提交记录规整，你可以使用交互式的 git rebase 命令。这允许你重新排列、修改、合并或分割提交。以下是操作步骤：

1. 确保当前在 dev 分支：

```
git checkout dev
```

2. 交互式地 rebase 到 master 分支：

```
git rebase -i master
```

这会打开一个编辑器，列出所有 dev 分支中相对于 master 的提交。编辑器中的每一行都代表一个提交，格式为：`<action> <commit-hash> <commit-message>`。

3. 调整提交记录：
   要调整提交顺序，可以简单地在编辑器中移动这些行。
   要合并多个提交，可以将相应行的操作从 `pick` 更改为 `squash` 或 `fixup`。`squash` 会将提交合并到前一个提交中，并允许你编辑提交消息。`fixup` 会将提交合并到前一个提交中，但会丢弃当前提交的消息。
   要修改某个提交，将操作从 `pick` 更改为 `edit`。
   完成调整后，保存并关闭编辑器。Git 会执行你指定的操作。
4. 如果你修改了某个提交，Git 会暂停 rebase 过程，允许你编辑该提交。在这种情况下，进行必要的更改，然后执行以下命令以继续 rebase：

```
git add <changed-files>
git commit --amend
git rebase --continue
```

5. 当 rebase 完成后，切换回 master 分支：

```
git checkout master
```

6. 将 dev 分支合并到 master 分支：

```
git merge dev
```

7. 将更改推送到远程仓库：

```
git push
```

通过这个过程，你可以确保在合并时提交记录更加规整，而且不会丢失任何代码更改。请注意，这种方法会改变提交历史，所以在进行此操作时务必小心，确保其他团队成员了解你的操作。


