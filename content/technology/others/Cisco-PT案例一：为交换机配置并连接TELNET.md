---
title: "Cisco PT案例一：为交换机配置并连接TELNET"
categories: [ "基础学科" ]
tags: [  ]
draft: false
slug: "342"
date: "2020-06-19 09:42:00"
---

Telnet协议是TCP/IP协议族中的一员，是Internet远程登陆服务的标准协议和主要方式。它为用户提供了在本地计算机上完成远程主机工作的能力。在终端使用者的电脑上使用telnet程序，用它连接到服务器。终端使用者可以在telnet程序中输入命令，这些命令会在服务器上运行，就像直接在服务器的控制台上输入一样。可以在本地就能控制服务器。要开始一个telnet会话，必须输入用户名和密码来登录服务器。Telnet是常用的远程控制Web服务器的方法。
<a name="DAUUT"></a>
## 环境

- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592528488231-337eca19-f322-4c64-b0f4-9f2a24ec8ab5.png#align=left&display=inline&height=235&margin=%5Bobject%20Object%5D&name=image.png&originHeight=235&originWidth=478&size=12701&status=done&style=none&width=478)<br />**（1）配置PC IP**
```
PC0 设置
192.168.1.2/24
PC1 设置
192.168.1.3/24
```
**（2）配置交换机VLAN1 IP**
```
/* part1 为vlan配置ip并开启vlan */
Switch>enable
Switch#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#interface vlan 1
Switch(config-if)#ip address 192.168.1.1 255.255.255.0
Switch(config-if)#no shutdown

%LINK-5-CHANGED: Interface Vlan1, changed state to up


%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan1, changed state to up
Switch(config-if)#

/* Part2 查看已配置的IP */
Switch(config-if)#^Z
Switch#
%SYS-5-CONFIG_I: Configured from console by console

Switch#show running-config
...
interface Vlan1
 ip address 192.168.1.1 255.255.255.0

/*  Part3 开启Vlan */
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.	
Switch(config)#interface vlan 1
Switch(config-if)#no shutdown

/* Part4 查看Vlan状态 */
Switch(config-if)#^Z
Switch#
%SYS-5-CONFIG_I: Configured from console by console

Switch#show interfaces vlan 1
Vlan1 is up, line protocol is up
...
```
**（3）配置交换机本地登录口令**
```
/* Part 1 设置明文密码*/
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#enable password 123
// 注：取消密码可用no enable password

/* Part 2查看设置的密码 */
Switch(config)#^Z
Switch#
%SYS-5-CONFIG_I: Configured from console by console

Switch#show running-config
...
enable password 123
...
```
**（4）配置交换机远程登陆及验证**
```
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#line vty 0
Switch(config-line)#password 123 //（Telnet密码为123）
Switch(config-line)#login local //（login是开启远程登录密码验证，login local不但要求TELNET密码，还要求提供用户名）
Switch(config-line)#
```
**（5）添加可远程登陆交换机的用户**
```
/* Part 1 添加用户 */
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#line vty 0
Switch(config-line)#password 123
Switch(config-line)#login local
Switch(config-line)#
Switch(config-line)#exit
Switch(config)#username admin password admin

/* Part 2 查看添加的用户 */
Switch(config)#exit
Switch#
%SYS-5-CONFIG_I: Configured from console by console

Switch#show running-config
...
username admin password 0 admin
...
```

<br />**（6）测试连接**
```
// 在PC0的CMD中测试
/* Part 1 Ping交换机 */
PC>ping 192.168.1.1

Pinging 192.168.1.1 with 32 bytes of data:

Reply from 192.168.1.1: bytes=32 time=5ms TTL=255
Reply from 192.168.1.1: bytes=32 time=5ms TTL=255
Reply from 192.168.1.1: bytes=32 time=6ms TTL=255
Reply from 192.168.1.1: bytes=32 time=6ms TTL=255

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 5ms, Maximum = 6ms, Average = 5ms
    
/* Part 2 Telnet 连接交换机 */
PC>telnet 192.168.1.1
Trying 192.168.1.1 ...Open

User Access Verification

Username: admin
Password: 
Switch>
```
**（7）配置多用户连接**
```
// 在PC0连接的前提下，再使用PC1尝试连接
/* Part 1 PC1 Ping Switch */
PC>ping 192.168.1.1

Pinging 192.168.1.1 with 32 bytes of data:

Request timed out.
Reply from 192.168.1.1: bytes=32 time=6ms TTL=255
Reply from 192.168.1.1: bytes=32 time=6ms TTL=255
Reply from 192.168.1.1: bytes=32 time=5ms TTL=255

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 5ms, Maximum = 6ms, Average = 5ms
    
/* Part 2 PC1 Telnet 连接Swithc */
PC>telnet 192.168.1.1
Trying 192.168.1.1 ...Open

[Connection to 192.168.1.1 closed by foreign host]
// 连接失败，因为交换机vty设置只能同时打开一个会话，下面设置一下，使两台PC可同时访问

/* Part 3 修改Tenlet配置 */
// 可直接在PC0直接进行
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#line vty 0 1
Switch(config-line)#password 123
Switch(config-line)#^Z

/* Part 4 重新尝试Part 2 */
PC>telnet 192.168.1.1
Trying 192.168.1.1 ...Open


User Access Verification

Password: 
Switch>
// 成功
```
