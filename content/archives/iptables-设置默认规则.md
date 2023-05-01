---
title: "iptables 设置默认规则"
categories: [ "技术" ]
tags: [ "linux","iptables" ]
draft: false
slug: "735"
date: "2023-01-31 20:48:53"
---

```bash
设置默认的规则

iptables -P INPUT DROP # 配置默认的不让进
iptables -P FORWARD DROP # 默认的不允许转发
iptables -P OUTPUT ACCEPT # 默认的可以出去
```

## 参考文献

- [iptables - Linux man](https://wangchujiang.com/linux-command/c/iptables.html#%E8%AE%BE%E7%BD%AE%E9%BB%98%E8%AE%A4%E7%9A%84%E8%A7%84%E5%88%99)

