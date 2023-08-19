---
title: 'debian 挂载官方 iso 为本地 apt 软件源'
date: '2023-08-19T04:19:20.227Z'
tags: ['Debian']
created: '2023-07-17T07:27:11.838Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
bag: 'default'
revision: '2'
---

<!-- Exported from TiddlyWiki at 12:19, 19th 八月 2023 -->

# debian 挂载官方 iso 为本地 apt 软件源

首先，下载debian 10.1.0 amd64架构的dvd iso，一般来说第一张就包含了大部份需要用到的软件，官方提供共计四张，一般来说挂第一张，不够用挂所有，下面以挂所有四张为例。

将四张dvd iso分别挂载到/media目录的挂载点:

```
$ mount /path/to/debian-10.1.0-amd64-DVD-1.iso /media/cdrom1/
$ mount /path/to/debian-10.1.0-amd64-DVD-2.iso /media/cdrom2/
$ mount /path/to/debian-10.1.0-amd64-DVD-3.iso /media/cdrom3/
$ mount /path/to/debian-10.1.0-amd64-DVD-4.iso /media/cdrom4/
```

也可以添加到/etc/fstab:

```
/srv/debsrcs/debian-10.1.0-amd64-DVD-1.iso/media/cdrom1udf,iso9660 loop 0 0
/srv/debsrcs/debian-10.1.0-amd64-DVD-2.iso/media/cdrom2udf,iso9660 loop 0 0
/srv/debsrcs/debian-10.1.0-amd64-DVD-3.iso/media/cdrom3udf,iso9660 loop 0 0
/srv/debsrcs/debian-10.1.0-amd64-DVD-4.iso/media/cdrom4udf,iso9660 loop 0 0
```

执行该命令挂载，记得不需要的时候移除掉，否则会启动不了系统

```
$ mount -a
```

挂载好后，将本地挂载路径写入 `apt` 软件源，编辑 `/etc/apt/sources.list` 文件，添加如下行：

```
deb [ trusted=yes ] file:/media/cdrom1/ buster main contrib 
deb [ trusted=yes ] file:/media/cdrom2/ buster main contrib 
deb [ trusted=yes ] file:/media/cdrom3/ buster main contrib 
deb [ trusted=yes ] file:/media/cdrom4/ buster main contrib
```

`apt update` 后即可安装软件

## References

* [debian使用dvd iso镜像配置本地源](https://openwares.net/2020/05/19/debian-use-dvd-iso-set-apt-source/)