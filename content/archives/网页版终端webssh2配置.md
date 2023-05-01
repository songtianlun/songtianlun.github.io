---
title: "网页版终端webssh2配置"
categories: [ "技术" ]
tags: [ "webssh2" ]
draft: false
slug: "33"
date: "2019-02-21 18:17:00"
---



开源项目webssh2可以实现浏览器访问终端，参照网上教程实践后，记录步骤如下：

安装NVM

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    source ~/.bashrc
    

安装稳定版node.js

    nvm ls-remote --lts  查询最新版本号
     
            v8.13.0   (LTS: Carbon)
            v8.14.0   (LTS: Carbon)
    ->      v8.14.1   (Latest LTS: Carbon)
     
    nvm install 8.14.1
    # 版本号随时可能改变，请使用 nvm ls-remote --lts 查询最新版本号。

下载webssh2

    git clone https://github.com/billchurch/WebSSH2
    cd WebSSH2/app
    npm init  初始化，一路敲击回车
    npm install --production

使用screen运行webssh2（保持后台运行）

    yum install screen  #centos系统
    apt-get install screen  #debian/ubuntu系统
    screen -S Webssh2
    cd WebSSH2
    npm start

访问

通过如下地址即可访问ip地址为IP的终端

    http://IP:Port/ssh/host/IP

也可以通过修改`config.json`中的`listen.port`修改端口。  

![](https://blog.frytea.com/wp-content/uploads/2019/02/IMG_0195-1024x768.png)

#### 参考文献

*   [WebSSH2 界面ssh](https://blog.csdn.net/Flykos/article/details/85161615)
*   [一个可以在浏览器上运行的SSH客户端：WebSSH2安装教程](https://www.moerats.com/archives/467/)