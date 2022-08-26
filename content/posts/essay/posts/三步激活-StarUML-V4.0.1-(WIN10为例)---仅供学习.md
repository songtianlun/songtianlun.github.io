---
title: "三步激活 StarUML V4.0.1 (WIN10为例) | 仅供学习"
categories: [ "技术价值" ]
tags: [ "StarUML","UML" ]
draft: false
slug: "524"
date: "2021-04-07 21:05:00"
---

[StarUML](https://staruml.io/) 是一个开源的 `UML` 工具列表软件，它遵守 `GNU GPL` 的一个修订版。`StarUML` 项目宣称的目标是代替大型的商业 UML 工具软件，如 `IBM` 的 `Rational Rose` ， `Borland` 公司的 `Together` 。`StarUML` 支持 UML2.0 定义的大多数图，是一款跨平台且轻量高效的现代 UML 绘图工具。

但由于其商业性质，免费版仅提供一段时间的试用预览，到期后导出图片会有 `未注册` 字样水印，非常影响成图质量。经过一番研究，StarUML 采用 `Electron` 框架，使用 `node.js` 实现，仅需简单修改其中许可证判定代码即可完成破解，在此感谢万能的 GitHub 社区。

**本教程激活 StarUML V4.0.1 ，平台为 Win10**。

## 学（ji）习（huo）步骤

### 第一步，解包

`app.asar` 文件是 `Electron` 程序的主业务文件，是一种压缩格式的文件。我们需要修改的部分就被压缩在这里，具体文件位置为：

```
C:\\Program Files\\StarUML
├─locales
├─resources
| └─app.asar
└─swiftshader

```

> app.asar 文件可以使用编辑器直接打开，但如果直接修改会导致程序无法正常运行，因此需要解包修改再压缩。

解包前需要确认您的电脑已经安装 `node.js` ，可在 `CMD` 执行以下命令，若回显版本号说明已安装，若没有安装请移步：[https://nodejs.org/en/](https://nodejs.org/en/)

```
C:\\Program Files>node -v
v12.18.3
```

之后全局安装 `asar` 工具：

```
npm install -g asar
或者
cnpm install -g asar

C:\\Program Files>asar -V
v3.0.3

// 出现版本号说明安装成功
```

解压 `app.asar` 文件：

```
asar extract app.asar ./asar/
```

使用上面命令将 `app.asar` 解压到同级目录 `asar` 下，前提是 `cd` 到文件所在目录，并创建好 `asar` 文件。

> 2021年9月26日更新
实测 Ubuntu 20.04 下 StartUML 4.1.2 成功

```bash
$ sudo find / -name "app.asar"
/opt/StarUML/resources/app.asar
```

### 第二步，激活

解压后在 asar 目录下，找到这个文件：`asar\\src\\engine\\license-manager.js`，使用你偏好的编辑器打开，修改其中这段代码：

```
  checkLicenseValidity () {
    this.validate().then(() => {
      setStatus(this, true)
    }, () => {
      //setStatus(this,false)  <-- comment this line
      setStatus(this, true) //<-- add this line
      //UnregisteredDialog.showDialog() <-- comment this line
    })
  }

```

注意其中注释的部分，总结来看就是将 `false` 改为 `true`，再将 `false` 的后续动作注释即可。

> MaxOS, Linux 类比修改，下面是我在 GitHub 找到的 v3.0.* 文件位置，待验证。。。
Mac OS: /Applications/StarUML.app/Contents/www/license/node/
Linux: /opt/staruml/www/license/node/

### 第三步，压缩

修改完成后，将修改后的内容重新打包回 `app.asar` ，使用以下命令压缩即可，其中 pack 是我前一步解压的目录：

```
asar pack asar app.asar

```

注：建议在此前备份旧的 app.asar 文件，以免造成无法挽回的损失。

若不出意外，到这里 StarUML 就已经成功激活了。

![https://imagehost-cdn.frytea.com/images/2021/04/07/20210407210104e7b6dba384d8b246.png](https://imagehost-cdn.frytea.com/images/2021/04/07/20210407210104e7b6dba384d8b246.png)

[tip type="info" title="资源"]
为方便有需求的朋友，在这里直接给出我修改好的 `app.aspr` 及对应版本的安装包，安装好后替换 `app.aspr` 即可。

[file href="https://res.frytea.com/Dev/%E5%AE%9E%E7%94%A8%E5%B7%A5%E5%85%B7/StarUML_with_aspr.zip?download"]StarUML_with_aspr.zip[/file]

> 若链接失效，请留言，或前往我的 [资源站](https://res.frytea.com/) 查找。

[/tip]

## 总结

本文介绍了一种简单的直接使用官网版本激活 StarUML 的方法，避免了不明来源的破解程序对你电脑的侵害。

特别说明：本方法仅用于学习用途，请勿商用，若产生纠纷本文作者概不负责。

## 参考文献

- [Get full version of StarUML](https://www.notion.so/40b1d83618ae8e3d2da59df8c395093a)
- [如何解压 electron 的 app.asar](https://blog.csdn.net/qq_35432904/article/details/107381278)
- [PM 安装 asar，打包，解压，查看 asar 文件](https://blog.csdn.net/shufan209/article/details/106332228)