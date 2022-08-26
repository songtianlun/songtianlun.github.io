---
title: "frp实现内网穿透 | frp服务端配置 | frp客户端配置"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "482"
date: "2020-11-13 14:59:00"
---

frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。

这里简单记录其客户端及服务端的配置方法。

- github：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)
- document：[https://gofrp.org/docs/](https://gofrp.org/docs/)

## 一、frp 服务端

### **下载**

目前可以在 Github 的 [Release](https://github.com/fatedier/frp/releases) 页面中下载到最新版本的客户端和服务端二进制文件，所有文件被打包在一个压缩包中。

### **部署**

解压缩下载的压缩包，将其中的 frpc 拷贝到内网服务所在的机器上，将 frps 拷贝到具有公网 IP 的机器上，放置在任意目录。

### **开始使用！**

编写配置文件，先通过 `./frps -c ./frps.ini` 启动服务端，再通过 `./frpc -c ./frpc.ini` 启动客户端。如果需要在后台长期运行，建议结合其他工具使用，例如 `systemd` 和 `supervisor`。

```bash
# 前台启动
./frpc -c ./frpc.ini

# 后台启动命令
nohup ./frpc -c ./frpc.ini &
```

`frps.ini` 配置文件类比：

```bash
[common]
bind_port        = 17000               # 服务监听端口
bind_addr        = 0.0.0.0             # 监听IP
token            = 123456              # 密钥
dashboard_port   = 17001               # web面板
dashboard_user   = admin               # 面板用户名
dashboard_pwd    = admin               # 面板密码
subdomain_host   = *.your_doming.com   # WEB访问域名绑定（绑定后只能绑定子域名访问）
vhost_http_port  = 10000               # web服务http端口
vhost_https_port = 10001               # web服务https端口

# 注：以上配置根据需求设置，最简单的配置只需要前两行，既仅配置服务监听端口，其余按需配置。
```

### 使用systemctl来控制启动

```bash
sudo vim /lib/systemd/system/frps.service
```

服务内容：

```bash
[Unit]
Description=fraps service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
#启动服务的命令（此处写你的frps的实际安装目录）
ExecStart=/your/path/frps -c /your/path/frps.ini

[Install]
WantedBy=multi-user.target
```

使用方法：

```bash
# 启动frps
sudo systemctl start frps
# 自启动
sudo systemctl enable frps
# 重启应用
sudo systemctl restart frps
# 停止应用
sudo systemctl stop frps
# 查看应用的日志
sudo systemctl status frps
```

> 有一些网站会免费提供frp服务，比如：[https://www.ioiox.com/frp.html](https://www.ioiox.com/frp.html)

## 二、frp 客户端

配置文件：

```bash
[common]
server_addr = free.frp.ioiox.com  # 服务器IP或者地址
server_port = 7007                # 服务器提供的端口号
token = www.ioiox.com             # 服务器提供的token

[web1]                            # 为避免错误,一定需更改为比较特殊的名称,不能和服务器端其他配置重名.
type = http                       # http协议
local_ip = 127.0.0.1              # 127.0.0.1指穿透本机,也可以填写内网IP.
local_port = 5000                 # 群晖内网HTTP端口,默认为5000.
custom_domains = nas.ioiox.com    # 填写你的域名

[web2]                            # 为避免错误,一定需更改为比较特殊的名称,不能和服务器端其他配置重名.
type = https                      # https协议
local_ip = 127.0.0.1              # 127.0.0.1指穿透本机,也可以填写内网IP.
local_port = 5001                 # 群晖内网HTTPS端口,默认为5001.
custom_domains = nas.ioiox.com    # 填写你的域名

[OpenVpn]
type = udp                        # 协议
local_ip = 192.168.123.142        # 127.0.0.1指穿透本机,也可以填写内网IP.
local_port = 1194                 # 内网端口
remote_port = 11194               # 远程连接端口
```

启动方法及安装方法类比服务端配置。

## 参考文献

- Frp 官方文档：[https://gofrp.org/](https://gofrp.org/)
- 十分钟教你配置frp实现内网穿透：[https://blog.csdn.net/u013144287/article/details/78589643](https://blog.csdn.net/u013144287/article/details/78589643)
- Frp后台自动启动的几个方法：[https://blog.csdn.net/x7418520/article/details/81077652](https://blog.csdn.net/x7418520/article/details/81077652)
- 群晖NAS使用Docker安装配置frpc内网穿透教程：[https://www.ioiox.com/archives/26.html](https://www.ioiox.com/archives/26.html)