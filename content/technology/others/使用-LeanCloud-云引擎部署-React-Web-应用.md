---
title: "使用 LeanCloud 云引擎部署 React Web 应用"
categories: [ "技术价值" ]
tags: [ "LeanCloud","web","React" ]
draft: false
slug: "603"
date: "2021-12-12 22:48:58"
---

最近在探索 [KubeSphere](https://kubesphere.com.cn) 和 [K8s](https://kubernetes.io)，东西毫无疑问是好东西，学了在未来也很有用，但是用在个人开发上实在是费用有点高，当然也不太敢用在个人开源项目上，因此我再次开始探索适用于个人全栈应用托管平台。

提供这类 PaaS 云平台服务的公司有一些，比如 2007 年就开始开发的 [Heroku](https://heroku.com)，也有 [Vercel](https://vercel.com/) 这类现代化的 Web 应用托管平台，在国内则有 [Leancloud](https://www.leancloud.cn) 这种 BaaS 平台也可实现类似功能。

## 背景资料

之前做移动端开发就使用过 Leancloud，绝对是国内少数几个能提供给部分免费资源做开发学习使用的良心平台了，使用它来做数据托管非常好用，再也不用担心自己的软件数据库没有保障了。

后来做博客以及一些简单的 Web 单页应用，直接使用 Github Pages 服务即可完成托管。当然，动态类型网站我则是使用自己比较平价的服务器完成的，如今我的两台 1C1G 服务器都长年托管着10个左右 Web 应用。

比如之前的个人财务看板  [BJ-PFD](https://bjpfd.frytea.com) ，个人博客 [Frytea‘s Blog](https://blog.frytea.com)，随机壁纸生成器 [GRW](https://wallpaper.frytea.com) 等等。

再往前推几年，虚拟主机的概念非常盛行，也有不少提供虚拟主机服务的厂商，但是大都限制网站数量，当时我也正是因为这个原因才开始自己服务器。自己服务器的好处在于灵活，只要资源够用，几乎可以部署任何想要部署的服务，个人开发的作品一般流量也不会特别大，完全够用。

但是到现在，自己开发的作品需要一些持久化数据了，这就让我不敢随便找个服务器一扔，害怕哪一天一个不小心就没了。

于是今天我探索出一种完全使用 leancloud 进行全栈应用托管的方法，后面会进行详细介绍。

## 发展的过程

任何事物的发展和学习过程都要遵循一定规律，否则就容易空转。这是我自己在长期自学中总结出来的，也许不适用于大多数人，至少我自己是这样子的。

学习和发展需要循序渐进，就以软件开发为例，可以先做不依赖网络的本地小软件，再做前后端分离的某一端，再到全栈。做计算机系统开发时，则是需要自顶向下，先了解整体结构，再慢慢的向底层掘进。

如果一上来就全部负责，要学的面铺的太开，就容易放弃。必须学会将一个复杂的任务分解为一个个小任务，再去一点点完成。分解、完成，每一步都是技术活，必须慢慢积累才行。

## 部署方法

说了这么多，今天先来讲讲如何在 Leancloud 的云引擎中部署我们的 React 单页应用，并附带一个接口的转发。

### Step1: 源码及项目预备

在该步骤需要完成 leancloud项目创建、Github 项目创建、React 项目创建。

前两个创建自行完成即可，没什么好说的，React 则使用现成的项目或 [create-react-app](https://create-react-app.dev/) 来创建项目。

```bash
npx create-react-app react-for-engine --use-npm
```

之后将创建好的项目上传 Github 仓库中，后面来配置 Github action 自动部署脚本以及 Leancloud 的配置文件。

### Step2: 部署脚本和配置文件

在该步骤需完成项目执行脚本配置、leancloud 配置文件配置以及 Github action 部署流程配置。

- 项目脚本额配置

至于执行脚本，由于我的项目中需要用到一个接口的重写，因此使用一个简单的 node 程序来完成，内容如下：

```bash
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware')//反向代理
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use('/api', createProxyMiddleware({
    target: 'https://source.unsplash.com',
    changeOrigin: true,
    pathRewrite: { //路径替换
        '^/api': '/random', // axios 访问/api == target + /random
    }
}));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.LEANCLOUD_APP_PORT || 3010;
app.listen(port);

console.log('App is listening on port ' + port);
```

这里用到了 `http-proxy-middleware` ，如果没有安装记得安装下：

```bash
npm install http-proxy-middleware --save
```

如果无需处理跨域请求，直接使用 `npm run start` 即可运行的话则无需使用该脚本。需要注意的是其中监听端口需要使用 leancloud 提供的环境变量 `LEANCLOUD_APP_PORT` 指定的端口，如果用错了则无法正常访问服务。

如果直接使用 `npm run start` 启动的话则需修改 `package.json` 中 `start` 部分的声明：

```bash
"start":"set PORT=$LEANCLOUD_APP_PORT && react-scripts start",
```

- leancloud 配置文件

项目准备好后，需要告诉 leancloud 如何执行，就需要在根目录下创建 `leanengine.yaml` 来说明。

```bash
build: npm run build
#run: $(npm bin)/serve -c static.json -l ${LEANCLOUD_APP_PORT}
run: node app.js
```

作用大概不用我说了吧，由于我使用了一个 `http-proxy-middleware` 程序来执行项目，则直接将该程序命名为 `app.js`，启动时直接执行即可。

- Github action 部署脚本

对于 github 仓库的提交无法直接触发 leancloud 构建，因此需要提交时发出一个 `webhooks` 来触发，创建一个新的 workflow `.github/workflows/main.yml`:

```
# Controls when the action will run. Triggers the workflow on push request for the master branch
on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to LeanEngine
      uses: enflo/curl-action@v1.2
      with:
        curl: -X POST https://cn-n1-console-api.leancloud.cn/1.1/engine/groups/web/production/version?gitTag=${{ github.sha }}&token=${{ secrets.DEPLOY_TOKEN }}
```

记得在 github 仓库中将 leancloud 部署后台提供的 `DEPLOY_TOKEN` 声明在 github 中，方可完成触发。

### Step3: 部署和后续

完成上面的流程，开启 github 仓库中的 action 开关，提交上面的改动，如果一切顺利，即可触发部署。

对了，在最后，还需要在 leancloud 绑定一个备案过的域名，才能正常访问服务。

## 总结

至此，简单的 Leancloud 部署 react 单页应用的方法介绍完毕，由于 Leancloud 是一个 BaaS 平台，可直接当作简单后端和数据存储服务器来使用，做开发测试使用很好，等后期有流量了再升级付费套餐即可获取更好的服务体验。

总之，这样一个辅助快速开发的平台对于开发者来讲好处多多，无需关注更多技术细节即可将自己的规划实现，快速上线，如果效果可以，再去考虑升级和改造即可，避免了前期资源的浪费。

最后，还是希望各位珍惜这样的好资源，好好使用，未来可能的情况下都是用付费套餐，只有有利可图了，那些真心愿意做好服务的人们才能提供更好的服务。

## 参考文献

- **[在云引擎上部署 React 单页应用 By Leancloud](https://leancloudblog.com/deploy-react-spa-on-leanengine/)**
- [Heroku By Wikipedia](https://zh.wikipedia.org/wiki/Heroku)