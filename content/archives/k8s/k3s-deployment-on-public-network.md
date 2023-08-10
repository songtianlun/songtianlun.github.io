---
title: "公网部署 k3s 集群方法总结"
date: 2022-03-08T14:36:35+08:00
description: "基于公网完成跨云厂商服务器 k3s 集群部署"
categories: ["技术笔记集","云原生笔记集"]
tags: ["linux", "docker", "k8s", "kubernetes","k3s", "vps", "云原生"]
draft: false
---

Kubernetes 在当下的火热程度不必多言，但由于其体量较大，自身组建就会占用不少资源，适合大规模部署。k3s 是一个轻量的 Kubernetes 实现，通过了官方认证，在占用极低资源的情况下可以提供大部分功能，个人轻量服务器、树莓派之类资源有限的情况下显得特别好用。

既然资源有限为什么还要使用 k3s 来占用一小部分资源呢？这就是云原生时代计算资源管理的优势所在了，将多节点资源汇集在一起使用 k3s 统一调配，既避免了多台服务器反复切换，还能很轻松的实现冗余、热备、高可用，在 k8s 强大生态加持下，可以帮我们自动化的完成许多繁琐的运维工作，作为开发者可以将精力更多的放在开发本身上，何乐而不为呢。

在经过了多日的踩坑、尝试之后，终于总结出一份基本可以快速拉起 `单 master + 单 agent k3s` 集群的方法，且在后期可以方便的扩容。在这里分享出这份教程，希望对各位有用。

