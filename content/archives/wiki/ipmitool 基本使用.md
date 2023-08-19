---
title: 'ipmitool 基本使用'
date: '2023-07-17T03:47:22.918Z'
tags: ['Linux', 'BMC']
created: '2023-07-06T07:18:43.201Z'
creator: 'songtianlun'
modifier: 'songtianlun'
bag: 'default'
revision: '2'
---

<!-- Exported from TiddlyWiki at 10:16, 22nd 七月 2023 -->

# ipmitool 基本使用

```bash
# account
ipmitool user list
ipmitool user set password 2 password@123

# network
# show network
ipmitool lan print

# set to static and show network
ipmitool lan set 1 ipsrc static && ipmitool lan set 1  ipaddr 192.168.24.6 && ipmitool lan set  1 netmask 255.255.252.0 && ipmitool lan set  1 defgw ipaddr 192.168.27.254 && ipmitool lan print
```