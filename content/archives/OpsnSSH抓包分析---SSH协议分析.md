---
title: "OpsnSSH抓包分析 | SSH协议分析"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "440"
date: "2020-08-24 19:30:00"
---

SSH 协议是建立在不安全的网络之上的进行远程安全登陆的协议。它是一个协议族，其中有三个子协议，分别是：

- 1、传输层协议`[SSH-TRANS]`:提供服务器验证、完整性和保密性功能,建立在传统的 TCP/IP 协议之上。
- 2、验证协议`[SSH-USERAUTH]`:向服务器验证客户端用户，有基于用户名密码和公钥两种验证方式，建立在传输层协议`[SSH-TRANS]`之上。
- 3、连接协议`[SSH-CONNECT]`:将加密隧道复用为若干逻辑信道。它建立在验证协议之上。

![https://imagehost-cdn.frytea.com/images/archives/20200820115639.png](https://imagehost-cdn.frytea.com/images/archives/20200820115639.png)

继续之前，补充一下两个概念：

- 1、`会话密钥 key`:key 是通过客户端和服务器之间通过诸如 D-H 算法协商出来的。
- 2、`公钥 pub key`：pub key 成为`服务器主机密钥server_host_key`，用于`SSH-TRANS`传输协议进行服务器验证,说白了就是客户端去验证服务器用的

SSH 协议握手过程大致流程如下图所示：

![https://imagehost-cdn.frytea.com/images/archives/20200820115811.png](https://imagehost-cdn.frytea.com/images/archives/20200820115811.png)

下面使用 Wirdshark 进行抓包分析，开启 wireshark 抓包，进行一次正常的 SSH 登录，停止抓包，通过 IP 过滤出相关的报文如下：

![https://imagehost-cdn.frytea.com/images/archives/20200824191459.png](https://imagehost-cdn.frytea.com/images/archives/20200824191459.png)

如果将上述报文根据 SSH 协议运行的流程分析，流程和报文的对应关系如下：

- TCP 三次握手

![https://imagehost-cdn.frytea.com/images/archives/20200824191531.png](https://imagehost-cdn.frytea.com/images/archives/20200824191531.png)

- 版本协议交换

![https://imagehost-cdn.frytea.com/images/archives/20200824191628.png](https://imagehost-cdn.frytea.com/images/archives/20200824191628.png)

- 密钥协商

![https://imagehost-cdn.frytea.com/images/archives/20200824193145.png](https://imagehost-cdn.frytea.com/images/archives/20200824193145.png)

在协商阶段客户端和客户端互相告知自己支持的加密方法：

![https://imagehost-cdn.frytea.com/images/archives/20200824192240.png](https://imagehost-cdn.frytea.com/images/archives/20200824192240.png)

确定加密方法后，交换公钥：

![https://imagehost-cdn.frytea.com/images/archives/20200824192518.png](https://imagehost-cdn.frytea.com/images/archives/20200824192518.png)

- 加密通信

如果是通过密码登录，SSH 就会采用这种自动协商密钥进行 ~~非~~ 对称加密通信。可以看到此后的报文全部为加密报文。

> SSH 使用对称密钥对整个连接进行加密。与某些用户的假设相反，可以创建的公共/私有非对称密钥对只用于身份验证，而不用于对连接进行加密。对称加密甚至可以保护密码身份验证不被窥探。（2021 年 10 月 20 日修改）

![https://imagehost-cdn.frytea.com/images/archives/20200824191835.png](https://imagehost-cdn.frytea.com/images/archives/20200824191835.png)

大概可以看出是以 `New Keys` 为界，区分密钥协商和加密通信。

内部加密的原理究竟是什么？这一点还需后期继续探索。

## 参考文献

- SSH Official： [https://www.ssh.com/ssh/](https://www.ssh.com/ssh/)
- OpenSSH：[https://www.openssh.com/](https://www.openssh.com/)
- SSH Wikipedia：[https://zh.wikipedia.org/wiki/Secure_Shell](https://zh.wikipedia.org/wiki/Secure_Shell)
- OpenSSH Wikipedia：[https://zh.wikipedia.org/wiki/OpenSSH](https://zh.wikipedia.org/wiki/OpenSSH)
- SSH2.0 编程 ssh 协议过程实现：[https://www.cnblogs.com/wchrt/p/4550208.html](https://www.cnblogs.com/wchrt/p/4550208.html)
- SSH 协议介绍：[https://blog.csdn.net/macrossdzh/article/details/5691924](https://blog.csdn.net/macrossdzh/article/details/5691924)（转载版本：[SSH协议详解](https://www.cnblogs.com/zmlctt/p/3946860.html)）
- SSH 协议基本原理及 wireshark 抓包分析：[https://juejin.im/post/6844903685047189512](https://juejin.im/post/6844903685047189512)
- [Understanding the SSH Encryption and Connection Process](https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process)
- [Does ssh send the password over the network?](https://unix.stackexchange.com/questions/297847/does-ssh-send-the-password-over-the-network)

