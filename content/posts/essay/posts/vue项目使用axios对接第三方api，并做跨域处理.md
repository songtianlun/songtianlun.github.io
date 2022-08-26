---
title: "vue项目使用axios对接第三方api，并做跨域处理"
categories: [ "编程开发" ]
tags: [ "axios","vue","api" ]
draft: false
slug: "40"
date: "2019-03-17 17:51:00"
---



# 简介
使用vue框架对接第三方接口时，常常使用anxios。
>有很多时候你在构建应用时需要访问一个 API 并展示其数据。做这件事的方法有好几种，而使用基于 promise 的 HTTP 客户端 axios 则是其中非常流行的一种。
[vue官网描述](https://cn.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

# 基本步骤
### 安装anxios
```
npm install axios --save
```
### 配置
在 src/main.js 中如下声明使用
```
import axios from 'axios';
 
Vue.prototype.$axios=axios;
```
### 跨域处理
在 config/index.js 中的 的dev 添加以下代码，设置一下proxyTable
```
dev: {
 ...
    //加入以下
    proxyTable:{
      '/seniverseapi': {
        target : 'https://api.seniverse.com',    //设置你调用的接口域名和端口号.别忘了加http
        changeOrigin : true,   //允许跨域
        pathRewrite : {
          '^/seniverseapi': ''
          // '/'这里理解成用‘/seniverseapi’代替target里面的地址，后面组件中我们掉接口时直接用api代替。比如我要调用'https://api.seniverse.com/v3/weather/now.json?key=我的密钥&location=beijing&language=zh-Hans&unit=c'，直接写'/seniverseapi/v3/weather/now.json?key=我的密钥&location=beijing&language=zh-Hans&unit=c
'参数即可
        }
      }
    },
...
}
```
### api调用
```
axios
            .get(/seniverseapi/v3/weather/now.json?key=我的密钥&location=beijing&language=zh-Hans&unit=c
)
            .then(response => (console.log(response)))
            .catch(error => (console.log(error)))
```
效果图
![](http://photo-frytea.test.upcdn.net/20190317191503.png)