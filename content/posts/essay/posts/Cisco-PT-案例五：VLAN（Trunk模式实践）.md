---
title: "Cisco PT 案例五：VLAN（Trunk模式实践）"
categories: [ "基础学科" ]
tags: [  ]
draft: false
slug: "346"
date: "2020-06-19 09:50:29"
---

<a name="pVLnQ"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592206670687-6f77a581-08b4-4445-8370-f0d366860191.png#align=left&display=inline&height=254&margin=%5Bobject%20Object%5D&name=image.png&originHeight=254&originWidth=644&size=16747&status=done&style=none&width=644)<br />**实验步骤**

1. 创建VLAN 2和VLAN 3，财务部对应VLAN 2，销售部对应VLAN 3
1. 将部门PC对应端口划分到相应的VLAN中
1. 为交换机配置VTP模式及VTP域名
1. 配置交换机间互联的端口为Trunk类型


<br />PC设置
```bash
192.168.1.2        //PC0
192.168.1.3        //PC1
192.168.1.4        //PC2
192.168.1.5        //PC3
//子网掩码和网关
255.255.255.0
192.168.1.1
```
Switch0配置
```bash
Switch>en
Switch#conf t
Switch(config)#vlan 2                  //创建VLAN 2
Switch(config-vlan)#name Finance_Dept         //将该VLAN命名为Finance_Dept
Switch(config-vlan)#vlan 3             //创建VLAN 2
Switch(config-vlan)#name Sales_Dept          //将该VLAN命名为Sales_Dept
Switch(config-vlan)#exit
Switch(config)#inter f0/1
Switch(config-if)#switchport access vlan 2        //将该端口划分到VLAN 2
Switch(config-if)#exit
Switch(config)#inter f0/2
Switch(config-if)#switchport access vlan 3        //将该端口划分到VLAN 3
Switch(config-if)#exit
Switch(config)#inter f0/24
Switch(config-if)#switch mode trunk               //将端口配置为Trunk模式
Switch(config-if)#end
Switch#show vlan brief                //显示VLAN配置信息
Switch#vlan database                  //进入VLAN子模式
Switch(vlan)#vtp server                      //设置VTP模式为server
Switch(vlan)#vtp domain vtp0                 //设置VTP域名为vtp0
Switch(vlan)#exit
Switch#show vtp status                       //查看VTP配置信息
```
Switch1配置
```bash
Switch>en
Switch#vlan database                //进入VLAN子模式
Switch(vlan)#vtp client                     //设置VTP模式为client
Switch(vlan)#vtp domain vtp0                //设置VTP域名为vtp0，此处不填亦可
Switch(vlan)#exit
Switch#show vtp status             //查看VTP配置信息
Switch#show vlan brief             //显示VLAN配置信息
Switch#conf t
Switch(config)#inter f0/1
Switch(config-if)#switchport access vlan 2        //将该端口划分到VLAN 2
Switch(config-if)#exit
Switch(config)#inter f0/2
Switch(config-if)#switchport access vlan 3        //将该端口划分到VLAN 3
Switch(config-if)#exit
Switch(config)#inter f0/24
Switch(config-if)#switch mode trunk               //将端口配置为Trunk模式
Switch(config-if)#end
Switch#show r
```
测试
```bash
PC0(命令提示符CMD下)
ping 192.168.1.3           //链路不通
ping 192.168.1.4           //链路通
PC1(命令提示符CMD下)
ping 192.168.1.4           //链路不通
ping 192.168.1.5           //链路通
```
