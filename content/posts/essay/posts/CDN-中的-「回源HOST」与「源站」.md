---
title: "CDN 中的 「回源HOST」与「源站」"
categories: [ "编程开发" ]
tags: [ "CDN" ]
draft: false
slug: "589"
date: "2021-10-28 00:11:48"
---

在配置网站 CDN 时总是搞不清其中「回源HOST」与「源站」的区别，因此在这里简单记录。

源站和回源HOST的区别：

- 源站：源站决定了回源时请求到的**具体IP地址**。
- 回源HOST：回源HOST决定了回源请求访问到该IP地址上的**具体站点**。回源HOST即**回源域名**，当源站服务器上提供多个域名服务时，CDN节点回源时在源站访问的具体站点域名。

### **例子一：源站是域名**

如果源站为**`www.a.com`**，回源HOST为**`www.b.com`**。那么实际回源是请求到**`www.a.com`**解析到的IP地址其对应主机上的**`www.b.com`**站点。

### **例子二：源站是IP地址**

源站为**`1.1.1.1`**，回源HOST为**`www.b.com`**。那么实际回源的是**`1.1.1.1`**对应主机上的**`www.b.com`**站点。

## 参考文献

- [CDN的配置回源HOST与源站的区别](https://help.aliyun.com/document_detail/40117.html) By Aliyun
- [回源HOST与源站有什么区别？](https://support.huaweicloud.com/cdn_faq/cdn_faq_0016.html)By Huawei Cloud