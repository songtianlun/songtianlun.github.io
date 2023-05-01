---
title: "Centos系统安装docker"
categories: [ "技术" ]
tags: [ "centos","docker" ]
draft: false
slug: "37"
date: "2019-03-12 11:13:00"
---


## 主要步骤
1、Docker 要求 CentOS 系统的内核版本高于 3.10 ，查看本页面的前提条件来验证你的CentOS 版本是否支持 Docker 。

通过 uname -r 命令查看你当前的内核版本
```
$ uname -r
```
![](http://pnabaentf.bkt.clouddn.com//20190312111724.png)
2、使用 root 权限登录 Centos。确保 yum 包更新到最新。

```
$ sudo yum update
```
![](http://pnabaentf.bkt.clouddn.com//20190312111704.png)
3、卸载旧版本(如果安装过旧版本的话)

```
$ sudo yum remove docker  docker-common docker-selinux docker-engine
```
4、安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

```
$ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
![](http://pnabaentf.bkt.clouddn.com//20190312111830.png)
5、设置yum源

```
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
![](http://pnabaentf.bkt.clouddn.com//20190312111852.png)
6、可以查看所有仓库中所有docker版本，并选择特定版本安装
```
$ yum list docker-ce --showduplicates | sort -r
```
![](http://pnabaentf.bkt.clouddn.com//20190312111944.png)

7、安装docker
```
$ sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版18.06.3
$ sudo yum install <FQPN>  # 例如：sudo yum install docker-ce-18.06.3.ce
```
![](http://pnabaentf.bkt.clouddn.com//20190312112143.png)
8、启动并加入开机启动
```
$ sudo systemctl start docker
$ sudo systemctl enable docker
```
![](http://pnabaentf.bkt.clouddn.com//20190312112231.png)
9、验证安装是否成功(有client和service两部分表示docker安装启动都成功了)
```
$ docker version
```
![](http://pnabaentf.bkt.clouddn.com//20190312112247.png)

# 参考文献
* [Centos7上安装docker](https://www.cnblogs.com/yufeng218/p/8370670.html)