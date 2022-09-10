---
title: "自建网盘之 NextCloud 终极记录"
categories: [ "编程开发" ]
tags: [ "nextcloud","linux","Ubuntu" ]
draft: false
slug: "265"
date: "2019-11-27 10:34:00"
---

自建过许多网盘，试过 可道云、Seafile、FileRun、Nextcloud，但Nextcloud的如下特性吸引了我：

 - 完整、好用的客户端，包括 windows、mac、android、ios ...
 - 强大的插件扩展，如 Talk, Contacts, notes, Maps ...
 - 完整的第三方扩展，支持 Amazie S3, OneDrive, DropBox, Google Drive, Ftp, WebDav ...
 - ...

以上种种吸引了我进行了无数次的配置、尝试、探索。我在 `Centos, Debian, Ubuntu, Docker, Cpanel Virtual Hosting` 上都尝试过配置 `Nextcloud` , 但最终发现，还是官方首推的 `sudo snap install nextcloud` 方式是最稳定的，此外的自建环境 (Linux + Nginx + Php + MySQL) 总是会出各种各样的兼容性、异常报错，而这些异常报错会在一些莫名其妙、意想不到的地方出现让人在一个莫名其妙的地方掉坑。

以上种种，我决定在服务器上 `KVM` 虚拟出来一个 `Ubuntu` 系统专门配置 `Nextcloud` 服务。会有人说有必要吗？在一台 `VPS` 就可以配置 `LNMG/LAMP + CLoud Drive + Docker + Kubernates + node.js` 等等环境。但在我踩过无数的坑之后，发现**一切兼容的，都难以发挥其自身最大的力量**。

话不多说，本文主要记录 `Nextcloud` 配置在 `KVM` 虚拟化出的 `Ubuntu` 系统上，并持续更新后续各种基于此环境的操作。


## 虚拟机环境

1. 创建虚拟磁盘

```
qemu-img create -f qcow2 ubuntu_nextcloud.qcow2 100G
```

2. 创建 `KVM` 虚拟机
```
virt-install \
--virt-type=kvm \
--name=ubuntu_nextcloud \
--hvm \
--vcpus=4 \
--memory=4096 \
--cdrom=/srv/kvm/iso/ubuntu-18.04.3-live-server-amd64.iso \
--disk path=/srv/kvm/ubuntu_nextcloud.qcow2,size=400,format=qcow2 \
--network network=default \
--graphics vnc,password=kvm,listen=::,port=5913 \
--autostart \
--force
```

3. `VNC` 装系统

通过 `VNC viewer` 连入宿主机 `5913` 端口输入密码，安装操作系统。

[![C4791477-DEA4-4F81-A7D7-6DDDE62863B3.png](https://imagehost-cdn.frytea.com/images/2019/11/27/C4791477-DEA4-4F81-A7D7-6DDDE62863B3.png)](https://image.frytea.com/image/fvHX)

4. 端口转发

在宿主机使用 Frp, Iptables, NAT...等方式按照需求将虚拟机 `80` 端口转发出来，当然也可以不转发，这样子可以在内网的机器上使用内网 ip 直接访问到将来配置的 `Nextcloud`.

## 安装 nextcloud

A snap is a zip file containing an application together with its dependencies, and a description of how it should safely be run on your system, especially the different ways it should talk to other software. Most importantly snaps are designed to be secure, sandboxed, containerized applications isolated from the underlying system and from other applications.

To install the Nextcloud Snap Package, run the following command in a terminal:

```
sudo snap install nextcloud
```

此前已经说明在这里使用 `snap` 一键安装 `Nextcloud` ，除此之外还有 `Web installer` , `zip`, 等方式，可以直接将 nextcloud 安装在 自建好的 lnmp 环境上，但这种方式在此不再说明。

注：英文部分摘自官网说明。

## Nextcloud 维护 （持续更新区）

在使用过程中会需要各种莫名其妙的问题，因此在这里记录基于以上配置方法及环境下遇到的问题。

### snap 常用命令

```

#查看snap版本信息
snap --version
#找出所有snap应用
snap find
#安装应用
snap install 包名
#重启应用
snap restart 应用名
#升级应用
snap refresh 应用名
#查看安装的应用
snap list
#卸载应用
snap remove 应用名
```

### Nextcloud 资源位置

- 数据资源位置：`/var/snap/nextcloud/common/nextcloud/data`
- 配置资源位置：`/var/snap/nextcloud/current/nextcloud/config/config.php`

### 调整 PHP 内存限制的方法

```
$ sudo snap set nextcloud php.memory-limit=512M

# To set it to be unlimited
$ sudo snap set nextcloud php.memory-limit=-1
```

### 调整最大处理时间的方法

```
$ sudo snap set nextcloud nextcloud.cron-interval=10m

# disable the cronjob completely
$ sudo snap set nextcloud nextcloud.cron-interval=-1
```

### 添加可信域的方法

```
# 查看可信域
$ sudo nextcloud.occ config:system:get trusted_domains

# 添加可信域，请调整 1 和 example.com, 计数从 ‘0’ 开始
$ sudo nextcloud.occ config:system:set trusted_domains 1 --value=example.com
```

### 关闭维护模式的方法

```
sudo nextcloud.occ maintenance:mode --off
```

### IOS 配置 Calendar / Contacts

1. 打开设置
settings application -> Select Mail, Contacts, Calendars -> Select Add Account
Select Add CalDAV/CardDAV account.

2. 填入服务器、账号、密码

For server, type `example.com/remote.php/dav/principals/users/USERNAME/`

3. 成功
Select Next.

### 上传文件限制

根据文章 [snap安装nextcloud详细配置](https://colorcc.net/snap安装nextcloud详细配置/) 的说法：snap nextcloud的项目地址在https://github.com/nextcloud/nextcloud-snap，目前snap安装的nextcloud还不能调整和配置包内的php和apache2，但官方已经配置好的apache2和PHP 单文件16Gb的上传限制（实际好像不限制大小），一般来说应该不需要更改。

### 自签名证书 ssl

I copyied the cert files in `/var/snap/nextcloud/current/certs/custom/`
and then

`sudo nextcloud.enable-https custom -s cert.pem privkey.pem chain.pem`

也许会成功，来源 ：[Using your own SSL certs in snap](https://github.com/nextcloud/nextcloud-snap/issues/199#issuecomment-276759388)

## 参考文献

 - [GitHub/nextcloud/nextcloud-snap](https://github.com/nextcloud/nextcloud-snap)
 - [Nextcloud/Docs/Installation and server configuration/Installation on Linux](https://docs.nextcloud.com/server/17/admin_manual/installation/source_installation.html)
 - [NextCloud/Docs/Groupware/Synchronizing with iOS](https://docs.nextcloud.com/server/16/user_manual/pim/sync_ios.html)
 - [NextCloud一直处于维护状态解决方法](https://blog.csdn.net/chenbetter1996/article/details/82831413)
 - [如何在Ubuntu 18.04上安装和配置Nextcloud](https://www.howtoing.com/how-to-install-and-configure-nextcloud-on-ubuntu-18-04)
 - [Ubuntu使用Snap快速安装NextCloud网盘，并配置域名及SSL证书](https://www.moerats.com/archives/429/)
 - [Ubuntu使用Snap快速安装NextCloud网盘，并配置域名及SSL证书](https://www.jianshu.com/p/b21bfed57b08)
 - [snap安装nextcloud详细配置](https://colorcc.net/snap安装nextcloud详细配置/)
