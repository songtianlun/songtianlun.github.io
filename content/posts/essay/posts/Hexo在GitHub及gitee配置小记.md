---
title: "Hexo在GitHub及gitee配置小记"
categories: [ "编程开发" ]
tags: [ "hexo" ]
draft: false
slug: "56"
date: "2019-02-22 15:51:00"
---


## 问题小记
* hexo d操作后将源代码上传而不是上传静态网页
解决方案是设置git账户，
```
$ git config --global user.name "liuxianan"// 你的github用户名，非昵称
$ git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
```
>猜测还有可能是因为cloud studio的不稳定性

## 成果


*   [location](https://hexo.frytea.com)
*   [GitHub](https://Songtianlun.github.io)
*   [Gitee](https://Songtianlun.gitee.io)
*   [GitHub Repository](https://github.com/songtianlun/songtianlun.github.io)
*   [Gitee Repository](https://gitee.com/songtianlun/songtianlun)

## 参考文献

*   [EasyHexo](https://easyhexo.com)
*   [valine](https://valine.js.org)
*   [绝配：hexo+next主题及我走过的坑](https://www.jianshu.com/p/21c94eb7bcd1)
*   [我的个人博客之旅：从jekyll到hexo](https://blog.csdn.net/u011475210/article/details/79023429)
*   [svn 国内码云与国际Github的项目同步](https://blog.csdn.net/csnd_ayo/article/details/72681884)
*   [码云Pages](https://m.gitee.com/help/articles/4136)
*   [使用hexo+github搭建免费个人博客详细教程](https://www.cnblogs.com/liuxianan/p/build-blog-website-by-hexo-github.html)
*   [为自定义域名的GitHub Pages添加SSL 完整方案](https://segmentfault.com/a/1190000007740693)
*   [个人博客搭建 github page绑定域名、https跳转](https://www.jianshu.com/p/8d50ff70b3d9)
×   [解决hexo渲染的页面中有br的问题](http://1900.live/rep-hexo-marked/)
*   [全自动部署hexo](https://www.jianshu.com/p/a42fb0590367)