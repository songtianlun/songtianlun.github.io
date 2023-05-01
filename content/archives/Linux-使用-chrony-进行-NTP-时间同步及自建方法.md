---
title: "Linux 使用 chrony 进行 NTP 时间同步及自建方法"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "721"
date: "2023-01-08 18:45:31"
---

chrony是网络时间协议的实现。它可以替代ntpd，后者是NTP的参考实现。它在类Unix操作系统上运行，并在GNU GPL v2下发布。

服务端和客户端配置文件都是同一个，分别配置为服务器和客户端即可使用，
配置文件在 `/etc/chrony.conf or /etc/chrony/chrony.conf` ，具体看版本，
可以使用 `man chrony` 确认一下。

## 服务端配置

服务端配置：


```bash
# Use public servers from the pool.ntp.org project.
# Please consider joining the pool (http://www.pool.ntp.org/join.html).
server s1a.time.edu.cn iburst
server ntp.aliyun.com iburst

# Allow NTP client access from local network.
allow 192.168.8.0/24
```

开启同步

```
systemctl enable chronyd
systemctl restart chronyd

# 查看时间同步状态
timedatectl status
# 开启网络时间同步
timedatectl set-ntp true
```

## 客户端配置

```bash
# Use public servers from the pool.ntp.org project.
# Please consider joining the pool (http://www.pool.ntp.org/join.html).
server 192.168.8.5 iburst

# Allow NTP client access from local network.
```

开启同步 

```bash
systemctl enable chronyd
systemctl restart chronyd

# 查看时间同步状态
timedatectl status
# 开启网络时间同步
timedatectl set-ntp true
```

## 常用命令

```bash
# 查看 ntp_servers
chronyc sources -v

# 查看 ntp_servers 状态
chronyc sourcestats -v

# 查看 ntp_servers 是否在线
chronyc activity -v

# 查看 ntp 详细信息
chronyc tracking -v
```

## 参考文献

- [Linux 时间同步 Chrony](https://www.cnblogs.com/jhxxb/p/11526098.html)