---
title: "BJ-PFD - PFD 使用指南"
date: 2022-09-11T20:40:02+08:00
description: ""
categories: ["BJ-PFD"]
tags: ["BJ-PFD"]
draft: false
cover:
    #image: "https://imagehost-cdn.frytea.com/images/2022/09/10/FBC9E170-AC72-44AA-8A17-4D21BCCC7AE21dda98e00bd9bc36.jpg" # image path/url
    alt: "cover" # alt text
    #caption: "My first" # display caption under cover
    relative: true # when using page bundles set this to true
    hidden: false # only hide on current single page
---


## 注册登陆

打开 [BJ-PFD](https://bjpfd.frytea.com)，点击 **Get Started**。

如果您有账号可以直接登陆：

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-3.46.4990a4f7f6ae62fcbb.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-3.46.4990a4f7f6ae62fcbb.png)

如果没有账号，点击其中的 Sign Up：

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-3.47.46834d2ee3ea4180df.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-3.47.46834d2ee3ea4180df.png)

填入相关信息注册即可，成功后会自动跳转到工具首页。

:::danger
请记好您的密码，暂不提供密码修改和找回功能。
:::

## 参数配置

如果没有配置，进入主页后所有图表数据为空，请先配置相关参数：

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.23.36775843e90423d0b6.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.23.36775843e90423d0b6.png)

按照下面的步骤配置各个参数：

###  Notion **Token**

:::info
BJ-PFD 是基于 Notion 公开 API 实现的，因此要想让 BJ-PFD 读取您账本中的数据并可视化，需要配置 Token。
:::

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

:::tip
若您配置完毕后发现无法读取数据，需检查您的 Token 是否配置正确：
 - 该 Token 是否是在您 Bullet Journal 所在的工作空间生成？
 - 该 Token 是否具有读取您 Bullet Journal 整个页面内容的权限？

如果您不确定哪一步出问题，请按照该部分文档再试一次。

:::

### Notion *** ID

在这里以 Notion 「**BJPFD-账本-DB**」 ID 的配置为例。

首先回到您的 Bullet Journal 主界面，找到 **BJPFD-账本-DB** 这个项目，右键拷贝链接。

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.39.457642aadd88886a36.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.39.457642aadd88886a36.png)

:::tip
在主界面选中可以，也可以在左侧快速导航中拷贝。
:::

拷出来的链接可以放在任意一个文本编辑框中，其结构大概是这样：

```jsx
https://www.notion.so/xxxxxxxxxxxxxxxxxxx?v=yyyyyyyyyyyyyyyyyy
```

您需要拷贝其中 `xxxxxxxxxxxxxxxxxxx` 的部分，这就是该数据库的 ID 了，将它拷入 BJ-PFD 中 Notion 「**BJPFD-账本-DB**」 ID 中即可。

剩下的 Notion 「**BJPFD-账户-DB**」 ID、Notion 「**BJPFD-投资账本-DB**」 ID、Notion 「**BJPFD-投资账户-DB**」 ID、Notion 「**BJPFD-预算-DB**」 ID 按照类似的方法配置即可，全部配置完毕后点击 Save。窗口会自动刷新，从您配置的 Notion 数据库中获取数据。

如果一切顺利，待加载完毕，就可以看到数据啦！

![https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.46.4589553b3ba17f16e4.png](https://imagehost-cdn.frytea.com/images/2021/09/11/2021-09-11-4.46.4589553b3ba17f16e4.png)

:::info
如果您发现配置完毕后数据异常，请按照参数配置部分的内容检查您的各项参数配置是否正确。
:::