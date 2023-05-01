---
title: "NextCloud手动添加文件并列出"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "263"
date: "2019-11-23 11:08:50"
---

NextCloud 自带的数据目录在列目录时都是通过数据库查询，如果需要手动在磁盘目录上添加文件并使用nextcloud列出就需要手动扫描。

```
sudo -u www php console.php files:scan --all
```

这条命令是官方提供的，但是实际使用时会报错如下：
```

Unknown user 1 media
+---------+-------+--------------+
| Folders | Files | Elapsed time |
+---------+-------+--------------+
| 0       | 0     | 00:00:00     |
+---------+-------+--------------+

```

经过信息检索发现问题，在nextcloud安装目录下使用如下命令扫描，就可以看到新添加的文件了：

```
$ sudo -u www php console.php files:scan --path songtianlun/files

# songtianlun 可替换为你需要扫描的用户
```

## 参考文献

 - [NEXTCLOUD 下载和数据存储目录的问题](https://wzfou.com/question/9883/)
 - [OCC and FIles:Scan in single catlog](https://central.owncloud.org/t/occ-and-files-scan-in-single-catlog/3867)
