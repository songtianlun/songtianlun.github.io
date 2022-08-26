---
title: "Linux虚拟化入门（三）Fedora 安装 KVM 管理环境"
categories: [ "编程开发" ]
tags: [ "KVM" ]
draft: false
slug: "541"
date: "2021-07-05 15:03:00"
---

## 部署步骤

- 第一步、**检查环境要求**

使用如下命令检查您的 CPU 是否支持虚拟化：

```
$ egrep '^flags.*(vmx|svm)' /proc/cpuinfo
```

如果没有**任何**输出，则说明您的系统不支持相关扩展功能。您仍然可以使用 QEMU/KVM ，但是虚拟将只能使用软件虚拟化（想当慢）。

- 第二步、**安装虚拟化软件包**

当安装 Fedora 时，可以通过勾选安装基本组中的**虚拟化**组以安装虚拟化软件包。

在已经完成 Fedora 安装的系统中， QEMU、KVM和其他一些虚拟化工具的安装可以通过运行如下命令安装虚拟化组：

```
su -c "yum install @virtualization"
```

该命令将安装 `qemu-kvm`、 `python-virtinst`、 `qemu`、 `virt-manager`、 `virt-viewer` 以及所有需要的依赖软件包。

```bash
su -c "systemctl start libvirtd"
```

确认所有 kvm 内核模块已正常加载：

```
$ lsmod | grep kvm
kvm_amd                55563  0
kvm                   419458  1 kvm_amd
```

如果该命令没有列出 kvm_intel 或 kvm_amd, 则说明 KVM 没有正常配置。参看 [确保系统正常使用 KVM](https://fedoraproject.org/wiki/How_to_debug_Virtualization_problems#Ensuring_system_is_KVM_capable) 以获得解决问题的建议。

- 第三步、使用虚拟机

您可以使用命令行工具 `virsh` 管理虚拟机。 你可以在命令行下使用 `virsh` 工具管理**guest** 。 `virsh` 工具是基于 libvirt 管理 API 实现的：

- `virsh` 有一套稳定的命令，其语法与虚拟化平台无关。
- `virsh` 可以作为仅有只读权限的工具使用(如：列出所有主机及其统计信息)。
- `virsh` 可以管理 Xen，Qemu/KVM，esx 及其他一些类具有相同贵发后端下的主机。

**一个有效地址可以使用 "-c" 参数传递给 `virsh` 来连接到远程 libvirtd 实例。详情请参看 [http://libvirt.org/uri.html](http://libvirt.org/uri.html)**

如下命令启动虚拟机：

```
su -c "virsh create <name of virtual machine>"
```

要列出当前运行的虚拟机，执行：

```
su -c "virsh list"
```

列出所有虚拟机(不管是否运行)：

```
su -c "virsh list --all"
```

正常关闭 guest ：

```
su -c "virsh shutdown <virtual machine (name | id | uuid)>"
```

强制关闭 guest ：

```
su -c "virsh destroy <virtual machine (name | id | uuid)>"
```

保存虚拟机快照到文件：

```
su -c "virsh save <virtual machine (name | id | uuid)> <filename>"
```

从快照恢复虚拟机：

```
su -c "virsh restore <filename>"
```

导出虚拟机配置文件：

```
su -c "virsh dumpxml <virtual machine (name | id | uuid)"
```

列出全部 `virsh` 可用命令：

```
su -c "virsh help"
```

也可以查看手册： `man 1 virsh`

## 参考文献

- [Getting started with virtualization/zh-cn](https://fedoraproject.org/wiki/Getting_started_with_virtualization/zh-cn)