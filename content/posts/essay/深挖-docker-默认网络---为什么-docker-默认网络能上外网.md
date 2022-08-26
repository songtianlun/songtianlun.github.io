---
title: "深挖 docker 默认网络 | 为什么 docker 默认网络能上外网"
categories: [ "编程开发" ]
tags: [ "docker" ]
draft: false
slug: "612"
date: "2021-12-28 14:49:46"
---

为什么默认配置创建出来的 docker 容器可以访问外网，为什么监听对应端口就能对外暴露docker服务，一张图搞清楚。

首先 Docker 有四中网络模式， 分别是 Bridge、Host、Container、None，默认使用 Bridge，今天就来讲讲 Bridge。

![https://imagehost-cdn.frytea.com/images/2021/12/28/drawf92673ecda5420ba.jpg](https://imagehost-cdn.frytea.com/images/2021/12/28/drawf92673ecda5420ba.jpg)

创建的容器默认使用 bridge 的方式联网，因此默认就可以docker间互通，该网桥名叫 bridge0，通过 nat 的方式与物理网卡相连，每创建一个该模式下的容器，就自动创建一对 `veth-pair` 挂上去。

```bash
# brctl show 
bridge name	bridge id		STP enabled	interfaces
br-1061a9012b5a		8000.0242998bddbb	no		
docker0		8000.0242f9c2fd4f	no		veth4fc1b46
							veth86c0817
							vethe510127
vmbr0		8000.b496916544ad	no		enp59s0f1
```

通过 nat 的方式，docker可以自由的通过宿主机网卡访问外网，如果映射端口，也是通过 nat 的方式将对应流量送入docker：

```bash
# docker ps
CONTAINER ID   IMAGE          COMMAND              CREATED        STATUS        PORTS                                       NAMES
398907d00b97   001b9ea10452   "/sbin/init start"   5 hours ago    Up 5 hours    192.168.226.140:8206->8006/tcp              hci-nos3
475b07e8faa4   001b9ea10452   "/sbin/init start"   5 hours ago    Up 5 hours    192.168.226.139:8206->8006/tcp              hci-nos2
e9955db2132c   001b9ea10452   "/sbin/init"         29 hours ago   Up 29 hours   0.0.0.0:8106->8006/tcp, :::8106->8006/tcp   hci-nos
# iptables -n -L -t nat
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
MASQUERADE  all  --  172.18.0.0/16        0.0.0.0/0           
MASQUERADE  all  --  172.17.0.0/16        0.0.0.0/0           
MASQUERADE  tcp  --  172.17.0.2           172.17.0.2           tcp dpt:8006
MASQUERADE  tcp  --  172.17.0.3           172.17.0.3           tcp dpt:8006
MASQUERADE  tcp  --  172.17.0.4           172.17.0.4           tcp dpt:8006

Chain DOCKER (2 references)
target     prot opt source               destination         
RETURN     all  --  0.0.0.0/0            0.0.0.0/0           
RETURN     all  --  0.0.0.0/0            0.0.0.0/0           
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:8106 to:172.17.0.2:8006
DNAT       tcp  --  0.0.0.0/0            192.168.226.139      tcp dpt:8206 to:172.17.0.3:8006
DNAT       tcp  --  0.0.0.0/0            192.168.226.140      tcp dpt:8206 to:172.17.0.4:8006
```

以上面几个docker为例，分别直接监听和指定ip，会发现创建了对应的规则在 iptables 中。

至此，为什么docker访问外网及访问docker的原理讲解完毕，有问题欢迎留言。

## 参考文献

- [Linux-eth0 eth0:1 和eth0.1关系、ifconfig以及虚拟IP实现介绍](https://www.cnblogs.com/JohnABC/p/5951340.html)
- **[Docker基础-19-网络-bridge模式和docker0详解](https://blog.csdn.net/u011541946/article/details/87826222)**
- **[Docker与IPtables](https://www.jianshu.com/p/69d3ab177655)**
- **[高级网络配置](https://yeasy.gitbook.io/docker_practice/advanced_network) By 《docker从入门到实战》**
- **[Use bridge networks](https://docs.docker.com/network/bridge/) By docker**
- [iptables显示nat链 iptables如何查看nat链](https://www.renyiwei.com/archives/466.html)