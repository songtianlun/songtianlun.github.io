---
title: 'Harbor使用方法'
date: '2023-08-19T04:19:51.110Z'
created: '2023-07-19T05:51:37.763Z'
creator: 'songtianlun'
bag: 'default'
modifier: 'songtianlun'
tmap.id: '1b2d132d-b32a-495f-9962-3bd1ca4b13ab'
---

<!-- Exported from TiddlyWiki at 12:20, 19th 八月 2023 -->

# Harbor使用方法

## 修改配置文件

首先需要在客户端配置号 Harbor 地址，配置文件在： `/etc/docker/daemon.json`

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
        "http://192.168.226.70"
    ]
}
```

只需要配置其中的私有仓库地址，注意协议类型和端口号。

> 若文件不存在，创建即可。

之后重启docker使其生效。

```bash
systemctl restart daemon-reload
systemctl restart docker
```

## 推送第一个镜像

```bash
# 首先在客户端登陆
$ docker login 192.168.226.70
# 之后打上标签，格式形如：
$ docker tag SOURCE_IMAGE[:TAG] 192.168.226.70/hci/REPOSITORY[:TAG]
# 推送
$ docker push 192.168.226.70/hci/REPOSITORY[:TAG]

# 打好标签后就可以看到两个 id 一致但名称不同的镜像了
$ docker images
REPOSITORY                   TAG           IMAGE ID       CREATED        SIZE
192.168.226.70/hci/hci-nos   0.0.1-x86     001b9ea10452   4 weeks ago    180MB
hci-proxy                    v6            001b9ea10452   4 weeks ago    180MB
```

## 参考文献

* [配置Docker加速及私有仓库的http协议支持](https://blog.csdn.net/KingBoyWorld/article/details/79934779)
* [Run the Installer Script](https://goharbor.io/docs/2.4.0/install-config/run-installer-script/)
