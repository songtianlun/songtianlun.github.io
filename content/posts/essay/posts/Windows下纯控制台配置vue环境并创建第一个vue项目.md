---
title: "Windows下纯控制台配置vue环境并创建第一个vue项目"
categories: [ "技术价值" ]
tags: [ "vue","windows" ]
draft: false
slug: "48"
date: "2019-03-01 09:50:00"
---


# 概述

本文叙述如何在windows环境下完全使用cmd控制台配置vue环境并使用控制台创建vue项目，最终使用webstorm运行。

# 环境配置

## 第一步:node.js安装

Vue项目通常通过webpack工具来构建，而webpack命令的执行是依赖node.js的环境的，所以首先要安装node.js。node.js的官方地址为：[https://nodejs.org/en/download/](https://link.jianshu.com/?t=https://nodejs.org/en/download/)，下载相应版本。

安装完毕之后，在命令行下验证是否安装成功：输入npm，显示如下就表示安装成功。

![](http://pnabaentf.bkt.clouddn.com//20190301094005.png)

## ~~第二步:cnpm的安装~~

~~安装完node之后，npm包含的很多依赖包是部署在国外的，在天朝，大家都知道下载速度是超级慢啊。所以我们要安装cnpm，cnpm是淘宝对npm的镜像服务器，这样依赖的包安装起来就快多了。~~
 ~~安装命令为：``npm install -g cnpm --registry=https://registry.npm.taobao.org``~~~~~~

> 最好还是科学上网，使用淘宝镜像会出现各种诡异的bug，特此忠告！

## 第三步:vue-cli的安装

vue-cli是vue官方提供的一个命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需一分钟即可启动带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。
 安装命令为：

`npm install -g vue-cli`

回车，等待安装。

安装完后，检查是否安装成功，输入vue，出现以下提示表示安装成功

![](http://pnabaentf.bkt.clouddn.com//20190301094223.png)

# 控制台新建vue项目

（1）新建一个项目文件夹，命名为 vue-demo，cd到此文件夹，输入:vue init webpack vue-demo，回车，按照如下操作进行初始化：

![](http://pnabaentf.bkt.clouddn.com//20190301094319.png)

我们暂时不适用模板提供的测试框架，Karma + Mocha，以及Nightwatch。
（2）项目目录

![](http://pnabaentf.bkt.clouddn.com//20190301094332.png)

（3）安装项目依赖的包
cd到vue-demo 文件夹，执行`cnpm install`，安装依赖包，安装完成之后，项目目录下多了node_modules：

![](http://pnabaentf.bkt.clouddn.com//20190301094352.png)

（4）运行项目
在命令行里输入 cnpm run dev，执行完成后启动项目，浏览器出现以下接结果，说明启动成功。注意浏览器的版本，低版本的不支持哦。

![](http://pnabaentf.bkt.clouddn.com//20190301094416.png)

# 在webstorm中打开项目

在webstorm中打开刚刚新建的项目

![](http://pnabaentf.bkt.clouddn.com//20190301094504.png)

按照下图指示打开npm

![](http://pnabaentf.bkt.clouddn.com//20190301094816.png)

package.json上右键

![](http://pnabaentf.bkt.clouddn.com//1551404928618.png)

打开npm

![](http://pnabaentf.bkt.clouddn.com//20190301094926.png)

双击dev，等待运行，成功即显示访问域名

![](http://pnabaentf.bkt.clouddn.com//20190301095001.png)

运行成功

# npm配置

## 修改仓库源

 开始：在cmd中输入 

``npm config ls``

出现npm的配置，你可以看到如下：

![](http://pnabaentf.bkt.clouddn.com//20190304110214.png)

其中metrics-registry是远程仓库源

prefix是储存npm下载的包和其他工具的本地仓库地址

 更换仓库源：

`**npm config set registry http://registry.npm.taobao.org/**`

这是淘宝的仓库源，淘宝仓库源和npm仓库源每10分钟同步一次，基本满足你的需求

 如果你觉得不满意，可以更换回npm官方仓库源:

`npm config set registry http://www.npmjs.org`


# 参考文档

* [npm 配置、换源、换储存库配置](https://blog.csdn.net/smalCat/article/details/79505441)
* [Vue入坑教程（二）——项目结构详情介绍](https://www.cnblogs.com/real-me/p/9198870.html)
* [vue-cli项目结构详解](https://blog.csdn.net/tanzhenyan/article/details/78871610)