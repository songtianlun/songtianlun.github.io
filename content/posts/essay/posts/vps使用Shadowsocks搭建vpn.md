---
title: "vps使用Shadowsocks搭建vpn"
categories: [ "编程开发" ]
tags: [ "shadowsocks","vps" ]
draft: false
slug: "30"
date: "2019-01-12 11:52:00"
---


![Create a SOCKS5 Proxy Server with Shadowsocks on Ubuntu and CentOS 7](https://www.linode.com/docs/networking/vpn/create-a-socks5-proxy-server-with-shadowsocks-on-ubuntu-and-centos7/shadowsocks.jpg)

# 简介
编程需要经常需要翻墙，当年的我天真无邪上了不少当，每次的vpn经历无一不遇奸商！于是下决心搭建自己的vpn！就在今天，vpn终于搭建成功，在这里分享一下成功的喜悦同时贴出自己搭建的过程仅供参考！

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-10-1024x355.png)

# 服务器端配置
## 环境
vps提供商：阿里云
系统：CentOS 7.3
节点：香港
峰值带宽：35MB

## 方法一
### 第一步：远程登入服务器，运行如下代码

    wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
    chmod +x shadowsocks-all.sh
    ./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log

### 第二步：选择一种脚本

    Which Shadowsocks server you'd select:
    1.Shadowsocks-Python
    2.ShadowsocksR
    3.Shadowsocks-Go
    4.Shadowsocks-libev
    Please enter a number (default 1):

在这里我选择了第一个python，输入3，回车！

### 第三步：输入密码和端口，回车！

### 第四步：等待安装完成！

安装完成后的标志如下:

    Congratulations, Shadowsocks-Python server install completed!
    Your Server IP        :  *************************
    Your Server Port      :  ****
    Your Password         :  ********
    Your Encryption Method:  aes-256-cfb
    Your QR Code: (For Shadowsocks Windows, OSX, Android and iOS clients)
     ss://YWVzLTI1Ni1jZmI6c290aWx1ODM4OEAxNDkuMTI5Ljg5LjIxMjo4Mzg4
    Your QR Code has been saved as a PNG file path:
     /root/shadowsocks_python_qr.png
    Welcome to visit: https://teddysun.com/486.html
    Enjoy it!

## 方法二
shadowsocks Python 一键安装

### 获取脚本
使用root用户登录，运行以下命令：

```
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```
安装完成后，脚本提示如下：
```
Congratulations, shadowsocks install completed!   
Your Server IP:your_server_ip   
Your Server Port:your_server_port   
Your Password:your_password   
Your Local IP:127.0.0.1   
Your Local Port:1080   
Your Encryption Method:aes-256-cfb   

Welcome to visit:http://teddysun.com/342.html   
Enjoy it! 
```
### 卸载方法：
使用root用户登录，运行以下命令：

`./shadowsocks.sh uninstall`

## 单用户配置文件 Sample

配置文件路径：
vi /etc/shadowsocks.json
```
{  
    "server":"0.0.0.0",  
    "server_port":8989,   
    "local_address":"127.0.0.1",  
    "local_port":1080,  
    "password":"yourpassword",  
    "timeout":300,  
    "method":"aes-256-cfb",  
    "fast_open": false  
}
```
## 多用户多端口配置文件 Sample
配置文件路径：
```
vi /etc/shadowsocks.json
{  
    "server":"0.0.0.0",
    "local_address":"127.0.0.1",
    "local_port":1080,
    "port_password":{
         "8989":"password0",
         "9001":"password1",
         "9002":"password2",
         "9003":"password3",
         "9004":"password4"
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```
### 使用命令
（2015 年 08 月 28 日修正）：
```
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status
写入自启echo "ssserver -c /etc/shadowsocks.json -d restart" >> /etc/rc.local
查看日志less /var/log/shadowsocks.log
```
说明： 从 Shadowsocks 2.6 开始，你可以直接在后台运行 Shadowsocks，无需 Supervisor 。 这样省掉了 Supervisor 进程占用的内存。
```
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
ssserver -c /etc/shadowsocks.json -d restart
```
### 查看连接的人数

```
Ubuntu:apt-get install lsof -y
CentOs:yum install lsof -y
```

假设服务器端口1080, 查看连接数
`sudo lsof -i -n -P | egrep -c ':1080.+ESTABLISHED'`

### 查看连接列表
`sudo lsof -i -n -P | egrep ':1080.+ESTABLISHED'`

### 监控
利用脚本查看连接列表，并添加定时任务
新建目录mkdir test里添加以下脚本
```
#!/bin/bash
#
# File: port-ip-monitor.sh
#
# Created: Wednesday, August 27 2014 by Hua Liang[Stupid ET] <et@everet.org>
#

filename="port-ip-monitor.log"
regex="8888"  # monitor 你的端口

date +"[%Y-%m-%d %H:%M:%S]" >> $filename
netstat -anp | egrep $regex | grep -E "tcp.*ESTABLISHED" | awk '{print $4, $5}' | cut -d: -f2 | sort -u >> $filename
```
编辑crontab -e里增加* * * * * (cd /test/ && bash port-ip-monitor.sh)
启动服务service crond start
然后我们在/test/里就看到port-ip-monitor.log了
查看日志less /test/port-ip-monitor.log

>参考链接：
>https://shadowsocks.be/1.html
>http://everet.org/shadowsocks.html


# 客户端
## 第一步：下载客户端登陆
安卓、windows的客户端均已上传至本站资源共享站，苹果可在应用商店搜索**shadowsocks**下载安装即可。

安卓客户端：[下载](https://data.songtianlun.cn/vpn/shadowsocks--universal-4.6.5.apk)

windows客户端：[下载](https://data.songtianlun.cn/vpn/Shadowsocks-4.1.3.1.zip)

## 第二步：客户端配置参数
以windows配置为例，首先打开软件（若在c盘下需以管理员身份运行），之后填写相关参数，完成。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-11.png)

之后在任务栏右键，选择**启动系统代理**

大功告成！

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-13-1024x531.png)

主要参考文献：
* [轻松在 VPS 搭建 Shadowsocks 翻墙 ($5/月 支付宝)](https://www.diycode.cc/topics/738)
* [shadowsocks Python 一键安装](https://github.com/iMeiji/shadowsocks_install/wiki/shadowsocks-Python-%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85)