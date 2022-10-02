---
title: "Win10安装Rational_Rose_2007步骤及安装包下载"
categories: [ "技术价值" ]
tags: [ "win10","Rational_Rose" ]
draft: false
slug: "45"
date: "2019-04-11 22:34:00"
---

经典IBM给力软件，UML建模利器，亲身体验，安装步骤及资源全聚合。


# Win10 安装Rational_Rose_2007 步骤及安装包下载

## 概述
Rational rose是一款创建UML模型的软件，由于其相对古老，因此安装流程较为曲折，在这里分享自己的安装经历，记录自己，方便他人。

安装分为两部分：
- 虚拟光驱工具Alcohol120%的安装
- Rational rose软件安装包的打开
- 软件安装

<!--more-->

## 资料准备
- Alcohol120%软件
- Rational rose安装包
>为方便配置，我将自己安装过程中在网络搜集的资源分享在了我的个人资源分享站（[https://data.frytea.com/](https://data.frytea.com/)），若有需要可以点击下面超链接直接下载。

[Alcohol120.zip](https://data.frytea.com/?/Public/windows%20Tools/Alcohol120.zip)
[Rational_Rose_2007(v7.0)_with_license.zip](https://data.frytea.com/?/Public/windows%20Tools/Rational_Rose_2007%28v7.0%29_with_license.zip)

（注：软件仅用于科研或学习，不可用于商业用途！）

## 安装流程

### Alcohol120%的安装
1）下载完解压缩后，开启Alcohol120_retail_2.0.3.10221.exe→下一步→我同意→
2）取消勾选“安装智能文件顾问”→下一步
3）请注意“多语言文件”一定要勾选（语言档）→下一步→安装
（中途可能会重开机1次，或者是会跳出驱动的安装画面请皆按，是，安装）
4）取消勾选「运行酒精120％」→完成
5）放入「msimg32.dll」至酒精程式资料夹
PS）如不知道程式资料夹在哪里，对「酒精120％」捷径右键→开启档案位置
6）开启酒精程式后会跳出传送资讯给官方的视窗，否（是也不会怎么样）
PS）如果出现「输入合法的使用序号后方能使用」，代表第5步骤没有做好

安装成功，软件运行效果：
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411221325.png)

### 打开Rational rose软件安装包
打开记事本，输入如下代码：

```
FILE "filename.bin" BINARY

TRACK 01 MODE1/2352

INDEX 01 00:00:00

# 将其中的“filename.bin”改成你的BIN文件的文件名，保留引号。
```

效果如下：
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411221602.png)

将该文件保存至与BIN文件相同的文件夹下。
CUE文件的文件名除了扩展名外，其余都与相应的BIN文件一致。
在记事本中单击“文件”，选择“另存为”，在“保存类型”下拉列表中选择“所有文件”，然后将文件扩展名改为“.CUE”。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411221638.png)

此时打开虚拟光驱软件alcohol120%加载镜像即可。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411221837.png)

### 安装Rational rose
打开虚拟光驱，运行安装程序。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222539.png)

之后的流程非常简单：
进入安装界面 -> 点击Install IBM Rational Rose Enterprise Edition-> Desktop installation from CD image-> 直至完成

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222621.png)

安装完毕弹出激活页面：
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222046.png)

选择第二项，单击下一步；
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222119.png)

选择压缩包中的*.upd文件，之后点击Import；
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222214.png)

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222407.png)

弹出这个页面，关掉就好啦！
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222713.png)

Finish！
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222315.png)

双击运行`IBM Rational Rose Enterprise Edition`
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222750.png)

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222852.png)

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190411222957.png)


UML用例模型备用教程
- [Rational Rose与UML教程](https://www.cnblogs.com/xuyuanjia/p/5808517.html)
- [UML建模详解（6）—Rose类图绘制总结](https://blog.csdn.net/fanyun_01/article/details/51094799)
- [用Rational Rose画用例图](https://jingyan.baidu.com/article/3f16e003c3b9172591c10301.html)
- [用rose画UML图（用例图，活动图）](https://www.cnblogs.com/lilicat/p/5540861.html)



## 参考文献
- [酒精 Alcohol 120% v2.0.3.11012 (繁體中文下載+免費序號註冊+影片教學)](http://a4287604.pixnet.net/blog/post/130199243-%E9%85%92%E7%B2%BE-alcohol-120%25-v2.0.3.10121-%28%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87%E4%B8%8B%E8%BC%89%2B%E8%A8%BB%E5%86%8A%2B)
- [两种方法打开BIN文件](https://jingyan.baidu.com/article/8275fc862c4ed946a03cf63c.html)
- [Win10 安装Rational_Rose_2007 问题总结及解决方案](https://www.cnblogs.com/nmdzwps/p/5553281.html)