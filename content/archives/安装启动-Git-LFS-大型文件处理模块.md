---
title: "安装启动 Git LFS 大型文件处理模块"
categories: [ "技术" ]
tags: [ "git" ]
draft: false
slug: "777"
date: "2023-04-09 15:02:46"
---

```
Git LFS（Large File Storage）是一个 Git 扩展，用于更有效地处理大型文件。

在基于 git 托管大模型的平台拉取 AI 模型时常常需要开启这一功能。

要在不同的操作系统上安装 Git LFS，请按照以下步骤操作：

## 第一步、安装 Git LFS

### 对于 macOS

如果你已经安装了 Homebrew，你可以使用以下命令安装 Git LFS：
```

brew install git-lfs

```
如果你还没有安装 Homebrew，可以访问 Homebrew 官方网站 获取安装指南。

### 对于 Windows

访问 Git LFS 的 GitHub 仓库的 Releases 页面。
下载适用于 Windows 的最新版本的安装程序（.exe 文件）。
双击下载的 .exe 文件并按照提示进行安装。

## 对于 macOS

如果你已经安装了 Homebrew，你可以使用以下命令安装 Git LFS：
```

brew install git-lfs

```
如果你还没有安装 Homebrew，可以访问 Homebrew 官方网站 获取安装指南。

### 对于 Debian-based 系统（如 Ubuntu）

在终端中运行以下命令：
```

sudo apt-get update
sudo apt-get install git-lfs

```
### 对于 Fedora-based 系统

在终端中运行以下命令：
```

sudo dnf install git-lfs

```
### 对于 Arch-based 系统

在终端中运行以下命令：
```

sudo pacman -S git-lfs

```
## 第二步、集成

安装完成后，需要运行以下命令以将 Git LFS 集成到 Git 中：
```

git lfs install

```
现在，Git LFS 已经成功安装，并且可以在你的 Git 项目中使用。
```

