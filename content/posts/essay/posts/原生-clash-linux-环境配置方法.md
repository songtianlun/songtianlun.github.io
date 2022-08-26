---
title: "原生 clash linux 环境配置方法"
categories: [ "技术价值" ]
tags: [ "clash" ]
draft: false
slug: "577"
date: "2021-09-24 10:53:26"
---

## 环境

- Ubuntu Desktop 20.04 理论适用大部分 Linux 发行版
- [Dreamacro](https://github.com/Dreamacro) / **[clash](https://github.com/Dreamacro/clash)**

## 方法

### 步骤一：配置 clash 执行程序

首先从 clash 的github仓拉取稳定版二进制可执行文件

```jsx
wget https://github.com/Dreamacro/clash/releases/download/v1.7.1/clash-linux-amd64-v1.7.1.gz
gzip -d clash-linux-amd64-v1.7.1.gz
sudo mv clash-linux-amd64-v1.7.1 /usr/bin/clash
sudo chmod +x /usr/bin/clash
clash -v

# 为 clash 添加绑定低位端口的权限，这样运行clash的时候无需root权限
sudo setcap cap_net_bind_service=+ep /usr/bin/clash
```

### 步骤二：配置 clash

此时执行 clash ，不会有任何效果，仅仅提供一个 默认端口监听：

```jsx
clash
```

编辑clash配置文件 `/.config/clash/config.yaml`

可以将您线路提供的配置文件直接覆盖到这里，这里不涉及配置文件的编写方法。

### 步骤三：配置 clash 服务自启

```jsx
sudo touch /etc/systemd/system/clash.service
sudo vim /etc/systemd/system/clash.service
```

实例服务配置如下：

```jsx
[Unit]
Description=clash daemon

[Service]
Type=simple
User=<YOURNAME>
ExecStart=/usr/bin/clash -d /home/YOURNAME>/.config/clash/
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

之后配置服务自启动

```jsx
systemctl enable clash
systemctl start clash
```

## 参考文献

- [Clash-Linux-折腾笔记](https://github.com/yuanlam/Clash-Linux)
- [Dreamacro](https://github.com/Dreamacro) / **[clash](https://github.com/Dreamacro/clash)**