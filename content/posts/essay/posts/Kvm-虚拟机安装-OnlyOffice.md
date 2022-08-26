---
title: "Kvm 虚拟机安装 OnlyOffice"
categories: [ "编程开发" ]
tags: [ "KVM" ]
draft: false
slug: "272"
date: "2019-12-01 19:22:00"
---

## OnlyOffice

OnlyOffice 是一个开源的办公套件，由 Ascensio System SIA 公司开发，提供了在线文档编辑、文档管理、文档协作、邮件和项目管理等功能。(WikiPedia)

打开官网可以看到 OnlyOffice 提供企业版、高校版等多个收费版本，在这里我们安装开源免费的 [社区版](https://www.onlyoffice.com/zh/download.aspx)。社区版提供多种安装方式，在这里我们选择`使用官方ONLYOFFICE Docker容器安装ONLYOFFICE社区版及其正常运行所需的全部依赖项`。旨在最大程度的重现官方建议的环境节约时间。请注意，官方建议安装环境为 `2C/6G/40GB` 。

环境要求：
 - CPU dual core 2 GHz or better
 - RAM 6 GB or more
 - HDD at least 40 GB of free space
 - Additional requirements at least 6 GB of swap
 - OS amd64 Linux distribution with kernel version 3.10 or later

## 安装步骤

1、生成虚拟机并安装 ubuntu 18.04 server

虚拟磁盘：`qemu-img create -f qcow2 ubuntu_onlyoffice.qcow2 50G `

新建虚拟机：

```

virt-install \
--virt-type=kvm \
--name=ubuntu_onlyoffice \
--hvm \
--vcpus=4 \
--memory=6144 \
--cdrom=/srv/kvm/iso/ubuntu-18.04.3-live-server-amd64.iso \
--disk path=/srv/kvm/ubuntu_onlyoffice.qcow2,size=50,format=qcow2 \
--network network=default \
--graphics vnc,password=tianlun666,listen=::,port=5916 \
--autostart \
--force

```

2、配置 Docker 镜像

基于 Docker 的一键安装脚本需要拉取许多镜像，国内访问速度很慢，在这里配置一下[阿里的 Docker 镜像加速](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)。

在阿里的容器服务控制台可以申请一个镜像地址，同时可以在控制台看到形如下列的命令：

```

sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://*******.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```

运行安装即可。


3、运行官方提供的一键安装脚本（基于 Docker 安装）

首先下载脚本：

`$ wget https://download.onlyoffice.com/install/opensource-install.sh `

接下来二选一，如果需要配置邮件服务，可以是用自己为邮件准备好的域名替换命令中的域名并运行，如果不配置邮件服务就运行第二行命令。

`$ bash opensource-install.sh -md "yourdomain.com" `

`$ bash opensource-install.sh -ims false `

结束

## 参考文献

 - [WikiPedia/OnlyOffice](https://en.wikipedia.org/wiki/OnlyOffice)
 - [OnlyOffice 官网](https://www.onlyoffice.com/zh/)
 - [OnlyOffice/Help Center Community/Installing Community Edition using the provided script](https://helpcenter.onlyoffice.com/server/docker/opensource/opensource-script-installation.aspx?_ga=2.130273420.201545911.1575111079-812371719.1575111079)
 - [使用适用解决方案在您的服务器上部署ONLYOFFICE社区版](https://www.onlyoffice.com/zh/download.aspx)

