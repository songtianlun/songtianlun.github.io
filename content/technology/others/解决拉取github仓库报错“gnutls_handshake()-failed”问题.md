---
title: "解决拉取github仓库报错“gnutls_handshake() failed”问题"
categories: [ "编程开发" ]
tags: [ "git" ]
draft: false
slug: "421"
date: "2020-07-27 08:21:00"
---

本文首发于：https://blog.frytea.com/archives/421/

```bash
gnutls_handshake() failed: The TLS connection was non-properly terminated.
```

最近为新配置的虚机拉取库，但是从 GitHub 拉取库总是出问题，查阅网上文献将问题锁定在代理，但是找了一圈还是没有找到答案。

经过仔细排查，发现还是由于代理设置有错，为 http 错误配置了 https 的代理，导致出错。

如果没有配置代理，可使用以下命令 **取消代理** ：

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

如果需要使用 **代理** ， `http` 协议通过以下命令配置，使用 ` 7890` 端口为例：

```bash
git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy https://127.0.0.1:7890
```

`socket` 协议通过以下命令配置，使用 ` 7890` 端口为例：

```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

也可以这样子 **仅代理 GitHub** ：

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
#取消代理
git config --global --unset http.https://github.com.proxy
```

## 拓展阅读

- [git 设置和取消代理 - Frytea Wiki](https://wiki.frytea.com/doku.php?id=technology:git:%E8%AE%BE%E7%BD%AE%E5%92%8C%E5%8F%96%E6%B6%88%E4%BB%A3%E7%90%86)
