---
title: "Cisco PT 案例七：配置链路聚合 / 负载均衡"
categories: [ "学习" ]
tags: [  ]
draft: false
slug: "348"
date: "2020-06-19 09:51:53"
---

<a name="DAUUT"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592216083944-9a513158-ac75-466e-9fec-bd7b3d68e6ef.png#align=left&display=inline&height=245&margin=%5Bobject%20Object%5D&name=image.png&originHeight=245&originWidth=401&size=12879&status=done&style=none&width=401)<br />配置交换机0
```bash

Switch>enable
Switch#configure terminal
Switch(config)#hostname SA              （更改交换机名字）
SA(config)#interface port-channel 1         （聚合通道1）
SA(config-if)#exit
SA(config)#interface fa0/22
SA(config-if)#channel-group 1 mode on      （开启聚合通道1）
SA(config-if)#interface fa0/23
SA(config-if)#channel-group 1 mode on
SA(config-if)#interface fa0/24
SA(config-if)#channel-group 1 mode on
SA(config-if)#exit
SA(config)#interface port-channel 1
SA(config-if)#switchport mode trunk            （交换机间链路类型为trunk）
SA(config-if)#switchport trunk allowed vlan all     （允许所有VLAN通过）
```
配置交换机1
```bash
Switch>enable
Switch#configure terminal
Switch(config)#hostname SB
SB(config)#interface port-channel 1
SB(config-if)#exit
SB(config)#interface range fa0/22-fa0/24       （同时开启聚合通道1）
SB(config-if)#channel-group 1 mode on
SB(config-if)#exit
SB(config)#interface port-channel 1
SB(config-if)#switchport mode trunk
SB(config-if)#switchport trunk allowed vlan all
```
