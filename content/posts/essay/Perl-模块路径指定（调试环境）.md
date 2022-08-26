---
title: "Perl 模块路径指定（调试环境）"
categories: [ "编程开发" ]
tags: [ "Perl" ]
draft: false
slug: "561"
date: "2021-08-25 16:33:50"
---

在调试 Perl 测试程序时，常常需要在测试路劲执行 Perl 脚本，相应的 `.pm` 模块测试程序也需并不在 Perl 默认的模块路径下，使用以下语句即可指定模块检索路径。

```bash
#!/usr/bin/perl
use lib './';
use Person;
# Person 包模块与当前脚本同级，可用上面两行代码指定包位置
...
```

## 参考文献

- [Perl模块安装到非默认路径及其使用](https://blog.csdn.net/ganmao/article/details/2733872)
- [两种指定Perl模块目录的方法(PERLLIB和use lib)](http://blog.sina.com.cn/s/blog_3fe961ae0102vikm.html)