---
title: 'nexus3 上传 docker 镜像'
date: '2023-07-19T06:00:03.491Z'
tags: ['Nexus3']
created: '2023-07-19T05:41:25.214Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '5'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 12:20, 19th 八月 2023 -->

# nexus3 上传 docker 镜像

```bash
docker login 192.168.25.8:8082
docker tag xxxx 192.168.25.8:8082/repository/cloud-docker/image-test:0.1
docker push 192.168.25.8:8082/repository/cloud-docker/image-test:0.1
```

## 修改配置文件

首先需要在客户端配置，配置文件在： `/etc/docker/daemon.json`

内容形如：

```jsx
{
    "registry-mirrors": [
        "加速地址"
    ],
    "insecure-registries": [
        "私有仓库地址"
    ]
}
```

exp:

```jsx
{
    "registry-mirrors": [
        "http://adb35d.com"
    ],
    "insecure-registries": [
        "http://192.168.25.8:8082"
    ]
}
```

只需要配置其中的私有仓库地址，注意协议类型和端口号。

> 若文件不存在，创建即可。

之后重启docker使其生效。

```bash
systemctl daemon-reload
systemctl restart docker
```

## 推送第一个镜像

```bash
# 首先在客户端登陆
$ docker login 192.168.25.8:8082

# 之后打上标签，格式形如：
$ docker tag SOURCE_IMAGE[:TAG] 192.168.25.8:8082/general/IMAGE[:TAG]
# exp
$ docker tag 6f4986d78878 192.168.25.8:8082/general/debian:bullseye

# 推送
$ docker push 192.168.25.8:8082/general/IMAGE[:TAG]
# exp
$ docker push 192.168.25.8:8082/general/debian:bullseye
```