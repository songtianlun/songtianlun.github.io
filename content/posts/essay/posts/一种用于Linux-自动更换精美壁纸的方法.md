---
title: "一种用于Linux 自动更换精美壁纸的方法"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "285"
date: "2019-12-26 13:13:00"
---

本文介绍一种使用脚本自动获取 `Unsplsh` 精美图片并设置为桌面的方法，最终效果为命令行使用一条指令达到上述效果。理论上说，本文原理可用于所有 `Gnome` 桌面环境的 `Linux` 发行版。

GNOME（/ɡˈnoʊm/或/ˈnoʊm/）是一个完全由自由软件组成的桌面环境。它的目标操作系统是Linux，但是大部分的BSD系统亦支持GNOME。 GNOME是由志愿贡献者和受雇贡献者组成的GNOME计划开发，其最大的公司贡献者为红帽公司。它是一个为开发软件框架、基于这些框架来开发客户端软件及协调软件翻译和开发无障碍软件的项目。 GNOME最初是GNU网络对象模型环境（GNU Network Object Model Environment）的缩写，但是已经被废弃了。是GNU计划的一部分，并且是由志愿者开发的。（Wikiedia）

第一步：获取 `Unsplash` 精美图片资源

使用形如 <https://source.unsplash.com/random> `url` 即可从 `unsplash` 获取到一幅随机精美图片。

你可以为其指定尺寸，形如 < https://source.unsplash.com/1600x900 >  或是  < https://source.unsplash.com/1920x1080 > 。

还可以为其指定关键词，形如 <https://source.unsplash.com/1600x900/?nature,water> 。

更多玩法见 [Unsplash API.](https://unsplash.com/developers)

第二步：将图片设置为桌面壁纸

使用形如如下命令可将制定图片设置为 `GNOME` 的壁纸，

```bash
gsettings set org.gnome.desktop.background picture-uri file:///tmp/wallpaper.jpg
```
第三步：形成脚本

```
#!/bin/bash
  
wget -O /tmp/wallpaper.jpg https://source.unsplash.com/1920x1080/?nature,water
gsettings set org.gnome.desktop.background picture-uri file:///tmp/wallpaper.jpg
```

脚本功能：从 `unsplash` 获取壁纸并设置为 `GNOME` 桌面壁纸，可以按照需求调整其中的关键词，这里获取的是 `1920*1080` 分辨率，关键词为 `nature,water` 的壁纸。

快速配置：

```bash
$ sudo vim /usr/bin/unsplash.sh
```

```bash
#!/bin/bash
  
wget -O /tmp/wallpaper.jpg https://source.unsplash.com/1920x1080/?nature,water
gsettings set org.gnome.desktop.background picture-uri file:///tmp/wallpaper.jpg
```

`:wq` 

```bash
$ chmod +x unsplash.sh
$ sudo mv unsplash.sh /usr/bin/unsplash
$ unsplash

--2019-12-26 13:23:36--  https://source.unsplash.com/1920x1080/?nature,water
正在连接 127.0.0.1:8118... 已连接。
已发出 Proxy 请求，正在等待回应... 302 Found
位置：https://images.unsplash.com/photo-1548645933-5858e004d3b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920 [跟随至新的 URL]
--2019-12-26 13:23:38--  https://images.unsplash.com/photo-1548645933-5858e004d3b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920
正在连接 127.0.0.1:8118... 已连接。
已发出 Proxy 请求，正在等待回应... 200 OK
长度： 157756 (154K) [image/jpeg]
正在保存至: “/tmp/wallpaper.jpg”

/tmp/wallpaper.jpg  100%[===================>] 154.06K   313KB/s    用时 0.5s  

2019-12-26 13:23:40 (313 KB/s) - 已保存 “/tmp/wallpaper.jpg” [157756/157756])
```

![2019-12-26-13-26-02-.png](https://imagehost-cdn.frytea.com/images/2019/12/26/2019-12-26-13-26-02-.png#shadow)

## 参考文献

 - [How To Set Random Wallpapers From Unsplash.com For Ubuntu](http://youness.net/linux/set-random-wallpapers-unsplash-com-ubuntu)
 - [Set Ubuntu desktop background from Unsplash](https://giustino.blog/set-ubuntu-desktop-background-from-unsplash)
 - [Unsplash Developers](https://unsplash.com/developers)
 - [WikiPedia/GNOME](https://zh.wikipedia.org/wiki/GNOME)