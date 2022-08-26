---
title: "Cisco PT 案例六：交换机端口与Mac地址绑定"
categories: [ "基础学科" ]
tags: [  ]
draft: false
slug: "347"
date: "2020-06-19 09:51:04"
---

<a name="7V7nm"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592213996389-581a7c5e-27e5-4dab-9968-c7052b6eb00d.png#align=left&display=inline&height=332&margin=%5Bobject%20Object%5D&name=image.png&originHeight=332&originWidth=603&size=14827&status=done&style=none&width=603)<br />1、进入相应的接口<br />（以端口1设置Mac地址绑定，PC0接1端口举例）
```bash
Switch>enable
Switch#config
Configuring from terminal, memory, or network [terminal]?
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#
Switch(config)#interface fastEthernet 0/1
```
2、接口设为access模式
```bash
Switch(config-if)#switchport mode access
```

<br />3、启用安全端口
```bash
Switch(config-if)#switchport port-security
（查看mac-address绑定的几种方式，分别为静态绑定和粘滞绑定）
Switch(config-if)#switchport port-security mac-address ?
H.H.H   48 bit mac address
sticky  Configure dynamic secure addresses as sticky
```

<br />第一种：动态配置<br />
<br />第二种：静态配置<br />
<br />（其中代码的最后一列为主机的Mac地址。寻找方法：单击主机→配置→fastEthernet→mac地址。）
```bash
Switch(config-if)#switchport port-security mac-address 0001.C94E.1321
```

<br />设置完成后，用主机pc0 ping pc2，然后可以在特权模式下通过以下命令查看以下(ctrl+z,快速回到特权模式下)
```bash
Switch#show port-security address
```
若将pc0与端口1的连线断掉，改用pc3接端口1。在进行 pc3 ping pc2 不通（图示如下）<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592214497874-2e582696-fad4-4174-a443-abd0b2d58c46.png#align=left&display=inline&height=334&margin=%5Bobject%20Object%5D&name=image.png&originHeight=334&originWidth=554&size=15703&status=done&style=none&width=554)<br />改回pc1依然不通，需重启路由器该端口
```bash
Switch(config-if)#shutdown

%LINK-5-CHANGED: Interface FastEthernet0/1, changed state to administratively down
Switch(config-if)#no shutdown

%LINK-5-CHANGED: Interface FastEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to up

Switch(config-if)#
```
