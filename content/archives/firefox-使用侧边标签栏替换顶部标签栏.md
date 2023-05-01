---
title: "firefox 使用侧边标签栏替换顶部标签栏"
categories: [ "技术" ]
tags: [ "firefox" ]
draft: false
slug: "745"
date: "2023-03-01 21:13:35"
---

![](https://imagehost-cdn.frytea.com/images/2023/03/01/20230301094433c3dfd88e4540899f.png)

## 安装侧边插件 tab-tree

推荐安装使用 [Tree Style Tab](https://addons.mozilla.org/zh-CN/firefox/addon/tree-style-tab/) 插件实现侧边插件，其他插件也可自行探索。

## 配置自动隐藏顶栏

地址栏输入

`about:config —> toolkit.legacyUserProfileCustomizations.stylesheets —> true`

帮助—> 更多排障信息—> 配置文件夹—> 打开文件夹—> 新建 chrome 文件夹

把配置文件 userChrome.css 放置在 chrome 目录下

内容从[这里](https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/autohide_toolbox.css) 拷贝。

最后完全关闭 Firefox 重启即可。

## Reference

- [firefox 地址栏和标签栏怎么隐藏啊, 看难受](https://v2ex.com/t/873820)
- [如何隐藏火狐浏览器顶部标签栏](https://zhuanlan.zhihu.com/p/488501593)

