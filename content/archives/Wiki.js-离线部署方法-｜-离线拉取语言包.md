---
title: "Wiki.js 离线部署方法 ｜ 离线拉取语言包"
categories: [ "技术" ]
tags: [ "wiki" ]
draft: false
slug: "625"
date: "2022-01-27 09:25:31"
---

最近想在内网搭建一套 Wiki，在调研了各种 wiki 的搭建方式、功能之后，选择了 wiki.js。但是在部署过程中，发现其默认是通过公网拉取语言包等资源，内网安装需要一些特别的方法。

这篇文章就来介绍内网部署 wiki.js 并拉取语言包的方法。

## 安装方法

按照 官网安装方法，可以较快的将整个服务启动起来：

### Step1 - 快速启动

```bash
# 安装前请确保安装了 node npm
$ apt-get install node npm
# 若内网服务器没有安装，可参考官网二进制离线安装的方法

# 首先获取离线包，可在互联网上下载，拷入内网服务器
$ wget https://github.com/Requarks/wiki/releases/download/2.5.272/wiki-js.tar.gz

# 之后将所有内容解压到一个安装路径，我装在 /opt/wiki 下
$ mkdir wiki
$ tar xzf wiki-js.tar.gz -C ./wiki
$ cd ./wiki

# 下面需要进行配置
$ mv config.sample.yml config.yml
# 按照自己的需求修改配置文件
$ vim config.yml 

# 如果使用 sqlite，在这里完成数据库初始化
$ npm rebuild sqlite3

# 服务启动
$ node server
```

### Step2 - 配置 systemd

官网提供了 systemd 配置文件，直接创建，配置好之后即可使用

`nano /etc/systemd/system/wiki.service`

```bash
[Unit]
Description=Wiki.js
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/node server
Restart=always
# Consider creating a dedicated user for Wiki.js here:
User=nobody
Environment=NODE_ENV=production
WorkingDirectory=/var/wiki

[Install]
WantedBy=multi-user.target
```

最后：

```bash
$ systemctl daemon-reload
$ systemctl enable wiki
$ systemctl start wiki

# 检查一下是否启动
$ systemctl status wiki

# 查看日志
$ journalctl -xef -u wiki
```

### Step3 - 离线安装语言包

内网环境无法直接下载语言包，此时需要按照如下步骤手动导入语言包：

- 修改配置文件

首先需要告诉 wiki.js 当前运行在离线环境中，因此在配置文件中进行如下修改：

```bash
- offline: false
+ offline: true
```

- 创建离线资源目录

之后在安装目录下创建一个文件夹 `data/sideload`  用来存放离线资源，比如我是安装在 `/opt/wiki/` 下，配置文件中配置的数据文件夹为 `/opt/wiki/data` ，那么我就创建一个新的文件夹 `/opt/wiki/data/sideload` 即可。

- 获取语言包

官方提供的语言包资源可以在这里下载：[https://github.com/Requarks/wiki-localization](https://github.com/Requarks/wiki-localization)

务必下载 `locales.json`  ，之后下载您需要的语言包（如 `zh.json` ）。

- 安装

将下载好的 `locales.json` , `zh.json` , `en.json` 等资源拷入上面创建好的文件夹中。

最后重启服务即可：

```bash
systemctl restart wiki
```

## 参考文献

- [Linux-install By wiki.js](https://docs.requarks.io/install/linux)
- [Sideloading By wiki.js](https://docs.requarks.io/install/sideload)
- [使用 Helm 部署 Wikijs](https://xie.infoq.cn/article/3b0a92bf1da6134884f2a3cbe)
- [Requarks](https://github.com/Requarks)/[wiki-localization](https://github.com/Requarks/wiki-localization)