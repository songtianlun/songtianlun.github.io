---
title: "Minecraft 从安装到入门"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "325"
date: "2020-04-02 10:47:00"
---

> 近期才入坑 Minecraft ，自建了服务器，写了一篇文章记录服务器配置过程：[适当愉悦，自建 Minecraft 服务器](https://blog.frytea.com/archives/322/)。 高深的东西咱也不懂，就感觉一群朋友在一起创造自己的世界挺有意思的，撰文目的在于指导像我一样的从未接触过 Minecraft 的新手进入 Minecraft 的世界，并会持续更新一些小技巧。

以下网站可以找到一些参考资料：

- [我的世界中文论坛](https://www.mcbbs.net/portal.php)
- [我的世界中文分享站](https://www.secretmine.net/)

## 安装 Minecraft 启动器 MultiMC

> MultiMC 是一个免费, 开源的Minecraft启动器. 它最大的特点便是允许用户定义自己的整合包(在MMC中这个概念为 instances) 并且可以方便的管理他们。MultMC 支持 mac/linux/windows 桌面环境，在 MultMC 中，您可以很方便的管理多个 Minecraft 实例，可以方便的加载各种 mod 和资源，是 Fabric 官方推荐的 Minecraft 启动器。

在这里简单介绍 MultMC 的安装方法：

第一步，下载 MultMC 安装包

您可以选择去 [官网](https://multimc.org/)或是其他途径，您也可以来本站资源站下载，国内速度很赞哟！

- [MultMC 官网](https://multimc.org)
- [本站资源站/MultMC-win](https://res.frytea.com/Application/Windows/mmc-stable-win32.zip)

下载完成后安装即可。

第二步，安装java运行环境（已安装请跳过）

 MultMc 运行须依赖 Java 运行环境，仅是运行安装 java-jre即可，您可以在 Java官网下载 Java jre，或是在本站资源站下载。

- [Java官网](https://www.java.com/zh_CN/)
- [本站资源站/Java-jre-win64](https://res.frytea.com/Application/Windows/jre-8u221-windows-x64.exe)

下载完成后安装即可。

第三步，添加账号

您需要拥有一个拥有 Minecraft 正版授权的 Minecraft 账号，以授权启动 Minecraft 实例。如果您没有账号，有三种方案可供选择，自行评鉴利弊。

- 淘宝现成账号 8rmb +-
- 淘宝授权账号 50rmb +-
- Minecraft 购买 165 RMB (推荐支持正版)

![image33188a1a71236726.png](https://imagehost-cdn.frytea.com/images/2020/04/02/image33188a1a71236726.png)

拥有了帐号之后，在 MultMC 中右上角添加您的账号。

![image3f661c938a0312af.png](https://imagehost-cdn.frytea.com/images/2020/04/02/image3f661c938a0312af.png)

第四步，新建实例。

有了正版授权，接下来就可以运行 Minecraft 啦。

在 MultMC 左上角添加实例，选择您需要的版本，新建即可，之后双击运行。

第五步，开始创造吧！

运行之后，可以选择单人游戏或是多人游戏。

单人游戏的数据存储在本地，而多人游戏需要 Minecraft 服务器支持，您可以自建 Minecraft 或是 Google 关键词 minecraft server list 寻找您感兴趣的 Minecraft 服务器。自建服务器就可以跟你的好友们一起创造自己的世界啦！

## Minecraft 服务器地址

> 此处不断更新，记录自己感兴趣的服务器，如果您有有意思的服务器愿意分享给我也请与我联系，感激不尽！

- Potter World: <play.potterworldmc.com>
  - homepage: https://potterworldmc.com/
  - server address: play.potterworldmc.com
  - enable the Server Resource Packs
  - Minecraft Java Edition - 1.10-1.13.

## Minecraft mods

### 安装教程

想要加载 mod 您需要先安装 Fabric，步骤如下。

第一步，安装 Fabric API

在 MultMC 中右键实例，选择编辑实例。

![imagefec1fb69ee101fe2.png](https://imagehost-cdn.frytea.com/images/2020/04/02/imagefec1fb69ee101fe2.png)

在 **版本** 中选择 **安装 Fabric**

> 如果按钮是灰色，也许是因为实例当前是开启状态，您需要关闭实例。

第二步， 将您的 mods 拷入实例 mods 文件夹，就可以使用啦。

![image359aeacab23be4b6.png](https://imagehost-cdn.frytea.com/images/2020/04/02/image359aeacab23be4b6.png)

### Minecraft mods - VoxelMap 小地图

- mods 官网传送门: <https://www.curseforge.com/minecraft/mc-mods/voxelmap>

您可以在官网下载 Fabric 版的 jar 文件，放入 安装教程中提到的 mods 文件夹中即可使用，根据实测，您还需要加载一个 `fabric-resource-loader-v0-` 资源才可以使用 VoxelMap。

> 快速开始
> 1、下载这两个文件 [fabric-resource-loader-v0-0.1.0+f1618918.jar](https://res.frytea.com/Application/Java/Minecraft/fabric-resource-loader-v0-0.1.0%2Bf1618918.jar)， [fabricmod_VoxelMap-1.9.16_for_1.14.4.jar](https://res.frytea.com/Application/Java/Minecraft/fabricmod_VoxelMap-1.9.16_for_1.14.4.jar)，
> 2、加载资源，启动实例即可。

![image8a8ecc4d83c2cb2c.png](https://imagehost-cdn.frytea.com/images/2020/04/02/image8a8ecc4d83c2cb2c.png)

从提示信息中可以看到一些快捷键的信息：

- Z：放大/缩小地图；
- M：选项；
- X：切换大地图；
- N：快速添加一个路径点

### OptiFine 光影 mods

OptiFine 在MultMC上直接安装无法使用，这里介绍安装方法。

第一步，下载这两个jar文件（注意对应Minecraft版本）

- https://optifine.net/downloads
- https://www.curseforge.com/minecraft/mc-mods/optifabric

第二步，将两个jar文件在MultMC中加载入实例

![imaged95bb78c202b1327.png](https://imagehost-cdn.frytea.com/images/2020/05/31/imaged95bb78c202b1327.png)

第三步，选择合适光影，具体参考OptiFine 光影部分

配置好插件后就能安装自己喜欢的光影啦，来个 Wisdom光影 效果图。

![image180ce7827d1134e5.png](https://imagehost-cdn.frytea.com/images/2020/05/31/image180ce7827d1134e5.png)

## OptiFine 光影

### 安装方法

- 前置条件：OptiFine已安装并正常运行

方法一：将光影资源包直接拷入 `C:\SomeApps\MultiMC\instances\1.14.4\.minecraft\shaderpacks` 文件夹（这里给的是参考，具体替换为自己实例的目录）。

方法二：在已运行的实例中添加。运行实例，进入 `选项 -> 视频设置 -> 光影` ，单击`光影文件夹`，将下载好的光影压缩包拷入，选择启动即可。

![imagef25471db50d0dc9c.png](https://imagehost-cdn.frytea.com/images/2020/05/31/imagef25471db50d0dc9c.png)

您可以在这里下载光影，注意显卡支持：

- https://shaders.fandom.com/wiki/Shader_Packs/zh

### Wisdom Shaders

![image180ce7827d1134e5.png](https://imagehost-cdn.frytea.com/images/2020/05/31/image180ce7827d1134e5.png)

- 资源下载地址： https://bc3.moe/wisdom-shaders/

## 参考文献

- [Minecraft 1.14.4 安装Fabric MOD (MultiMC) | Fabric安装Optifine](https://www.zhoushangren.com/archives/717)
- [1.16(snapshot)-1.6.4 - VoxelMap——小地图](https://www.mcbbs.net/thread-473187-2-1.html)
- [我的世界1.12.2模组教程：VoxelMap小地图可以传送的辅助神器](https://www.bilibili.com/read/cv2185117/)
- [强大的 Minecraft 启动器：MultiMC](https://sspai.com/post/47690)
- [MultiMC 的简单使用教程](https://blog.indexyz.me/archives/how-to-use-mulitmc/)
- [MultMC5下OptiFine安装方法](https://github.com/MultiMC/MultiMC5/wiki/MultiMC-and-OptiFine)
