---
title: "VMware ovftool arm zip 包安装"
categories: [ "技术" ]
tags: [ "vmware","ovftool" ]
draft: false
slug: "634"
date: "2022-08-25 11:59:10"
---

ovftool 是 VMware 提供的一款开放的导入、导出 OVF 格式虚拟机的 CLI 工具，支持 X86 和 Arm。

官方提供两种，一种是类似 `.bundle` 安装包，另一种是 `zip` 压缩包。本文介绍 `zip` 压缩包使用方法。

## 安装方法

### 第一步：获取软件包
获取 arm 安装包，建议通过官方途径下载，比如：

- https://developer.vmware.com/web/tool/4.4.0/ovf


### 第二步：解压

解压，例如这样：

```bash
$ unzip VMware-ovftool-4.4.0-15722219-lin.aarch64.zip
```

### 第三步：配置环境变量

```bash
$ + export PATH=$PATH:/home/worker/ovftool
$ source .bashrc
```

### 第四步：使用

```bash
# ovftool --version
VMware ovftool 4.4.0 (build-15722219)
```

## F&A

###  `libcrypt.so.1` 缺失

```
/root/ovftool/ovftool.bin: error while loading shared libraries: libcrypt.so.1: cannot open shared object file: No such file or directory
```

解决方案：

安装 `libxcrypt-compat` 软件包即可，比如这样：

```bash
# ArchLinux
$ pacman libxcrypt-compat
```

### `locale` 设置错误
```
/root/ovftool/ovftool: line 10: warning: setlocale: LC_CTYPE: cannot change locale (en_US.UTF-8): No such file or directory
```

`arch` 下解决方案，

1. 编辑 `/etc/locale.gen`，去掉 `en_US.UTF-8 UTF-8` 以及 `zh_CN.UTF-8 UTF-8` 行前的注释符号（`#`）

```bash
$ vim /etc/locale.gen

- #en_US.UTF-8 UTF-8
+ en_US.UTF-8 UTF-8
- #zh_CN.UTF-8 UTF-8
+ zh_CN.UTF-8 UTF-8
```

2.  然后使用如下命令生成 `locale`：

```bash
$ locale-gen
```

3.  向 `/etc/locale.conf` 输入内容：

```bash
$ echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

## 参考文献

- [Installing VMware OVF Tool](https://docs.vmware.com/en/VMware-Telco-Cloud-Operations/1.4.0/deployment-guide-140/GUID-95301A42-F6F6-4BA9-B3A0-A86A268754B6.html)
- [ArchLinux 基础安装/设置 Locale](https://arch.icekylin.online/rookie/basic-install.html#_14-设置-locale)
