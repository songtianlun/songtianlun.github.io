---
title: "Vue项目使用leaflet+heatmap.js加载热力图"
categories: [ "编程开发" ]
tags: [ "vue","leaflet" ]
draft: false
slug: "41"
date: "2019-03-09 00:29:00"
---


# 概述

最近做数字工程实践涉及到大量的地图操作，刚开始跳过依赖于supermap iclient for JavaScript，但是越做深入越发现局限性太大，于是开始考虑使用开源地图库做各项操作，本文记录在vue项目中引入原生leaflet及heatmap打开地图及显示热力图的各项操作。

# 各项操作

## leaflet打开地图

#### 第一步：下载leaflet

[Leaflet官网](https://leafletjs.com/)下载即可

![](http://pnabaentf.bkt.clouddn.com//20190309001228.png)

#### 第二步：vue引入leaflet

新建vue项目不在叙述，将leaflet库解压后拷入项目目录

![](http://pnabaentf.bkt.clouddn.com//20190309001336.png)

使用vendor方式引入leaflet库，不会编译js文件

找到webpack.base.conf.js文件，在其中的module.exports中，找到entry，在其中找到或新建vendor，引入即可

![](http://pnabaentf.bkt.clouddn.com//20190309001543.png)

#### 第三步：打开第一幅地图

在vue文件中操作

template标签下增加如下代码

```
template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>
```

style中引入css

```
<style scoped>
  @import "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css";
</style>
```



script文件中引入L

```
import L from 'leaflet'
```

![](http://pnabaentf.bkt.clouddn.com//20190309001732.png)

新建地图容器

```
let map = L.map('map', {
          center: [39.9788, 116.30226],
          zoom: 14
        })
        
```

打开openstreetmap

```
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Haut-Gis-Org © OpenStreetMap'
        }).addTo(this.map)
```

## heatmap渲染热力图

#### 第一步：npm方式引入headmap.js

```
npm install heatmap.js
```

#### 第二步：引入leaflet中使用的函数

```
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap'
```

#### 第四步：配置

```
// 配置
        var cfg = {
          'radius': 2,
          'maxOpacity': 0.8,
          'scaleRadius': true,
          'useLocalExtrema': true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'count'
        }
```

#### 第五步：模拟数据

```
// 数据
        var testData = {
          max: 8,
          data: [{ lat: 24.6408, lng: 46.7728, count: 3 },
            { lat: 50.75, lng: -1.55, count: 1 },
            { lat: 51.55, lng: -1.55, count: 9 },
            { lat: 52.65, lng: -1.45, count: 8 },
            { lat: 53.45, lng: -1.35, count: 7 },
            { lat: 54.35, lng: -1.25, count: 6 },
            { lat: 5.25, lng: -1.15, count: 5 }
          ]
        }
```

#### 第六步：叠加图层

```
this.heatmapLayer = new HeatmapOverlay(cfg)
        // 图层
        let baseLayer = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Haut-Gis-Org © OpenStreetMap'
          }
        )
        
        this.heatmapLayer.addTo(map)
        this.heatmapLayer.setData(testData)
```

#### 效果图

![](http://pnabaentf.bkt.clouddn.com//20190309002801.png)

## 参考代码

```
<template>

  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
  import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap'
  import L from 'leaflet'

  export default {
    name: 'gis-population-density',
    data () {
      return {
        heatmapLayer: null,
        map: null
      }
    },
    mounted () {
      // 引用heatmap.js
      // let script = document.createElement('script')
      // script.type = 'text/javascript'
      // script.src =
      // 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js'
      // document.body.appendChild(script)
      this.initmap()
    },
    methods: {
      initmap: function () {
        // this.map = L.map('map', {
        //   center: [39.9788, 116.30226],
        //   zoom: 14
        // })
        //
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //   attribution: 'Haut-Gis-Org © OpenStreetMap'
        // }).addTo(this.map)

        // 数据
        var testData = {
          max: 8,
          data: [{ lat: 24.6408, lng: 46.7728, count: 3 },
            { lat: 50.75, lng: -1.55, count: 1 },
            { lat: 51.55, lng: -1.55, count: 9 },
            { lat: 52.65, lng: -1.45, count: 8 },
            { lat: 53.45, lng: -1.35, count: 7 },
            { lat: 54.35, lng: -1.25, count: 6 },
            { lat: 5.25, lng: -1.15, count: 5 }
          ]
        }
        // 配置
        var cfg = {
          'radius': 2,
          'maxOpacity': 0.8,
          'scaleRadius': true,
          'useLocalExtrema': true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'count'
        }
        this.heatmapLayer = new HeatmapOverlay(cfg)
        // 图层
        let baseLayer = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Haut-Gis-Org © OpenStreetMap'
          }
        )
        this.map = L.map('map', {
          center: [25.6586, -80.3568],
          zoom: 4
        })
        baseLayer.addTo(this.map)
        this.heatmapLayer.addTo(this.map)
        this.heatmapLayer.setData(testData)

        L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.map)

        let baseLayers = {
          'heatmapLayer': this.heatmapLayer,
          'OpenStreetMap': baseLayer
        }
        // let overlays = {
        //   'Marker': null,
        //   'Roads': null
        // }
        L.control.layers(baseLayers).addTo(this.map)
      }
    }
  }
</script>

<style scoped>
  @import "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css";
</style>

```

# 常用插件
* [leaflet.ChineseTmsProviders](https://github.com/htoooth/Leaflet.ChineseTmsProviders)-加载各种国内地图
```
npm安装指令
npm i leaflet.chinatmsproviders
```
* [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
```
npm安装指令
npm install leaflet.markercluster
```
* [heatmap.js](https://github.com/pa7/heatmap.js)
```
npm安装指令
npm install heatmap.js
```

# 参考文档

* [Leaflet官网](https://leafletjs.com)
* [【Leaflet·1】从加载出第一幅地图开始](https://blog.csdn.net/kengqiangxia/article/details/77878846)
* [Leaflet学习之路三——地图控件](https://blog.csdn.net/xtfge0915/article/details/80272549)
* [leaflet常用插件地址整理](https://blog.csdn.net/yangdengxian/article/details/79954827)
* [LeaFlet学习之热力图](https://blog.csdn.net/weixin_40184249/article/details/81262137)
* [heatmap.js官网](https://www.patrick-wied.at/static/heatmapjs/)
* [Leaflet调用谷歌地图、天地图、智图地图、高德题图一键搞定](https://blog.csdn.net/GISuuser/article/details/77600052)