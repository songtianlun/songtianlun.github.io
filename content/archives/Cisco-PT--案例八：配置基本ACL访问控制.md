---
title: "Cisco PT  案例八：配置基本ACL访问控制"
categories: [ "学习" ]
tags: [  ]
draft: false
slug: "349"
date: "2020-06-19 09:52:23"
---

<a name="DAUUT"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592444121954-c05d0878-a22a-4c4f-94a2-db2a256d5788.png#align=left&display=inline&height=215&margin=%5Bobject%20Object%5D&name=image.png&originHeight=215&originWidth=626&size=18789&status=done&style=none&width=626)<br />**配置F0/1接口IP：**
```
R1(config)#interface fastEthernet 0/1        //进入Fa0/1
R1(config-if)#ip address 172.16.1.1 255.255.255.0  //配置IP
R1(config-if)#no shutdown                    //开启端口
```
**<br />****配置F0/0接口IP：****
```
R1(config)#interface fastEthernet 0/0        //进入Fa0/0
R1(config-if)#ip address 10.1.1.1 255.255.255.0//配置IP
R1(config-if)#no shutdown                    //进入Fa0/1
```

<br />配置完成以后灯变绿了，在相互都可以ping通。<br />接下来给R1配上标准ACL，我个人建议一般正常下都是在进站口配置访问控制，用来减少路由器的工作负担，所以本文就是在进站口做了应用，也就是同时还要将访问控制运用在R1的Fa0/1端口。
```
R1(config)#access-list 10 deny host 172.16.1.2    //拒绝主机PC1的流量
R1(config)#access-list 10 permit any             //允许其他主机的流量
R1(config)#interface fastEthernet 0/1            //进入Fa0/1端口配置模式
R1(config-if)#ip access-group 10 in             //将ACL访问控制列表10应用于Fa0/1端口，同时在进站口就进行ACL的规则判断是否放行还是丢弃数据包
```
PC1和PC3不通：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592444236167-9cbd3d48-269a-4cb5-a6c1-361e697772be.png#align=left&display=inline&height=177&margin=%5Bobject%20Object%5D&name=image.png&originHeight=177&originWidth=434&size=7761&status=done&style=none&width=434)<br />PC3和PC1通：<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592444273188-f847f165-d61c-4cb0-9520-dbb4800e755e.png#align=left&display=inline&height=205&margin=%5Bobject%20Object%5D&name=image.png&originHeight=205&originWidth=419&size=12902&status=done&style=none&width=419)
