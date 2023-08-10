---
title: "Openwrt 使用 Wireguard 异地组网（远程家庭网所有设备）"
date: 2022-04-23T15:42:39+08:00
description: "使用 Wireguard 、OpenWrt、VPS 完成异地组网."
categories: ["技术笔记集"]
tags: ["linux", "WireGuard", "OpenWrt"]
draft: false
---

最近入手了一款友善 Nano pi (型号 `FriendlyElec NanoPi R2S (CpuMark : 20651.944334 Scores)`)，直接作为家庭内网的主路由使用，各项性能比之前的 新路由3 要好太多了。

折腾了各项插件后，决定使用 WireGuard 打通一个虚拟的家庭网络，方便远程访问家庭内网的各种设备。之前使用过 OpenVPN ，确实有些臃肿，这次正好尝尝鲜，看看 wireguard 的效果怎么样。使用过只能说，这真是个太棒的东西了，有各种我想不到玩法。

在配置的过程中，踩了不少坑，这里简单记录一下。

首先说明一下情况：

- 设备型号： `FriendlyElec NanoPi R2S (CpuMark : 20651.944334 Scores)`
- 架构：`ARMv8 Processor rev 4 (v8l) x 4 (1200MHz, 55.5°C)`
- 固件 `OpenWrt R22.3.23 / LuCI Master (git-22.068.45502-a50e601)`

我的固件使用的是 [Leans 大神](https://github.com/coolsnowwolf/lede) 多功能版固件，自带 WireGuard 等插件，因此在这里略过 OpenWrt 安装 WireGuard 的步骤。

为了远程访问，我直接将一台公网的 nat 服务器作为所有 Wireguard 节点的 Endpoint，所有外网访问均通过这台服务器中转。

## WireGuard 公网端准备

在服务器上安装 Wireguard 时，我采用了开源脚本 ****[wireguard-install](https://github.com/angristan/wireguard-install)** 进行安装：

```yaml
$ curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
$ chmod +x wireguard-install.sh
$ ./wireguard-install.sh
```

> 如果github拉取缓慢，可以在 [这里](https://frytea.coding.net/public/tools/wireguard-install/git/files) 找到我在coding镜像的代码库，直接拷贝使用即可。

安装过程很简单，输入公网 IP地址，之后一路回车即可完成配置。

安装完毕后，再次运行该脚本，即可添加 peer 节点。

> 每个设备必须有一个独享的配置文件，若公用会导致多设备不可同时在线。

生成的配置文件大概是这样：

```yaml
cat /root/wg0-client-iphone.conf
[Interface]
PrivateKey = xxxxxxxxxxxxxxxxx
Address = 10.66.66.2/32,fd42:42:42::2/128
DNS = xxxx,xxxx

[Peer]
PublicKey = xxxxxxxxxxxxxxxxxxxx
PresharedKey = xxxxxxxxxxxxxxxxxxxx
Endpoint = x.x.x.x:xxx
AllowedIPs = 10.66.66.0/24, 192.168.2.0/24
```

> 需要注意 `[Peer]` 部分的 `AllowedIPs` ，默认为 `0.0.0.0/0` ，即全局流量均走该 VPN。如果只希望特定网段，在这里制定好即可。比如我的 Wireguard 网段 为 `10.66.66.0/24`，家庭内网网段为 `192.168.2.0/24` ，我就制定这两个网段即可。隧道激活时会自动为我们配置这两个网段的路由。

为每个客户端（包括 OpenWrt ）生成配置文件后，下面将 OpenWrt 接入该网络，并作为我们远程虚拟网和家庭子网的 NAT 使用。

## OpenWrt 配置

首先添加一个协议类行为 `WireGuard VPN` 类型的接口，在基本配置中填入配置文件对应的内容：

![](https://imagehost-cdn.frytea.com/images/2022/04/23/2022042323286445cedce6a3a32d8e1.png)

之后添加 peer ，继续填写配置文件的内容：

![](https://imagehost-cdn.frytea.com/images/2022/04/23/2022042323301322ee7c129afdf6e78.png)

填写完毕后保存，下面配置防火墙，选择 `lan` 区域即可：

![](https://imagehost-cdn.frytea.com/images/2022/04/23/20220423233167180d22f8db3fe1122.png)

这里也是我出现问题的地方。防火墙这里配置错误，可能导致远程访问不到我们的 OpenWrt 网络，或者是访问不到 OpenWrt 网络内的其他主机。

使用默认的 lan 配置，就无需配置各种复杂的路由或是 iptables 来进行 nat 转换了，如果这里配置有问题，或是有特别的需求，就需要有额外的配置了。

至此，**连接**该接口，或是重启 OpenWrt ，使用远程接入 WireGuard 网络的另一台设备应该就可以顺利的 ping 同内网设备，访问各种服务了。

我是在踩了一圈坑后，发现仅仅使用以上最简单的配置即可完成配置。

如果有问题，可以使用 `tcpdump` 或是其他抓包工具一路跟踪 `icmp` 报文来排查一下问题所在。

至此，配置完毕。

## 参考文献

- [[openwrt(x86)] 【2021-12-24】OpenWrt的WireGuard食用方法](https://www.right.com.cn/forum/thread-7553422-1-1.html)
- [Iptables NAT 端口转发和路由网关](https://blog.jmal.top/s/iptables-nat-port-forwarding-route-gateway)
- [WireGuard 教程：WireGuard 的搭建使用与配置详解](https://icloudnative.io/posts/wireguard-docs-practice/)
- [Wireguard 使用笔记](https://gobomb.github.io/post/wireguard-notes/)
- [wireGuard安装和配置过程](https://ggqshr.github.io/2020-12-21/wireGuard%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE%E8%BF%87%E7%A8%8B/)
- [公网部署 k3s 集群方法总结](https://www.frytea.com/technology/k8s/k3s-deployment-on-public-network/)