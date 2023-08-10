---
title: '自建 speedtest 服务端 web 并使用 cli 测试内网带宽'
date: '2023-07-25T09:36:00.088Z'
tags: ['VPS', 'Docker']
created: '2023-07-25T09:23:49.760Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '3'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 08:55, 26th 七月 2023 -->

# 自建 speedtest 服务端 web 并使用 cli 测试内网带宽

[LibreSpeed](https://github.com/librespeed/speedtest) 是一个自托管的HTML5速度测试和更多功能。易于设置，提供示例，可配置，适用于移动设备。支持PHP、Node、多个服务器等。

该项目部署简单，可以用于内网带宽测速或自建公网测速等。

使用 docker 快速部署：

```bash
docker run -e MODE=standalone -p 158:80 -it adolfintel/speedtest
```

`docker-compose` 也可以：

```yaml
version: '3'
services:
  speedtest:
    image: adolfintel/speedtest
    restart: always
    environment:
      - MODE=standalone
    ports:
      - "158:80"
```

效果展示：

![](https://imagehost-cdn.frytea.com/images/2023/07/25/skihie-2.png)

在服务器，可以使用该组织提供的配套工具 [speedtest-cli](https://github.com/librespeed/speedtest-cli) 实现 cli 测速：

```bash
$ librespeed-cli -h
NAME:
   librespeed-cli - Test your Internet speed with LibreSpeed 🚀

USAGE:
   librespeed-cli [global options] [arguments...]

...
```

能够支持使用 stdout 直接传入服务器参数，官方文档给出了基本用法：

```bash
echo '[{"id": 1,"name": "a","server": "https://speedtest.example.com/","dlURL": "garbage.php","ulURL": "empty.php","pingURL": "empty.php","getIpURL": "getIP.php"}]' | librespeed-cli --local-json -
```

举个例子，我部署了一套 speedtest 地址为： `http://192.168.25.8:158`

那么我在内网使用这个命令即可测速：

```bash
# 自用的拉取地址，可以直接使用，也可以从官方 github 获取预构建版本
$ wget -O libspeed-cli https://res.frytea.com/d/Dev/scripts/librespeed-cli_1.0.10_linux_amd64/librespeed-cli

# 开始测速，在访问地址后面加上 /backend/ 路径即可
$ echo '[{"id": 1,"name": "a","server": "http://192.168.25.8:158/backend/","dlURL": "garbage.php","ulURL": "empty.php","pingURL": "empty.php","getIpURL": "getIP.php"}]' | ./librespeed-cli --local-json -
Using local JSON server list from stdin
Selecting the fastest server based on ping
Selected server: a [192.168.25.8]
You're testing from: {"processedString":"192.168.27.75 - private IPv4 access","rawIspInfo":""}
Ping: 0.00 ms	Jitter: 0.00 ms
Download rate:	17014.33 Mbps
Upload rate:	2483.74 Mbps
```

## References

* [librespeed/speedtest](https://github.com/librespeed/speedtest/blob/master/doc_docker.md)
* [librespeed/speedtest-cli](https://github.com/librespeed/speedtest-cli)