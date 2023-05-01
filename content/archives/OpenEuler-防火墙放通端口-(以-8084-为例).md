---
title: "OpenEuler 防火墙放通端口 (以 8084 为例)"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "648"
date: "2022-11-17 09:56:00"
---

最近使用 OpenEuler 部署项目，发现防火墙放通端口的方法找不到，因此在这里记录：

```bash
[root@localhost Porting-advisor_2.5.RC1_linux-x86-64]# firewall-cmd --query-port=8084/tcp --permanent
no
[root@localhost Porting-advisor_2.5.RC1_linux-x86-64]# firewall-cmd --add-port=8084/tcp --permanent
success
[root@localhost Porting-advisor_2.5.RC1_linux-x86-64]# firewall-cmd --reload
success
[root@localhost Porting-advisor_2.5.RC1_linux-x86-64]# firewall-cmd --query-port=8084/tcp --permanent
yes
```

