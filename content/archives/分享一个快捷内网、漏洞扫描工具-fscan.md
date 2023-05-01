---
title: "分享一个快捷内网、漏洞扫描工具 fscan"
categories: [ "技术" ]
tags: [ "go" ]
draft: false
slug: "607"
date: "2021-12-21 09:10:30"
---

[fscan](https://github.com/shadow1ng/fscan) 是一款 go 语言写成 “一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描”。是我在刷 [kon9chunkit](https://github.com/kon9chunkit) 发起的 **[GitHub中文排行榜](https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts)** 时发现的。

该工具**支持主机存活探测、端口扫描、常见服务的爆破、ms17010、redis批量写公钥、计划任务反弹shell、读取win网卡信息、web指纹识别、web漏洞扫描、netbios探测、域控识别**等功能。

用来快速扫描局域网主机存活也是很好的，下面简单介绍使用方法：

安装很简单，装好 go 环境编译一下就行：

```bash
$ git clone https://github.com/shadow1ng/fscan.git
$ cd facan
$ go build -ldflags="-s -w " -trimpath
```

之后就可以进行扫描了，快速进行局域网段扫描：

```bash
$ ./fscan -h 192.168.123.0/24 

   ___                              _    
  / _ \     ___  ___ _ __ __ _  ___| | __ 
 / /_\/____/ __|/ __| '__/ _` |/ __| |/ /
/ /_\\_____\__ \ (__| | | (_| | (__|   <    
\____/     |___/\___|_|  \__,_|\___|_|\_\   
                     fscan version: 1.6.3
start infoscan
已完成 0/0 listen ip4:icmp 0.0.0.0: socket: operation not permitted
The current user permissions unable to send icmp packets
start ping
(icmp) Target '192.168.123.9' is alive
(icmp) Target '192.168.123.4' is alive
...
icmp alive hosts len is: 7
192.168.123.3:443 open
...
alive ports len is: 19
start vulscan
[*] WebTitle:http://192.168.123.1      code:401 len:140    title:401 Unauthorized
.....
```

完整支持参数如下：

```bash
	-c string
        ssh命令执行
  -cookie string
        设置cookie
  -debug int
        多久没响应,就打印当前进度(default 60)
  -domain string
        smb爆破模块时,设置域名
  -h string
        目标ip: 192.168.11.11 | 192.168.11.11-255 | 192.168.11.11,192.168.11.12
  -hf string
        读取文件中的目标
  -hn string
        扫描时,要跳过的ip: -hn 192.168.1.1/24
  -m string
        设置扫描模式: -m ssh (default "all")
  -no
        扫描结果不保存到文件中
  -nobr
        跳过sql、ftp、ssh等的密码爆破
  -nopoc
        跳过web poc扫描
  -np
        跳过存活探测
  -num int
        web poc 发包速率  (default 20)
  -o string
        扫描结果保存到哪 (default "result.txt")
  -p string
        设置扫描的端口: 22 | 1-65535 | 22,80,3306 (default "21,22,80,81,135,139,443,445,1433,3306,5432,6379,7001,8000,8080,8089,9000,9200,11211,27017")
  -pa string
        新增需要扫描的端口,-pa 3389 (会在原有端口列表基础上,新增该端口)
  -path string
        fcgi、smb romote file path
  -ping
        使用ping代替icmp进行存活探测
  -pn string
        扫描时要跳过的端口,as: -pn 445
  -pocname string
        指定web poc的模糊名字, -pocname weblogic
  -proxy string
        设置代理, -proxy http://127.0.0.1:8080
  -user string
        指定爆破时的用户名
  -userf string
        指定爆破时的用户名文件
  -pwd string
        指定爆破时的密码
  -pwdf string
        指定爆破时的密码文件
  -rf string
        指定redis写公钥用模块的文件 (as: -rf id_rsa.pub)
  -rs string
        redis计划任务反弹shell的ip端口 (as: -rs 192.168.1.1:6666)
  -silent
        静默扫描,适合cs扫描时不回显
  -sshkey string
        ssh连接时,指定ssh私钥
  -t int
        扫描线程 (default 600)
  -time int
        端口扫描超时时间 (default 3)
  -u string
        指定Url扫描
  -uf string
        指定Url文件扫描
  -wt int
        web访问超时时间 (default 5)
```

总之是一款很实用的工具，平时有很多场景可以使用到。

## 参考文献

- [shadow1ng](https://github.com/shadow1ng)/[fscan](https://github.com/shadow1ng/fscan)