---
title: "Nginx Proxy Manager - Docker 建站最佳伴侣"
categories: [ "技术" ]
tags: [ "vps","docker","nginx","portainer" ]
draft: false
slug: "658"
date: "2022-11-20 10:28:00"
---

很长一段时间中，我都在思考容器建站的可行性。

容器有诸多益处，各类好处就不一一列举了。

在企业场景下，K8s 几乎一骑绝尘，可以完成大规模集群统一管理，完成几乎所有 Web 资源的自动调度。

但强大功能的代价，就是系统本身势必占用一部分资源，这就不适合大部分小网站、小企业去使用了。

传统建站一般是使用虚拟主机的形式，使用宝塔、AppNode、cPanel 之类的面板管理单节点站点，流量大了给服务器扩容、负载均衡、数据库外挂之类的也就解决了。

这种方案很适用于 LAMP 组合场景，可以让自己的想法快速成为现实。

在当代，各种新式编程语言大行其道，PHP 的时代似乎已经过去，容器成为更复杂运行环境的最佳载体。

作为个人站长，近几年部署应用都会优先考虑使用容器，还尝试过 k3s 组建轻量 k8s 集群的方案，使用近一年下来总有种大炮打蚊子的感觉。

说了这么多，就是想引出一种适用于当代 WEB 服务部署，容器化，但又不需要多台服务器的容器方案。

方案的关键技术为 `Docker + Nginx` 的组合。

上层采用 `Portainer + Nginx Proxy Manager` ， 满足 UI 管理的需求。

## 部署方法

下面简单讲一下部署方法：

### Docker

因为 Docker 的部署方法网上资源较多，这里就不列举了，下面默认已安装 docker .

### Portainer

Portainer 是当下比较好用的一款 Docker Web GUI ，使用起来可以满足大部分需求了，部署方法也很简单，类似这样：

```bash
$ docker run -d
--network myDefault
--restart=always
--name="portainer" -p 9000:9000
-v /var/run/docker.sock:/var/run/docker.sock
-v portainer_data:/data 6053537/portainer-ce
```

其中的 myDefault 是自定义网桥，为兼容 docker-compose 等应用的外部访问，在这里不建议使用 Docker 默认网桥。

如果没有报错，就可以通过 9000 端口访问了，后面可以使用 nginx 反代此端口就可以关闭 9000 端口外部访问了。

### Nginx Proxy Manager

这是一款 nginx web gui，使用下来体验不错，貌似内嵌了 openrusty，基本可以满足 Docker 反代、HTTPS 访问等的 GUI 配置需求了

使用如下 docker-compose 部署，可以直接在 portainer 操作：

```yaml
version: '3'
services:
  app:
    hostname: nginx-proxy-manager
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
networks:
  default:
    external: true
    name: myDefault
```

打开后台：

[http://127.0.0.1:81](http://127.0.0.1:81/)

默认管理账户：

```text
Email:    admin@example.com
Password: changeme
```

### 效果展示

我在这里使用的是某位大佬汉化的 Portainer，为的是熟悉一下界面，简化操作，等熟悉了还是建议切回官方版本。

![](https://imagehost-cdn.frytea.com/images/2022/11/20/202211201012632192c7bd541b9e5ec.png)

后面部署应用就在这里一站式搞定了，暴露外部访问时，就用 Nginx Proxy Manager：

![](https://imagehost-cdn.frytea.com/images/2022/11/20/202211201013025564b0b3629773bec.png)

反代配置界面如下：

![](https://imagehost-cdn.frytea.com/images/2022/11/20/202211201014362171dc73c502e4a51.png)

以后在这里部署 Docker 应用，就可以很方便的暴露外部访问了，配了 Portainer 较好的生态和灵活的配置，几乎没有什么限制。

## 总结

本文介绍了一种轻量（1C2G 足矣）、容器化（Docker+Portainer）、自动化（Nginx Proxy Manager 自动 Https）的个人网站搭建方案，该方案几乎可以适应所有场景，更重要的是一台 1C2G 的服务器就足矣支撑数十个小应用。

自己使用或是外部访问都极其方便，再也不用纠结使用哪家面板，再也不用担心面板安全问题了。

我自己的图床、博客、Miniflux、网站统计、数据库以及一些自己开源的应用未来都计划部署在这里。

这就是今天分享的内容了，希望对你有用。

最后提醒一句，本文涉及的部署命令和配置文件随时有可能过时，请以官方文档为准。

## 参考文献

- [Nginx Proxy Manager](https://nginxproxymanager.com/)
- [Docker Docs](https://docs.docker.com/)
- [Portainer](https://www.portainer.io/)
- [Compose specification - Docker](https://docs.docker.com/compose/compose-file/)
- [Docker Engine installation overview](https://docs.docker.com/engine/install/)
- [portainer-ce 中文版](https://hub.docker.com/r/6053537/portainer-ce)
- [在线 nginx 配置生成工具和 nginx 配置 UI 管理工具](https://sirliu.github.io/2021/8/%E5%9C%A8%E7%BA%BFnginx%E9%85%8D%E7%BD%AE%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7%E5%92%8Cnginx%E9%85%8D%E7%BD%AEUI%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7/)
- [Docker 管理面板 Portainer 中文汉化 新增 CE、EE 企业版汉化](https://imnks.com/3406.html)

