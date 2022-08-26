---
title: "【持续集成】Android使用Github Action自动打包并发布Fir.im内测"
categories: [ "编程开发" ]
tags: [ "android" ]
draft: false
slug: "260"
date: "2019-11-17 21:36:00"
---

![B8A09718-BB0F-4896-82E9-332323220F15.jpeg][1]

!!!
<center> Photo by Mesut Kaya on Unsplash </center>
!!!

为什么封面图是一张旅游的照片？因为使用 CI/CD 等工具高效的完成工作，就可以出去玩了！

## 前言

[GitHub Actions](https://github.com/features/actions) 是 [GitHub](https://github.com) 官方提供并免费提供给开源仓库使用的持续集成服务，在进入本文主题之前，先讲讲什么是持续集成 (CI/CD) 。

## 持续集成（CI/CD）

根据 WIkiPedia 引用自[What is CI/CD - all you need to know](https://codilime.com/what-is-ci-cd-all-you-need-to-know/) 的说法：

> In software engineering, CI/CD or CICD generally refers to the combined practices of continuous integration and continuous delivery (aka continuous deployment).

简单来说就是指"持续集成和持续交付"，更生动的表述可以引用自红帽官网[《什么是 CI/CD？》](https://www.redhat.com/zh/topics/devops/what-is-ci-cd)一文中的描述：
 
 > CI/CD 是一种通过在应用开发阶段引入自动化来频繁向客户交付应用的方法。CI/CD 的核心概念是持续集成、持续交付和持续部署。作为一个面向开发和运营团队的解决方案，CI/CD 主要针对在集成新代码时所引发的问题（亦称：“集成地狱”）。

> 具体而言，CI/CD 在整个应用生命周期内（从集成和测试阶段，到交付和部署）引入了持续自动化和持续监控。这些关联的事务通常被统称为“CI/CD 管道”，由开发和运维团队以敏捷方式协同支持。

通俗来说，持续集成是面对开发团队不同人员针对同一软件开发产品不同部分代码的集成、持续交付、部署问题的一套解决方案。举个例子，在没有持续集成系统之前，团队合作进行软件开发，就需要有人专门负责代码的整合、编译、部署，而有了持续部署系统之后，团队成员只需将自己的代码提交至公共代码仓库，系统接收到代码推送请求后就会自动的执行一系列实现约定好的工作流程，不再需要有人专门负责这一工作，代码提交者也可以实时的看到自己的代码在整个系统中的运行状况，极大的提高了开发效率。

目前提供CI/CD服务的有很多家：

- [GitHub Actions](https://github.com/features/actions)
- [Travis-CI](https://travis-ci.org/)
- [CircleCI](https://circleci.com/)
- [Jenkins](https://jenkins.io/) 
- [GitLab](https://gitlab.com/)
- [Bamboo](https://www.atlassian.com/zh/software/bamboo)

其中 Teavis-CI 和 CircleCI 对开源产品比较友好，在 GitHub Action 之前，它们几乎是开源产品必备的 CI/CD 的工具，开源代码仓库常见的这个绿色的 "passing" 就是 Travis-CI 很经典的一个部署状态徽标，这一抹绿不知道带给多少人多少快乐（编译不通过的苦懂得人自然会懂）。

[![Build Status](https://travis-ci.org/songtianlun/PlanAssistant.svg?branch=master)](https://travis-ci.org/songtianlun/PlanAssistant)

而 Jenkins 和 GitLab 是开源可自主部署的， Jenkins 使用 Java，可以部署在私有的服务器上，至于 GitLab 虽天然带有 CI/CD ，但一些操作必须依赖 Jenkins 才能完成。本人对于 Bamboo  的了解不多，偶然进入官网发现也是一个 CI/CD 工具，遂记录。

CI/CD 工具可以做很多事情，大概的操作逻辑就是：

1. 触发条件
2. 编译及前后工作
3. 结束

给一个触发自动化部署的条件，比如提交代码后由代码参考使用 WebHook 向服务发送一个请求从而触发构建；触发后就是开发者的天下啦，CI/CD 是一个忠实的小精灵，它对于您给它的指令绝对服从，因此从这里就可以指定需要自动执行的操作了，比如：环境配置、编译、响应函数、发送状态邮件等等。

GitHub Action 虽为后起之秀，但它的出现还是让此前的 CI/CD 服务提供者捏了一把汗。因为 GitHub 本身就是全球最大代码托管仓库，而上文提到的 Travis-CI 等多是要针对 GitHub 仓库内的代码提供服务，而现在 GitHub 自身提供了别家依赖它实现的功能。

## GitHub Action

GitHub Action 提供的 CI/CD 持续部署环境很是吸引我，根据官网描述:

> Each virtual machine has the same hardware resources available.
> - 2-core CPU
> - 7 GB of RAM memory
> - 14 GB of SSD disk space
> 
> Virtual environment
> - Windows Server 2019
> - Ubuntu 18.04
> - Ubuntu 16.04
> - macOS X Catalina 10.15	macos-latest

这样一个配置的 CI/CD 环境对现在的我来说已经是豪华阵容了，试想使用 GitHub Action 就意味着有一台 2C 7G 的电脑专门为我的代码完成编译工作，此外这台电脑还是同时支持 Windows, Linux, Mac OS 系统的，也就是说我可以在这台电脑上完成现在针对所有主流平台代码的编译工作，是不是挺爽的？更详细的环境支持说明在 GitHub 官网 中的这篇文章可以看到 [Software installed on GitHub-hosted runners](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/software-installed-on-github-hosted-runners).

更多关于 GitHUb Action 的说明可以在其官网找到详细描述，在此不再赘述，至于地址在文章一开始就有给出。下面就来记录一个使用 Github Action 的具体操作：**代码提交后触发 => 编译并打包生成 APK 安装包 => 提交到 [Fir.im](https://fir.im) 应用内测分发平台**。

## Package Andrpid apk

先来分析一下需求，根据 CI/CD 的思想，将需要完成的工作流程化，建立一条流水线。我需要完成的工组有：

 1. 将 Android  程序源代码编译打包为 apk 安装包并签名
 2. 将编译通过并签过名的 apk 安装包上传至 fir.im 内测应用分发平台

明确需求下面就可以开工了。GitHub Action 的使用非常简单，在代码仓库中选择 Action 选项卡进入，或直接在根目录下建立文件夹 `.github/workflows` 并在其中新建一个 `*.yml`的文件即可，此文件就是指定你需要 Action 帮你完成的工作。GitHub MarkPlace 中提供了上千种社区开发者贡献的模版可以根据需求拿来使用。

![AD787804-4BFB-44F6-B3EB-31E5DD316695.png][2]

### Package

GitHub 为 Android Apk 打包提供了一个模版，打开之后文件内容大概是这样子：

```yml
name: Android CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - name: Build with Gradle
      run: ./gradlew build

```
模版创建会自动化在仓库 `.github/workflows`文件夹下新建一个  `android.yml` 文件，这个文件制定的工作流就已经可以完成 Android Apk 的打包工作j，但是我不光要完成打包，还要上传 fir.im ，下面就开始基于这个模版进行修改。

执行到文件结束就完成了打包工作，下面将打包的成果提交到 fir.im。

### install fir-cli

「[fir.im](https://fir.im)」是国内首家为移动开发者提供 App 免费托管分发服务的平台，为移动开发者提供极速测试发布、崩溃收集分析、用户反馈收集等一系列开发测试效率工具服务，能够让开发者更专注于产品开发与优化。而 [fir-cli](https://github.com/FIRHQ/fir-cli/blob/master/README.md)是 fir.im 提供的一个可以通过指令查看, 上传, iOS/Android 应用的工具，想要在 CI/CD 环境中将应用提交到 fir.im 就需要安装这个工具。 fir-cli 使用 Ruby 构建, 无需编译, 只要安装相应 gem 即可. 

```
$ ruby -v # > 2.6.1
$ gem install fir-cli
```

因此我们需要准备一个 Ruby 环境，在 `.yml` 文件末尾添加下列内容：

```
- uses: actions/cache@preview
      id: cache
      with:
        path: ~/local/rubies
        key: ruby-2.6.5    
    - uses: clupprich/ruby-build-action@master
      id: ruby
      with:
        ruby-version: 2.6.5
        files: app/build/outputs/apk/release/app-release.apk
```

参考模版在这里： [GitHUb/Marketplace Actions Setup Ruby environment with ruby-build](https://github.com/marketplace/actions/setup-ruby-environment-with-ruby-build)。

### Upload to fir.im

执行到这里就完成了 fir.im 运行环境的准备，下面就开始上传：

```yml
- name: install fir.im
      run: gem install fir-cli
- name: Upload to Fir.im
      run: fir login ${{ secrets.FIRTOKEN }}
- run: fir publish app/build/outputs/apk/release/app-release.apk
```

其中 `FIRTOKEN` 需要在代码仓库中设置，即 fir.im 账户中提供的 token。

![C490731D-1496-453F-B9FB-A25F84320D2A.jpeg][3]

接下来提交，触发构建，GitHub Action 就会完成指定的工作。

![0B5D9692-D80D-492B-90CF-40DE21B28687.png][4]

GitHub Action现在也提供了类似于上文提到的构建状态徽标，MarkDown 使用格式如下二选一：

```
https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_NAME>/badge.svg

https://github.com/<OWNER>/<REPOSITORY>/workflows/<WORKFLOW_FILE_PATH>/badge.svg
```

例如我想要调用 `songtianlun` 中 `Plan Assistant` 代码仓库中的 `Android CI` 工作流构建状态就可以通过 `https://github.com/songtianlun/PlanAssistant/workflows/Android%20CI/badge.svg`看到下图所示效果：

![](https://github.com/songtianlun/PlanAssistant/workflows/Android%20CI/badge.svg)

最后只需要下面这个网址，就可以下载到我的 Android 程序 PlanAssistant 最新内测版本了。而这一切的工作只需我进行一次代码提交，其他的 GitHub Action 就可以帮我完成，个人以为挺神奇的。

https://fir.im/xm19

## End

终于完成本文，对 CI/CD 一直很感兴趣，目前在加拿大一台私有服务器部署自己的 Jenkins 并使用了几个月了（要问为什么是加拿大，还不是因为便宜，无奈忍受高延迟享受好计算力），现在GitHub 提供了这么好的平台对于目前毫无收入的我简直犹如久旱甘霖（下个月终于不用再承受不贵但还有点贵的续费费用）。而现在终于抽空研究通了使用 GitHub Action 替代 Jenkins 的方法。Jenkins 可私有部署，因而对于私密性要求较高的构建很友好，开源产品还提供了很方便美观的客户端，这就是开源的好处。而 GitHub 被 Microsoft 收购以后貌似其计算力提高了一大截，虽然现在主要服务还是部署在 Awazon Cloud Services ，国内访问需要忍受 AWS 国际版的高延迟，但其存在意义不言而喻。如果需要私有部署的代码仓库替代品有 GitLab、Gites等开源产品可私有部署，还有国内的 Gitea、Coding、DevCloud 等代码仓库服务，总是可以满足需求。而 CI/CD 在当前这个互联网节奏越来越快的时代一定会成为软件产品的必需品，总的来说折腾起来还是挺有意思的。

没想到写了这么久，更多详细的信息还可以在相关文献中阅读，GitHub Action 的使用实测在 Google 使用 English 检索可以找到更有意义的答案，对于我来说这也是一个难得的提高英语的途径了。

## 相关文献

 - [CI/CD - WikiPedia](https://en.wikipedia.org/wiki/CI/CD)
 - [什么是 CI/CD？](https://www.redhat.com/zh/topics/devops/what-is-ci-cd)
 - [CI/CD for Flutter Apps Using GitHub Actions](https://medium.com/better-programming/ci-cd-for-flutter-apps-using-github-actions-b833f8f7aac)
 - [GitHub Actions on Android project](http://vgaidarji.me/blog/2019/01/27/github-actions/)
 - [Fir.im - 百度百科](https://baike.baidu.com/item/FIR.im)
 - [GitHub/FIRHQ/fir-cli/doc/install.md](https://github.com/FIRHQ/fir-cli/blob/master/doc/install.md)
 - [GitHub/Marketplace Actions Setup Ruby environment with ruby-build](https://github.com/marketplace/actions/setup-ruby-environment-with-ruby-build)
 - [GitHub Help/GitHub Actions Automating your workflow Getting started Configuring a workflow](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository)
 - [Action Example - actions/setup-node](https://github.com/actions/setup-node)


  [1]: https://blog.frytea.com/usr/uploads/2019/11/832379560.jpeg#shadow
  [2]: https://blog.frytea.com/usr/uploads/2019/11/3083364585.png#shadow
  [3]: https://blog.frytea.com/usr/uploads/2019/11/1945647668.jpeg#shadow
  [4]: https://blog.frytea.com/usr/uploads/2019/11/1705409283.png#shadow