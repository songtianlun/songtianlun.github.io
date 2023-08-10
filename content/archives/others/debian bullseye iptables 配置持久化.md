---
title: 'debian bullseye iptables 配置持久化'
date: '2023-05-23T02:07:50.574Z'
tags: ['Debian', 'iptables']
created: '2023-05-23T02:05:49.364Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:04, 27th 五月 2023 -->

# debian bullseye iptables 配置持久化

在Debian 11中，iptables规则可以通过使用`iptables-persistent`包进行持久化。以下是一个如何安装并使用它的步骤：

1. 首先，你需要安装`iptables-persistent`包。你可以使用以下命令安装：

```bash
sudo apt-get update
sudo apt-get install iptables-persistent
```

2. 在安装过程中，系统将询问你是否希望保存现有的IPv4和IPv6规则。如果你希望保存现有规则，选择`Yes`。

3. 在任何时候，你都可以使用以下命令保存当前的iptables规则：

对于IPv4：

```bash
sudo sh -c 'iptables-save > /etc/iptables/rules.v4'
```

对于IPv6：

```bash
sudo sh -c 'ip6tables-save > /etc/iptables/rules.v6'
```

4. 当系统启动时，`iptables-persistent`将自动加载这些规则。

请注意，每次修改iptables规则后，你都需要手动保存它们，以便它们在系统重启后仍然有效。