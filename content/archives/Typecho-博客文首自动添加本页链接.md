---
title: "Typecho 博客文首自动添加本页链接"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "535"
date: "2021-06-09 09:25:00"
---

自己的博客不觉间已经上线两年多了，随着内容和浏览量的增加，我的博客开始被一些搬运站盯上，常常搜索自己博客内容却在其他人博客里找到完全一样的内容，关键是还不署名！

![https://imagehost-cdn.frytea.com/images/2021/06/09/20210609092801367a020d9b6ee926.png](https://imagehost-cdn.frytea.com/images/2021/06/09/20210609092801367a020d9b6ee926.png)

为了防止这种脑残爬虫党，我会在博客文首新增 “本文首发于： “ 字样，后面跟上本页地址链接，这样及时博客被爬虫爬取，也会保留本文原始链接，需要的人可以通过这个链接找到我的源站。但是一篇一篇手动加起来太累了，就想了一种很简单的自动添加的方法。

![https://imagehost-cdn.frytea.com/images/2021/06/09/20210609092900ae858a6c62a85958.png](https://imagehost-cdn.frytea.com/images/2021/06/09/20210609092900ae858a6c62a85958.png)

## 方法介绍

原理大概就是在文章页首部 新增一个 `<p></p>` 的标签，使用 js 代码获取当前页 url，自动插入。

> 注：以下的修改可以直接在您的主题文件夹中的 `post.php` 文件下修改，实际位置依据主题不同而不同，需反复调试。我使用的 Mirages 主题只需要在主题配置中写入以下内容即可。

![https://imagehost-cdn.frytea.com/images/2021/06/09/20210609093021a65cfabc9f68f460.png](https://imagehost-cdn.frytea.com/images/2021/06/09/20210609093021a65cfabc9f68f460.png)

首先在文首新增下面的标签：

```c
<p id="this_url">本文首发于: <a href="<https://blog.frytea.com>"><https://blog.frytea.com></a></p>
```

之后在 `<body>` 结束前新增以下标签：

```c
<script>
var url= window.location.href;
var url_html="本文首发于: <a href=\\"" + url + "\\">" + url + "</a>";
document.getElementById("this_url").innerHTML = url_html;
</script>
```

这样一来，每一篇文章渲染时都会获取到当前页链接，自动插入文首啦，就像本文一样！

## 参考文献

* [JS 获取页面 URL 信息小总结](https://www.jianshu.com/p/073f79c5e438)
* [HTML JavaScript](https://www.w3school.com.cn/html/html_script.asp)
* [单引号、双引号在 javascript、HTML 中的转义字符](https://blog.csdn.net/qq_27361945/article/details/79127684)
