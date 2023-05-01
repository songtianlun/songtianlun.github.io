---
title: "Cisco PT 案例二：为路由器配置并连接SSH"
categories: [ "学习" ]
tags: [  ]
draft: false
slug: "343"
date: "2020-06-19 09:47:49"
---

<a name="Ilgev"></a>
## 1. 案例目标
通过本案例，你可以掌握如下技能：

1. 配置 SSH

1. 使用 SSH 访问路由器
<a name="FcDBf"></a>
## 2. 背景知识
过去对路由器的远程管理访问一般使用 TCP 端口 23 上的 Telnet。但 Telnet
是在安全不是问题的年代开发的。为此，所有 Telnet 流量以明文的形式转发。
SSH 已经替代了 Telnet，作为远程路由器连接管理的最佳工具，它提供强大的私密性和会话的集成。SSH 使用 TCP 端口 22。它提供类似出站 Telnet 连接的功能，但连接是加密的。通过认证和加密，SSH 允许在不安全的网络中进行安全的通信。想在路由器上激活 SSH，必须配置以下参数：

- Hostname（主机名）

- Domain name（域名）

- Asymmetrical keys（非对称密钥）

- Local authentication（本地验证）
<a name="jjNEt"></a>
## 3. 设备与拓扑
环境：Cisco Packet Tracer 5.3<br />设备：1 台普通 PC，1 台 2950T-24 交换机，2 台 2811 路由器。
<br />拓扑：如下图。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592190394585-79821a59-85eb-49db-bcb5-e8b532570333.png#align=left&display=inline&height=268&margin=%5Bobject%20Object%5D&name=image.png&originHeight=268&originWidth=584&size=18473&status=done&style=none&width=584)
<a name="GIe5E"></a>
## 4. 操作步骤
步骤 1：按拓扑图添加设备与连接。
<br />步骤 2：配置路由器接口。
<br /> <br />打开路由器的 `Config`配置页面，按拓扑图上的标注分别配置两个路由
<br />器的显示名、主机名和接口 `Fa0/0` 的 IP 地址，并注意激活该接口。
<br />步骤 3：配置 PC 的 IP 地址和网关。
<br /> <br />用 PC 的 IP configuration 程序配置其 IP 地址和网关。
<br />步骤 4：在 R1 上配置 SSH
<br />1) 配置域名

```bash
R1#conf t 
R1(config)#ip domain-name cisco.com 
R1(config)#
```
 <br />
<br />
<br />2) 配置非对称密钥

```bash
R1(config)#crypto key generate rsa 
# 当提示密钥长度时，输入 1024。注：缺省为 512。
```
 <br />
<br />3) 配置用于认证的登录用户名及口令

```bash
R1(config)#username admin password cisco
```
 
<br />4) 配置 SSH 版本
<br /> 
```bash
R1(config)#ip ssh version 2
```
5) 配置 SSH 会话最大空闲超时值和 SSH 连接认证重试次数
```bash
R1(config)#ip ssh time-out ?  
<1-120> SSH time-out interval (secs)  
R1(config)#ip ssh time-out 60 //最大空闲超时：60 秒
R1(config)#ip ssh authentication-retries ?  
<0-5> Number of authentication retries  
R1(config)#ip ssh authentication-retries 2 //认证重试次数：2 次
R1(config)#
```
6) 在 VTY 线路上禁用 Telnet，并激活 SSH。
```bash
R1(config)#line vty 0 4  
R1(config-line)#no transport input all //禁用所有流量
R1(config-line)#transport input ssh //允许 SSH 流量
R1(config-line)#login local //要求本地认证
```
步骤 5：在 R2 上重复步骤 4，配置 SSH。<br />步骤 6：在 R1 上验证 SSH 的配置及运行<br />1) 验证 SSH 版本及其他设置
```bash
R1#sh ip ssh  
SSH Enabled - version 2.0  
Authentication timeout: 60 secs; Authentication retries: 2  
R1#
```
2) 验证 SSH 是否在运行
```bash
R1#sh ssh  
%No SSHv2 server connections running.  
%No SSHv1 server connections running.  
R1#
```
步骤 7：在 R2 上重复步骤 6，验证 SSH 的配置及运行。<br />步骤 8：测试 SSH<br />1) 在 PC0 的命令行窗口中对 R1 和 R2 分别进行 telnet 和 ssh 的测试，<br />如图 5-1。telnet 应失败，而 ssh 应成功。
```bash
PC>telnet 192.168.1.1
Trying 192.168.1.1 ...Open

[Connection to 192.168.1.1 closed by foreign host]
PC>tennet 192.168.1.2
Invalid Command.

PC>ssh -l admin 192.168.1.1
Open
Password: 



R1>exit
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592190949265-0d5739cc-5da0-48b6-a6d2-17e8d57e751f.png#align=left&display=inline&height=514&margin=%5Bobject%20Object%5D&name=image.png&originHeight=514&originWidth=641&size=28028&status=done&style=none&width=641)<br />2) 在 R1 中对 R2 进行测试，telnet 应失败，而 ssh 应成功。反之亦然。<br />如图 5-2。
```bash
R1>telnet 192.168.1.2
Trying 192.168.1.2 ...Open

[Connection to 192.168.1.2 closed by foreign host]
R1>ssh -l admin 192.168.1.2
Open
Password: 



R2>
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592191018562-77af044a-39d3-4d63-a669-5e2d812501f6.png#align=left&display=inline&height=514&margin=%5Bobject%20Object%5D&name=image.png&originHeight=514&originWidth=641&size=20498&status=done&style=none&width=641)
