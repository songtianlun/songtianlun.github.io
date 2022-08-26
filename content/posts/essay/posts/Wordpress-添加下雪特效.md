---
title: "Wordpress 添加下雪特效"
categories: [ "编程开发" ]
tags: [ "wordpress" ]
draft: false
slug: "59"
date: "2019-01-11 23:48:00"
---



最近非常热衷于逛博客，各大博主博客都非常出彩，弄得我心里面痒痒的也想弄，就先从一个下雪效果开始吧！

在网上找了很多资料，最后找到一个非常靠谱的，步骤非常简单！

第一步：将snow上传至主题根目录并解压

第二步：修改其中js文件指定雪花的地址

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-4-1024x136.png)

第三步：编辑主题中的footer.php文件，添加以下代码引用效果

    <script type="text/javascript" src="<?php bloginfo('template_url');?>/snow/snow.js"></script>

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-3.png)

第四步：清清缓存！

效果可以看本页！

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-2.png)

sonw文件在这里下载：[点击下载](https://data.songtianlun.cn/website%20tools/wordpress-snow.zip)

在本页资源分享站中也可找到：[https://data.songtianlun.cn](https://data.songtianlun.cn)

差点忘记一个非常重要的事情，

参考文章： [wordpress 添加下雪特效](http://www.cyblogs.cn/archives/189)