---
title: "perl '-&gt;' 和 '::' 的区别 | 方法和函数的区别"
categories: [ "技术" ]
tags: [ "Perl","PVE" ]
draft: false
slug: "600"
date: "2021-11-24 17:38:00"
---

最近在看 PVE 源码时看到这样一段：

```perl
# old code uses PVE::RPCEnvironment::get(); 使用冒号表示调用函数
# new code should use PVE::RPCEnvironment->get(); 使用箭头表示法调用方法
sub get {
    return PVE::RESTEnvironment->get();
}
```

好奇两种调用方式是什么区别，经过研究，我在这篇文章[^1]找到答案，两者差异在于：

- 使用 **冒号** 表示 **调用函数**
- 使用 **箭头** 表示 **调用方法**

[^1]: [Methods, Functions and Subroutines in Perl and what is $self ?](https://perlmaven.com/methods-functions-and-subroutines-in-perl)

以下是引用翻译：

我们知道在 Perl 中，Function 和 Subroutine 这两个名称是可以互换的。但是函数和方法的区别到底是什么呢？

表面上没有什么不同。它们都是使用 `sub` 关键字声明的。差异主要在于它们的使用方式。

总是使用箭头表示法调用方法。对象: `$p->do_something($value)` 或类: `Class::Name->new` 。

函数总是直接调用: 使用它的完全限定名: `Module::Name::func_something($param)` ，或者，如果函数是当前名称空间的一部分，则使用短名: `func_something($param)` 。

如果在调用它的对象的类中找不到方法， `Perl` 将转到父类并在那里寻找具有相同名称的方法。它将使用其内置的方法解析算法递归地执行它。如果根本找不到该方法，则它将放弃(或调用 `AUTOLOAD` )。另一方面， `Perl` 将只在单个位置查找函数(如果可用，则为 `AUTOLOAD` )。

方法总是将当前对象(或类名)作为其调用的第一个参数。函数永远不会得到对象。(除非您手动将其作为参数传递。)因此，方法通常作用于实例(对象) ，有时作用于整个类(然后我们称之为 `class-method` )。另一方面，函数从不作用于对象。尽管它可能会对班级产生影响。