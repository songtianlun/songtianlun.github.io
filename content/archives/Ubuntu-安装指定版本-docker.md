---
title: "Ubuntu 安装指定版本 docker"
categories: [ "技术" ]
tags: [ "docker","Ubuntu" ]
draft: false
slug: "789"
date: "2023-05-01 00:06:25"
---

如果你过去安装过 docker，先删掉：

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

首先安装依赖：

```
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```

信任 Docker 的 GPG 公钥并添加仓库：
发行版

```
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirror.nju.edu.cn/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

安装最新

```
sudo apt-get update
sudo apt-get install docker-ce
```

安装指定版本

首选查看都有哪些版本可选

```
apt-cache madison docker-ce | awk '{ print $3 }'
```

选择版本并安装

```
# 以 5:20.10.13~3-0~ubuntu-jammy 为例
VERSION_STRING=5:20.10.13~3-0~ubuntu-jammy

sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
```

## Reference

* [https://mirror.nju.edu.cn/docker-ce/](https://mirror.nju.edu.cn/docker-ce/)
* [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

