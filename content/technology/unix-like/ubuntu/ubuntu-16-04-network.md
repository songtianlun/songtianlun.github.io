---
title: "Ubuntu 16.04 网卡配置方法"
date: 2021-11-05T00:30:54Z
description: "Ubuntu 旧版网卡配置方法."
categories: ["技术笔记集","Linux 笔记集"]
tags: ["linux", "ubuntu", "network"]
draft: false
---

ubuntu 16.04 配置网卡的方法还是比较经典的做法，与 debian 类似的。 

- 第一步：修改网卡配置文件

```bash
sudo vi /etc/network/interfaces
```

- 第二步：修改配置内容

```bash
auto enp0s3
iface enp0s3 inet static
address 192.168.0.1
netmask  255.255.255.0
gateway  192.168.0.1
```

- 第三不：重启网络

```bash
/etc/init.d/networking restart
或者（下面是指定启动关闭某个网卡命令）
ifdown enp0s3    （关闭网卡enp0s3）
ifup   enp0s3    (启动网卡enp0s3)
sudo service network-manager restart

```

注：该方法不适用于 ubuntu 20 以上，请参考新文章。

## 参考文献

- ubuntu16.04配置网卡：[https://blog.csdn.net/stay_zezo/article/details/80718369](https://blog.csdn.net/stay_zezo/article/details/80718369)