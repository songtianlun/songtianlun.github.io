---
title: "使用aria2实现离线下载"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "36"
date: "2019-01-23 21:56:00"
---

迅雷、百度网盘等的下载工具体验是越来越差了。作为一家独大的下载工具迅雷虽然其下载能力一流，但商业化太过严重，即使开通会员也不能保证一个稳定的下载体验。也许用户需要的不是一个好看的页面，需要的只是一个纯净的下载环境。在这样的环境下，自己搭建一个离线下载站就显得非常有必要。

aria2是一款开源的多线程文件下载工具，其强大的下载能力令人沉醉，同时其干净纯净的功能也非常吸引人。可是也就是因为它太过纯净，纯净到需要用命令行来进行下载任务使得大部分人望而却步。但现在好了，逗比大神封装了aria2一件配置脚本，只需要一行代码就可以配置完毕，还有人为期开发了web控制面板，可以在浏览器上实现控制，还有人将其封装在桌面程序上，最终实现了桌面版的程序下载！

在这里就介绍一下这三个部分，一个是配置aria，我将其配置在自己的云主机上实现了离线下载；第二个是web面板的配置，第三个是桌面版的下载工具。

# 一、aira2安装
---------

使用一键安装脚本，在控制台运行如下代码：

    wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/aria2.sh && chmod +x aria2.sh && bash aria2.sh

  

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/6A70951F-BEA5-4DD0-B919-8EA1E06D3105-1024x493.jpeg)

安装成功

# 二、Web控制面板下载
-----------

1.AreaNg作为下载前台

第一步、下载  
使用如下地址下载https://github.com/mayswind/AriaNg-DailyBuild/archive/master.zip

解压到网页根目录下，访问即可。

第二步、配置areang

需要将areang连接到area2，需要在面板上如下位置做配置

1）.你需要手动设置AriaNg的RPC地址和RPC密钥

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/3648847017-1024x465.png)

2）.你需要手动设置AriaNg的下载目录为/www/wwwroot/你的网站/Download

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/3022239196-1024x466.png)

2.使用AriaWebUi作为web控制面板

[webui-aria2](https://github.com/ziahamza/webui-aria2) 项目主页为：[https://github.com/ziahamza/webui-aria2](https://github.com/ziahamza/webui-aria2)

*   访问 [http://ziahamza.github.io/webui-aria2/](http://ziahamza.github.io/webui-aria2/)。若本地已成功运行 aria2，则可以直接使用。
*   访问 [webui-aria2 项目 GitHub 页面](https://github.com/ziahamza/webui-aria2)，clone 至本地，使用浏览器打开 index.html。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/09725885-2F10-45CF-9270-C025270C65E7.png)

  

# 三、桌面版下载工具  
在下面下载地址可以下载到windows的桌面下载工具  
桌面版：[Persepolis Download Manager](https://github.com/persepolisdm/persepolis/releases/tag/3.1.0)

Aria2脚本管理命令：  

    启动 ： /etc/init.d/aria2 start
    
    停止：/etc/init.d/aria2 stop
    
    重启：/etc/init.d/aria2 restart

# 四、重要补充
在使用了很久aria2之后，经历了本地硬盘空间不足等一系列问题后，发现了目前知道的最佳解决方案：
* [Aria2 一键安装管理脚本](https://p3terx.com/archives/aria2-oneclick-installation-management-script.html)
* [一键安装脚本GitHub](https://github.com/P3TERX/aria2.sh)
* [Aria2 + Rclone 实现 OneDrive、Google Drive 等网盘离线下载](https://p3terx.com/archives/offline-download-of-onedrive-gdrive.html)
* [百度网盘转存到 OneDrive 、Google Drive 等其他网盘](https://p3terx.com/archives/baidunetdisk-transfer-to-onedrive-and-google-drive.html)

# 参考文献

*   [Aria2离线下载+H5ai在线观看](https://blog.67cc.cn/archives/tutorialaria2-offline-download-h5ai-online-watch.html)
*   [替代迅雷！小白都会用的免配置 Aria2 图形界面版免费开源下载软件 PDM](https://www.iplaysoft.com/persepolis-download-manager.html)
*   [Persepolis Download Manager：Aria 2 图形界面版下载工具](https://m.baidu.com/from=1017188g/bd_page_type=1/ssid=0/uid=0/pu=usm%402%2Csz%401320_1001%2Cta%40iphone_2_7.0_24_57.0/baiduid=E223DC174810B1A9AB90BAF97F04F153/w=0_10_/t=iphone/l=1/tc?ref=www_iphone&lid=11059305630775112303&order=5&fm=alop&isAtom=1&waplogo=1&is_baidu=0&h5ad=0&tj=www_normal_5_0_10_title&vit=osres&waput=3&cltj=normal_title&asres=1&title=PersepolisDownloadManager%3AAria2%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2%E7%89%88%E4%B8%8B%E8%BD%BD...&hwj=1595466264103869&dict=-1&wd=&eqid=997a8be060d3f000100000015c4889bf&w_qd=IlPT2AEptyoA_yiJGVGuHjE8wwvI1cWhERiRKi6UMlOvo5y5fe_&tcplug=1&sec=35871&di=2dc3b363d3c2e648&bdenc=1&tch=124.265.262.1134.2.451&nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IJRqDKiFV1TD5nk_qva02FtFcHzPqRnqKHFX9wWyKxBt8wnSa28km8AV2mqtksWk6kzm9u_&clk_type=1&l=1&baiduid=E223DC174810B1A9AB90BAF97F04F153&w=0_10_Persepolis+Download+Manager&t=iphone&from=1017188g&ssid=0&uid=0&bd_page_type=1&pu=usm%402%2Csz%401320_1001%2Cta%40iphone_2_7.0_24_57.0&clk_info=%7B%22srcid%22%3A1599%2C%22tplname%22%3A%22www_normal%22%2C%22t%22%3A1548257763884%2C%22xpath%22%3A%22div-article-header-div-a-h3%22%7D)
*   [如何使用aria2及webui-aria2下载百度云资源](https://blog.csdn.net/lakeheart879/article/details/52955350?locationNum=16&fps=1)
* [在Linux下更新或安装curl](https://www.cnblogs.com/suidouya/p/7387861.html)