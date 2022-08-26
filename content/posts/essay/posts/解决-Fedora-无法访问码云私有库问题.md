---
title: "解决 Fedora 无法访问码云私有库问题"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "526"
date: "2021-04-17 10:30:00"
---

本文首发于：https://blog.frytea.com/archives/526/

近期在 Fedora 33 系统上总是无法访问 gitee 私有库，得到以下报错：

```
$ git clone git@gitee.com:songtianlun/workflow.git
正克隆到 'workflow'...
git@gitee.com: Permission denied (publickey).
fatal: 无法读取远程仓库。

请确认您有正确的访问权限并且仓库存在。
```

使用 `ssh -v git@gitee.com` 命令检查得到以下输出：

```
$ ssh -v git@gitee.com
OpenSSH_8.4p1, OpenSSL 1.1.1g FIPS  21 Apr 2020
...
debug1: send_pubkey_test: no mutual signature algorithm
...
git@gitee.com: Permission denied (publickey).
```

这条日志引起我的注意，搜索了一下发现有人遇到跟我一样的问题，初步判定为 Fedora 的漏洞引起，目前发现在 Fedora 33 系统与 gitee 通信会出现问题，解决方法很简单：

> 修改"~/.ssh/config"文件，添加如下配置（若没有该目录则新建），实测有用：
>
> ```
> Host gitee.com
> PubkeyAcceptedKeyTypes=+ssh-rsa
> ```

问题暂时得到解决，引发问题的根本原因还需要进一步探索。

## 参考文献

* [Fedora33 关于 ssh 的问题解决](https://blog.csdn.net/lindorx/article/details/111885764)
* [Gtilab.com refuses SSH connection, but only sometimes](https://forum.gitlab.com/t/gtilab-com-refuses-ssh-connection-but-only-sometimes/45057)
