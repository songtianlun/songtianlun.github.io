---
title: "Homebrew 安装策略（M1芯片 Macbook）"
categories: [ "技术" ]
tags: [ "MacBook","homebrew","m1" ]
draft: false
slug: "587"
date: "2021-10-28 00:08:29"
---

换了 m1 芯片的 Macbook 之后第一个感受到的就是使用 homebrew 的不一样，由于不同的芯片架构，其安装方法也有不同，在这简单记录。

## Arm Mac 安装步骤

```bash
# arm homebrew 同时设为国内源
/bin/zsh -c "$(curl -fsSL https://gitee.com/huwei1024/HomebrewCN/raw/master/Homebrew.sh)"

# 可在 .bashrc 追加下列内容实现 intel 和 arm 共存
alias abrew='arch -arm64 /opt/homebrew/bin/brew'
alias ibrew='arch -x86_64 /usr/local/bin/brew'
```

## 安装更新国内 homebrew 镜像源

```jsx
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

## 说明

根据官方规划，ARM 版 Homebrew 必须安装在 `/opt/homebrew` 路径下，而非此前的 `/usr/local/Homebrew`。

## 参考文献

- [Mac M1 安装brew 国内源](https://blog.csdn.net/qq_29496469/article/details/113834952)
- [解决 svn: error: The subversion command line tools are no longer provided by Xcode.](https://blog.csdn.net/wueasy/article/details/105304818)
- [ARM架构Mac的Homebrew下载及安装](https://blog.csdn.net/L_boyka/article/details/112554554)
- [ARM架构的M1 Mac的homebrew安装策略](https://blog.csdn.net/HLJs_Cookbook/article/details/111143521)
- [在 M1 芯片 Mac 上使用 Homebrew | JiFu's Wiki](https://www.jifu.io/posts/1525358532/)