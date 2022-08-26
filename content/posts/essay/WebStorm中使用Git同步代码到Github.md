---
title: "WebStorm中使用Git同步代码到Github"
categories: [ "技术价值" ]
tags: [ "webstorm","git","github" ]
draft: false
slug: "47"
date: "2019-02-27 10:01:00"
---


#  WebStorm下配置GitHub实现代码同步

项目开发时使用GitHub作为公共代码仓库托管代码，可以极大的提高团队合作效率，同时也可以实现代码云端存储等，方便自己也方便大家！下面记录一下自己配置webstorm同步github的过程，仅供参考。

## 安装git

没什么说的，直接去git官网下载安装即可。

[git官网](https://git-scm.com/)

## 准备SSH

在进行下一步之前先检查一下计算机中是否有已存在的ssh，打开如下目录`C:\Users\songt`，其中`songt`为您的用户名，在该目录下检查是否存在`.ssh`目录。

#### 情况一-若存在，则表示电脑中存在ssh

![](http://pnabaentf.bkt.clouddn.com//20190227090854.png)

可直接复制其中的`id_rsa.pub`中的内容进行下一步。

![](http://pnabaentf.bkt.clouddn.com//1551229775466.png)

#### 情况二-不存在，创建ssh

打开`git bash`，可通过快捷方式打开，也可通过鼠标右键打开。

![](http://pnabaentf.bkt.clouddn.com//20190227090607.png)

打开后在其中运行如下代码

`ssh-keygen -t rsa -C “你的邮箱”`

我的输入如下图所示

![](http://pnabaentf.bkt.clouddn.com//20190227091322.png)

上述代码我运行了两次，暂时不清楚原因。

之后就是三次回车，即可生成ssh。

在我的电脑`C:\Users\songt\.ssh`目录下可以找到生成的`id_rsa.pub`文件。

## 使用ssh

接下来就要配置github，在github中添加我们的git进入github的密钥啦！

#### 打开github

进入个人设置

![](http://pnabaentf.bkt.clouddn.com//20190227091839.png)



选择左侧的SSH and GPG keys选项

![](http://pnabaentf.bkt.clouddn.com//20190227091907.png)

#### 添加ssh

![](http://pnabaentf.bkt.clouddn.com//20190227091956.png)

输入title和key即可，其中title自定义，key内容为`C:\Users\songt\.sshid_rsa.pub`文件中的内容。（注:文件直接使用记事本打开即可）

![](http://pnabaentf.bkt.clouddn.com//20190227092021.png)

ok！

#### 测试ssh是否配置成功

在git bash中运行如下代码

`ssh -T git@github.com`

若询问`Are you sure you want to continue connecting (yes/no)?`则输入yes

输入类似下列信息即连接成功

`Hi songtianlun! You've successfully authenticated, but GitHub does not provide shell access.`

![](http://pnabaentf.bkt.clouddn.com//20190227092605.png)

## webstorm

#### 配置GitHub

打开webstorm，在`file-settings`中搜索github，输入自己的账号密码。

![](http://pnabaentf.bkt.clouddn.com//20190227092849.png)

若没有异常提醒，就可以看到自己的GitHub了。

![](http://pnabaentf.bkt.clouddn.com//20190227092919.png)

#### 配置git

在settings中查找git，将git的安装路径输入，点击text，若没有异常提示则应该可以看到如下界面。

![](http://pnabaentf.bkt.clouddn.com//20190227093037.png)

## 尽情使用吧

#### 代码拉取

准备工作做好之后就可以上传代码啦，打开webstorm，如图

![](http://pnabaentf.bkt.clouddn.com//20190227093220.png)

之后会弹出如下窗口，填写实例如图

![](http://pnabaentf.bkt.clouddn.com//20190227093751.png)

其中URL填写代码仓库的地址，在图示位置中可以找到。

![](http://pnabaentf.bkt.clouddn.com//20190227094007.png)

directory中填写本地项目地址，即您的电脑中存储该项目的路径。

如果上传路径和已有仓库同名产生冲突，直接换个文件夹的路径就好了。

> 下面信息写给我的同组伙伴们，实践作业的代码仓库地址如下：https://github.com/songtianlun/Gis-ChangChun-Info.git，在url中填入这个地址。

注，在在这里的操作是直接将代码仓库中的文件拉取到选择的本地路径，这个路径下的文件夹要保证为空或不存在，webstorm可直接使用这个文件夹作为工程文件打开。

点击clone就会将代码仓库中的内容直接拉取到本地，如图所示。

![](http://pnabaentf.bkt.clouddn.com//20190227094824.png)

#### 代码上传

在本地对代码进行了修改，需要上传时，使用VCS-Commit，如图。

![](http://pnabaentf.bkt.clouddn.com//1551232200602.png)

点击之后弹出如下窗口

![](http://pnabaentf.bkt.clouddn.com//20190227095518.png)

蓝色的文件表示待提交文件，在commit message中简要描述做的修改操作，之后点击commit and push。

成功提交会弹出以下提示。

![](http://pnabaentf.bkt.clouddn.com//20190227095744.png)

在GitHub代码仓库中就可以看到刚刚提交的内容了。

![](http://pnabaentf.bkt.clouddn.com//20190227095827.png)

#### 注

在webstorm中如果仅使用commit，不push，则在github中看不到提交的代码，代码仅仅是提交给了git，因此注意提交代码需要使用commit and push！