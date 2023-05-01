---
title: "LEDE(OpenWrt)安装openclash ｜旁路由技巧 ｜ 配置网络流量全部通过旁路由"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "450"
date: "2020-09-04 12:25:00"
---

今天我们来安装一个运行在OpenWrt上的Clash客户端，兼容Shadowsocks、ShadowsocksR、Vmess、Trojan、Snell等协议，可以根据灵活的规则配置实现策略代理。

## clash安装步骤

### 第一步，下载clash安装包

推荐去OpenWrt版clash官方的github仓库下载。

OpenClash： [https://github.com/vernesong/OpenClash/releases](https://github.com/vernesong/OpenClash/releases)

下载完毕后可以使用LEDE后台提供的文件管理功能上传安装包，推荐上传到 `/tmp` 目录下。

![https://imagehost-cdn.frytea.com/20200904121513.png](https://imagehost-cdn.frytea.com/20200904121513.png)

### 第二步，安装依赖

进入LEDE控制台，运行如下命令安装依赖：

```bash
opkg update
opkg install luci
opkg install luci-base
opkg install iptables
opkg install dnsmasq-full
opkg install coreutils
opkg install coreutils-nohup
opkg install bash
opkg install curl
opkg install jsonfilter
opkg install ca-certificates
opkg install ipset
opkg install ip-full
opkg install iptables-mod-tproxy
opkg install kmod-tun  #TUN模式
opkg install luci-compat
```

### 第三步，安装软件

```bash
#假设安装包名字为
luci-app-openclash_0.33.7-beta_all.ipk

#执行安装命令
opkg install /tmp/luci-app-openclash_0.33.7-beta_all.ipk
```

安装结束后刷新 web 管理页面，在服务里看到clash即安装成功：

![https://imagehost-cdn.frytea.com/20200904121702.png](https://imagehost-cdn.frytea.com/20200904121702.png)

### 卸载

```bash
#执行卸载命令
#插件在卸载后会自动备份配置文件到 /tmp 目录下，除非路由器重启，在下次安装时将还原您的配置文件
opkg remove luci-app-openclash
```

至此，openclash安装介绍到这里，下面简单介绍使您的设备通过旁路由的方法。

当clash正常运行，您就可以通过配置系统的代理，实现相关功能，但是系统代理作用面比较窄，大部分软件是不走代理的，此时您可以通过手动指定网关的方法使设备全局流量经过您的LEDE旁路由。

![https://imagehost-cdn.frytea.com/20200904122021.png](https://imagehost-cdn.frytea.com/20200904122021.png)

方法很简单，将IPv4配置为手动，进行如下配置：

- IP地址：配置一个局域网段内可用的IPv4
- 路由器（网关）：配置为LEDE的局域网IP
- DNS：配置为LEDE局域网ip或其他可用DNS

这一方法适用于PC、MobilePhone等设备，只要可以手动配置IP即可，这应该是一个网络设备最基本的功能。

通过这一方法，您的所有流量都会经过您的LEDE，您也不需要配置额外的代理，即可实现相关功能。当然，您也可以通过设置DHCP服务器的方式在路由器端直接修改默认网关，但是我的路由器不支持，今天就不介绍了。

## 参考文献

- [OpenWrt、OpenClash 安装教程](https://marasati.com/2020/05/03/openclash.html)：[https://marasati.com/2020/05/03/openclash.html](https://marasati.com/2020/05/03/openclash.html)
- [安装 OpenClash](https://github.com/vernesong/OpenClash/wiki/%E5%AE%89%E8%A3%85)：[https://github.com/vernesong/OpenClash/wiki/安装](https://github.com/vernesong/OpenClash/wiki/%E5%AE%89%E8%A3%85)
- [从听说到上手，人人都能看懂的旁路由入门指南](https://zhuanlan.zhihu.com/p/122233420)：[https://zhuanlan.zhihu.com/p/122233420](https://zhuanlan.zhihu.com/p/122233420)