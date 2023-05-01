---
title: "运行在 macOS 中的 Linux —— multipass 方案"
categories: [ "技术" ]
tags: [ "macOS" ]
draft: false
slug: "773"
date: "2023-04-09 15:02:12"
---

[ multipass](https://github.com/canonical/multipass) 用于编排虚拟 Ubuntu 实例

下载 pkg 安装。

```bash
$ multipass find

$ multipass launch ubuntu

$ multipass list

$ multipass info <VM Name>

$ multipass shell <VM Name>

$ multipass exec <VM Name> -- lsb_release -a

$ multipass stop <VM Name>

$ multipass delete <VM Name>

$ multipass purge
```

## Reference

* [在 macOS 中使用 Podman](https://icloudnative.io/posts/use-podman-in-macos/)

