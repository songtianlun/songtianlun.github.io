---
title: 'debian/ubuntu 防火墙 ufw 简单使用'
date: '2023-04-30T03:17:46.846Z'
tags: ['Debian', 'Ubuntu', 'UFW']
created: '2023-04-30T03:12:57.593Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:11, 27th 五月 2023 -->

# debian/ubuntu 防火墙 ufw 简单使用

## 什么是 UFW ？

UFW，即简单防火墙 **U**ncomplicated **F**ire**W**all，是一个管理防火墙规则的前端，大部分 Linux 系统都可以使用。它的目的就是为了使防火墙配置简单而不是复杂。本文的主要内容就是教你如何使用它。

## 安装

在开始之前，你需要更新系统:

```
#Arch Linux
$ sudo pacman -Syu

#Debian / Ubuntu
$ sudo apt-get update && sudo apt-get upgrade
```

在Ubuntu中，UFW默认已经安装好了，但在Arch 和 Debian 中需要手动安装。

默认UFW的规则是放通全部端口，即使你已经打开它并且后台运行了，它也不会强制执行任何防火墙规则，新增防火墙规则的部分在下面。

## 设置默认规则

一般情况下只需要打开少量端口允许入站就可保证服务的正常使用了。我们先从默认规则开始，`ufw default`命令是设置UFW对传入传出连接的默认响应动作，我们首先设置拒绝所有传入并允许所有传出。

```
sudo ufw default allow outgoingsudo ufw default deny incoming
```

> 警告！
> 
> 请勿运行上述命令后直接应用，否则会直接锁定你的服务器。确保在应用默认规则前放通了SSH和其他关键服务的端口。

## 添加基本规则

有两种方式添加规则: **端口号**或**服务名**。

例如要允许 SSH 的22 端口的传入传出连接，你可以运行:

或者是:

同样，如果你要阻止特定端口上的流量，例如**1234**，你可运行:

为了适应不同的需求，你还可以设置基于TCP或UPD的规则，例如允许80端口的TCP传入传出连接:

```
sudo ufw allow 80/tcpsudo ufw allow http/tcp
```

下面的例子会允许来自 2000 端口上的 TCP 包:

style="display:block; text-align:center;"

data-ad-layout="in-article"

data-ad-format="fluid"

data-ad-client="ca-pub-8662211448990280"

data-ad-slot="4647000488">

## 添加高级规则

除了简单的基于端口或协议的规则，UFW 还允许按照IP地址、子网、端口、协议的不同组合来设置高级规则。

例如允许从一个IP连接:

```
sudo ufw allow from 192.168.1.1
```

允许特定子网的连接:

```
sudo ufw allow from 192.168.1.0/24
```

允许 IP + 端口 + 协议的组合:

```
sudo ufw allow from 192.168.1.1 to any port 80 proto tcp
```

所有例子的`allow`都可以根据需求改为`deny`，`proto tcp`也可以根据你的需求改为`proto udp`

## 删除规则

要删除某一条规则，就在相应的规则前加入`delete`。例如你想要拒绝 HTTP 的流量你可以运行:

同样的，可以使用服务名删除规则。

还有另一种方法删除规则，首先运行命令:

它会将所有正在使用的规则列出来，并且前面标上了序号例如:

```
Status: active ToAction From-- ----[ 1] 22/tcp ALLOW IN    Anywhere   [ 2] 25/tcp ALLOW IN    Anywhere[ 3] 80/tcp ALLOW IN    Anywhere   [ 4] 443/tcpALLOW IN    Anywhere   [ 5] 22/tcp (v6) ALLOW IN    Anywhere (v6)   [ 6] 25/tcp (v6) ALLOW IN    Anywhere (v6)[ 7] 80/tcp (v6) ALLOW IN    Anywhere (v6)   [ 8] 443/tcp (v6)ALLOW IN    Anywhere (v6)
```

如果你想要删除某一个规则，输入`sudo ufw delete [规则号码]`即可，例如:

```
sudo ufw delete 2 #就会删除 [ 2] 25/tcp ALLOW IN    Anywhere
```

style="display:block; text-align:center;"

data-ad-layout="in-article"

data-ad-format="fluid"

data-ad-client="ca-pub-8662211448990280"

data-ad-slot="4647000488">

## 编辑 UFW 的配置文件

虽然可以直接通过命令行添加规则，但是如果你有需要添加更高级或特殊的规则可以编辑配置文件，UFW 有三个配置文件。

### before.rules

`/etc/ufw/before.rules`，在运行你通过命令行设置的规则【**前**】运行的任何规则。同目录中的 `before6.rules` 文件用于 IPv6 。

### after.rules

`/etc/ufw/after.rules`，在运行你通过命令行设置的规则【**后**】运行的任何规则。同目录中的 `after6.rules` 文件用于 IPv6 。

### 默认配置文件

`/etc/default/ufw`，从此处可以设置是否启用 IPv6，可以设置默认规则，并可以设置 UFW 以管理内置防火墙链。

## 查看 UFW 状态

使用命令: `sudo ufw status`，查看 UFW 状态。该命令会显示所有规则列表，以及当前是否激活。例如:

```
Status: activeToAction From-- ----22ALLOW  Anywhere80/tcp ALLOW  Anywhere443    ALLOW  Anywhere22 (v6)ALLOW  Anywhere (v6)80/tcp (v6) ALLOW  Anywhere (v6)443 (v6)    ALLOW  Anywhere (v6)
```

## 启用关闭防火墙

当你设定好规则后，第一次运行`ufw status` 可能会提示`Status: inactive`。这时候就要使用以下命令激活防火墙规则了。

入药禁用防火墙规则使用以下命令:

style="display:block; text-align:center;"

data-ad-layout="in-article"

data-ad-format="fluid"

data-ad-client="ca-pub-8662211448990280"

data-ad-slot="4647000488">

## 日志

如需启用日志记录，使用以下命令:

启用日志后可以使用 `sudo ufw logging low|medium|high` 设置日志级别，默认是`low`。

日志文件储存在 `/var/logs/ufw` ，一般长得像下面一样:

```
Nov 20 20:13:21  kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:00:00:00:00:00:00:00:00:00:00:00:00:00 SRC=1.1.1.1 DST=2.2.2.2 LEN=40 TOS=0x00 PREC=0x00 TTL=249 ID=8475 PROTO=TCP SPT=48247 DPT=22 WINDOW=1024 RES=0x00 SYN URGP=0
```

每个值的意思分别是:

`[UFW BLOCK]`: 这是记录事件的描述开始的位置。在此例中，它表示阻止了连接。

`IN`: 如果它包含一个值，那么代表该事件是传入事件

`OUT`: 如果它包含一个值，那么代表事件是传出事件

`MAC`: 目的地和源 MAC 地址的组合

`SRC`: 包源的 IP

`DST`: 包目的地的 IP

`LEN`: 数据包长度

`TTL`: 数据包 TTL，或称为 time to live。 在找到目的地之前，它将在路由器之间跳跃，直到它过期。

`PROTO`: 数据包的协议

`SPT`: 包的源端口

`DPT`: 包的目标端口

`WINDOW`: 发送方可以接收的数据包的大小

`SYN URGP`: 指示是否需要三次握手。 0 表示不需要。

## References

* [非常简单的 UFW 防火墙使用教程](https://tstrs.me/1480.html)