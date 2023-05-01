---
title: "更换 PVE7 软件仓库源和 CT模板（LXC）源为国内源"
categories: [ "技术" ]
tags: [ "PVE","debian","lxc" ]
draft: false
slug: "605"
date: "2021-12-14 09:05:00"
---

PVE7 安装后默认配置的 apt 软件源和 CT(LXC)容器模板源均是官方默认的，国内使用性能不佳，建议替换为 清华 Tuna 提供的国内镜像源，速度将有一个较大的提升。

如果 pve 官网 iso 镜像下载较慢，也可在 tuna 提供的镜像站下载：[https://mirrors.tuna.tsinghua.edu.cn/proxmox/iso/](https://mirrors.tuna.tsinghua.edu.cn/proxmox/iso/)

注：本文以 `pve 7.0.2 (debian 11 bulleye)` 为例，其他版本请自行在镜像网站寻找对应地址。

## 替换 apt 软件源

替换前建议先更新下证书，否则可能由于证书不可用导致 https 无法使用，进而无法下载所有软件。

```bash
$ sudo apt install apt-transport-https ca-certificates
```

首先替换通用软件源， Debian 的软件源配置文件是 `/etc/apt/sources.list`，备份后将其中内容修改为以下即可。

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
```

之后替换 pve 软件源，pve 镜像默认的 pve 软件源配置文件是 `/etc/apt/sources.list.d/pve-enterprise.list` ，备份后将其中内容替换为以下即可：

```bash
deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription
```

最后更新下，速度很快：

```bash
sudo apt-get update
```

## 修改 **CT Templates (LXC容器)源**

将 `/usr/share/perl5/PVE/APLInfo.pm` 文件中默认的源地址 `http://download.proxmox.com` 替换为 `https://mirrors.tuna.tsinghua.edu.cn/proxmox` 即可。

可以使用如下命令修改：

```bash
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back
sed -i 's|http://download.proxmox.com|https://mirrors.tuna.tsinghua.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm
```

针对 `/usr/share/perl5/PVE/APLInfo.pm` 文件的修改，重启后生效。

```bash
systemctl restart pvedaemon.service
```

之后在 pve 网页端下载 CT Templates 速度就很快了。

## 参考文献

- [Debian 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/debian/) By Tuna
- [Proxmox 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/proxmox/) By Tuna