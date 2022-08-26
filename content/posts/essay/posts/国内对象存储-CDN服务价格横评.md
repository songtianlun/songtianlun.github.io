---
title: "国内对象存储/CDN服务价格横评"
categories: [ "技术价值" ]
tags: [ "CDN" ]
draft: false
slug: "614"
date: "2021-12-30 20:11:59"
---

话不多说，直接上表格。

## 价格表(国内HTTPS价格)

| 名称 | 存储免费额度(GB) | 存储费用(元 / GB / 日) | 流量免费额度 | 流量费用(元/GB) | CDN流量费用 |
| --- | --- | --- | --- | --- | --- |
| 多吉云 | 10 | 0.003 | 20 | 0.11 | 0.11 |
| 七牛云 | 10 | 0.098-0.145 | \ | 0.29 | 0.28 |
| 腾讯云 | \ | 0.099-0.118 | \ | 0.5 | 0.21 |
| 阿里云 | \ | 0.12 | \ | 0.25-0.5 | 0.24 |
| 又拍云 | \ | 0.0043 | \ | 0.5 | 0.29 |
| 百度智能云 | \ | 0.119-0.15 | \ | 0.25-0.49 | 0.20 |

> 注：价格整理于2021年12月30日；存储指对象存储，流量指对象存储公网流出流量。
> 

## 分析说明

由于本人使用过国内各种主流云厂商云存储、CDN服务，目前稳定存储2G左右，每日流量1G左右，使用过各家。知道最近发现多吉云也推出了自家云存储服务，虽然是阿里云、腾讯云包了一层，但费用便宜很多，应该是走量优惠比较大。

后来我就把自己网站的对象存储和CDN都迁移到多吉云了，目前使用起来感觉良好。

还记得上次过年期间，使用的七牛云存储出了点问题，提工单半天没解决，非说是我解析有问题。后来自愈了，对七牛云的印象就没有多好了，因此这次果断迁移到多吉云。

经过这次迁移，发现各家云存储费用差异还比较大，顺便整理，方便各位有需要的客官挑选。

## 参考文献

- [产品价格 By DogeCloud](https://www.dogecloud.com/price?product=oss)
- [产品计费By DogeCloud](https://docs.dogecloud.com/oss/manual-billing)
- [计量项与计费项 By 七牛云](https://developer.qiniu.com/kodo/6379/metering-and-billing)
- [定价 ｜ 对象存储 By 腾讯云](https://buy.cloud.tencent.com/price/cos)
- [腾讯云 CDN 定价](https://cloud.tencent.com/product/cdn/pricing)
- [对象存储 OSS 详细价格信息 By 阿里云](https://www.aliyun.com/price/product?spm=5176.7933691.J_5253785160.4.6ad44c59Sqp56A#/oss/detail/ossbag)
- [CDN详细价格信息 By 阿里云](https://www.aliyun.com/price/product?spm=5176.7933691.J_5253785160.4.6ad44c59Sqp56A#/cdn/detail/cdn)
- [BOS **按需计费方式 By 百度智能云**](https://cloud.baidu.com/doc/BOS/s/Ok1rmtaow)
- [CDN **按使用流量计费 By 百度智能云**](https://cloud.baidu.com/doc/CDN/s/hjwvyfjc2)