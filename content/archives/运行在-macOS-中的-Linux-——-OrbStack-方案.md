---
title: "运行在 macOS 中的 Linux —— OrbStack 方案"
categories: [ "技术" ]
tags: [ "macOS" ]
draft: false
slug: "772"
date: "2023-04-09 15:02:08"
---

[OrbStack](https://orbstack.dev/)) 是在 macOS 上运行 Docker 容器和 Linux 机器的快速、轻量级和简单的方式。它是一个超级充电版 WSL 和 Docker 桌面替代品，所有这些都在一个易于使用的应用程序中实现。

GitHub：[https://github.com/orbstack](https://github.com/orbstack)

而 macOS 上的 Docker Desktop 原本就是饱受诟病，慢，重，资源消耗巨大。 OrbStack 的出现就是为了解决这个问题。

除了好用的 GUI，OrbStack 也提供了一些管理命令 orbctl，可以直接在命令行使用。

```
orbctl help
orb -m ubuntu -u root
orb -m ubuntu -u root uname -a
```

orb 命令还提供了其他一些特性，比如可以在虚拟机中 push 或 pull 来传输文件。

## Reference

* [https://orbstack.dev/](https://orbstack.dev/)
* [https://blog.einverne.info/post/2023/03/orbstack-docker-runtime-and-virtual-linux.html](https://blog.einverne.info/post/2023/03/orbstack-docker-runtime-and-virtual-linux.html)

