---
title: "使用git将code同时提交多个远程仓"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "480"
date: "2020-11-13 11:40:08"
---

想用一次git提交到多个仓库，可以通过以下命令实现：

```c
# 设置第一个远程仓库
git git remote add origin https://github.com/w4ctech/hellogit.git

# 新增一个远程仓库
git remote set-url --add origin https://gitee.com/w4ctech/hellogit.git

# 新增另一个远程仓库
git remote set-url --add origin  https://git.coding.net/w4ctech/hellogit.git

# 查看当前远程仓库
git remote -v
```

此后的只需一次提交，就会将代码提交至三个仓库，如需删除某个仓库，只需执行：

```c
git remote set-url --delete https://git.coding.net/w4ctech/hellogit.git
```

即可。

## 参考文献

- 使用git将code同时提交github,gitee,coding：[https://juejin.im/post/6844903569540251661](https://juejin.im/post/6844903569540251661)