---
title: "Tiddlywiki 单体/文件夹互转"
categories: [ "技术" ]
tags: [ "Tiddlywiki5" ]
draft: false
slug: "781"
date: "2023-04-22 15:40:07"
---

```bash
# TiddlyWiki单文件转文件夹命令
$ tiddlywiki --load ./mywiki.html --savewikifolder ./mywikifolder

# TiddlyWiki文件夹转单文件命令
$ tiddlywiki ./mywikifolder --rendertiddler '$:/core/save/all' mywiki.html text/plain
```

## Reference

* [TiddlyWiki文件夹版与HTML版相互转换](https://zhuanlan.zhihu.com/p/553848135)

