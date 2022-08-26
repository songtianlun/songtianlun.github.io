---
title: "Perl 面向对象之基类(use base)"
categories: [ "编程开发" ]
tags: [ "Perl" ]
draft: false
slug: "562"
date: "2021-08-25 16:39:33"
---

```perl
use base somemodule;

# 相当于以下两句的结合：

BEGIN{
    use somemodule ();
    push @ISA, qw(somemodule);
}

# 也可以同时 use base 两个或者两个以上的模块，即多继承，例如：

use base qw(Foo Bar);

BEGIN {
    use Foo ();
    use Bar ();
    push @ISA, qw(Foo Bar);
}

```

- `Perl`  里 类方法通过 `@ISA` 数组继承，这个数组里面包含其他包（类）的名字，变量的继承必须明确设定。
- 多继承就是这个 `@ISA` 数组包含多个类（包）名字。
- 通过 `@ISA` 只能继承**方法**，**不能继承数据**。

## 参考文献

- [Perl 面向对象](https://www.runoob.com/perl/perl-object-oriented.html)
- [Perl 中的 use base 的用法](https://blog.csdn.net/zll01/article/details/4520237)