---
title: "为 Windows 10 新增物理网卡子接口"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "525"
date: "2021-04-12 08:55:00"
---

本文首发于：https://blog.frytea.com/archives/525/

在进行网络设备调试时常常会使用到多 IP ，Linux 上可以很方便的为物理网卡配置子接口解决，但是在 Windows 上如果物理网卡必须使用 DHCP 就无法再配置多 IP 了，只能暂时的使用 USB 转网卡解决。近期突然灵机一动，能不能使用 Windows 10 天然支持的 WSL 来解决这个问题，经过本人实测，是可以的，方法也很简单。

环境为 Win 10 专业版，安装了 WSL Ubuntu，具体安装方法请自行百度。

安装完毕后进入 WSL， CMD 里输入 `ubuntu` 即可，使用 `ifconfig` 先看一下当前的网卡：

```
ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 30.30.253.241  netmask 255.255.255.240  broadcast 30.30.253.255
        inet6 fe80::5d98:1dfb:7083:f7ed  prefixlen 64  scopeid 0xfd<compat,link,site,host>
        ether 6c:4b:90:d4:a9:20  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

其中的 eth0 就是对应的 win10 物理网卡在 WSL 中的映射。

使用以下命令为该网卡配置一个子接口：

```
sudo ip addr add 192.168.8.123/24 dev eth0 label eth0:1
```

此时使用 ifconfig 看不到这个子接口，但是实际上已经生效：

![](https://imagehost-cdn.frytea.com/images/2021/04/12/_161818798180733041116d261efa3c.png)

可以发现在 Win10 上 ping 一个该网段 IP ，配置该子接口后立刻就通了，说明配置完成。

## 疑难解答

如果您配置时得到下面报错：

```
RTNETLINK answers: Permission denied
```

使用管理员权限打开 CMD，运行 `ubuntu` 或 `wsl` ，之后再配置即可成功。（感谢 GITHUB 社区）

## 拓展阅读

- [linux 新增网卡子接口 - Frytea Wiki](https://wiki.frytea.com/doku.php?id=technology:linux:linux新增网卡子接口)
- [error creating virtual interface - RTNETLINK answers: Permission denied](https://github.com/Microsoft/WSL/issues/2675)
