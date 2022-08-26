---
title: "Vue项目api加载json文件"
categories: [ "编程开发" ]
tags: [ "vue","json" ]
draft: false
slug: "44"
date: "2019-03-10 12:00:00"
---


# 概述
在vue项目开发过程中，免不了的要进行api接口的调用，当后端接口未搭建完成时，可以使用json文件模拟数据调用来搭建功能，同时有一些相关数据也是需要本地json文件支持，于是在这里介绍自己实战项目内嵌api接口调用本地数据json的方式
# 实现方法
## 第一步：将json放入项目目录

## 第二步：接口声明
在build/webpack.dev.conf.js文件里添加如下代码： 
```
const express = require('express')
const app = express()
var appData = require('../address.json')
var apiRoutes = express.Router()
app.use('/api', apiRoutes) 
 
// 在devServer对象里添加如下代码：
 
before(app) {
      app.get('/api/address', (req, res) => {
        res.json({
          errno: 0,
          data: appData
        })
      })
    }
```
![](http://pnabaentf.bkt.clouddn.com//20190310120605.png)
## 第三步：接口调用
#### 测试
这时候在浏览器输入 http://localhost:8080/api/address 便可看到json文件的数据了。
![](http://pnabaentf.bkt.clouddn.com//20190310120717.png)
#### axio调用
在组件里可以用axios或者其它方式请求获取数据，请求URL为：'/api/address'，例如用axios的话：

（1）、下载axios，如果没有的话
```
npm install --save axios vue-axios
```
（2）、在main.js里引入
```
import axios from 'axios'
Vue.prototype.$http = axios
```
（3）、开始请求
```
 this.$http.get('/api/address').then(response => {
      console.log(response)
 }, response => {
      console.log('数据加载失败')
 })
 ```
 ![](http://pnabaentf.bkt.clouddn.com//20190310130149.png)
# 参考文档
* [vue.js学习笔记(二)：如何加载本地json文件](https://www.cnblogs.com/momozjm/p/6271249.html)
* [Vue加载json文件](https://www.cnblogs.com/xsphehe/p/6938438.html)