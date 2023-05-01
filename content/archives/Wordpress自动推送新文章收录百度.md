---
title: "Wordpress自动推送新文章收录百度"
categories: [ "技术" ]
tags: [ "wordpress" ]
draft: false
slug: "57"
date: "2019-01-11 23:14:00"
---



百度站长工具提供了很多种页面收录方式，在百度资源搜索平台提供了多种提交方式，比如自动提交，手动提交，以及sitemap。

百度资源搜索平台：[https://ziyuan.baidu.com/](https://ziyuan.baidu.com/)

在这里介绍两种方式，一种是使用代码的方式，一种是使用插件，不知道是否能成功，如果大家能在百度搜索到这篇文章，自然代表着成功啦！

先说第一种，代码！

在主题function.php文件中插入如下代码：

    //文章发布自动推送
    if(!function_exists('Baidu_Submit')){ 
      function Baidu_Submit($post_ID) { 
        $WEB_TOKEN = 'token值'; //这里请换成你的网站的百度主动推送的token值 
        $WEB_DOMAIN = get_option('home'); //已成功推送的文章不再推送 
        if(get_post_meta($post_ID,'Baidusubmit',true) == 1) return; 
        $url = get_permalink($post_ID); 
        $api = 'http://data.zz.baidu.com/urls?site='.$WEB_DOMAIN.'&token='.$WEB_TOKEN; 
        $request = new WP_Http; $result = $request->request( $api , array( 'method' => 'POST', 'body' => $url , 'headers' => 'Content-Type: text/plain') ); 
        $result = json_decode($result['body'],true); //如果推送成功则在文章新增自定义栏目Baidusubmit，值为1 
        if (array_key_exists('success',$result)) { add_post_meta($post_ID, 'Baidusubmit', 1, true); 
                                                 } } add_action('publish_post', 'Baidu_Submit', 0); 
    }

即可在文章发布后自动推送百度，在百度资源可以看到推送结果。

第二种，插件！

在wordpress插件搜索**BaiduXZH Submit**，安装即可！

声明

第一种方式来源页：[免插件实现WordPress主动推送文章到百度](http://www.zhutihome.com/8098.html)

第二种插件官网：[爱上极客](http://xzh.i3geek.com/)

希望能成功！