---
title: "私人网盘搭建之centos下安装cloudreve"
categories: [ "编程开发" ]
tags: [ "cloudreve","centos" ]
draft: false
slug: "29"
date: "2019-03-15 13:10:00"
---


# 简介
cloudreve是基于ThinkPHP构建的网盘系统，能够助您以较低成本快速搭建起公私兼备的网盘。
[主页](https://cloudreve.org/) | [论坛](https://forum.cloudreve.org/) | [演示站](https://drive.aoaoao.me/) | [QQ群](https://jq.qq.com/?_wv=1027&k=5TX6sJY)
![](http://pnabaentf.bkt.clouddn.com//20190315140056.png)
支持的存储介质
![](http://pnabaentf.bkt.clouddn.com//20190315140113.png)
# 安装步骤
## 第一步：官网下载安装包
[官网地址下载地址](https://cloudreve.org/download.php)
![](http://pnabaentf.bkt.clouddn.com//20190315135200.png)
## 第二步：解压到网页根目录
![](http://pnabaentf.bkt.clouddn.com//20190315135258.png)
## 第三步：配置伪静态
以下为针对nginx的代码
```
location / { if (!-e $request_filename) { rewrite ^(.*)$ /index.php?s=/$1
last; break; } }
```
![](http://pnabaentf.bkt.clouddn.com//20190315135710.png)
## 第四步：访问页面
```
https://cloud.songtianlun.cn/CloudreveInstaller/
注：cloud.songtianlun.cn是我的域名，自行替换自己的域名

```
![](http://pnabaentf.bkt.clouddn.com//20190315135427.png)
## 第五步：配置参数
点击下一步，在其中填写自己的数据库信息
![](http://pnabaentf.bkt.clouddn.com//20190315135522.png)
点击开始安装
## 第六步：安装完成
根据提示的信息即可登陆后台，之后按照自己的需求配置即可！
![](http://pnabaentf.bkt.clouddn.com//20190315135849.png)
# 参考文献
 * [自建云盘系列——Cloudreve(树洞外链作者的又一力作)](http://www.senra.me/build-your-own-cloud-storage-series-cloudreve-another-production-of-shudong-share-author/) 
 * [GitHub：HFO4/Cloudreve，安装说明](https://github.com/HFO4/Cloudreve/wiki/%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E)
 * [CentOS 7下安装Composer + Laravel](https://www.cnblogs.com/zouzhe0/p/7146706.html)
![](http://pnabaentf.bkt.clouddn.com//20190315131646.png)

## 使用composer安装cloudreve

# 参考文献
 * [自建云盘系列——Cloudreve(树洞外链作者的又一力作)](http://www.senra.me/build-your-own-cloud-storage-series-cloudreve-another-production-of-shudong-share-author/) 
 * [GitHub：HFO4/Cloudreve，安装说明](https://github.com/HFO4/Cloudreve/wiki/%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E)
 * [CentOS 7下安装Composer + Laravel](https://www.cnblogs.com/zouzhe0/p/7146706.html)
 * [安装 Cloudreve（图文教程）](https://blog.oioweb.cn/index.php/archives/153.html)