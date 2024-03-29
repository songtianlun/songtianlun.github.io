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


本节介绍 BJ-PFD 中个人看板（PFD）的使用方法，使用前请确保您已将 Bullet Journel 克隆到您个人的 Notion 中。

##  Step1: 获取 Notion **Token**

> BJ-PFD 是基于 Notion 公开 API 实现的，因此要想让 BJ-PFD 读取您账本中的数据并可视化，需要配置 Token。

首先需要创建一个 integration ，**在您 BJ 模版所在的工作空间**，按照图示的顺序打开 integration 的管理面板。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.26.20a59e9295ed9227c3.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.26.20a59e9295ed9227c3.png)

点击最中间的 Create new integration 。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.29.346746050488b6912c.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.29.346746050488b6912c.png)

填写名称，选择正确的工作空间，具体如图，点击 Submit 即可。

![](https://imagehost-cdn.frytea.com/images/2022/09/23/2022092300563037434d2865b7e5ec1.png)

之后在这里将生成的 Token 拷出来，如果为隐藏状态，点击一下 Show。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.31.47-1c786a5b79b6f0f99.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.31.47-1c786a5b79b6f0f99.png)

这就获取到了 Notion Token。

都这里还没完，该 integration 还没有权限访问您的 Bullet Journal，还需要给它一个权限。

![](https://imagehost-cdn.frytea.com/images/2022/09/23/2022092300533740dd320ef4b4ea6fd.png)

回到您的 Bullet Journal 页面，点击右上角 ，选择 Add connections ，选中您刚刚创建的 integration 确认即可。

至此，Notion Token 配置完毕。

> 若您配置完毕后发现无法读取数据，需检查您的 Token 是否配置正确：
>  - 该 Token 是否具有您 Bullet Journal 所在的工作空间的读权限
>  - 该 Token 是否连接到您 Bullet Journal 所在页面

## Step2: 查看报告

打开工具链接：https://bjpfd2.frytea.com/login

![](https://imagehost-cdn.frytea.com/images/2022/09/23/2022092300404362fd3fb2d0273d2d2.png)

输入您在第一步获取的 notion token 即可。

> Bj-PFD2 会根据 DB 名称自动获取对应数据库，因此**切勿修改 DB 名称**。

![](https://imagehost-cdn.frytea.com/images/2022/09/23/202209230050967482992a97998816a.png)

至此，使用方法介绍完毕。

如果报错，**请检查您的 notion token 是否正确，并赋予了足够的权限**。