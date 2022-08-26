---
title: "安装 Linux系统监控工具 systat"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "401"
date: "2020-07-14 11:01:00"
---

> Sysstat是一种在Linux系统服务器中常用的软件工具包，可以用来监控服务器的性能。比如可以监控CPU、硬盘、网络等数据，我们可以用来进行分析服务器的性能和资源的使用效率。

- Systat 官网：[http://sebastien.godard.pagesperso-orange.fr/](http://sebastien.godard.pagesperso-orange.fr/)
- Systat GitHub：[https://github.com/sysstat/sysstat](https://github.com/sysstat/sysstat)

在 Linux 公社中已有多篇文章介绍该工具的使用方法：

- Linux下sysstat安装使用图文详解 [https://www.linuxidc.com/Linux/2019-08/160082.htm](https://www.linuxidc.com/Linux/2019-08/160082.htm)
- 通过sysstat监控Linux各项参数 [https://www.linuxidc.com/Linux/2011-12/50177.htm](https://www.linuxidc.com/Linux/2011-12/50177.htm)
- Linux系统监控工具sysstat [https://www.linuxidc.com/Linux/2014-07/104683.htm](https://www.linuxidc.com/Linux/2014-07/104683.htm)
- Linux系统性能和使用活动监控工具 sysstat  [https://www.linuxidc.com/Linux/2014-10/108136.htm](https://www.linuxidc.com/Linux/2014-10/108136.htm)
- Linux系统性能和使用活动监控工具–Sysstat  [https://www.linuxidc.com/Linux/2015-12/126014.htm](https://www.linuxidc.com/Linux/2015-12/126014.htm)
- sysstat 12.1.6 发布，适用于Linux的性能监视工具  [https://www.linuxidc.com/Linux/2019-08/160081.htm](https://www.linuxidc.com/Linux/2019-08/160081.htm)


<br />今天就来介绍一下这款好用的 Linux 系统监控工具如何安装：
<a name="oZXYS"></a>
## 方法一：源码安装
sysstat 是一款开源的自由软件，其源代码开源在 [GitHub](https://github.com/sysstat/sysstat) ，您可以首先拉取仓库源码：
```bash
git clone https://github.com/sysstat/sysstat.git
```
之后运行如下命令：
```bash
$ ./configure
$ make
$ su
<enter root password>
# make install
```
安装成功！
<a name="5QLfZ"></a>
## 方法二：软件包管理器直接安装
<a name="LfkId"></a>
#### Install from RHEL/Fedora/CentOS
```bash
$ sudo yum install sysstat
```
CentOS和Fedora系统使用/etc/cron.d中的cron作业来调用收集器进程，并且默认情况下已启用它。 在最新版本中，使用systemd代替cron。 您可能需要启用并启动sysstat服务：
```bash
$ sudo systemctl enable sysstat
$ sudo systemctl start sysstat
```
<a name="wci50"></a>
#### Install from Ubuntu
```
$ sudo apt-get install sysstat
```
然后启用数据收集：
```
$ sudo vi /etc/default/sysstat
change ENABLED="false" to ENABLED="true"
save the file
```
最后，重新启动sysstat服务：
```
$ sudo service sysstat restart
```

<br />安装完成后，就可以利用这款强大的工具去监控我们的 Linux 操作系统了：[![](https://github.com/sysstat/sysstat/raw/master/images/color_output.png)](https://github.com/sysstat/sysstat/blob/master/images/color_output.png)<br />至于其使用，将会在后面的文章中介绍。

我的博客即将同步至腾讯云 + 社区，邀请大家一同入驻：https://cloud.tencent.com/developer/support-plan?invite_code=21yjpwt8mhhc0