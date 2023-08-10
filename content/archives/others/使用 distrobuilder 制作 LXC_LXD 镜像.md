---
title: '使用 distrobuilder 制作 LXC/LXD 镜像'
date: '2023-05-05T08:55:44.541Z'
tags: ['LXC']
created: '2023-05-05T08:23:20.762Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:11, 27th 五月 2023 -->

# 使用 distrobuilder 制作 LXC/LXD 镜像

[distrobuilder](https://linuxcontainers.org/distrobuilder/introduction/) 是 LXC 官方开源实现的一个 LXC/LXD 镜像制作工具，官方发布的各种发行版预制镜像均由该工具制作，在 [这里](https://jenkins.linuxcontainers.org/view/Images/) 可以看到它正在工作。

## 安装方法

工具使用 go 实现，需提前安装 go 1.19 以上版本。

```bash
$ git clone https://github.com/lxc/distrobuilder
$ cd distrobuilder
$ make
```

编译完成后在这里找到该工具：

```bash
$HOME/go/bin/distrobuilder
```

## 制作镜像

distrobuilder 的[官方文档](https://linuxcontainers.org/distrobuilder/docs/latest/) 介绍了使用方法，在 [LXC 示例目录](https://github.com/lxc/distrobuilder/tree/master/doc/examples) 和 [lxc-ci存储库](https://github.com/lxc/lxc-ci/tree/master/images) 中可以找到各种发行版的YAML文件示例。

这里以 debian 为例介绍，在官方库获取 [debian 的 YAML 文件](https://raw.githubusercontent.com/lxc/lxc-ci/master/images/debian.yaml)。

使用下列命令制作：

```bash
# 下面这行命令制作 debian bullseye arm64 版
# image.variant=default 的含义可以自行查询尝试
$ $HOME/go/bin/distrobuilder build-lxc  debian.yaml -o image.release=bullseye -o image.architecture=arm64 -o image.variant=default
$ ls -l
-rw-r--r--. 1 root root    64103  5月  5 14:06 debian.yaml
-rw-r--r--. 1 root root     1056  5月  5 14:15 meta.tar.xz
-rw-r--r--. 1 root root 77679152  5月  5 14:15 rootfs.tar.xz
```

最后使用类似这样的命令即可基于该镜像制作 LXC 容器：

```
$ lxc-create -n myContainerImage -t local -- --metadata meta.tar.xz --fstree rootfs.tar.xz
$ lxc-start -n myContainerImage
```

## References

* [distrobuilder 官方文档](https://linuxcontainers.org/distrobuilder/docs/latest/)
* [LXC 官网](https://linuxcontainers.org/)
* [lxc 代码仓库](https://github.com/lxc/lxc)
* [lxc-ci 代码仓库](https://github.com/lxc/lxc-ci)