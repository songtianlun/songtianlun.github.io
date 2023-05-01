---
title: "自建KMS服务器 | 持续激活Windows"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "462"
date: "2020-10-09 16:19:00"
---

最近在 GitHub 上发现一个项目：

- [dylanbai8](https://github.com/dylanbai8)/**[kmspro](https://github.com/dylanbai8/kmspro)：**[https://github.com/dylanbai8/kmspro](https://github.com/dylanbai8/kmspro)

该项目中提供了一个可以一键安装KMS服务器的脚本，可以在 Linux / Windows 设备上一键安装 KMS 服务器，未来就可以通过自建的KMS服务器激活Windows服务了，使用方法也很简单。

- 支持 Windows Vista/7/8/8.1/10 LTSB/LTSC系列 神州网信系列 Windows server 2008/2008R2/2012/2012R2/2016/2019
- 支持 Office 2010/2013/2016/2019 Office 365

这里简单介绍激活Windows的方法，详细教程请移步官方 [教程](https://v0v.bid/kms.html)。

## Linux 系统下安装方法

```bash
# 一键安装KMS服务 （Debian/Ubuntu/Mint 等）
$ wget -N --no-check-certificate git.io/k.sh && chmod +x k.sh && bash k.sh debian

# 一键安装KMS服务 （CentOS/Redhat/Fedora 等）（如果系统开启了防火墙 须自行开放 1688 端口）
$ wget -N --no-check-certificate git.io/k.sh && chmod +x k.sh && bash k.sh centos

# 启动KMS服务
$ bash k.sh start

# 服务器IP地址既是KMS服务器地址
# 也可以将域名解析至IP使用（支持IPv6 即AAAA记录）

# 关闭KMS服务
$ bash k.sh stop

# 添加开机自启动KMS服务
$ bash k.sh auto

# 重启KMS服务
$ bash k.sh restart

# 查看KMS服务运行状态
$ bash k.sh status

# 卸载KMS服务
$ bash k.sh uninstall

# 更多详细教程：https://v0v.bid/kms.html
```

 `[kms.sh](http://kms.sh)` 脚本备份：

```bash
#!/bin/bash

#====================================================
#	System Request: Debian/Ubuntu/Mint/CentOS/Redhat/Fedora
#	Author: dylanbai8
#	Dscription: KMS服务一键安装脚本
#	Open Source: https://github.com/dylanbai8/kmspro
#	Official document: https://v0v.bid
#====================================================

# 定义脚本变量
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
STAT=2

# Debian系列操作系统安装KMS
do_debian(){
apt-get install gcc git make -y
rm -rf /usr/local/kms
mkdir /usr/local/kms
cd /usr/local/kms
git clone https://github.com/Wind4/vlmcsd.git
cd vlmcsd
make
cd bin
mv vlmcsd /usr/local/kms/kms
cd /usr/local/kms/
rm -rf ./vlmcsd/
mv kms vlmcsd
echo "KMS服务安装成功！"
echo "更多教程请访问：https://v0v.bid/kms.html"
}

# Centos系列操作系统安装KMS
do_centos(){
yum install gcc git make -y
rm -rf /usr/local/kms
mkdir /usr/local/kms
cd /usr/local/kms
git clone https://github.com/Wind4/vlmcsd.git
cd vlmcsd
make
cd bin
mv vlmcsd /usr/local/kms/kms
cd /usr/local/kms/
rm -rf ./vlmcsd/
mv kms vlmcsd
echo "KMS服务安装成功！"
echo "更多教程请访问：https://v0v.bid/kms.html"
echo "Centos请自行开放1688端口"
}

# 检测KMS运行状态
check_running(){
PID=`ps -ef | grep -v grep | grep -i "vlmcsd" | awk '{print $2}'`
		if [ ! -z $PID ]; then
		STAT=0
	else
		STAT=1
	fi
}

# 重启KMS服务
do_restart(){
	check_running
	if [ $STAT = 0 ]; then
		echo "KMS服务已经运行 正在重新启动 ..."
		kill $PID
	elif [ $STAT = 1 ]; then
		echo "KMS服务未运行 正在启动 ..."
	fi
	/usr/local/kms/vlmcsd
	check_running
	if [ $STAT = 0 ]; then
		local_ip=`curl -4 ip.sb`
		echo "KMS服务 启动成功"
		echo "[Windows一句命令激活] 命令提示符(管理员)：slmgr /skms ${local_ip} && slmgr /ato"
		echo "更多教程请访问：https://v0v.bid/kms.html"
	elif [ $STAT = 1 ]; then
		echo "KMS服务 启动失败"
	fi
}

# 停止KMS服务
do_stop(){
	check_running
	if [ $STAT = 0 ]; then
			echo "正在停止 KMS服务 ..."
		kill $PID
		check_running
		if [ $STAT = 0 ]; then
			echo "停止 KMS服务 失败"
		elif [ $STAT = 1 ]; then
			echo "停止 KMS服务 成功"
			fi
		elif [ $STAT = 1 ]; then
				echo "KMS服务 未运行 取消操作"
		fi
}

# 检测KMS服务是否运行
do_status(){
	check_running
	if [ $STAT = 0 ]; then
				echo "KMS服务 正在运行"
				echo "更多教程请访问：https://v0v.bid/kms.html"
		elif [ $STAT = 1 ]; then
				echo "KMS服务 未运行"
		fi
}

# 启动KMS服务
do_start(){
	check_running
	if [ $STAT = 0 ]; then
				echo "KMS服务 已运行 取消操作"
				echo "更多教程请访问：https://v0v.bid/kms.html"
		exit 0;
		elif [ $STAT = 1 ]; then
				echo "正在启动 KMS服务 ..."
	/usr/local/kms/vlmcsd
	fi
		check_running
		if [ $STAT = 0 ]; then
				local_ip=`curl -4 ip.sb`
				echo "KMS服务 启动成功"
				echo "[Windows一句命令激活] 命令提示符(管理员)：slmgr /skms ${local_ip} && slmgr /ato"
				echo "更多教程请访问：https://v0v.bid/kms.html"
		elif [ $STAT = 1 ]; then
				echo "KMS服务 启动失败"
		fi
}

# 添加开机自启动服务
do_auto(){
	echo "/usr/local/kms/vlmcsd" >> /etc/rc.local
	chmod +x /etc/rc.local
	echo "已添加 开机自启动 KMS服务"
	echo "更多教程请访问：https://v0v.bid/kms.html"
}

# 卸载KMS服务
do_uninstall(){
	do_stop
	rm -rf /usr/local/kms
	sed -i '/vlmcsd/'d /etc/rc.local
	echo "KMS服务 已卸载"
}

# 脚本菜单
case "$1" in
	debian|centos|start|stop|auto|restart|status|uninstall)
	do_$1
	;;
	*)
	echo "缺少参数: debian | centos | start | stop | auto | restart | status | uninstall "
	echo "更多教程请访问：https://github.com/dylanbai8/kmspro"
	;;
esac

# 转载请保留版权：https://v0v.bid
```

Windows 下的安装方法请自行前往仓库查看，安装好服务后直接通过一行指令即可激活Windows，例如本站的KMS服务器地址为：kms.frytea.com，您只需要在Windows命令提示符中运行以下命令:

```bash
$ slmgr /skms kms.frytea.com && slmgr /ato
```

即可成功激活。

## 参考文献

- [dylanbai8](https://github.com/dylanbai8)/**[kmspro](https://github.com/dylanbai8/kmspro)：**[https://github.com/dylanbai8/kmspro](https://github.com/dylanbai8/kmspro)
- Windows系统一句命令激活：[https://v0v.bid/](https://v0v.bid/)
- 教程：[https://v0v.bid/kms.html](https://v0v.bid/kms.html)