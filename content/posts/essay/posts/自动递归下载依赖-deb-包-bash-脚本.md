---
title: "自动递归下载依赖 deb 包 bash 脚本"
categories: [ "技术价值" ]
tags: [ "Bash" ]
draft: false
slug: "575"
date: "2021-09-18 17:35:23"
---

## 说明

- 脚本自动递归下载给定包列表deb包及其依赖包，深度3层；
- 若指定参数则下载给定的包及其依赖包（目前仅支持指定1个包，不支持多包）；
- 若无参数则默认下载列表中给出的包机器依赖包；
- 下载到当前目录；
- 请提前配置好源。

```bash
#!/bin/bash

logfile=./auto_deps_log
# 需要获取其所依赖包的包
# 或者用$1，从命令行输入库名字
libs="gdisk logrotate pciutils systemd lvm2 udev logrotate libfuse2 iptables libnetfilter-conntrack3 libnfnetlink0 libusb-1.0-0 cpio xfsprogs libprotobuf-c1 liblmdb0"
ret=""

function getDepends()
{
   echo "fileName is" $1>>$logfile
   # use tr to del < >
   ret=`apt-cache depends $1|grep Depends |cut -d: -f2 |tr -d "<>"`
   echo $ret|tee  -a $logfile
}

if [ ! -n "$*" ] ;then
    echo "you have not input a word! get list: $libs"
else
    echo "the list you input is $*"
    libs=$1
fi
echo "get $libs"

# download libs dependen. deep in 3
i=0
while [ $i -lt 3 ] ;
do
    let i++
    echo $i
    # download libs
    newlist=" "
    for j in $libs
    do
        added="$(getDepends $j)"
        newlist="$newlist $added"
        apt-get download $added $j
    done

    libs=$newlist
done
```

## 参考文献

- [shell获取命令行参数](https://www.jianshu.com/p/31159cd0e2fa)
- [apt一键下载deb包及其依赖](https://www.cnblogs.com/faster/p/13887759.html)