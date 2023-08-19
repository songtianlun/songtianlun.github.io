---
title: 'Linux 终端获取本机公网 IP 的方法'
date: '2023-08-19T04:13:06.590Z'
tags: ['Linux']
created: '2023-08-18T01:25:04.158Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '1'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 12:13, 19th 八月 2023 -->

# Linux 终端获取本机公网 IP 的方法

下方任意命令均可：

```bash
$ wget -qO- https://ipecho.net/plain ; echo

$ curl https://ipecho.net/plain

$ curl https://ipecho.net/plain ; echo

$ curl https://ipinfo.io/ip

$ curl icanhazip.com

$ curl -s https://checkip.dyndns.org | sed -e 's/.*Current IP Address: //' -e 's/<.*$//'
```

## References

* [Command for determining my public IP?](https://askubuntu.com/questions/95910/command-for-determining-my-public-ip)