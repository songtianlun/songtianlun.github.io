---
title: "把 FireFox 装进 Docker ｜ VPS/群晖 搭建『云端/内网 浏览器』"
date: 2021-11-12T23:54:19+08:00
description: "云端服务器安装远程浏览器。"
categories: ["技术笔记集","Linux 笔记集","技术技巧集"]
tags: ["linux", "docker", "vps", "synology"]
draft: false
cover:
    image: "https://imagehost-cdn.frytea.com/images/2021/11/15/1479a399cf3d8cd5f39166f4236f488b09e046cada67bf0b.png" # image path/url
    alt: "cover" # alt text
    #caption: "My first" # display caption under cover
    relative: true # when using page bundles set this to true
    hidden: false # only hide on current single page
---

为了操作家里的群晖服务器，之前一直是通过 VPN 或是Todesk、向日葵连入家里旧电脑的 Win 桌面进行操作的，需要使用浏览器下载一些内容时也必须通过 Win 桌面挂机实现。就在最近这台挂机用的电脑出问题了，于是我在想能不能使用 Docker 启一个浏览器直接连入局域网呢？

说干就干，网上搜索一番后，很快找到一位大神做好的 Docker 镜像，这款镜像原本是 『用在群晖、威联通等环境下的火狐浏览器』，这款镜像也可以直接装在 VPS 里，做一个云端浏览器。

![https://imagehost-cdn.frytea.com/images/2021/11/12/imageb0e9f7913423b324.png](https://imagehost-cdn.frytea.com/images/2021/11/12/imageb0e9f7913423b324.png)

搭建流程也很简单，两行命令就能跑起来，但其中的细节如果不太懂可能还需要查一查，可以先按照我的流程来操作，应该很快就能看到效果，后期有需要再根据需求修改。

## 搭建流程

首先需要准备一台 VPS，如果是群晖安装，请移步镜像作者的教程。SSH 连入虚拟机，开始操作。

### Step1: 安装 Docker

如果 VPS 已经装过 Docker，可以跳过这一步。

这里直接使用 Docker 官方提供的一键安装脚本进行安装：

```bash
$ curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

> 根据自己服务器的所在位置确定是否加 `--mirror Aliyun`，若在国内需要加，境外则不需要。
>

![https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.17.240c5b6652dd1d9286.png](https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.17.240c5b6652dd1d9286.png)

装好后使用下面命令看一下运行状态：

```bash
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### Step2: 启动容器

docker 跑起来后，就开始跑我们的 firefox 容器，直接运行下面命令即可快速开始：

```bash
$ docker run -d --name firefox -p 8083:8083 -p 5900:5900 oldiy/firefox-novnc:latest
```

> 如果服务器配有安全组策略或防火墙，请**手动放通**上面两个端口，若端口冲突，请自行更换 `:` 前面的端口为**可用端口**！
>

等待命令执行完成，放通端口，即可进行下一步。

### Step3: 远程连接

电脑浏览器访问 `http://<Your IP>:8083/vnc.html` 即可。

如果一切正常，将会看到下面页面：

![https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.20.55a1c02ab563890073.png](https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.20.55a1c02ab563890073.png)

点击链接即可，如果失败可以稍等一会儿刷新试试。

> 注：实测在 `MacOS 12` 下 `Safari` 和 `Firefox` 浏览器均无法使用，仅有 `Chrome` 可使用，原因未知，请使用 Chrome 继续。
>

![https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.23.207febeeae22a60d28.png](https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.23.207febeeae22a60d28.png)

上面就是打开的效果了，如果 VPS 在墙外则可以直接访问 Google ，如果装在在局域网内则可以直接访问内网服务。若想从外部直接访问局域网内的服务，可以了解一下 **内网穿透** 技术。

## 拓展流程

上面的流程就可以迅速看到效果，还可以使用 Docker 的特性满足一些高级需求，下面给出两个拓展需求的实现案例。

### 案例一：增加访问密码

```bash
# 进入容器
$ docker exec -it firefox bash
# 交互式设定密码，写入文件请选 y
$ x11vnc -storepasswd
# 修改启动脚本，若不会使用 vi 请使用 apt 自行安装常用编辑器
$ vi /etc/supervisor/conf.d/supervisord.conf
# 找到下面 - 指定的行，修改为 + 指定的行
...
[program:x11vnc]
- command=/usr/bin/x11vnc
+ command=/usr/bin/x11vnc -rfbauth /root/.vnc/passwd
autorestart=true
...
# 修改完毕后退出容器，重启容器
$ exit
$ docker restart firefox
```

之后刷新浏览器，就可以看到需要密码才可使用了，安全性进一步增强。

![https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.31.091819675061ec73ad.png](https://imagehost-cdn.frytea.com/images/2021/11/12/2021-11-12-11.31.091819675061ec73ad.png)

### 案例二：挂载目录

如需挂载目录可在启动时加入 `-v <local path>:<docker path>` 参数挂载，比如这条命令，将 firefox 默认下载目录挂在到主目录下的 `Downloads` ，这样浏览器下载的内容在宿主机就能直接看到了。

```bash
$ docker run -d --name firefox -p 8083:8083 -p 5900:5900 -v ~/Downloads:/root/Downloads oldiy/firefox-novnc:latest
```

> 注：若已经运行过该容器，请修改名称、端口，或 `docker stop firefox` 再 `docker rm firefox` 删除容器之后重新运行。
>

![https://imagehost-cdn.frytea.com/images/2021/11/12/image62d4cc873196a017.png](https://imagehost-cdn.frytea.com/images/2021/11/12/image62d4cc873196a017.png)

由于启动参数带有 `-d` ，docekr 会一直在后台运行，可以帮我们完成一些必须浏览器才能完成的挂机下载任务了。

## 总结

> 其实镜像作者还提供了多种镜像，使用下来发现 **火狐** 比较稳定，因此就以这款为例整理本文。
>
> - Chrome浏览器 [https://hub.docker.com/r/oldiy/chrome-novnc](https://hub.docker.com/r/oldiy/chrome-novnc)
> - 火狐浏览器 [https://hub.docker.com/r/oldiy/firefox-novnc](https://hub.docker.com/r/oldiy/firefox-novnc)
> - 火狐浏览器+Enpass

早在很久之前我就在思考能否直接在 Linux 机器上装一个浏览器，之后远程访问。但受限于当时的技术知识有限，暂时没有找到合适的方法，远程桌面只能采用 Windows 的方法，看着 win 系统空耗资源没办法。

现在终于找了一种比较好的轻量级远程浏览器的解决方案了，在这里分享给大家，具体能做些什么还需发挥些想象力，结合自己的需求来。

## 参考文献

- **[oldiy/firefox-novnc By DockerHub](https://hub.docker.com/r/oldiy/firefox-novnc)**
- [在群晖里使用浏览器，通过Docker安装火狐/Chrome浏览器+Enpass，可以外网访问群晖所在内网路由等！](https://imagehost-cdn.frytea.com/images/2021/11/12/image62d4cc873196a017.png) By lodiy
- [给Docker镜像运行的chrome镜像添加访问密码](https://odcn.top/2019/03/09/2902/) By oldiy
