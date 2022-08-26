---
title: "Linux后台运行hexo"
categories: [ "编程开发" ]
tags: [ "linux","hexo" ]
draft: false
slug: "50"
date: "2019-02-21 15:22:00"
---



hexo是一个非常高效的博客，但由于其设计特点，目的是为了转换为静态页面，因此不必要一直在后台运行，但是我想随时随地写博客同步到github，使用hexo admin编辑器，这就需要hexo一直在后台运行，于是在网上找到了pm2托管的方式。

首先安装pm2

    $ npm  install -g pm2

第二步，写一个运行脚本，在博客根目录下面创建一个**hexo_run.js**

    //run
    const { exec } = require('child_process')
    exec('hexo server',(error, stdout, stderr) => {
            if(error){
                    console.log('exec error: ${error}')
                    return
            }
            console.log('stdout: ${stdout}');
            console.log('stderr: ${stderr}');
    })

第三步，cd到博客根目录下运行脚本

    # pm2 start hexo_run.js

![](https://blog.frytea.com/wp-content/uploads/2019/02/IMG_0192-1024x768.png)

#### 参考文献

[让hexo一直在后台运行](https://blog.csdn.net/tangcuyuha/article/details/80331169)