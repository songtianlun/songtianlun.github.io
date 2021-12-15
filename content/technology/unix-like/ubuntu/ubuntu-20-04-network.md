---
title: "Ubuntu 20.04 修改网卡配置"
date: 2021-11-05T00:32:22Z
description: "Ubuntu 新版网络配置方法."
categories: ["技术笔记集","Linux 笔记集"]
tags: ["linux", "ubuntu", "network"]
draft: false
---

近期常常用到 Ubuntu 20.04 server 镜像，在一次虚拟机配置时不小心配错了ip，修在网络配置时找了一大圈教程都是无效。最后发现

> **“ubuntu从17.10开始，已放弃在 `/etc/network/interfaces` 里固定IP的配置，即使配置也不会生效，而是改成netplan方式 ，配置写在 `/etc/netplan/01-netcfg.yaml` 或者类似名称的yaml文件里”**
> 

不明白为什么还是有许多博客文章是说配置 `interfaces` ，耽误事情，因此在这里简单记录。

步骤一，修改配置

```bash
# 具体文件可能有变化，但一定在 netplan 下
sudo vim /etc/netplan/00-installer-config.yaml 
```

步骤二，修改内容即可

![https://imagehost-cdn.frytea.com/20200820095111.png](https://imagehost-cdn.frytea.com/20200820095111.png)

步骤三，生效配置

```bash
sudo netplan apply
```

## 参考文献

- Ubuntu 20.04修改ip地址：[https://blog.csdn.net/fansnn/article/details/105930009](https://blog.csdn.net/fansnn/article/details/105930009)