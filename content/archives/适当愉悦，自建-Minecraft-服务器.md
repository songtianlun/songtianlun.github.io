---
title: "适当愉悦，自建 Minecraft 服务器"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "322"
date: "2020-03-27 11:32:00"
---

## 背景

- 背景 1
> 原来总是认为，玩游戏都是不务正业。直到自己在学习生活中遇到挫折又无处宣泄，长时间的坏心情下才感觉到有这么一个发泄情感、寻找愉悦的途径是很重要的。
> 必须要控制好度，当心情不好、遭遇不幸、遇到挫折，就需要适当的放松，松弛有度，是为了更好的出发。

- 背景 2
> 听说 Minecraft 这个游戏很久了，目前看来分为国际服和国内服（网易代理），体验一下网易代理的我的世界发现没有那么有意思，淘宝了一个正版的 Minecraft 试玩了一下，发现原版的 Minecraft 还是挺好玩的，可以按照一些需求打造自己的世界，还可以探索各种可能性，据说这是 Minecraft 的灵魂。

> 本地试玩之后发现不错，就想要自建一个 Minecraft 服务器，此后就可以自己在上面玩了，还可以跟朋友一起玩，于是根据目前查到的博文，在这里做一个简单的记录。

由于 Minecraft 游戏玩家众多，有许多忠实玩家，因此有一些观察力敏锐的人发现这一商机，专门提供 Minecraft 服务器，提供一些面板，可以避免令人望而却步的黑框白字，比如 [时光云计算](https://c.timewk.cn/) 就提供了容器部署方案，使用 qq bot 提供服务，在 [购买界面](https://c.timewk.cn/price.html) 选择好配置，将指令发到 qq bot 就可以新建服务器，等待服务器启动完毕就可以使用提供的地址游戏了，用法非常简单，详细可以看 《[在时光云轻松搭建"你的世界"服务器](https://zhuanlan.zhihu.com/p/74995133)》 这篇文章。

本文主要介绍自建 Minecraft 服务器的方法，可以使用 阿里云、华为云、Azure、GCP 等提供的公有云服务，Minecraft 对虚拟机配置需求如下：

- 1.系统要求：Debian9 / Ubuntu 18.04
- 2.硬件要求：1cpu core+ / 2g ram + /10g disk+

下面简单介绍配置流程：

## 搭建 Minecraft

第一步，安装必要系统组件

```
# ubuntu / debian
sudo apt-get update && sudo apt-get install openjdk-8-jre-headless screen -y
# centos
sudo yum install java-1.8.0-openjdk
```

第二步，添加非root用户用于管理

```
sudo adduser mc
```

第三步，安装MC服务器

```
sudo su mc
cd
wget https://launcher.mojang.com/v1/objects/3dc3d84a581f14691199cf6831b71ed1296a9fdf/server.jar
mv server.jar spigot-1.14.4.jar
touch run.sh
```

也可从本站镜像站获取: `wget https://res.frytea.com/Application/Server/spigot-1.14.4.jar`

第四步，编写运行脚本 `run.sh`

```
nano run.sh
```

脚本内容：

```
#!/bin/sh

java -Xms512m -Xmx2048m -XX:+AggressiveOpts -XX:+UseCompressedOops -jar spigot-1.14.4.jar nogui

# xmx为可分配最大内存量，free -m 可查看
```

为脚本赋予运行权限

```
chmod +x run.sh
```

第五步，首次运行

```
sh run.sh
```

运行后退出程序，编辑配置文件。

首次运行时将会创建一个eula.txt文件

```
nano eula.txt
```

将 `eula` 改为 `true`

```
eula=true
```

```
nano server.properties
```

```
online-mode=false //关闭官方验证
white-list=true //安全起见，开启白名单，开启后需要编辑白名单，也可不开启。
```

第六步，运行MC服务器


> 注：重要！不要用root ssh登录加sudo su的方法启动服务器，会失败，请使用mc用户登录后启动！

```
screen ~/run.sh

[22:00:06] [Server thread/INFO]: Starting minecraft server version 1.14.4
[22:00:06] [Server thread/INFO]: Loading properties
[22:00:06] [Server thread/INFO]: Default game type: SURVIVAL
[22:00:06] [Server thread/INFO]: Generating keypair
[22:00:07] [Server thread/INFO]: Starting Minecraft server on *:25565

....

[22:00:07] [Server thread/INFO]: Preparing level "world"
[22:00:08] [Server thread/INFO]: Preparing start region for level 0
[22:00:09] [Server thread/INFO]: Preparing spawn area: 3%

....

[22:00:21] [Server thread/INFO]: Preparing spawn area: 96%
[22:00:22] [Server thread/INFO]: Done (14.737s)! For help, type "help" or "?"
```

第七步，后台运行

```
ctrl+a +d 退出screen
screen -r 进入screen
```

此后运行 Minecraft 首先切换到 `mc`, `sudo su mc`，之后运行脚本 `screen ~/run.sh`，就可以运行啦。

第八步，链接服务器

Minecraft 默认监听TCP 25565端口，记得开启端口权限。

访问 ip:25565 就可以访问 Mincraft 服务器啦！

![QQ20200327113029b06b134c9466984a.png](https://imagehost-cdn.frytea.com/images/2020/03/27/QQ20200327113029b06b134c9466984a.png)

## 参考文献

- [在时光云轻松搭建"你的世界"服务器](https://zhuanlan.zhihu.com/p/74995133)
- [自建Minecraft 服务器-官方Java电脑版 --玩转VPS篇三](https://www.johnrosen1.com/mc/)