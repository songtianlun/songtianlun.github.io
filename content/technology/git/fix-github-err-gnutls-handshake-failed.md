---
title: "解决拉取 github 仓库报错 “gnutls_handshake () failed” 问题"
date: 2021-12-15T15:25:55+08:00
description: "由于代理导致 github 无法正常拉取的解决办法."
categories: ["技术笔记集","Git 笔记集"]
tags: ["linux", "git"]
draft: false
---

```
gnutls_handshake() failed: The TLS connection was non-properly terminated.
```

最近为新配置的虚机拉取库，但是从 GitHub 拉取库总是出问题，查阅网上文献将问题锁定在代理，但是找了一圈还是没有找到答案。

经过仔细排查，发现还是由于代理设置有错，为 http 错误配置了 https 的代理，导致出错。

## 取消代理

如果没有配置代理，可使用以下命令 **取消代理** ：

```
git config --global --unset http.proxy
git config --global --unset https.proxy

```

## 使用代理

如果需要使用 **代理** ， `http` 协议通过以下命令配置，使用 `7890` 端口为例：

```
git config --global http.<https://github.com.proxy> <http://127.0.0.1:7890>
git config --global https.<https://github.com.proxy> <https://127.0.0.1:7890>

```

`socket` 协议通过以下命令配置，使用 `7890` 端口为例：

```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

```

也可以这样子 **仅代理 GitHub** ：

```
git config --global http.<https://github.com.proxy> socks5://127.0.0.1:1080

#取消代理
git config --global --unset http.<https://github.com.proxy>
```