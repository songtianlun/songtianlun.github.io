---
title: "mermaid.js 效果相册"
categories: [ "技术" ]
tags: [ "mermaid","notion","obsidian" ]
draft: false
slug: "663"
date: "2022-11-24 14:38:35"
---

[mermaid](https://mermaid-js.github.io/mermaid/#/) 是一款 javascript 库，能够轻而易举地通过文本代码绘图。

作为普通用户，将其理解为一种绘图的语言即可，集成它之后就可以在 markdown 的轻松插入特定语法编写的各类图示了，而且不需要像 plantuml 一样需要外部服务器，目前 [notion](https://www.notion.so/) 、 [obsidian](https://obsidian.md/) 等都已原生支持该特性，许多博客主题也支持该语法。

使用它，可以轻松在各类 md 编辑器中绘图，方便修改和传播。

具体语法请查看 mermaid 官网，本文展示一些在互联网发现的比较优秀的示例：

## 网络拓扑图

```mermaid
graph TD
 linkStyle default interpolate basis
 wan1[<center>DSL 100/10 Mb<br><br>10.100.102.1</center>]---router{<center>EdgeRouter-X<br><br>10.20.30.1</center>}
 ip((<center><br>IP<br><br></center>))-.-router
 dns((<center><br>DNS<br><br></center>))-.-router
 wan2[<center>LTE 50/20 Mb<br><br>192.168.1.1</center>]---router
 router---|100Mb|ap[<center>RT-AC1200<br><br>10.20.30.3</center>]
 router---|1Gb|pc(<center>PC<br><br>10.20.30.190</center>)
 router---|1Gb|switch[<center>TL-SG105E<br><br>10.20.30.2</center>]
 subgraph red1
 ap-.-cam1(<center>Camera<br><br>10.20.30.171</center>)
 ap-.-cam2(<center>Camera<br><br>10.20.30.172</center>)
 ap-.-phone(<center>Phone<br><br>10.20.30.191</center>)
 ap-.-ir(<center>IR<br><br>10.20.30.180</center>)
 end
 subgraph red2
 switch---|100Mb|pi1(<center>RPi 3B<br><br>10.20.30.150</center>)
 switch---|1Gb|pi2(<center>RPi 3B+<br><br>10.20.30.151</center>)
 switch---|100Mb|nvr(<center>NVR<br><br>10.20.30.170</center>)
 switch---|1Gb|laptop(<center>Laptop<br><br>10.20.30.192</center>)
 end
```

## 参考文献

- [New diagram type: network topology #1227](https://github.com/mermaid-js/mermaid/issues/1227)
- [About Mermaid](https://mermaid-js.github.io/mermaid/#/?id=about-mermaid)

