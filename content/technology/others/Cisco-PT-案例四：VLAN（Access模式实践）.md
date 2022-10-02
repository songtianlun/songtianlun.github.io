---
title: "Cisco PT 案例四：VLAN（Access模式实践）"
categories: [ "基础学科" ]
tags: [  ]
draft: false
slug: "345"
date: "2020-06-19 09:49:46"
---

<a name="DAUUT"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592207908593-f852e8b9-b65b-4a72-9f1a-90fd9917ba77.png#align=left&display=inline&height=283&margin=%5Bobject%20Object%5D&name=image.png&originHeight=283&originWidth=497&size=20579&status=done&style=none&width=497)<br />**实验步骤**

1. 创建VLAN 2和VLAN 3
1. 将部门PC对应端口划分到相应的VLAN中

PC设置
```bash
192.168.1.2        //PC0
192.168.1.3        //PC1
192.168.1.4        //PC2
192.168.1.5        //R0
//子网掩码和网关
255.255.255.0
192.168.1.1
```
Switch0配置
```bash

Switch>en						// 进入特权模式
Switch#conf t				// 进入全局配置模式命令缩写
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#vlan 2
Switch(config-vlan)#exit
Switch(config)#vlan 3
Switch(config-vlan)#exit
Switch(config)#inter f0/1
Switch(config-if)#switchport access vlan 2
Switch(config-if)#exit
Switch(config)#inter f0/2
Switch(config-if)#switchport access vlan 2
Switch(config-if)#exit
Switch(config)#inter f0/3
Switch(config-if)#switchport access vlan 3
Switch(config-if)#exit
Switch(config)#inter f0/4
Switch(config-if)#switchport access vlan 3
Switch(config-if)#exit
Switch(config)#exit
Switch#
%SYS-5-CONFIG_I: Configured from console by console

Switch#show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/5, Fa0/6, Fa0/7, Fa0/8
                                                Fa0/9, Fa0/10, Fa0/11, Fa0/12
                                                Fa0/13, Fa0/14, Fa0/15, Fa0/16
                                                Fa0/17, Fa0/18, Fa0/19, Fa0/20
                                                Fa0/21, Fa0/22, Fa0/23, Fa0/24
                                                Gig1/1, Gig1/2
2    VLAN0002                         active    Fa0/1, Fa0/2
3    VLAN0003                         active    Fa0/3, Fa0/4
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
Switch#
```
测试
```bash
PC0(命令提示符CMD下)
ping 192.168.1.3           //链路通
ping 192.168.1.4           //链路不通
PC2(命令提示符CMD下)
ping 192.168.1.2           //链路不通
ping 192.168.1.5           //链路通
```
