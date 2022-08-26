---
title: "解决SSH登录缓慢"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "446"
date: "2020-09-02 17:52:00"
---

## 解决方法

第一步：修改SSH服务端配置文件：

```bash
vim /etc/ssh/sshd_config
```

第二步：按照下面说明进行修改：

```bash
- GSSAPIAuthentication yes
+ GSSAPIAuthentication no
- UseDNS yes
+ UseDNS no
```

- UseDNS选项是打开的话，服务器会先根据客户端的 IP地址进行 DNS PTR反向查询出客户端的主机名，然后根据查询出的客户端主机名进行DNS正向A记录查询，并验证是否与原始 IP地址一致，通过此种措施来防止客户端欺骗
- GSSAPIAuthentication 认证很少用到，关闭可以加快SSH访问速度

## 参考文献

- SSH 中的 GSSAPI 相关选项： [https://jaminzhang.github.io/linux/GSSAPI-related-options-in-ssh-configuration/](https://jaminzhang.github.io/linux/GSSAPI-related-options-in-ssh-configuration/)
- 通过关闭 UseDNS和GSSAPIAuthentication选项加速 SSH登录： [https://www.cnblogs.com/wjoyxt/p/3790537.html](https://www.cnblogs.com/wjoyxt/p/3790537.html)