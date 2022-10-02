---
title: "DirectoryLister搭建个人资源分享站点及私人云盘搭建小记"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "35"
date: "2019-01-08 22:53:00"
---



喜大普奔！本站开通了资源共享站点及私人云盘！

简直是好一通折腾，故事说来话长，本文主要谈谈私人共享站点搭建过程中遇到的问题及体会

引言
--

一直想要搭建一个属于自己的资源共享小站，把一些不好寻找的资源放在站点上供我的朋友们下载，随着博客、主页的陆续开通，想着时机已到，于是开始着手准备了解各种资源。

没做的时候以为类似的资料会很少，但是从一篇博文中了解到其实有很多种开源的目录列表程序

文章跳转：[5款简单实用的免费目录列表程序（Directory Lister）演示及下载](http://www.laozuo.org/6300.html)

经过
--

尝试了h5ai之后，发现了自己云虚拟主机的限制，于是采用更加自由的director lister进行搭建，搭建过程非常简单：

第一步：下载程序：官网（[http://www.directorylister.com/](http://www.directorylister.com/)）

第二步：将压缩包解压至web服务器根目录下

第三步：使用域名进行访问

若使用二级目录，需要对程序进行一些调整，调整方法大概就是对`resources/themes/bootstrap/`目录下的`index.php`中的css/js引用进行修改，修改路径为域名解析到二级目录，详情见**优化**中的博文！

第四步：将需要共享的文件放置在resource同级目录下，就可以看到分享的文件啦！

优化
--

在实际使用过程中发现一个问题，

那就是一个字：

慢！

查了一下原因，是因为原生的页面中使用了google的字体，而谷歌字体在国内虽然能用，但是苟延残喘，也就是因此大大降低了页面加载速度，同样的，在网上找到一篇博文很完美的解决了这个问题！

博文跳转：[通过 Directory Lister 简单实现服务器目录列表展示](http://www.iyu.co/web/directory-lister/)

上面的文章中介绍了原因，同时提供了一个修改过的版本，在博文中可以下载，同时在本站资源共享站也提供下载（资源站：[https://songtianlun.cn/dateshare](https://songtianlun.cn/dateshare)）

结束
--

至此，实用Directory Lister搭建的个人资源共享小站大功告成，欢迎大家来玩！

演示链接：[https://songtianlun.cn/dateshare](https://songtianlun.cn/dateshare)

宋天伦

2019.1.8