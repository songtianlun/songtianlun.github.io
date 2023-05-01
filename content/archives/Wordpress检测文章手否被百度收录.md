---
title: "Wordpress检测文章手否被百度收录"
categories: [ "技术" ]
tags: [ "wordpress" ]
draft: false
slug: "61"
date: "2019-01-11 22:38:00"
---



开通博客后就痴迷于让更多的人看到自己的博客，在百度搜索资源提交链接，又配置了文章自动提交百度的代码，还是想知道文章是否被百度收录，于是找到了下面这篇文章：

[WordPress百度是否已收录查询插件WP-Baidu-Record](http://www.1mayi.com/9655.html)

文章提供了一种方式，不需要安装插件就可以实现文章是否提交百度的检测及显示，一步搞定！

在主题function.php文件中插入如下代码即可:

    /*
    Plugin Name: Baidu-Accept
    Plugin URI: http://www.d4v.com.cn
    Description: 判断当前文章是否被百度收录，若没有被收录则可点击提交至百度，加速收录！(此插件在文章页面仅管理员可见) 
    Version: 1.0
    Author: Jovae
    Author URI: http://www.d4v.com.cn
    License: GPL
    */
    function d4v($url){
        $url='http://www.baidu.com/s?wd='.$url;
        $curl=curl_init();
        curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
        $rs=curl_exec($curl);
        curl_close($curl);
        if(!strpos($rs,'没有找到')){
            return 1;
        }else{
            return 0;
        }
    }
    add_filter( 'the_content',  'baidu_submit' );
    function baidu_submit( $content ) {
        if( is_single() && current_user_can( 'manage_options') )
            if(d4v(get_permalink()) == 1)
                $content="<p align=right>百度已收录(仅管理员可见)</p>".$content;
            else
                $content="<p align=right><b><a style=color:red target=_blank href=http://zhanzhang.baidu.com/sitesubmit/index?sitename=".get_permalink().">百度未收录!点击此处提交</a></b>(仅管理员可见)</p>".$content;
            return $content;
        }

之后就可以查看文章是否被收录了！

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-1-1024x315.png)

文章核心内容来源：[http://www.1mayi.com/9655.html](http://www.1mayi.com/9655.html)