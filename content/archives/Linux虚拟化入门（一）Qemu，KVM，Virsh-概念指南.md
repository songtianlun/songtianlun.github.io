---
title: "Linux虚拟化入门（一）Qemu，KVM，Virsh 概念指南"
categories: [ "技术" ]
tags: [ "KVM" ]
draft: false
slug: "539"
date: "2021-07-05 15:02:00"
---

当你安装了一台Linux，想启动一个KVM虚拟机的时候，你会发现需要安装不同的软件，启动虚拟机的时候，有多种方法：

- virsh start
- kvm命令
- qemu命令
- qemu-kvm命令
- qemu-system-x86_64命令

## QEMU

首先看qemu，其中关键字emu，全称emulator，模拟器，所以单纯使用qemu是采用的**完全虚拟化**的模式。

Qemu向Guest OS模拟CPU，也模拟其他的硬件，GuestOS认为自己和硬件直接打交道，其实是同Qemu模拟出来的硬件打交道，Qemu将这些指令转译给真正的硬件。由于所有的指令都要从Qemu里面过一手，因而性能比较差。

完全虚拟化是非常慢的，所以要使用硬件辅助虚拟化技术Intel-VT，AMD-V，所以需要CPU硬件开启这个标志位，一般在BIOS里面设置。查看是否开启

```bash
# 对于Intel CPU 可用命令判断
grep "vmx" /proc/cpuinfo 

# 对于AMD CPU 可用命令判断
grep "svm" /proc/cpuinfo 
```

当确认开始了标志位之后，通过KVM，GuestOS的CPU指令不用经过Qemu转译，直接运行，大大提高了速度。

所以KVM在内核里面需要有一个模块，来设置当前CPU是Guest OS在用，还是Host OS在用。

## KVM

基于内核的虚拟机（英语：Kernel-based Virtual Machine，缩写为KVM）是一种用于Linux内核中的虚拟化基础设施，可将Linux内核转化为一个虚拟机监视器。

KVM提供抽象的设备，但不模拟处理器。它开放了/dev/kvm接口，供用户模式的主机使用。

![https://imagehost-cdn.frytea.com/images/2021/07/05/2021070511463525bc131220fa136e.png](https://imagehost-cdn.frytea.com/images/2021/07/05/2021070511463525bc131220fa136e.png)

## qemu-kvm

Qemu将KVM整合进来，通过ioctl调用/dev/kvm接口，将有关CPU指令的部分交由内核模块来做，就是qemu-kvm (qemu-system-XXX)

qemu和kvm整合之后，CPU的性能问题解决了，另外Qemu还会模拟其他的硬件，如Network, Disk，同样全虚拟化的方式也会影响这些设备的性能。

于是qemu采取半虚拟化或者类虚拟化的方式，让Guest OS加载特殊的驱动来做这件事情。

例如网络需要加载virtio_net，存储需要加载virtio_blk，Guest需要安装这些半虚拟化驱动，GuestOS知道自己是虚拟机，所以数据直接发送给半虚拟化设备，经过特殊处理，例如排队，缓存，批量处理等性能优化方式，最终发送给真正的硬件，一定程度上提高了性能。

![https://imagehost-cdn.frytea.com/images/2021/07/05/202107051150145c91ed5fd0d33987.png](https://imagehost-cdn.frytea.com/images/2021/07/05/202107051150145c91ed5fd0d33987.png)

## virsh

然而直接用 `qemu` 或者 `qemu-kvm` 或者 `qemu-system-xxx` 的少，大多数还是通过 `virsh` 启动， `virsh` 属于 `libvirt` 工具， `libvirt` 是目前使用最为广泛的对 `KVM` 虚拟机进行管理的工具和 `API` ，可不止管理KVM。

`Libvirt` 分服务端和客户端， `Libvirtd` 是一个daemon进程，是服务端，可以被本地的virsh调用，也可以被远程的virsh调用，virsh相当于客户端。

Libvirtd调用 `qemu-kvm` 操作虚拟机，有关CPU虚拟化的部分，qemu-kvm调用 `kvm` 的内核模块来实现

![https://imagehost-cdn.frytea.com/images/2021/07/05/202107051152022b49de7970473781.png](https://imagehost-cdn.frytea.com/images/2021/07/05/202107051152022b49de7970473781.png)

这下子，整个相互关系才搞清楚了。

## 参考文献

- [我是虚拟机内核我困惑？！](https://mp.weixin.qq.com/s?__biz=MzI1NzYzODk4OQ==&mid=2247483820&idx=1&sn=8a44b992491aea03e55eefb4815a1958&chksm=ea15168edd629f98e622dcb94e64fbb4a75055da98d620e7c83071b5d6d428904fa5c8e9c4ad&scene=21#wechat_redirect)
- [Qemu，KVM，Virsh傻傻的分不清](https://www.cnblogs.com/popsuper1982/p/8522535.html)
- [基于内核的虚拟机-Wikipedia](https://zh.wikipedia.org/wiki/%E5%9F%BA%E4%BA%8E%E5%86%85%E6%A0%B8%E7%9A%84%E8%99%9A%E6%8B%9F%E6%9C%BA#cite_note-14)