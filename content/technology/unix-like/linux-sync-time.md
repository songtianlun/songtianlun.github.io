---
title: "Linux 系统时间校对方法"
date: 2021-11-03T14:44:16+08:00
description: "使用 ntp 校对 Linux 系统时间的方法."
categories: ["技术笔记集","Linux 笔记"]
tags: ["linux", "ntp"]
draft: false
---

`Linux` 中有个 `ntp` 包可以自动校准时间，并且非常好用。

```bash
# Debian系统安装NTP校时包：
$ apt-get install ntpdate

# CentOS系统安装NTP校时包：
$ yum install ntp
```

校时命令：

`ntpdate cn.pool.ntp.org`

如果想每隔一定时间自动校时，只需将上面的命令加入至Cron就行了：

`1 00 12 * * * /sbin/ntpdate cn.pool.ntp.org`

- cn.pool.ntp.org是ntp网络授时组织的中国授时源

方法二：快速校对linux服务器时间至北京时间

服务器采用ntp更新时间，经常牵扯到UTC是否开启的问题，开启了时间就会快8个小时

前段时间朋友给我了下面的命令，一条命令解决之前的所有问题。 

`rdate -t 60 -s stdtime.gov.hk`

使用 `rdate` 将 `[stdtime.gov.hk](http://stdtime.gov.hk)` 服务器的时间抓取回来，然后写入硬件 

`hwclock -w`

下面是 `rdate` 的命令使用方法介绍 

功能说明：显示其他主机的日期与时间。 

语　法：

`rdate [-ps][主机名称或IP地址...]`

补充说明：执行rdate指令，向其他主机询问系统时间并显示出来。 

参　数： 

`-p`　显示远端主机的日期与时间。 

`-s`　把从远端主机收到的日期和时间，回存到本地主机的系统时间。

## 参考文献

- linux服务器校对时间方法：[https://blog.csdn.net/llnara/article/details/8286873](https://blog.csdn.net/llnara/article/details/8286873)