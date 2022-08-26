---
title: "【简记】Linux 计划任务 Crontab"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "411"
date: "2020-07-20 11:45:40"
---

## cron 简介

cron 是 UNIX, SOLARIS，LINUX 下的一个十分有用的工具。通过 cron 脚本能使计划任务定期地在系统后台自动运行。

## cron 命令

`crontab -e`  – 编辑该用户的 crontab，当指定 crontab 不存在时新建。
`crontab -l` – 列出该用户的 crontab。
`crontab -r` – 删除该用户的 crontab。
`crontab -u<用户名称>` – 指定要设定 crontab 的用户名称。

重启命令：

```
/etc/init.d/crond restart // 以路径方式重启
service crond restart // 以服务的方式重启
```

## Linux Crontab 格式

[Crontab 字段与允许的值 (Linux Crontab)](https://www.notion.so/6feba2913a7842d29ac0798efdef2f1f)

## cron 实例

### 1、特定时间执行

cron 的基本用法是在特定的时间执行一项任务，如下是 6 月 10 上午 8:30 执行 Full backup shell script。 要注意的是时间字段采用的是 24 小时制，如果是下午 8 点，则改写为 20 点

`30 08 10 06 * /home/ramesh/full-backup` 

30 – 第 30 分钟
08 – 早上 8 点
10 – 10 号
06 – 第 6 个月 (6 月)
* – 一周的任何一天

### 2、 安排多个实例（比如一天执行两次）

下面的增量备份脚本每天执行两次。

每天于 11:00, 16:00 执行，逗号两侧的时间都会执行。

`00 11,16 * * * /home/ramesh/bin/incremental-backup`
00 – 第 0 分钟 (每小时开时)
11,16 – 早上 11 点与下午 4 点
* – 每天
* – 每个月
* – 一周的任何一天

### 3、让任务只在特定时间执行（比如仅当工作日时执行）

下面这个例子是每天 9:00-16:00 检查数据库状态（包括周六）

`00 09-18 * * * /home/ramesh/bin/check-db-status`
00 – 第 0 分钟 (每小时开时)
09-18 – 9 点, 10 点, 11 点, 12 点, 下午 1 点, 下午 2 点, 下午 3 点, 下午 4 点, 下午 5 点, 下午 6 点
* – 每天
* – 每个月
* – 一周的任何一天
如果只想工作日执行此操作

`00 09-18 * * 1-5 /home/ramesh/bin/check-db-status`
00 – 第 0 分钟 (每小时开时)
09-18 – 9 点, 10 点, 11 点, 12 点, 下午 1 点, 下午 2 点, 下午 3 点, 下午 4 点, 下午 5 点, 下午 6 点
* – 每天
* – 每个月
1-5 – 周一, 周二, 周三, 周四和周五 (工作日)

### 4、 安排每分钟都执行定时任务

理论情况下，没有每分钟都要执行的 shell，但下面这个例子，让我们更好的了解 crontab

```bash
* * * * * 命令
```

- `*` 代表着所有可能取到的值，除了直接用 * 外，下面的几个例子也较为常用
- 当指定 `*/5` 在分钟字段，代表每五分钟。
- 当指定 `0-10/2` 在分钟字段，代表在前十分钟的每两分钟

上面的例子对于其它四个字段同样试用

### 5、安排后台每十分钟执行定时任务

```bash
*/10 * * * * /home/ramesh/check-disk-space
```

有一些特殊的例子，可以用关键字替代上述五个字段 `– reboot, midnight, yearly, hourly`

[Table: Cron special keywords and its meaning](https://www.notion.so/aa3919510fab4449a9119b9366eb592a)

### 6、每一年的第一分钟执行定时任务（@yearly）

下面的例子将在每一年的 1 月 1 日 0:00 执行

```bash
@yearly /home/ramesh/red-hat/bin/annual-maintenance
```

### 7、每月执行定时任务（@mothly）

下面的例子将在每月 1 日 0:00 执行

```bash
@monthly /home/ramesh/suse/bin/tape-backup
```

### 8、每天执行定时任务（@daily）

下面的例子将在每天 0:00 执行

```bash
@daily /home/ramesh/arch-linux/bin/cleanup-logs "day started"
```

### 9、每次重启时执行定时任务（@reboot）

```bash
@reboot CMD
```

### 10、如何用 mail 关键字禁止/重定向 cron 的邮件

默认情况下，crontab 将向布置定时任务的管理员发送邮件，如果想重定向此用户，添加并更新 MAIL

```bash
ramesh@dev-db$ crontab -l
MAIL="ramesh"

@yearly /home/ramesh/annual-maintenance
*/10 * * * * /home/ramesh/check-disk-space
```

如果不想任何人接收，则直接将 MAIL 置空

### 11、如何系秒每执行一个定时任务

无法安排每秒执行，因为最小处理单元是分钟，另一方面，没有什么理由让我们每秒都执行一任务

### 12、cron 中的 PATH 变量

上面的例子都是用绝对的路径

如果你想用相对的路径，设置环境变量可以在 crontab 增加

```bash
ramesh@dev-db$ crontab -l

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/home/ramesh

@yearly annual-maintenance
*/10 * * * * check-disk-space
```

### 13、从 cron 文件中定义 cron 任务

除了直接编辑外，你也可以先在一个文件中编辑好任务，再导入

```bash
ramesh@dev-db$ crontab -l
no crontab for ramesh

$ cat cron-file.txt
@yearly /home/ramesh/annual-maintenance
*/10 * * * * /home/ramesh/check-disk-space

ramesh@dev-db$ crontab cron-file.txt

ramesh@dev-db$ crontab -l
@yearly /home/ramesh/annual-maintenance

*/10 * * * * /home/ramesh/check-disk-space
```

应用时要注意，此操作会删除原有的cron任务

### 14、查看所有用户 cron 任务

```bash
$ cat /etc/passwd | cut -f 1 -d : |xargs -I {} crontab -l -u {}
30 08 10 06 * sar 1 10 > /root/sysstat/data.txt
30 6 */10 * * ls
no crontab for bin
no crontab for daemon
no crontab for adm
no crontab for lp
no crontab for sync
no crontab for shutdown
no crontab for halt
no crontab for mail
no crontab for operator
no crontab for games
no crontab for ftp
no crontab for nobody
no crontab for systemd-network
no crontab for dbus
no crontab for polkitd
no crontab for sshd
no crontab for postfix
no crontab for chrony
no crontab for ntp
no crontab for tcpdump
no crontab for nscd
```

## 参考文献

- [Linux 计划任务之crontab](https://blog.csdn.net/richerg85/article/details/23442411)
- [Linux查看当前存在的计划任务命令是什么？](http://www.ipmay.com/index.php/articles-detail/59.html)
- [查看所有用户的crontab任务](https://blog.csdn.net/mlzhu007/article/details/81662091)
- [Linux crontab 命令详解(含配置文件路径）](https://blog.csdn.net/renyp8799/article/details/50717944)
- [linux计划任务之crontab](https://blog.csdn.net/richerg85/article/details/17887879)