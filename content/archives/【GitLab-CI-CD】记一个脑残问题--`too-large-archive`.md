---
title: "【GitLab CI/CD】记一个脑残问题  `too large archive`"
categories: [ "技术" ]
tags: [ "GitLab" ]
draft: false
slug: "271"
date: "2019-12-01 00:01:00"
---

昨天到今天，我终于解决了一个脑残的问题！！

事情是这样子的，我自己搭建了 GitLab ，并导入了我在 GitHub 所有的仓库，并打算未来就在这里提交我的代码了。一方面是因为 GitHub 实在是太慢了，目前使用 iPad 代理切换不智能；另一方面是我想要搭建自己的一套 Git Hosting + CI/CD 系统。搭建过程很顺利、导入过程也十分顺利，但是到了 CI/CD 这里就出了问题，我想要通过 GitLab Runner 编译我的 MKDocs 页面并自动部署到 GitLab Pages，但我被一个错误坑了整整两天：

![](https://imagehost-cdn.frytea.com/images/2019/11/30/8C4DCAF0-80BB-481C-A17E-2505EC119DDB.png#shadow)

`错误日志`如下：

```

$ mv site/ public
$ du -sh public
6.2M	public
Uploading artifacts...
public: found 185 matching files                   
ERROR: Uploading artifacts to coordinator... too large archive  id=102 responseStatus=413 Request Entity Too Large status=413 Request Entity Too Large token=DwkMS97K
FATAL: too large                                   
ERROR: Job failed: exit code 1

```

大概是说提交体积过大引发接受端 413 错误，可是这是怎么回事呢？于是我使用 `ERROR: Uploading artifacts to coordinator... too large archive ` 搜索了 `BING cn`, `Google`, `BaiDu`, 最终有两种方案：

1.

```
In your gitlab, go to Settings > Continuous Integration and Deployment > Maximum artifacts size (MB) and set it to the desired value. The default is 100MB. 
```

2.

```
In the gitlab.rb file, mine at /etc/gitlab/gitlab.rb, set or uncomment the following line.

nginx['client_max_body_size'] = '250m' 
```

尝试后 终无果。

终于在今天晚上，今天晚上，再错误中挣扎了 `48` 小时后，突然灵光一现，是反代的 `nginx` 设置错误！！！

![](https://imagehost-cdn.frytea.com/images/2019/11/30/FD50EF30-2B76-4B12-9886-CAD439750905.png#shadow)

我的 GitLab 服务器配置在一台裸金属服务器内部的虚拟机上，没有为它分配外网 IP ，为了使用域名解析，我在宿主机上使用反向代理将域名请求反向代理到内网 IP 上，从而实现了外网访问 GitLab ，但问题就出在这个反代的服务器上了，我思前想后找遍了 GitLab 的配置文件就是没有往它身上想。终于今天我打算使用境外服务器 Runner 配置一下，拉取代码的时候我突然意识到这个问题。

修改后完成，在经历了100多次尝试后，我终于找到了问题所在！！！

![](https://imagehost-cdn.frytea.com/images/2019/11/30/706453F7-B402-45CA-91E4-C54FBAEBB850.png#shadow)


好了好了，这件事情带给我几点启示：

 - 在实践过程中可能会遇到很多奇葩问题，且并不是所有问题都是“讲理的”
 - 遇到问题别慌，想办法，理思路，实在解决不了放一放，别钻牛角尖

收工睡觉，我终于能好好睡个觉了。本来想着随便弄一弄，没想到一下子弄这么久，教训还是挺实用的，正好可以用于研究生入学考试，遇到问题别慌，用自己的脑子理性思考！

宋天伦
2019.12.1




