---
title: "判断 IP 或端口被封(墙)"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "787"
date: "2023-05-01 00:06:29"
---

## IP 检测

### 命令行方式

最简单的是在命令行窗口上测试

```
$ ping x.x.x.x.
```

### 在线方式

可使用网站 [Ping检测](http://ping.chinaz.com/) 进行测试

### 判断

* 如果国内和国外都 ping 不通，则是海外服务器的问题
* 如果国内 ping 不通，国外能 ping 通，那么 IP 被封了

## 端口检测

### 命令行方式

使用 telnet 命令测试端口：

```
# 可以直接测试 IP 或域名
$ telnet ip port

# 成功举例
telnet bus1.skybyte.me 443
Trying 104.243.19.12...
Connected to bus1.skybyte.me.
Escape character is '^]'.

# 失败举例
telnet x.x.x.x 500
Trying x.x.x.x...
telnet: connect to address x.x.x.x: Connection refused
telnet: Unable to connect to remote host
```

### 在线方式

* 国内端口连通性检测工具: [在线检测域名或者ip的端口是否开放](http://coolaf.com/tool/port)
* 海外端口连通性检测工具: [Port Forwording Tester](https://www.yougetsignal.com/tools/open-ports/)

### 判断

* 如果国内和国外都不能连通，是服务器问题
* 如果国内不能连通，国外能连通，那么端口被封了

## References

* [如何判断ip或端口被封](https://wall-guide.readthedocs.io/zh/latest/about/%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%ADip%E6%88%96%E7%AB%AF%E5%8F%A3%E8%A2%AB%E5%B0%81/#_6)
* [如何ping指定IP的端口号](https://www.jianshu.com/p/fbdf744a3fbd)
* [如何检查搬瓦工的IP是否被封](https://www.bandwagonhost.net/769.html)
* [搬瓦工能ping通,ssh不能连接,ss打不开网页](https://www.liuchang.org/ban-wa-gong-neng-ping-tongssh-bu-neng-lian-jiess-da-bu-kai-wang-ye/)
* [解决ss突然无法联网](http://www.pianshen.com/article/6552251764/)

