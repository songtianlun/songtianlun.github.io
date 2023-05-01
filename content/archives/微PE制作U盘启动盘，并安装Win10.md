---
title: "微PE制作U盘启动盘，并安装Win10"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "457"
date: "2020-09-28 21:59:45"
---

`微PE` 是一款很好用的 `WinPE` （Windows预先安装环境（英语：Microsoft Windows Preinstallation Environment），简称Windows PE或WinPE）工具箱，可以用来制作一个随插随用的U盘启动盘，并且不影响U盘的日常使用，在 `Windows` 系统电脑的系统出问题时会是救命般的存在。下面就来介绍一下如何制作 `PE启动盘` ，并使用它来安装 `Win10` 操作系统。

制作之前，您需要准备：

- **16GB**以上的U盘（至少要能够装下您准备安装的操作系统镜像）
- 系统镜像（推荐官方渠道或是MSDN下载）

## U盘启动盘制作

### 第一步，下载微PE工具箱

官网下载即可：[http://www.wepe.com.cn/download.html](http://www.wepe.com.cn/download.html)

### 第二步，制作U盘启动盘

插入U盘，启动微PE软件，选择安装进U盘。

![https://imagehost-cdn.frytea.com/images/2020/09/28/2020092821465758c6205482d998f2.png](https://imagehost-cdn.frytea.com/images/2020/09/28/2020092821465758c6205482d998f2.png)

之后选择您插入的U盘，其他的默认即可。

至此，您的U盘启动盘已制作完毕，有了它，您就可以脱离硬盘引导系统启动，并在这个环境中安装Windows系统啦。

## 安装Win10

### 第一步，进入微PE

将您在上一步制作好的U盘启动盘插入待安装系统的电脑，之后选择U盘启动，使用U盘引导启动（至于如何选择U盘启动，不同型号的计算机方法也不同，请自行根据自己的电脑品牌及型号查找）

成功进入后，您就可以进入这样一个酷似Win10的界面：

![https://imagehost-cdn.frytea.com/images/2020/09/28/20200928215214b105da316242752e.png](https://imagehost-cdn.frytea.com/images/2020/09/28/20200928215214b105da316242752e.png)

### 第二步，安装Win10

如果您需要安装Win10，选择桌面上的Windows安装器。

选择您的镜像文件，选择需要安装的驱动器，也可勾选无值守安装，之后一步步安装即可。

![https://imagehost-cdn.frytea.com/images/2020/09/28/20200928215455b5d146fae62c722b.png](https://imagehost-cdn.frytea.com/images/2020/09/28/20200928215455b5d146fae62c722b.png)

### 第三步，激活

您可以使用本站提供的 `KMS` 服务器激活您的windows系统，只需要以管理员权限在命令提示符运行如下命令：

```bash
slmgr /skms kms.frytea.com && slmgr /ato
```

即可完成激活。