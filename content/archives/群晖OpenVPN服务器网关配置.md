---
title: "群晖OpenVPN服务器网关配置"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "481"
date: "2020-11-13 14:19:50"
---

使用群晖OpenVpn服务套件搭建了VPN服务后，导出配置文件，默认是不会在客户端的  `openvpn.ovpn` 文件中设置重定向网关选项的，此时连接上VPN是无法通过该VPN访问互联网的，只能访问局域网。如果想要访问互联网，打开网管重定向即可：

```bash
# If redirect-gateway is enabled, the client will redirect it's
# default network gateway through the VPN.
# It means the VPN connection will firstly connect to the VPN Server
# and then to the internet.
# (Please refer to the manual of OpenVPN for more information.)

redirect-gateway def1
```

之后重新连接，会发现网关已经被指定为VPN局域网内DHCP分发的网关。