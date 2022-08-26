---
title: "一键配置 Seafile 云盘并开启 https 访问"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "313"
date: "2020-02-13 15:42:00"
---

前些日子终于受够了臃肿的 Nextcloud ，将其完全卸载，寻觅已久之后选择了 Seafile 云盘。之所以放弃 Nextcloud，大致有以下原因：

- 插件丰富，功能强大的同时带来运行缓慢的问题
- PHP 执行长时间大内存任务时容易出错
- iPhone 客户端莫名闪退，Linux 客户端无法打开
- Rclone 执行长时间文件读取操作时会容易出错，同第二条

综上原因，虽然 Nextclud 有着完整的功能和完善的生态，但并不适合目前的我个人使用。

之后发现 Seafile 提供全平台客户端，服务端安装简单，文档齐全，实测功能也比较全，带有 webdav ，使用 Python 运行速度也是不错的，因此选择 Seafile 做个人云盘。

接下来介绍分两部分：

1. Seafile 云盘一键安装（使用官方提供的脚本）
2. 配置域名并配置 SSL 加密通讯

## Seafile 云盘一键安装

官方文档提到「如果您是初次部署 Seafile 服务，我们建议您使用[自动安装脚本](https://github.com/haiwen/seafile-server-installer-cn)来快速部署一个 Seafile 服务。」

本人是第一次安装 Seafile ，对于各项配置不是很熟悉，因此采用这种方式，更容易上手。开始前需保证服务器是干净的。

第一步，获取脚本

运行如下命令获取脚本：

```

# 适用于 Seafile 7.1.x 及以上版本
## Ubuntu 18.04 (64bit):

wget https://raw.githubusercontent.com/haiwen/seafile-server-installer-cn/master/seafile-server-7.1-ubuntu-amd64-http

## CentOS 8 (64bit):

wget https://raw.githubusercontent.com/haiwen/seafile-server-installer-cn/master/seafile-server-7.1-centos-amd64-http

# 适用于 Seafile 6.x.x 及以上版本
## Ubuntu 16.04/18.04 (64bit):

wget https://raw.githubusercontent.com/haiwen/seafile-server-installer-cn/master/seafile-server-ubuntu-amd64-http

## CentOS 7 (64bit):

wget https://raw.githubusercontent.com/haiwen/seafile-server-installer-cn/master/seafile-server-centos-7-amd64-http
```

> 注：若服务器访问 GitHub 有困难，可以考虑在较好网络环境下访问 GitHub ，拷贝脚本内容到服务器，之后手动运行。

第二步，运行脚本（以 7.1.0 为例）

```

# Ubuntu 16.04/18.04 (64bit):

bash seafile-server-ubuntu-amd64-http 7.1.0

# CentOS 7 (64bit):

bash seafile-server-centos-7-amd64-http 7.1.0

```

第三步，选择安装版本

在这里选择 `CE` 版，即开源社区版。

完成后就可以看到打印输出的结果，在这里记得保存 `用户名` 和 `密码`，这是您的管理员账户。

至此，完成了最基本的 Seafile 部署，此时访问 `http://*.*.*.*` 其中 `*.*.*.*` 是您服务器 IP 地址。之后输入刚才输出的用户名和密码，就可以进入 Seafile 了。

## 为 Seafile 配置 https 访问

第一步，域名解析

将域名解析到服务器。

第二步，通过 OpenSSL 生成 SSL 数字认证

免费 Self-Signed SSL 数字证书用户请看. 如果你是 SSL 付费证书用户可跳过此步.

首先进入OpenSSL目录，`cd /etc/ssl` ，之后运行如下命令。

```
openssl genrsa -out privkey.pem 2048
openssl req -new -x509 -key privkey.pem -out cacert.pem -days 1095
```

第三步，修改 Nginx 配置文件

请修改 nginx 配置文件以使用 HTTPS，首先进入脚本自动配置的 Nginx 为 Seafile 反代的配置文件目录：`cd /etc/nginx/sites-enabled`

主要修改两个部分：

首先添加一个 `server` 用来将 http 重定向到 https：

```

server {
listen       80;
server_name  cfile.frytea.com;
rewrite ^ https://$http_host$request_uri? permanent;#强制将http重定向到https
    server_tokens off;
}
```

之后在原有监听 `80` 端口为 `http://127.0.0.1:8000/ ` 服务代理的服务上进行修改，将 `80` 改为 `443`，将域名改为您的域名，之后添加以下部分：

```

ssl on;
ssl_certificate /etc/ssl/cacert.pem;#cacert.pem 文件路径
ssl_certificate_key /etc/ssl/privkey.pem;   #privkey.pem 文件路径
ssl_session_timeout 5m;
ssl_session_cache shared:SSL:5m;

add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    server_tokens off;

```

用来制定证书路径并配置一些必要的信息。


第四步，重新加载 Nginx

```
nginx -s reload
```

下面贴上本人的配置文件：

```

log_format seafileformat '$http_x_forwarded_for $remote_addr [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" $upstream_response_time';

server {
listen       80;
server_name  cfile.frytea.com;
rewrite ^ https://$http_host$request_uri? permanent;#强制将http重定向到https
    server_tokens off;
}

server {
listen 443;
server_name cfile.frytea.com;
proxy_set_header X-Forwarded-For $remote_addr;

ssl on;
ssl_certificate /etc/ssl/cacert.pem;#cacert.pem 文件路径
ssl_certificate_key /etc/ssl/privkey.pem;   #privkey.pem 文件路径
ssl_session_timeout 5m;
ssl_session_cache shared:SSL:5m;

add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    server_tokens off;



location / {
proxy_passhttp://127.0.0.1:8000;
proxy_set_header   Host $host;
proxy_set_header   X-Real-IP $remote_addr;
proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header   X-Forwarded-Host $server_name;
proxy_set_header   X-Forwarded-Proto $scheme;
proxy_read_timeout  1200s;
# used for view/edit office file via Office Online Server
client_max_body_size 0;
access_log      /var/log/nginx/seahub.access.log seafileformat;
error_log/var/log/nginx/seahub.error.log;
    }

location /seafhttp {
rewrite ^/seafhttp(.*)$ $1 break;
proxy_pass http://127.0.0.1:8082;
client_max_body_size 0;
proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_connect_timeout  36000s;
proxy_read_timeout  36000s;
access_log      /var/log/nginx/seafhttp.access.log seafileformat;
error_log/var/log/nginx/seafhttp.error.log;
}
location /media {
root /opt/seafile/seafile-server-latest/seahub;
}
location /seafdav {
proxy_passhttp://127.0.0.1:8080/seafdav;
proxy_set_header   Host $host;
proxy_set_header   X-Real-IP $remote_addr;
proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header   X-Forwarded-Host $server_name;
proxy_set_header   X-Forwarded-Proto $scheme;
proxy_read_timeout  1200s;
client_max_body_size 0;
access_log      /var/log/nginx/seafdav.access.log seafileformat;
error_log/var/log/nginx/seafdav.error.log;
}
}

```

## 修改 Seafile 配置文件

现在 nginx 部分已经完成，但是 Seafile 并不知道，此时已经可以通过 `https://your domain` 访问，下面还需要配置 Seafile 的默认域名：

修改 Seafile 配置文件：

```
vim /opt/seafile/conf/seahub_settings.py
``` 

在以下位置修改：

```
SERVICE_URL: https://www.myseafile.com
FILE_SERVER_ROOT: https://www.myseafile.com/seafhttp
```

最后重启 Seafile 和 Seahub

```

cd /opt/seafile/seafile-server-latest
./seafile.sh restart
./seahub.sh restart

```

完成！最后记得管理员登入管理中心，在设置里配置一下新的地址。

## 参考文献

- [Seafile服务器手册](https://cloud.seafile.com/published/seafile-manual-cn/overview/components.md)
- [Seafile如何绑定域名？](http://help.websoft9.com/cloudbox-practice/seafile/solution/bddomain.html)
