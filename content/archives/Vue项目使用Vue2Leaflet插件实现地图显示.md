---
title: "Vue项目使用Vue2Leaflet插件实现地图显示"
categories: [ "技术" ]
tags: [ "vue","leaflet" ]
draft: false
slug: "43"
date: "2019-03-03 18:47:00"
---


# 简介

vue是一个渐进式javascript框架，用来快速构建网页项目，在vue框架之上结构化leaflet地图库的产物vue2leaflet可以在vue项目中很方便的加载地图，下面简单介绍一个vue2leaflet加载地图的过程。

# 第一个地图显示页面

## 第一步：新建vue项目

![](http://pnabaentf.bkt.clouddn.com//20190303185210.png)

## 第二步：安装Vue2Leaflet

在项目目录下运行如下代码

`npm i vue2-leaflet -S`

实测项目还需安装leaflet

`npm install --save leaflet`

## 第三步： 新建VueLeaflet.vue

在components文件夹中新建vue文件`VueLeaflet.vue`

在template标签下增加如下内容，显示地图，并增加一个marker

```
<div class="vue-leaflet">
    <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map>

  </div>
```



在script标签，name之下增加如下内容

```
data () {
    return {

    }
  }
```

## 第三步：修改路由

修改index.js，将helloworld修改为vueleaflet

![](http://pnabaentf.bkt.clouddn.com//20190303185810.png)

## 第四步：引入组件

在vueleaflet.vue的script标签下增加如下内容（注意合并部分）

```
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import L from 'leaflet'
export default {
  name: 'VueLeaflet.vue',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> Haut-Gis-Org',
      marker: L.latLng(47.413220, -1.219482),
      text: 'this is a marker'
    }
  }
}
```

## 第五步：引入css

在main.js中添加

```
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
```

## 第六步：修改icon路径

在main.js中添加如下代码

```
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
```

# 效果展示

![](http://pnabaentf.bkt.clouddn.com//20190303190453.png)

# 项目地址

完成这个项目花费了一些精力，故将项目源码分享在了github上

[GitHub](https://github.com/haut-gis-org/vue_vue2leaflet)
