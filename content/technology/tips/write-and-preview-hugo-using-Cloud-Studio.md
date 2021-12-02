---
title: "使用 Cloud Studio 撰写、预览 Hugo 的配置方法"
date: 2021-12-02T14:32:08+08:00
description: "使用 Cloud Studio 在云端编辑、预览、发布博客。"
categories: ["技术笔记集","Linux 笔记","技术技巧集"]
tags: ["linux", "hugo"]
draft: false
cover:
    image: "https://imagehost-cdn.frytea.com/images/2021/12/02/362ca4420ffef37745f70d8672f57ed76125f422f1fbb82d.png" # image path/url
    alt: "cover" # alt text
    #caption: "My first" # display caption under cover
    relative: true # when using page bundles set this to true
    hidden: false # only hide on current single page
---

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-11.33.56d696a69629236737.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-11.33.56d696a69629236737.png)

> [Cloud Studio](https://cloudstudio.net) 是基于浏览器的集成式开发环境（IDE），为开发者提供了一个永不间断的云端工作站。用户在使用 Cloud Studio 时无需安装，随时随地打开浏览器就能使用。
> 

提供类似功能的还有 [Gitpod](https://www.gitpod.io)、[Github CodeSpace](https://github.com/codespaces) 等。但我在实际使用过程中发现这些同类产品在国内使用多少都有些问题。

为什么要介绍 [Cloud Studio](https://cloudstudio.net)，先来集结一下其他同类产品的问题吧。

## 问题集锦

- 问题一：不够稳定的 Codespace

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-11.46.102d978f2407604449.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-11.46.102d978f2407604449.png)

我使用 GitHub Codespace 已经有半年多时间了，看到网上一波媒体都商量似的猛吹 Codespace，我在使用过程中确实发现它有优秀之处。有限制的免费使用，原生的 GitHub 支持，延时也要优于  [Gitpod](https://www.gitpod.io) ，服务启动时自动检测并弹出提醒，使用比较贴心方便。

但最近一周的时间，我的电脑无论如何都打不开 codespace 了，无论是 台式机、MacBook，此前 iPad 还能打开一下，现在也不行了。查看开发者终端发现是 websockets 链接一直无法连接导致失败。

会有人说，不是还有 VS Code 吗。是的，使用 VS Code 也可以连接，但我发现此前很稳定的链接，最近频繁断线，频繁重连。原因未知，socket 梯子开关均无效，网上搜索能找到的还是那些铺天盖地猛吹 Codespace 的文章，真不知道他们是不是真的在用这款产品。

- 问题二：延时略高的 [Gitpod](https://www.gitpod.io)

Gitpod 相比于 Codespace 来说技术沉淀应该多一些，印象里它比 Codespace 要早一些推出。使用起来不会出现 Codespace 目前这种频繁断线，但由于其服务器在 US，用起来总是会卡卡的。

综上所属，我决定放弃 GitHub 原生支持的 Codespace 开始转战 Cloud Space。

## 未来之作

在这个万物皆云的时代，就是讲究一个“云”字。云开发、云桌面、云游戏这些概念早就被炒的火热了，但是真的落到实处服务在普通消费者的还是极少数。

接触 [Cloud Studio](https://cloudstudio.net) 已经很久了，但是一直没有用起来，原因有几个：

- 当时的自己的技术还比较局限，用不起来；
- 当时在线预览的功能不太好用。

然而在今天， Cloud Studio 已经非常好用了，而且依旧非常朴实实用，官网写着一句「如此纯粹的云端开发工具 Cloud Studio，**现在，可以免费使用。**」真的很打动我。

今天就来介绍一下，如何实用 Cloud Studio 来撰写发布 Hugo 博客。

## 云写博客

> **Hugo** 是一个用 [Go](https://zh.wikipedia.org/wiki/Go) 编写的静态网站生成器，一般只需几秒钟就能生成一个网站（每页少于 1 毫秒），被称为“世界上最快的网站构建框架”，是最热门的静态网站生成器之一，被广泛采用。
> 

至于 Hugo 的搭建、部署、配置方法，不是本文的重点，在少数派等平台有很完善的文章。本文**默认您已经在 GitHub 等平台完成 Hugo 搭建，主要介绍采用 Cloud Studio 撰写、预览及发布新文章**。

## 使用方法

> 建议下面的步骤在 Chrome 浏览器中完成，实测 Safari 浏览器可能无法打开工作空间。
> 

### 第一步：创建及配置运行环境

首先进入 [Cloud Studio](https://cloudstudio.net) 的[官网](https://cloudstudio.net)：[https://cloudstudio.net](https://cloudstudio.net/)，点击右上角的登陆/注册，使用 [Coding](https://coding.net) 或 Github 账号登陆授权后，进入工作空间：

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.45.050d1ad04ba6a40544.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.45.050d1ad04ba6a40544.png)

由于 Hugo 是 go 语言写成，因此在这里我们选择创建一个 go 语言环境，面去自行安装 go 运行环境的时间。当然，如果是其他需求，可以选择其他环境，或是选择空环境再自行配置，甚至直接选择自己的云主机。

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.48.31433d8c1865fb2081.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.48.31433d8c1865fb2081.png)

最简单的只需填写工作空间名称，和下面您的 Hugo 博客所在代码仓库地址即可。如果需要提交代码，则需要将下面给出的 「SSH公钥」配置到代码仓库中，点击即可复制。

配置好之后，您的工作空间才有向您的代码仓库提交代码的权限，就像在自己电脑上一样。实测这个公钥在您账号下的工作空间之间是通用的，即置一次，后续新的其他工作空间默认使用该公钥。

配置完毕后，点击新建，之后在工作空间选择您刚刚创建的空间点击进入，记得允许弹窗。

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.55.4208efcb30b0b1c2f9.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-1.55.4208efcb30b0b1c2f9.png)

工作空间启动速度应该很快，成功后就能看到一个 code-server 界面了。

> cloud studio 默认拉取 master 分支，因此如果您的仓库主分支名不是 master，比如 Github 当前默认分支名叫 main， 打开工作空间后会发现代码拉取失败。
> 

如果代码拉取失败，没关系，手动拉取一次即可，比如我的 Hugo 博客就在终端中执行这些代码即可：

```bash
# 拉取主仓库
git clone git@github.com:*******/********.git
# 拉取hugo主题，主题更新记得也要执行这段命令拉取最新主题
git submodule update --init -r
```

这里有一个小技巧，如果拉取时长时间没反应，就 `Ctrl+C` 中止后重新拉一次即可，因为 GitHub 主服务器距离较远，可能会有网络不稳定因素。

### 第二步：编译安装 Hugo

此时工作空间和代码都准备完毕，但想要运行，还需要安装一下 hugo 工具。由于实测 Cloud Studio 软件仓库自带的 Hugo 版本过老，可能与现代一些主题不匹配，因此这里介绍编译安装 Hugo 的方法。

```bash
$ mkdir $HOME/src
$ cd $HOME/src
$ git clone https://github.com/gohugoio/hugo.git
$ cd hugo
$ go install --tags extended
```

方法很简单，只需要挨个执行上面这些命令即可，命令来自 Hugo 官网。看一下安装的效果：

```bash
➜  RemoteWorking hugo version
hugo v0.90.0-DEV+extended linux/amd64 BuildDate=unknown
```

看到版本号说明安装成功，默认安装最新版本，如果想要回退到某个 hugo 版本，自行 `checkout` 到对应版本再安装即可。

### 第三步：配置在线预览并启动项目

终于准备完毕，现在执行 `hugo server` 已经可以跑起来了，但是看不到效果，下面就配置一下 Cloud Studio 的在线预览项目吧。

> Cloud Studio 使用一个配置文件来管理工作空间内的应用预览，这个文件是 `.vscode/preview.yml`，现在我们来生成这个文件。按下 Command + Shift + P 或 Ctrl + Shift + P，打开命令面板，输入 `preview`，在命令列表中点击 **Preview: Generate Preview Config File**。
> 

如果快捷键被占用，也可在 **菜单栏 → 查看 → 命令面板** 呼出，在里面选择 `Preview: 生成预览配置文件`。

我的配置文件如下，hugo 博客可以直接使用。

```bash
# .vscode/preview.yml
autoOpen: true # 打开工作空间时是否自动开启所有应用的预览
apps:
  - port: 1313 # 应用的端口
    run: hugo server --port=1313 --appendPort=false --baseURL="https://****.preview.myide.io/" --bind=0.0.0.0 -D # 应用的启动命令
    root: ./songtianlun.github.io # 应用的启动目录
    name: frytea-homepage # 应用名称
    description: my hugo website。 # 应用描述
    autoOpen: true # 打开工作空间时是否自动开启预览（优先级高于根级 autoOpen）
```

其中 hugo 的启动参数含义如下：

```bash
hugo server [flags]
      --appendPort             append port to baseURL (default true)
  -b, --baseURL string         hostname (and path) to the root, e.g. http://spf13.com/
      --bind string            interface to which the server will bind (default "127.0.0.1")
  -D, --buildDrafts            include content marked as draft
```

以上配置是我探索后认为最佳的启动参数，run命令不可折叠，必须一行写完，否则无法识别。使用该命令，开启后所有页面均可正常打开。

要注意的是，其中的 `--baseURL` 每个工作空间都不同，但是**同一工作空间配置端口后是不会改变的**，因此配置一次就不用管了。如果该参数配置错误，可能导致您 hugo 子页面无法正常预览。该参数现在可以先不填，之后运行时就可以获取到这个地址了，此时再填入即可。

运行该配置的方法也很简单，首先停止终端中运行的 `hugo server` ，之后呼出 **命令面板，选择** `Preview: 打开预览标签` ：

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-2.21.0054ed27b63c7984d4.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-2.21.0054ed27b63c7984d4.png)

之后选择刚刚创建的配置名称即可：

![https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-2.22.19751dffe71236a5e6.png](https://imagehost-cdn.frytea.com/images/2021/12/02/2021-12-02-2.22.19751dffe71236a5e6.png)

preview 插件会自动在终端中执行上面制定的 `run` 命令，并打开一个页内预览，您可以直接拷贝其中的地址到浏览器中访问。

记得将这个地址拷入刚刚所说的配置文件中的 `--baseURL` 部分，只有这样，您 hugo 博客中的每个页面才会依此地址生成，您可以正常预览后面的自页面。当然，如果您发现预览时只能打看主页，也可以检查一下该参数是否设定正确。

至此，方法介绍完毕，今后再打开该工作空间，就会自动开启预览，直接可以开始创作，是不是很省心。

## 使用限制

最后来说说限制吧，也是需要注意的地方，Cloud Studio，现在可以免费使用，但是使用过程中有一些限制。

- **数量限制**：目前每个用户最多可以创建 **5 个**工作空间，并且**只能同时运行一个工作空间**，如果您需要打开另一个工作空间需要先关闭当前运行中的工作空间。
- **时间限制**：每个用户每日可以使用工作空间**共 4** 小时，超出时间将不可使用（连接云主机的工作空间无此限制）。

## 总结

此次探索，始于 Codespace 的崩溃，得益于 Cloud Studio 在国内访问速度很快，使用体验很棒。只需要做好配置，用起来很顺滑。使用的这段时间里，真心感觉 Cloud Studio 是一款面向个人的良心之作，除了本文介绍的用途，还可以类比做其他更多事情，欢迎各位一起探索。

如果配置过程遇到问题，欢迎留言，一起讨论。

## 参考文献

- [Cloud Studio](https://cloudstudio.net/)
- [Using Hugo](https://www.gohugo.org/doc/overview/usage/) By Hugo 中文文档
- [hugo server](https://gohugo.io/commands/hugo_server/#options) By Hugo
- [在线预览调试](https://cloudstudio.net/docs/guide/preview.html#%E5%88%9B%E5%BB%BA%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4) By Cloud Studio
- [Cloud Studio 常见问题](https://cloudstudio.net/docs/others/#cloud-studio-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F) By Cloud Studio