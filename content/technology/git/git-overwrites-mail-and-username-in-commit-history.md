---
title: "Git 修改提交历史中的邮箱和用户名"
date: 2021-12-15T15:16:03+08:00
description: "重写 git commit 历史中的邮箱和用户名."
categories: ["技术笔记集","Git 笔记集"]
tags: ["linux", "git"]
draft: false
---

内网提交需要校验企业邮箱，有时邮箱设置错误导致 `commit` 的邮箱有问题，此时可以通过修改已提交记录中的邮箱来修复，无需重新提交。

经过检索，发现两种方法，分别适用于修改一次和修改多次，引文在最后都有注明。

## 修改最近一次提交的邮箱

```jsx
git commit --amend --author="NewAuthor <NewEmail@address.com>"
```

### 批量修改邮箱

以下脚本本人已使用多次，亲测没问题。

使用该脚本，替换其中 `[Your Old Email]` `[Your New Author Name]` `[Your New Email]` 之后在 git 目录中执行即可。

```jsx
#!/bin/sh

git filter-branch --env-filter '

an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"

if [ "$GIT_COMMITTER_EMAIL" = "[Your Old Email]" ]
then
    cn="[Your New Author Name]"
    cm="[Your New Email]"
fi
if [ "$GIT_AUTHOR_EMAIL" = "[Your Old Email]" ]
then
    an="[Your New Author Name]"
    am="[Your New Email]"
fi

export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"
'
```

## Q&A

- `A previous backup already exists in refs/original/`

```jsx
Cannot create a new backup.
A previous backup already exists in refs/original/
Force overwriting the backup with -f
```

出现这一句说明之前曾经执行过 `git filter-branch` ，在 `refs/original/` 有一个备份，这个时候只要删掉那个备份即可，删除备份命令为:

```bash
$ git update-ref -d refs/original/refs/heads/master
# 或
$ git filter-branch -f --tree-filter -f 'rm -f test' -- --all
```

## 参考文献

- **[git修改提交作者和邮箱](https://blog.csdn.net/diu_brother/article/details/51982993)**
- **[git 修改历史提交的用户名和邮箱](https://blog.csdn.net/u013202238/article/details/81557710)**
- **[设置 Git 账户及邮箱](https://daemon369.github.io/git/2015/03/11/setting-email-in-git)**