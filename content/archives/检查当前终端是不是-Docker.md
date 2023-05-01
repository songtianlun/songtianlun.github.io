---
title: "检查当前终端是不是 Docker"
categories: [ "技术" ]
tags: [ "docker" ]
draft: false
slug: "775"
date: "2023-04-27 22:07:15"
---

要确定当前运行的终端是否在 Docker 容器内，可以检查容器特定的文件和环境变量。以下是一种方法，通过查看 /proc/1/cgroup 文件来判断：

```
cat /proc/1/cgroup
```

观察输出的内容。如果您看到与 Docker 相关的内容（如 docker 或 containerd），则表示您当前正在 Docker 容器内运行。例如：

```
12:memory:/docker/9a3c3b3d3e3c413dc3f3e3g3h3i3j3k3l3m
11:devices:/docker/9a3c3b3d3e3c413dc3f3e3g3h3i3j3k3l3m
...
```

如果输出中没有提到 Docker 或类似的容器技术，那么您可能不在 Docker 容器内运行。

请注意，这种方法主要适用于 Docker 容器，而不一定适用于其他容器技术（如 Podman、LXC 等）。如果您使用的是其他容器技术，可能需要查找特定于该技术的文件或环境变量。

