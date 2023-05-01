---
title: "解决 SSH 无操作自动断开 | pychram 超时无响应"
categories: [ "技术" ]
tags: [ "ssh" ]
draft: false
slug: "623"
date: "2022-01-19 09:49:24"
---

工作中常需要连接着服务器，下班或暂时离开时会出现一段时间不操作终端，此时就会自动断开。

这本身无伤大雅，重连即可，直到我发现，一些依赖 SSH 提供的服务也会因此受到影响，比如 `Pychram` 远程开发，会在一段时间后无响应，只能重启 Pychram 解决，很影响效率。

为解决该问题，在网上找到一种配置方法，亲测一夜 (10h+) 不会再断开，在此分享：

众所周知，SSH 是用于与远程服务器建立加密通信通道的，因此配置涉及服务端和客户端：

- 服务端 `/etc/ssh/sshd_config`

```python
-#ClientAliveInterval 0  #服务器向客户端发送请求消息的时间间隔，默认为0，不发送
-#ClientAliveCountMax 3  #服务器发出求后客户端没有响应的最大次数，超过后将自动断开。
+ClientAliveInterval 60  #每60秒发送一个KeepAlive请求
+ClientAliveCountMax 15  #总时间为：15*60 ，15分钟没有操作,终端断开。

# 以下任意命令重启 sshd 服务
service sshd reload
service sshd restart
systemctl sshd restart
```

- 客户端 `~/.ssh/config`

```python
# 修改 ~/.ssh/config 对当前用户生效

# 这样配置通配所有服务端
Host *
  ServerAliveInterval 60

# 指定IP配置
Host *hostname.com    #指定IP
  ServerAliveInterval 60

# 或是全局配置（对所有用户生效）
vim /etc/ssh/sshd_config

+ ServerAliveInterval 60
```

## 参考文献

- [SSH长时间不使用自动断开解决方案](https://blog.csdn.net/xiaojingfirst/article/details/81744689)