---
title: "BJ-PFD - PFD 使用指南"
date: 2022-09-10T20:40:02+08:00
description: ""
categories: ["BJ-PFD2"]
tags: ["BJ-PFD2"]
draft: false
cover:
    #image: "https://imagehost-cdn.frytea.com/images/2022/09/10/FBC9E170-AC72-44AA-8A17-4D21BCCC7AE21dda98e00bd9bc36.jpg" # image path/url
    alt: "cover" # alt text
    #caption: "My first" # display caption under cover
    relative: true # when using page bundles set this to true
    hidden: false # only hide on current single page
---

| BJ-PFD2 文档清单 |
| :--: |
| [BJ-PFD2 - 入口](https://bjpfd2.frytea.com/) |
| [BJ-PFD2 - 快速开始](/technology/bj-pfd2/overview/) |
| [BJ-PFD2 - BJ 使用方法](/technology/bj-pfd2/bj-tutor/) |
| [BJ-PFD2 - PFD 使用方法](/technology/bj-pfd2/pfd-tutor/) |


## 参数配置

如果没有配置，进入主页后所有图表数据为空，请先配置相关参数：

![](https://imagehost-cdn.frytea.com/images/2022/09/23/2022092300404362fd3fb2d0273d2d2.png)

按照下面的步骤配置各个参数：

###  Notion **Token**

> BJ-PFD 是基于 Notion 公开 API 实现的，因此要想让 BJ-PFD 读取您账本中的数据并可视化，需要配置 Token。

首先需要创建一个 integration ，**在您 BJ 模版所在的工作空间**，按照图示的顺序打开 integration 的管理面板。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.26.20a59e9295ed9227c3.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.26.20a59e9295ed9227c3.png)

点击最中间的 Create new integration 。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.29.346746050488b6912c.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.29.346746050488b6912c.png)

填写一下名称，点击 Submit 即可。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.30.213d41d39156036287.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.30.213d41d39156036287.png)

之后在这里将生成的 Token 拷出来，如果为隐藏状态，点击一下 Show。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.31.47-1c786a5b79b6f0f99.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.31.47-1c786a5b79b6f0f99.png)

这就获取到了 Notion Token，回去填到 BJ-PFD 对应表格中即可。

都这里还没完，该 integration 还没有权限访问您的 Bullet Journal，还需要给它一个权限。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.34.368c92d5a82e66a8f5.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.34.368c92d5a82e66a8f5.png)

再次回到您的 Bullet Journal 页面，点击右上角的 Share ，选择 Invite ，选中您刚刚创建的 integration 之后 invite即可，此时再点击 Share 可以看到您创建的 integration 就有了访问您 Bullet Journal 的权限。BJ-PFD就是通过这个来访问您的数据并可视化的。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.38.0847ccae4349ae0492.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.38.0847ccae4349ae0492.png)

到这里 Token 配置完毕。

> 若您配置完毕后发现无法读取数据，需检查您的 Token 是否配置正确：
>  - 该 Token 是否是在您 Bullet Journal 所在的工作空间生成？
>  - 该 Token 是否具有读取您 Bullet Journal 整个页面内容的权限？

如果您不确定哪一步出问题，请按照该部分文档再试一次。