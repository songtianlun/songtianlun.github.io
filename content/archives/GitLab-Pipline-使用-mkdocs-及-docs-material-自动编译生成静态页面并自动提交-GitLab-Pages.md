---
title: "GitLab Pipline 使用 mkdocs 及 docs-material 自动编译生成静态页面并自动提交 GitLab Pages"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "275"
date: "2019-12-03 18:33:00"
---

> 又被一个问题折磨疯了，然后又在一个莫名其妙的地方解决了？？？

[MkDocs](https://www.mkdocs.org/) 是一个快速、简单、快捷可用的静态网站生成工具，文档使用 Markdown 书写，并仅需一个 YAML 配置文件。静态页面生成工具有 [Docsify](https://docsify.js.org/#/), [VurPress](https://vuepress.vuejs.org/), [GitBook](https://github.com/GitbookIO/gitbook), [hexo](https://hexo.io/zh-cn/index.html), [Hugo](https://gohugo.io/) 等等。本人使用过 `Hexo`和 `Docsify`，直到我发现了 MkDocs 以及它的绝配主题 [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) ，`Mkdocs` 的目录下仅需一个配置文件，然后就是完全的 MakeDown 文件即可，没有其他多余的配置，深得我心。今天就来讲讲如何为它配置一下 GitLabPipline 实现自动生成并提交到 GitLabPages。

![D6490D00-279B-4924-B04E-33DE1D57DFDD.png](https://imagehost-cdn.frytea.com/images/2019/12/03/D6490D00-279B-4924-B04E-33DE1D57DFDD.png#shadow)

## 安装 Mkdocs 及主题

1、 安装 mkdocs

```
pip install mkdocs
```

2、 新建项目

```
mkdocs new my-project
cd my-project
```

3、 撰写文档

进行到这一步会发现，初始化的 Mkdocs 项目文件夹下仅有一个 `docs` 文件夹和 `mkdocs.yaml` 配置文件，及其简单，接下来就可以根据需要进行文档撰写，左侧的树形导航可以在 yaml 文件夹中配置，下面给一个多级菜单的配置样例:

```
# Page tree
nav:
  - Material Docs: index.md
  - Program Grammar OS:
    - Core-OS: Program-OS/OS-Core/index.md
    - Program Grammar:
      - MarkDown: Program-OS/Program-Grammar/Markdown/index.md
      - Linux Command: Program-OS/Program-Grammar/Linux-Command/index.md
      - English: Program-OS/Program-Grammar/English/index.md
      - Java: Program-OS/Program-Grammar/Java/index.md
      - YAML: Program-OS/Program-Grammar/YAML/index.md
      - XML: Program-OS/Program-Grammar/XML/index.md
      - json csv: Program-OS/Program-Grammar/json-csv/index.md
      - Bash: Program-OS/Program-Grammar/Bash/index.md
    - Operation System:
      - GNU/Linux distribution: Program-OS/Operation-System/Linux-distribution/index.md
      - Windows: Program-OS/Operation-System/Windows/index.md
      - OS X: Program-OS/Operation-System/OS-X/index.md

```

需注意：最后一级导航指向md文件，在此之前的上一集菜单 `:` 后必须留空。

4、 提交至 GitLab

简单描述，按照日常的 git 提交步骤来即可。

```
cd my-project
git init
git remote add origin git@code.frytea.com:songtianlun/docs.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

5、 配置 GitLab pipline

请注意，如果需要使用 GitLab PipLine 并自动提交到 GitLab Pages，请为 GitLab 配置好一个基于 Docker的 [GitLab Runner](https://docs.gitlab.com/runner/) 并开启 [GitLab pages](https://docs.gitlab.com/ee/administration/pages/)。具体方法请查阅超链接部分的文档。

在项目跟目录下新建一个 `.gitlab-ci.yml` 文件，并写入如下内容：

```
image: python:alpine

before_script:
  - pip install -i https://pypi.tuna.tsinghua.edu.cn/simple mkdocs && mkdocs --version
  - pip install -i https://pypi.tuna.tsinghua.edu.cn/simple mkdocs-material

pages:
  script:
  - mkdocs build
  - mv site public
  artifacts:
    paths:
    - public
  only:
  - master
```

其中，第一行指定使用 `python:alpine` Docker 镜像，`before_script` 节点下的两条指令为使用清华的 Python 镜像站 安装 mkdocs 及 mkdocs-material。`pages ` 中的 `mkdocs build ` 为 mkdocs 的生成命令，会将页面渲染为静态网站并放在 `site` 文件夹下，之后 `mv site public ` 将生成好的网站转移到 `public` 文件夹下，最后提交到 GitLabPages.

之后提交，触发构建，~~解决问题~~，完成。

完成，欢迎来我的文档网站看看: <https://docs.frytea.com/>

![231CEBEB-FB47-4F5E-83E7-3962684C669F.png](https://imagehost-cdn.frytea.com/images/2019/12/03/231CEBEB-FB47-4F5E-83E7-3962684C669F.png#shadow)

## 参考文献

 - [mkdocs](https://www.mkdocs.org/)
 - [mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
 - [GitLab Pages administration](https://docs.gitlab.com/ee/administration/pages/)
 - [GitLab Runner Docs](https://docs.gitlab.com/runner/)