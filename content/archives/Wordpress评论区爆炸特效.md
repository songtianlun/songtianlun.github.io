---
title: "Wordpress评论区爆炸特效"
categories: [ "技术" ]
tags: [ "wordpress" ]
draft: false
slug: "54"
date: "2019-01-15 10:26:00"
---



![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-30.png)

一直羡慕别人的博客输入有这样一个特效，想自己做一个，终于在这个博客找到了解决方案，于是尝试一下成功了！

[WordPress优化：给博客添加评论输入特效](https://www.macrr.com/comment-input-effects.html)

第一步：下载js代码，放入网站目录某文件夹下，我放在【/www/wwwroot/blog.songtianlun.cn/wp-content/themes/hestia/mouseclink】目录下

js文件：[下载](https://data.songtianlun.cn/website%20tools/wordpress/wordpress-%E8%AF%84%E8%AE%BA%E5%8C%BA%E8%BE%93%E5%85%A5%E7%88%86%E7%82%B8.zip)

第二步：在主题目录下footer.php文件中添加如下依赖

    <script src="https://blog.songtianlun.cn/wp-content/uploads/2018/10/WordpressCommentBomb/activate-power-mode.js"></script>  
    <script>  
    POWERMODE.colorful = true; // make power mode colorful  
    POWERMODE.shake = false; // turn off shake  
    document.body.addEventListener('input', POWERMODE);  
    </script> 

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-31-1024x457.png)

保存，测试一下，大功告成！