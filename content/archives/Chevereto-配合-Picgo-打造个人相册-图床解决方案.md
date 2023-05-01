---
title: "Chevereto 配合 Picgo 打造个人相册/图床解决方案"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "459"
date: "2020-10-05 08:54:00"
---

[Chevereto](https://chevereto.com/) 是一款很好用**图床工具**，可以实现一键上传、一键 `Markdown` 引用等功能，最近发现还可以和 [Picgo](https://molunerfinn.com/PicGo/) 配合起来使用，打造更加方便实用个人图床。

Picgo 是**一个用于快速上传图片并获取图片 URL 链接的工具**，支持全桌面客户端，应该是目前本人用过最好用的图床链接工具了。

今天主要介绍**如何使用Chevereto + Picgo 实现一键上传图片到特定用户、相册中**。

---

至于 [Chevereto](https://chevereto.com/) 的安装和 [Picgo](https://molunerfinn.com/PicGo/) 的安装，网上教程很多，不再赘述，在这里给出一些参考链接，自取：

- Chevereto 官网：[https://chevereto.com/](https://chevereto.com/)
- Chevereto DEMO：[https://demo.chevereto.com/](https://demo.chevereto.com/)
- Picgo 官网：[https://molunerfinn.com/PicGo/](https://molunerfinn.com/PicGo/)
- Chevereto 安装教程：[https://www.moerats.com/archives/390/](https://www.moerats.com/archives/390/)

---

在Picgo上实现api上传的工具很多，如 `chevereto` 、 `web-uploader`  等。

![https://imagehost-cdn.frytea.com/images/2020/10/05/202010050845595bff58306dff0429.png](https://imagehost-cdn.frytea.com/images/2020/10/05/202010050845595bff58306dff0429.png)

但Chevereto默认的api会将图片上传到访客目录下，不支持自定义。因此在这里通过修改源代码的方式实现上传图片到特定用户的特定目录下。

在 `Chevereto` 安装目录下找到这个文件：

```bash
app/routes/overrides/route.api.php
```

> 注：若不存在，请从上一级目录中拷贝一个 `route.api.php` 至该目录下。

按照如下方式修改该文件：

```php
- $uploaded_id = CHV\Image::uploadToWebsite($source);
+ // $uploaded_id = CHV\Image::uploadToWebsite($source); 
+ $uploaded_id = CHV\Image::uploadToWebsite($source, 'testuser', array('album_id'=>3));
```

其中， `testuser` 和后面的相册 `id` ，为最终 `api` 上传图片所在用户的相册下，您可以根据自己的需求设定。之后重载 `PHP` 即可。

## 参考文献

- 一款强大好用的图床程序：chevereto安装教程：[https://www.moerats.com/archives/390/](https://www.moerats.com/archives/390/)
- PicGo2.3.0-beta.3 图片上传+管理新体验：[https://molunerfinn.com/PicGo/](https://molunerfinn.com/PicGo/)
- 听说你也想用PicGo：[https://picgo.github.io/PicGo-Doc/zh/guide/#听说你也想用picgo](https://picgo.github.io/PicGo-Doc/zh/guide/#%E5%90%AC%E8%AF%B4%E4%BD%A0%E4%B9%9F%E6%83%B3%E7%94%A8picgo)
- 修改Chevereto的API上传相册和用户：[https://blog.csdn.net/qq_19564393/article/details/108506062](https://blog.csdn.net/qq_19564393/article/details/108506062)