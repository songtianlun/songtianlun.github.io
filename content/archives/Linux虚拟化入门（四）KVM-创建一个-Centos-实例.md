---
title: "Linux虚拟化入门（四）KVM 创建一个 Centos 实例"
categories: [ "技术" ]
tags: [ "KVM" ]
draft: false
slug: "542"
date: "2021-07-05 15:04:00"
---

## 前提条件

- 完整 KVM 环境
- Centos 镜像

## 步骤

- 第一步、创建磁盘

```bash
qemu-img create -f qcow2 centos_kvm1.qcow2 16G
```

- 第二步、安装虚拟机

```bash
virt-install \
--virt-type=kvm \
--name=centos-kvm \
--hvm \
--vcpus=1 \
--memory=1024 \
--cdrom=/srv/kvm/CentOS-7-x86_64-Minimal-1810.iso \
--disk path=/srv/kvm/centos_kvm1.qcow2,size=16,format=qcow2 \
--graphics vnc,password=kvm,listen=::,port=5911 \
--network bridge=virbr0 \
--autostart \
--force
```

安装成功后使用任意一个可以访问KVM宿主机的带有桌面的设备上的 VNC viewer 进入 `YourIp:5911` 输入密码 `kvm` 就可以进入虚拟机，然后继续安装了。

- 第三步、基础操作

```bash
virsh list --all           # 查看所有运行和没有运行的虚拟机
virsh list                 # 查看在运行的虚拟机
virsh dumpxml vm-name      # 查看kvm虚拟机配置文件
virsh start vm-name        # 启动kvm虚拟机
virsh shutdown vm-name     # 正常关机

virsh destroy vm-name      # 非正常关机，强制关闭虚拟机（相当于物理机直接拔掉电源）
virsh undefine vm-name     # 删除vm的配置文件

virsh define file-name.xml # 根据配置文件定义虚拟机
virsh suspend vm-name      # 挂起，终止
virsh resumed vm-name      # 恢复被挂起的虚拟机
virsh autostart vm-name    # 开机自启动vm
virsh console <虚拟机名称>   # 连接虚拟机
```

## **install 常用参数说明展开目录**

```
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

## 参考文献

- [KVM-virsh学习(虚拟机磁盘管理)](https://blog.csdn.net/csdnlb/article/details/105080300)
- [kvm 虚拟化安装 Ubuntu 18.04 server](https://blog.frytea.com/archives/262/)