如果对 kubernetes 的各种概念还不是很理解，建议前往官网通读 **[学习 Kubernetes 基础知识](https://kubernetes.io/zh/docs/tutorials/kubernetes-basics/) ，**这将对你理解其中的思想及后期使用都会有许多帮助。

本文介绍的方法可用于跨云厂商服务器 k3s 部署，只要公网可以互访即可，当然最好延迟越低越好，否则使用起来体验不佳。

因为是**跨云部署**，即节点之间没有直接可用的内部局域网，仅能通过公网互联。**因此在安装 k3s 组件之前，需要先在服务器之间搭起 VPN** ，用于集群间通信。当然，**如果您的服务器直接可以内网互通，可以跳过**这一步骤。

## 集群间通信基础 - WireGrad VPN 配置

我的两台服务器均采用 `debian 11` 操作系统，内核为 `5.10 (>5.6)`，无需升级内核即可使用（包含 WireGrad 支持），如果内核版本过低需要先升级内核再继续。

```bash
$ sudo apt install wireguard
```

为了集群安全考量，不可以直接使用公网IP进行集群间通信，这里首先为需要组 k3s 集群的服务器配置 WireGrad VPN 通道，为方便起见，直接使用开源脚本 **[wireguard-install](https://github.com/angristan/wireguard-install)** 进行安装：

```yaml
$ curl -O https://raw.githubusercontent.com/angristan/wireguard-install/master/wireguard-install.sh
$ chmod +x wireguard-install.sh
$ ./wireguard-install.sh
```

> 如果github拉取缓慢，可以在 [这里](https://frytea.coding.net/public/tools/wireguard-install/git/files) 找到我在coding镜像的代码库，直接拷贝使用即可。
> 

安装过程很简单，输入公网 IP地址，之后一路回车即可完成配置。

**本地完成安装**后**再次执行脚本** ，选择 `Add a new user` ，输入信息之后，即可生成客户端使用的 WireGrad 配置文件，内容大致如下：

```yaml
cat /root/wg0-client-k3s-agent1.conf
[Interface]
PrivateKey = xxxxxxxxxxxxxxxxx
Address = 10.66.66.2/32,fd42:42:42::2/128
DNS = xxxx,xxxx

[Peer]
PublicKey = xxxxxxxxxxxxxxxxxxxx
PresharedKey = xxxxxxxxxxxxxxxxxxxx
Endpoint = x.x.x.x:xxx
AllowedIPs = 10.66.66.1/32
```

> 需要注意 `[Peer]` 部分的 `AllowedIPs` ，默认为 `0.0.0.0/0` ，我在这里改为 master 节点的ip，后期加节点时再补充这一列表。**如果直接使用默认值，可能改变子节点默认路由配置，导致无法访问**。腾讯云面板都访问不进去，最后只能重装系统解决。
> 

将该文件拷入子节点，之后使用在子节点启用即可：

```yaml
# 启动
$ wg-quick up /full/path/to/wg0.conf 

# 查看系统 VPN 接口信息
$ ip link show wg0

# 查看 VPN 接口详细信息
$ wg show all
$ wg show wg0
```

使用内网 ip `10.66.66.0/32` 可以互相 ping 通，表示“内网”互通完毕，下面使用该地址作为**集群节点内网IP**使用，继续下一步。

## 集群搭建 - k3s 部署

k3s 官方提供了很方便的一键部署脚本，可以快速完成部署，需要修改配置时只需重新执行一次脚本即可，很方便。

```bash
# 部署 master 节点
$ curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -s - \
--node-external-ip <YOUT PUBLIC IP> \
--advertise-address <YOUT PUBLIC IP> \
--node-ip <YOUT LAN IP> \
--flannel-iface wg0
```

使用以上命令即可完成 master 节点的配置，注意替换其中的 `<YOUT PUBLIC IP>` 和 `<YOUT LAN IP>` 为该服务器的公网、内网IP。可以使用 `systemctl status k3s` 查看服务状态，使用 `journalctl -xef -u k3s` 查看服务日志。

下面配置 agent 节点。

```bash
# 部署 agent 节点
$ curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn \
K3S_URL=https://<YOUT MASTER LAN IP>:6443 \
K3S_TOKEN=K106de5b0a8b39a1dc56ab68ed1fa7c539890f17712abff4bf103cfaa68e66dfe86::server:68d9d49974772582d2950b162effb0e0 \
sh -s - \
--node-external-ip <YOUT PUBLIC IP> \
--node-ip <YOUT LAN IP> \
--flannel-iface wg0 \
--docker
```

分别替换其中 `<YOUT MASTER LAN IP>` 、 `<YOUT PUBLIC IP>` 和 `<YOUT LAN IP>` 为你的 master将节点内网 ip、agent 节点公网 IP 和agent节点内网IP。

设置`K3S_URL`参数会使 K3s 以 `worker` 模式运行。K3s agent 将在所提供的 K3S_URL 上向监听的 K3s 服务器注册。`K3S_TOKEN` 存储在 master 节点的 `/var/lib/rancher/k3s/server/node-token` 路径下。 `--docker` 表示采用 docker 作为容器运行时，表示该节点使用 docker 完成各种负载部署，需提前装好 docker 环境，最后记得放通 master 节点的 6443 端口。

看一下节点状态：

```bash
# kubectl get nodes
NAME         STATUS   ROLES                  AGE   VERSION
k3s-agent1   Ready    <none>                 8d    v1.22.6+k3s1
k3s-master   Ready    control-plane,master   8d    v1.22.6+k3s1
```

均为 ready 状态说明一切 ok。

> 将 master 节点的 `/etc/rancher/k3s/k3s.yaml` 拷入本地，替换其中的 `server: [https://127.0.0.1:6443](https://127.0.0.1:6443/)` 为公网 IP 即可在本地使用 `kubectl` 管理集群啦。其他如 Lens 需要访问集群的应用也是使用这个配置文件即可。
> 

## 总结和后续

本文内容建立在长达数月间断断续续试错之上，网上许多资源对于搭建过程的介绍缺乏系统和原因概述，因此整理了这篇文章，方便各位参考和未来查阅，若有问题欢迎留言。

## 参考文献

- [Kubernetes - **生产级别的容器编排系统 By Kubernetes**](https://kubernetes.io/zh/)
- [Kubernetes By Wikipedia](https://zh.wikipedia.org/wiki/Kubernetes#cite_ref-12)
- [K3s - 轻量级 Kubernetes By Rancher](https://docs.rancher.cn/docs/k3s/_index)
- **[跨云厂商部署 k3s 集群](https://fuckcloudnative.io/posts/deploy-k3s-cross-public-cloud/#5-%E5%8A%A0%E5%85%A5%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9) By 云原生实验室**
- [WireGuard 教程：WireGuard 的搭建使用与配置详解](https://fuckcloudnative.io/posts/wireguard-docs-practice/)
- **[轻量级云服务器部署K3S（公网部署）](https://blog.csdn.net/qq_42766492/article/details/122159479) By [『泽』](https://blog.csdn.net/qq_42766492)**