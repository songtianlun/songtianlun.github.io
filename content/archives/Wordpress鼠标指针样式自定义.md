---
title: "Wordpress鼠标指针样式自定义"
categories: [ "技术" ]
tags: [ "wordpress" ]
draft: false
slug: "53"
date: "2019-01-12 00:55:00"
---


继续折腾自己的博客！

今天要做的事自定义鼠标样式！需要做的是增加css样式！

第一步：选择鼠标样式，最好是两个状态，正常和链接，即普通的箭头和小手

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-9.png)

第二步：将样式的cur文件上传至服务器

第三步：进入后台→主题→自定义→额外css

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-8.png)

第四步：在输入框输入如下代码

    
    /** 鼠标样式 开始**/ 
    /** 普通指针样式**/ 
    body {
    cursor: url(https://blog.songtianlun.cn/wp-content/themes/hestia/mouseclink/normal.cur), default;
    }
     
    /** 链接指针样式**/ 
    a:hover{cursor:url(https://blog.songtianlun.cn/wp-content/themes/hestia/mouseclink/link.cur), pointer;}
     
    /** 鼠标样式 结束**/

注：根据自己的实际情况修改其中的链接部分，我使用的鼠标样式可以从中获取

第五步：发布，就可以看到效果啦！

本文参考文章：[wordpress指针样式自定义——美化你的blog](https://www.qcgzxw.cn/1385.html)

更多鼠标样式下载：[鼠标样式](https://data.songtianlun.cn/website%20tools/mouse%20style.zip)