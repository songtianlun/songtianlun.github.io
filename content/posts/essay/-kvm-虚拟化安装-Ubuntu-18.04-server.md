---
title: " kvm 虚拟化安装 Ubuntu 18.04 server"
categories: [ "编程开发" ]
tags: [ "KVM" ]
draft: false
slug: "262"
date: "2019-11-23 10:37:00"
---

本文续上篇 [《裸金属服务器 kvm 虚拟化安装 win10》](https://blog.frytea.com/archives/261/)继续记录使用 `KVM` 在 `Centos 7.5` 裸金属服务器上安装 `Ubuntu 18.04 Server`的过程及遇到的问题。

## 资源准备

首先要配置好 `KVM` 环境，上文已经详细说明，磁盘配置类似的使用 `qemu-img create -f qcow2 ubuntu.qcow2 100G ` 命令创建虚拟磁盘，系统镜像可以去官网下载:

Ubuntu 官网: <https://ubuntu.com/>
Ubuntu Server 18.04 LTS 下载: <https://ubuntu.com/download/server/thank-you?country=HK&version=18.04.3&architecture=amd64>

Verify your download

```

# Run this command in your terminal in the directory the iso was downloaded to verify the SHA256 checksum:

$ echo "b9beac143e36226aa8a0b03fc1cbb5921cff80123866e718aaeba4edb81cfa63 *ubuntu-18.04.3-live-server-amd64.iso" | shasum -a 256 --check

# You should get the following output:

ubuntu-18.04.3-live-server-amd64.iso: OK

```

网络配置继续使用 `KVM` 默认的 `default` nat 方式。

## 安装

```

$ virt-install \
--virt-type=kvm \
--name=nextcloud \
--hvm \
--vcpus=2 \
--memory=2048 \
--cdrom=/srv/kvm/nextcloud/ubuntu-18.04.3-live-server-amd64.iso \
--disk path=/srv/kvm/nextcloud/nextcloud.qcow2,size=500,format=qcow2 \
--network bridge=br0 \
--graphics vnc,password=kvmwin10,listen=::,port=5911 \
--autostart \
--force

```

安装成功后使用任意一个可以接入互联网的带有桌面换的设备上的 `VNC viewer` 进入 `YourIp:5911` 输入密码 `kvmwin10`，就可以进入虚拟机，然后继续安装了。

## Virsh 基础命令

```
virsh list --all           # 查看所有运行和没有运行的虚拟机
virsh list                 # 查看在运行的虚拟机
virsh dumpxml vm-name      # 查看kvm虚拟机配置文件
virsh start vm-name        # 启动kvm虚拟机
virsh shutdown vm-name     # 正常关机

virsh destroy vm-name      # 非正常关机，强制关闭虚拟机（相当于物理机直接拔掉电源）
virsh undefine vm-name     # 删除vm的配置文件

ls /etc/libvirt/qemu
# 查看删除结果，Centos-6.6的配置文件被删除，但磁盘文件不会被删除

virsh define file-name.xml # 根据配置文件定义虚拟机
virsh suspend vm-name      # 挂起，终止
virsh resumed vm-name      # 恢复被挂起的虚拟机
virsh autostart vm-name    # 开机自启动vm
virsh console <虚拟机名称>   # 连接虚拟机
```

## -install 常用参数说明

```bash
–name指定虚拟机名称
–memory分配内存大小。
–vcpus分配CPU核心数，最大与实体机CPU核心数相同
–disk指定虚拟机镜像，size指定分配大小单位为G。
–network网络类型，此处用的是默认，一般用的应该是bridge桥接。
–accelerate加速
–cdrom指定安装镜像iso
–vnc启用VNC远程管理，一般安装系统都要启用。
–vncport指定VNC监控端口，默认端口为5900，端口不能重复。
–vnclisten指定VNC绑定IP，默认绑定127.0.0.1，这里改为0.0.0.0。
–os-type=linux,windows
–os-variant=rhel6

--name      指定虚拟机名称
--ram       虚拟机内存大小，以 MB 为单位
--vcpus     分配CPU核心数，最大与实体机CPU核心数相同
–-vnc       启用VNC远程管理，一般安装系统都要启用。
–-vncport   指定VNC监控端口，默认端口为5900，端口不能重复。
–-vnclisten  指定VNC绑定IP，默认绑定127.0.0.1，这里改为0.0.0.0。
--network   虚拟机网络配置
  # 其中子选项，bridge=br0 指定桥接网卡的名称。

–os-type=linux,windows
–os-variant=rhel7.2

--disk 指定虚拟机的磁盘存储位置
  # size，初始磁盘大小，以 GB 为单位。

--location 指定安装介质路径，如光盘镜像的文件路径。
--graphics 图形化显示配置
  # 全新安装虚拟机过程中可能会有很多交互操作，比如设置语言，初始化 root 密码等等。
  # graphics 选项的作用就是配置图形化的交互方式，可以使用 vnc（一种远程桌面软件）进行链接。
  # 我们这列使用命令行的方式安装，所以这里要设置为 none，但要通过 --extra-args 选项指定终端信息，
  # 这样才能将安装过程中的交互信息输出到当前控制台。
--extra-args 根据不同的安装方式设置不同的额外选项
```


## Ubuntu 固定ip

由于安装 `Ubuntu` 是为了做某应用的服务，因此需要外网访问，使用 `Nat` 映射端口需要固定 ip。

首先，您需要确定要配置的网络接口。 您可以使用ifconfig命令列出系统中所有连接的网络接口。

`$ ifconfig -a`

Ubuntu设置静态IP地址

```
$ sudo vim /etc/netplan/xxxx.ymal
```

修改这个文件：
```
network:
  ethernets:
    ens33:
      addresses:
      - 192.168.122.3/24
      dhcp4: false
      gateway4: 192.168.122.1
      nameservers:
        addresses:
        - 192.168.122.1
        search: []
  version: 2
```

说明：
```
# ens33:网络接口名称
# dhcp4:接收IPV4接口的dhcp属性
# dhcp6:接收IPV6接口的dhcp属性
# addresses:接口的静态地址序列
# gateway4:默认网关的IPV4地址
# Nameservers:DNS服务器地址，以,号分割
```

[tip type="info" title="小提示"]
如果在 `vim` 中误触，可以使用 `u`撤销一次操作.

```
u   撤销上一步的操作
Ctrl+r 恢复上一步被撤销的操作
```
[/tip]


保存该文件并退出。然后使用以下n`etplan`命令应用最近的网络更改。

```
$ sudo netplan apply
```

现在再次验证所有可用的网络接口，ens33以太网接口现在应连接到本地网络，并具有IP地址.

`ifconfig -a`

至此，Ubuntu 虚拟机安装完成， 进入 `VNC` 继续后续操作就好。


## 彩蛋

浏览参考文献时发现一个有意思的文章[《使用virt-install安装虚拟机，发行版安装代码直接复制运行》](https://raymii.org/s/articles/virt-install_introduction_and_copy_paste_distro_install_commands.html)，在这里记录一下，有时间试试。

```

Debian 8
virt-install \
--name debian8 \
--ram 1024 \
--disk path=./debian8.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant generic \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://ftp.nl.debian.org/debian/dists/jessie/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
Debian 7
virt-install \
--name debian7 \
--ram 1024 \
--disk path=./debian7.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant debian7 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://ftp.nl.debian.org/debian/dists/jessie/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
Debian 6
virt-install \
--name debian6 \
--ram 1024 \
--disk path=./debian6.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant debian6 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://ftp.nl.debian.org/debian/dists/squeeze/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
CentOS 7
virt-install \
--name centos7 \
--ram 1024 \
--disk path=./centos7.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant centos7 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://mirror.i3d.net/pub/centos/7/os/x86_64/' \
--extra-args 'console=ttyS0,115200n8 serial'
CentOS 6
virt-install \
--name centos6 \
--ram 1024 \
--disk path=./centos6.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant centos6 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://mirror.i3d.net/pub/centos/6/os/x86_64/' \
--extra-args 'console=ttyS0,115200n8 serial'
CentOS 5
virt-install \
--name centos5 \
--ram 1024 \
--disk path=./centos5.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant centos5 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://mirror.i3d.net/pub/centos/5/os/x86_64/' \
--extra-args 'console=ttyS0,115200n8 serial'
Ubuntu 14.04
virt-install \
--name ubuntu1404 \
--ram 1024 \
--disk path=./ubuntu1404.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant generic \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://archive.ubuntu.com/ubuntu/dists/trusty/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
Ubuntu 12.04
virt-install \
--name ubuntu1204 \
--ram 1024 \
--disk path=./ubuntu1204.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant ubuntu12.04 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://archive.ubuntu.com/ubuntu/dists/precise/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
Ubuntu 10.04
virt-install \
--name ubuntu1004 \
--ram 1024 \
--disk path=./ubuntu1004.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant ubuntu10.04 \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://archive.ubuntu.com/ubuntu/dists/lucid/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
OpenSUSE 13
virt-install \
--name opensuse13 \
--ram 1024 \
--disk path=./opensuse13.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant generic \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://download.opensuse.org/distribution/13.2/repo/oss/' \
--extra-args 'console=ttyS0,115200n8 serial'
OpenSUSE 12
virt-install \
--name opensuse12 \
--ram 1024 \
--disk path=./opensuse12.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant generic \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://download.opensuse.org/distribution/12.3/repo/oss/' \
--extra-args 'console=ttyS0,115200n8 serial'
OpenSUSE 11
virt-install \
--name opensuse11 \
--ram 1024 \
--disk path=./opensuse11.qcow2,size=8 \
--vcpus 1 \
--os-type linux \
--os-variant generic \
--network bridge=virbr0 \
--graphics none \
--console pty,target_type=serial \
--location 'http://download.opensuse.org/distribution/11.4/repo/oss/' \
--extra-args 'console=ttyS0,115200n8 serial'
Generic ISO
Download an ISO file and give the filename to the --cdrom= parameter. This is used instead of --location. A VNC console is available on localhost, port 5999 for you to use.

An example for FreeBSD 10. First download the ISO:

wget http://ftp.freebsd.org/pub/FreeBSD/releases/ISO-IMAGES/10.1/FreeBSD-10.1-RELEASE-amd64-dvd1.iso
Then start virt-install:

 virt-install \
--name freebsd10 \
--ram 1024 \
--disk path=./freebsd10.qcow2,size=8 \
--vcpus 1 \
--os-type generic \
--os-variant generic \
--network bridge=virbr0 \
--graphics vnc,port=5999 \
--console pty,target_type=serial \
--cdrom ./FreeBSD-10.1-RELEASE-amd64-dvd1.iso \
You need to start up a VNC client to do the installation.

```


## 参考文献
 
 - [裸金属服务器 kvm 虚拟化安装 win10](https://blog.frytea.com/archives/261/)
 - [CentOS7安装KVM虚拟机详解](https://github.com/jaywcjlove/handbook/blob/master/CentOS/CentOS7安装KVM虚拟机详解.md#安装虚拟机)
 - [Ubuntu 18.04 Server 设置静态IP 的方法](https://www.jb51.net/article/151753.htm)
 - [vim 撤销 回退操作](https://blog.csdn.net/xiongzhengxiang/article/details/7206691)
