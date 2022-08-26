---
title: "鲲鹏ARM环境编译升级虚拟化组件（QEMU+libvirt）"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "559"
date: "2021-08-18 09:57:00"
---

# 鲲鹏ARM环境编译升级虚拟化组件（QEMU+libvirt）

在 鲲鹏 arm 环境下可以直接使用yum安装相关虚拟化组件（以centos为例）：

```
yum -y install qemu* libvirt* AAVMF virt-install
```

但是软件库中的虚拟化组件版本较老，不支持 `spice` 等，而且对端口有限制，无法使用 `virt-manager` ，也无法对接 openstack 使用，因此需要分别升级 QEMU， libvirt。

（本文内容主要来自[华为鲲鹏支持官网文档](https://support.huaweicloud.com/instg-kunpengcpfs/kunpengkvm_03_0004.html)）

## 鲲鹏ARM编译升级QEMU（带有OpenStack相关组件）

安装依赖包。

```bash
yum -y install glib2-devel zlib-devel pixman-devel libaio-devel glib libffi-devel gcc gcc-c++ automake libtool bzip2-devel libuuid-devel spice-protocol spice-server-devel usbredir-devel gtk3-devel  SDL2-devel libjpeg-turbo-devel crudini librbd-devel snappy-devel
```

### **编译安装**

> 说明：QEMU默认安装在“/usr/local”下，源码包的下载请参见[获取软件包](https://support.huaweicloud.com/instg-kunpengcpfs/kunpengkvm_03_0002.html#kunpengkvm_03_0002__section8265124173115)。
使用的是 qemu-4.0.0版本。该arm版本暂不支持虚拟机热迁移功能（支持冷迁移），若有虚拟机热迁移需求，可根据openEuler中的patch包进行补丁升级，链接如下：[https://gitee.com/src-openeuler/qemu/tree/openEuler-20.03-LTS/](https://gitee.com/src-openeuler/qemu/tree/openEuler-20.03-LTS/)

```bash
wget https://download.qemu.org/qemu-4.0.0.tar.xz
```

1, 解压并进入QEMU目录。

```
tar -xvf qemu-4.0.0.tar.xz
cd qemu-4.0.0
```

2, 配置安装，若需对接 openstack 请包含相关依赖：

```

## 普通配置安装
./configure --target-list=aarch64-softmmu  --enable-linux-aio

## 配置安装，同时带有 openstack 相关依赖
../configure --prefix=/usr --target-list="aarch64-softmmu" \
      --enable-rbd --enable-debug --enable-vnc --enable-vnc-jpeg --enable-vnc-png \
      --enable-kvm --enable-spice --enable-curl --enable-snappy --enable-tools --enable-spice --enable-libusb \
      --enable-usb-redir --enable-linux-aio
```

编译安装

```bash
# 多线程编译
make -j64 
make install

# 链接 qemu-kvm ，若链接存在请先删除
ln -s /usr/bin/qemu-system-aarch64 /usr/bin/qemu-kvm
ln -s /usr/bin/qemu-system-aarch64 /usr/libexec/qemu-kvm
```

3, 添加lib库。

添加lib库路径。

```
vim /etc/ld.so.conf
include /usr/local/lib
```

使lib库更改生效。

```
ldconfig
```

4, 检验QEMU版本。

```bash
qemu-img --version
```


## 鲲鹏ARM环境编译升级libvirtd

说明：

官方提供的src.rpm包在编译时，有一定几率会失败，需多次尝试。

### **安装edk2**

- 在线安装

执行如下命令在线安装edk2

```bash
wget https://www.kraxel.org/repos/firmware.repo -O /etc/yum.repos.d/firmware.repo
yum -y install edk2.git-aarch64
```

- 离线安装

在有外网的环境下访问[https://www.kraxel.org/repos/jenkins/edk2/](https://www.kraxel.org/repos/jenkins/edk2/)，获取rpm包并拷贝至目标服务器系统相应位置。执行如下命令离线安装edk2，如[图2](https://support.huaweicloud.com/instg-kunpengcpfs/kunpengkvm_03_0006.html#kunpengkvm_03_0006__fig1374411589224)所示。

`rpm -ivh edk2.git-aarch64*.rpm`

### **安装依赖包**

> 说明：本章节的操作需要外网可用或已配置本地源。

```bash
yum -y install libxml2-devel readline-devel ncurses-devel libtasn1-devel gnutls-devel libattr-devel libblkid-devel augeas systemd-devel libpciaccess-devel yajl-devel sanlock-devel libpcap-devel libnl3-devel libselinux-devel dnsmasq radvd cyrus-sasl-devel libacl-devel parted-devel device-mapper-devel xfsprogs-devel librados2-devel librbd1-devel glusterfs-api-devel glusterfs-devel numactl-devel libcap-ng-devel fuse-devel netcf-devel libcurl-devel audit-libs-devel systemtap-sdt-devel nfs-utils dbus-devel scrub numad
```

### **编译安装**

> 说明：源码包的下载请参见获取软件包，本章以libvirt-5.6.0为例。该Arm版本暂不支持虚拟机热迁移功能（支持冷迁移），若有虚拟机热迁移需求，可根据openEuler中的patch包进行补丁升级，链接如下：[https://gitee.com/src-openeuler/libvirt/tree/openEuler-20.03-LTS/](https://gitee.com/src-openeuler/libvirt/tree/openEuler-20.03-LTS/)

1, 安装src.rpm源码包。

```
rpm -i libvirt-5.6.0-1.fc30.src.rpm
```

2, 生成rpm包。

```bash
cd /root/rpmbuild/SPECS/
rpmbuild -ba libvirt.spec
```

> 说明：
官方提供的src.rpm包在编译时，有一定几率会失败，需多次尝试。

3, 安装rpm包。

```
cd /root/rpmbuild/RPMS/aarch64/yum -y install *.rpm
```

4, 修改配置文件。

打开qemu.conf文件。

```bash
vim /etc/libvirt/qemu.conf
```

添加如下配置。

```bash
nvram = ["/usr/share/edk2.git/aarch64/QEMU_EFI-pflash.raw:/usr/share/edk2.git/aarch64/vars-template-pflash.raw"]
```

5, 重启libvirtd服务。

```bash
service libvirtd restart
systemctl restart libvirtd
```

6, 关闭SELinux。

```bash
setenforce 0
```

## 参考文献

- [文档首页 > 鲲鹏BoostKit虚拟化使能套件 > 安装指南> KVM虚拟机 安装指南（CentOS 7.6）> 配置安装环境> （可选）升级libvirt](https://support.huaweicloud.com/instg-kunpengcpfs/kunpengkvm_03_0006.html)
- [文档首页 > 鲲鹏BoostKit虚拟化使能套件 > 安装指南> KVM虚拟机 安装指南（CentOS 7.6）> 配置安装环境> （可选）升级QEMU](https://support.huaweicloud.com/instg-kunpengcpfs/kunpengkvm_03_0005.html)