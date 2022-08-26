---
title: "GitLab 神奇问题之ssl"
categories: [ "技术价值" ]
tags: [ "GitLab" ]
draft: false
slug: "311"
date: "2020-02-07 02:12:01"
---

今天配置 GitLab 时为 GitLab Pages 配置 SSL 总是有问题，大概表现为：

- 不开启 ssl 就无法让 gitlab pages 实现 https 访问
- 开启 ssl 后可能无法访问
- 对设置变更后可能需要重新部署 pages

经过长时间的摸索，发现 gitlab pages 的配置有三级：

- 第一级：http 访问
- 第二级：指定泛域名 https 访问（提前申请好泛域名证书）
- 第三级：处https 访问外还可绑定自定义域名。

如果想要实现第三级 gtilab pages 目前看来至少需要两个 ip 地址，一个用于 gitlab 的主要 ip 解析，另一个用于 gitlab pages 网页解析。

目前本人只有一个 ip ，因此实现到第二级。

想要实现 https 的访问，不可心急，必须按照管网的流程，先配置 http 访问，再配置 https 访问。

下面简单说说步骤：

第一步：开启 gitlab pages 功能

此前需要解析一个泛域名到服务器，类似 `*.pages.frytea.com ` 。

之后在 gitlab 配置文件 `/etc/gitlab/gitlab.rb` 中指定这个域名：

```
pages_external_url 'http://pages.frytea.com'
```

之后重载配置 `sudo gitlab-ctl reconfigure` ，就开启了 gitlab 的 pages 功能。

第二步：实现 https 访问

想要实现 https 访问，需要在开启 gitlab pages 的前提下，进行下一步：

申请好泛域名证书后，放入 `/etc/gitlab/ssl` 文件夹下，

之后修改 gitlab 配置文件 `/etc/gitlab/gitlab.rb`

```
pages_external_url 'http://pages.frytea.com'

pages_nginx['redirect_http_to_https'] = true
pages_nginx['ssl_certificate'] = "/etc/gitlab/ssl/pages-nginx.crt"
pages_nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/pages-nginx.key"
```
之后重载配置 `sudo gitlab-ctl reconfigure` ，回到 gitlab 会发现已经实现了 https 访问。

## 参考文献

- [GitLab DocsAdministrator DocsGitLab Pages administration](https://docs.gitlab.com/ee/administration/pages/)
