---
title: "Linux下使用rclone挂载网盘到本地"
categories: [ "技术" ]
tags: [ "vps","rclone","onedrive" ]
draft: false
slug: "31"
date: "2019-05-06 23:58:00"
---


Rclone 是一个支持挂载多数国外网盘的工具。

[Rclone官网传送们](https://rclone.org/)

目前 Rclone 支持挂载的网盘有：Google Drive、 Dropbox 、Google Cloud Storage 、Microsoft One Drive 、Hubic、 Backblaze B2 、Yandex Disk 、Openstack Swift / Rackspace cloud files / Memset Memstore 等。更强大的是，Rclone 还支持 SFTP 、FTP 、HTTP 挂载。

<!--more-->

## 配置步骤(以 Ubuntu 为例)

### 第一步：安装 rclone

```
方法一：rclone一键安装脚本
curl https://rclone.org/install.sh | sudo bash

方法二：
wget https://www.moerats.com/usr/shell/rclone_debian.sh && bash rclone_debian.sh
```

### 第二步：授权（以 onedrive 为例）

```
rclone authorize "onedrive"
```

会出现以下信息：

```
2018/01/23 20:28:56 NOTICE: Config file "C:\\Users\\Administrator\\.config\\rclo
ne\\rclone.conf" not found - using defaults
Choose OneDrive account type?
 * Say b for a OneDrive business account
 * Say p for a personal OneDrive account
b) Business
p) Personal
b/p> p  #这里选择个人版，你想挂载Business就选择b
If your browser doesn't open automatically go to the following link: http://127.
0.0.1:53682/auth  #接下来会弹出浏览器，要求你登录账号进行授权
Log in and authorize rclone for access
Waiting for code...
Got code
Paste the following into your remote machine --->
{"access_token":"xxxx"}  #请复制{xx}整个内容，后面需要用到
<---End paste
```

### 第三步：配置（链接网盘，以 onedrive 为例）

```
rclone config
```

会出现以下信息：

```
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
name> Rats             #随便填，后面要用到
Type of storage to configure.
Choose a number from below, or type in your own value
 1 / Amazon Drive
   \ "amazon cloud drive"
 2 / Amazon S3 (also Dreamhost, Ceph, Minio)
   \ "s3"
 3 / Backblaze B2
   \ "b2"
 4 / Box
   \ "box"
 5 / Cache a remote
   \ "cache"
 6 / Dropbox
   \ "dropbox"
 7 / Encrypt/Decrypt a remote
   \ "crypt"
 8 / FTP Connection
   \ "ftp"
 9 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
10 / Google Drive
   \ "drive"
11 / Hubic
   \ "hubic"
12 / Local Disk
   \ "local"
13 / Microsoft Azure Blob Storage
   \ "azureblob"
14 / Microsoft OneDrive
   \ "onedrive"
15 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
16 / Pcloud
   \ "pcloud"
17 / QingCloud Object Storage
   \ "qingstor"
18 / SSH/SFTP Connection
   \ "sftp"
19 / Webdav
   \ "webdav"
20 / Yandex Disk
   \ "yandex"
21 / http Connection
   \ "http"
Storage> 14      #选择14，Microsoft OneDrive
Microsoft App Client Id - leave blank normally.
client_id>       #留空 
Microsoft App Client Secret - leave blank normally.
client_secret>   #留空 
Remote config
Choose OneDrive account type?
 * Say b for a OneDrive business account
 * Say p for a personal OneDrive account
b) Business
p) Personal
b/p> p           #这里选择个人版，你想挂载Business就选择b
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n           #选择n
For this to work, you will need rclone available on a machine that has a web browser available.
Execute the following on your machine:
    rclone authorize "onedrive"
Then paste the result below:
result> {"access_token":""}  #输入之前在客户端授权的内容
--------------------
[Rats]
client_id = 
client_secret = 
token = {"access_token":""}
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y        #  选择y
Current remotes:

Name                 Type
====                 ====
Rats                 onedrive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q    #选择q退出
```

## 第四步：网盘挂载

### 挂载为目录

```
举例：
目标：将rclone中的OneDrive挂载到本地/home/songtianlun/onedrive目录下，并清空本地目录内容（--allow-non-empty）

rclone mount OneDrive: /home/songtianlun/onedrive --allow-non-empty

注：网盘目录和本地目录名称不可一致，否则报错
```

**利用 Screen 让 Rclone 在后台运行**

```
screen -S onedrive
```

之后再运行挂载命令。

挂载完成后再用快捷键**CTRL-a d** 来暂时断开当前会话。最后用`screen -r <screen_pid>`重新连接上。

若没有安装 Screen，可以使用如下命令安装：

```
yum install screen  #centos系统
apt-get install screen  #debian/ubuntu系统
```

挂载效果：
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190506235425.png)

### 第五步：卸载磁盘

```
fusermount -qzu LocalFolder

# LocalFolder 为本地挂载目录
```

## 常用命令

```
rclone config – 以控制会话的形式添加rclone的配置，配置保存在.rclone.conf文件中。 
rclone copy – 将文件从源复制到目的地址，跳过已复制完成的。 
rclone mount-挂载
rclone sync – 将源数据同步到目的地址，只更新目的地址的数据。 
rclone move – 将源数据移动到目的地址。
rclone delete – 删除指定路径下的文件内容。 
rclone purge – 清空指定路径下所有文件数据。 
rclone mkdir – 创建一个新目录。 
rclone rmdir – 删除空目录。 
rclone check – 检查源和目的地址数据是否匹配。
rclone ls – 列出指定路径下所有的文件以及文件大小和路径。
rclone lsd – 列出指定路径下所有的目录/容器/桶。
rclone lsl – 列出指定路径下所有文件以及修改时间、文件大小和路径。
rclone md5sum – 为指定路径下的所有文件产生一个md5sum文件。 
rclone sha1sum – 为指定路径下的所有文件产生一个sha1sum文件。 
rclone size – 获取指定路径下，文件内容的总大小。
rclone version – 查看当前版本。 
rclone cleanup – 清空remote。 
rclone dedupe – 交互式查找重复文件，进行删除/重命名操作。
```

## 参考文献

- [VPS挂载国内外网盘实现免费扩容工具:Rclone,COS-Fuse和OSSFS](https://wzfou.com/rclone-cos-fuse-ossfs/)
- [在Debian/Ubuntu上使用rclone挂载OneDrive网盘](https://www.moerats.com/archives/491/)
- [Rclone 安装配置教程](https://p3terx.com/archives/rclone-installation-and-configuration-tutorial.html)
- [在Debian/Ubuntu上使用rclone挂载Google Drive网盘](https://gaoguangpeng.cn/994.html)
- [在 Linux VPS 上利用 rclone 挂载 OneDrive 网盘](https://moeclub.org/2018/01/23/545/?spm=12.2)

