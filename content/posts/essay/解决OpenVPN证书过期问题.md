---
title: "解决OpenVPN证书过期问题"
categories: [ "技术价值" ]
tags: [ "NAS" ]
draft: false
slug: "553"
date: "2021-08-01 23:36:00"
---

使用 Synology 提供的 VPN Server 一阵子，突然用不了了，大意是说 SSL 证书过期了，但是不知道如何解决，网络搜索也没有结果，试过了重置套件，无法解决。

最后查阅文档发现，VPN Server 是依赖了群晖设置中的证书。

![https://imagehost-cdn.frytea.com/images/2021/08/01/2021-08-01-11.33.18a374cf098b06dd85.png](https://imagehost-cdn.frytea.com/images/2021/08/01/2021-08-01-11.33.18a374cf098b06dd85.png)

随便选择一个进入设置，发现 VPN server 就是配置了过期的证书。

![https://imagehost-cdn.frytea.com/images/2021/08/01/2021-08-01-11.34.442fd77679cad71819.png](https://imagehost-cdn.frytea.com/images/2021/08/01/2021-08-01-11.34.442fd77679cad71819.png)

解决方法很简单，选择一个没过期的证书即可，保存后 VPN Server 会自动重启，之后重新导出配置文件，重连即可。