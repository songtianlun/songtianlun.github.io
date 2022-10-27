---
title: "群晖 Docker 配置镜像源和私有源"
date: 2022-10-26T10:18:19Z
description: "记录群晖 Docker 配置和重启."
categories: ["技术笔记集","Linux 笔记集"]
tags: ["linux", "synology", "docker"]
draft: false
---

最近在自建 Docker 镜像源和私有源，发现群晖的 Docker 配置与常规配置大有不同，因此记录。

首先是配置文件的不同，群晖的配置文件在：

```bash
$ # cat /var/packages/Docker/etc/dockerd.json
{
   "data-root" : "/var/packages/Docker/var/docker",
   "insecure-registries" : [ "..." ],
   "log-driver" : "db",
   "registry-mirrors" : [ "..." ],
   "storage-driver" : "btrfs"
}

```

其次是重启的方法不同，重启 Docker 的命令为：

```bash
$ systemctl restart pkgctl-Docker.service
```

根据常规方法配置私有源和镜像源，重启后即可使用：

```bash
$ # docker login http://git.frytea.local:80
Username: songtianlun
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

## 参考文献

- [群晖NAS部署harbor2.3.3以及docker服务管理](https://juejin.cn/post/7031191352696111140)
