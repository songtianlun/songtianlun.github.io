---
title: "一键在 vs code online 中打开任意 github 仓库"
categories: [ "技术" ]
tags: [ "github" ]
draft: false
slug: "568"
date: "2021-09-03 17:58:13"
---

之前有大佬开发过一个项目 `[github1s](https://github.com/conwnet/github1s)` ，利用 GitHub action ，仅需在任意 github 仓库在 `github` 后面加上 `1s` 即可在一个在线的 VS code 中打开这个项目。

![https://imagehost-cdn.frytea.com/images/2021/09/03/2021-09-03-5.51.4487ec1eade813be27.png](https://imagehost-cdn.frytea.com/images/2021/09/03/2021-09-03-5.51.4487ec1eade813be27.png)

就在前不久，Github 官方发布了类似的功能，进一步简化了这个过程，仅需在仓库的 web 页面，按下 `.` 键，没错就是键盘上那个句号，github 就会打开一个在线的 VS code 并开启该仓库，您就可以更方便的浏览这个仓库了。

![https://imagehost-cdn.frytea.com/images/2021/09/03/2021-09-03-5.54.000522906cfa16b653.png](https://imagehost-cdn.frytea.com/images/2021/09/03/2021-09-03-5.54.000522906cfa16b653.png)

两个方式原理类似，都是跳转到另一个网址，之后使用该路径中的地址获取到仓库代码并显示，不得不说，这个功能真的是用起来太爽了，各位好好使用。

## 参考文献

- [github/**dev**](https://github.com/github/dev)
- [conwnet/**github1s**](https://github.com/conwnet/github1s)