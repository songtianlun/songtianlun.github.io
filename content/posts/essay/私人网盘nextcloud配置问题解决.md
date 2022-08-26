---
title: "私人网盘nextcloud配置问题解决"
categories: [ "编程开发" ]
tags: [ "vps","nextcloud" ]
draft: false
slug: "32"
date: "2019-01-10 11:29:00"
---

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-7.png)

## 安装流程
配置流程非常简单，主要是参考了下面这篇博文配置，在宝塔面板下安装nextcloud，非常简单。

博文跳转:[https://www.vpsss.net/5780.html](https://www.vpsss.net/5780.html)

大概总结以下步骤：

第一步：官网下载安装包：[https://nextcloud.com/](https://nextcloud.com/)

路径:getnestcloud → Server packages → Download

第二步：将安装包上传至网页服务器根目录并解压

第三步：直接访问，配置账号、数据库等

第四步：解决问题！

我主要是碰到了下面这个问题，配置完成之后显示内部错误。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image.png)

错误提示

**解决办法，安装php7.2！**

简单粗暴，但是很有用，网上有一些博主碰到更多问题，在这里稍微总结几个:

[宝塔面板部署NextCloud逐一解决后台安全及设置警](https://blog.csdn.net/qq_39574546/article/details/83417341)[解决CentOS中安装Nextcloud出现“内部服务器错误”](https://www.orgleaf.com/2891.html)

好了，站点开通，域名如下：

演示链接：drive.songtianlun.cn

## 问题集锦
----

在nextcloud使用过程中遇到的一些问题及解决方案记录在这里

### 问题一、一些文件没有通过完整性检查. 了解如何解决该问题请查看我们的文档. (无效的文件列表… / 重新扫描…)

点击无效的文件列表，INVALID\_HASH 这里表示错误的文件，根据提示的路径查看，多半是你自己上传的和程序无关的文件，移动到其他地方就好。EXTRA\_FILE 这里表示多余的文件，需要删除。EXCEPTION 其他错误信息。

解决信息来源：[Nextcloud搭建私有云解决安全及设置警告](https://yaw.ee/1937.html)

### 问题二、NextCloud一直处于维护状态解决方法

Ubuntu 在next cloud的目录下，对着occ脚本运行

    维护模式的启用和关闭
    sudo -u www-data php occ maintenance:mode --on
    sudo -u www-data php occ maintenance:mode --off
    PS：以上命令，需要进入nextcloud的安装目录内，找到occ命令后，执行，如果是centos环境那么要改成 apache php xxxxx即可

也可直接修改文件

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-26-1024x497.png)

解决信息来源：[NextCloud一直处于维护状态解决方法](https://blog.csdn.net/chenbetter1996/article/details/82831413)

[nextcloud更新后进入维护模式怎么退出，最佳回答](https://zhidao.baidu.com/question/1451968082300590700.html)

### 问题三:.PHP 的设置似乎有问题, 无法获取系统环境变量. 使用 getenv(\\”PATH\\”) 测试时仅返回空结果.

一行代码解决，在以下位置（根据php版本修改目录）添加以下代码

    env[PATH] = /usr/local/bin:/usr/bin:/bin:/usr/local/php/bin

保存，并重载php配置解决

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-28-1024x499.png)

参考文章：[宝塔面板部署NextCloud逐一解决后台安全及设置警告](https://bugxia.com/114.html?replytocom=134)

### 问题四：内存缓存未配置，为了提升使用体验，请尽量配置内存缓存。更多信息请参见文档

这个问题是指php的缓存模块没有安装，nextcloud支持APCu、Memcached、Redis等模块，选择其中一个安装。

编译安装完毕之后，从宝塔面板打开/www/wwwroot/你的域名/config/config.php，手动给nextcloud的配置文件中添加一行设置，指定使用APCu作为缓存

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-29-1024x501.png)

参考文献同问题三！

### 问题五：docker安装与宿主机通信问题
核心：需找到docker与宿主机通信网卡的ip

> `172.17.0.1`是本次找到的ip

- [使用docker部署nextcloud并连接到宿主机的mysql数据库](https://www.yooomu.com/archives/265.html)