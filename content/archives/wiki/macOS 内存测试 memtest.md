---
title: 'macOS 内存测试 memtest'
date: '2023-07-19T02:52:55.645Z'
tags: ['macOS']
created: '2023-07-19T02:51:43.113Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '1'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 12:20, 19th 八月 2023 -->

# macOS 内存测试 memtest

安装方法，命令行下执行：

```bash
brew install memtester
```

关于homebrew安装brew.请访问：

<https://brew.sh/>

安装完成之后，也很简单。打开多个Termial. 然后每个执行：

```
memtester 2048m
```

注意：请根据你自己的内存选择每个的大小。不要过大。小心内存爆炸，你无法操作。

## References

* [mac 下内存测试-memtest](https://www.cqmaple.com/201907/mac-memtest.html)