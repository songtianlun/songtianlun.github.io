---
title: "Python 传值 or 传引用"
categories: [ "技术" ]
tags: [ "python" ]
draft: false
slug: "622"
date: "2022-01-19 09:11:11"
---

先说结论：python不允许程序员选择采用传值还是传引用。

- 如果函数收到的是一个 **可变对象** （比如 **字典** 或者 **列表** ）的引用，就能修改对象的原始值－－相当于通过“**传引用**”来传递对象。
- 如果函数收到的是一个 **不可变对象** （比如 **数字** 、 **字符** 或者 **元组** ）的引用，就不能直接修改原始对象－－相当于通过“**传值**'来传递对象。

在函数传值，或函数内部函数引用外部变量时，基本符合这个逻辑，比如：

```python
def test_dect_out():
    lvs = {}
    num1 = 3

    def lan():
        lvs['sss'] = 4
        num1 = 5
        return lvs, num1

    print(lvs, num1)
    print(lan())
    print(lvs, num1)

{} 3
({'sss': 4}, 5)
{'sss': 4} 3
```

## 参考文献

- **[python函数传参是传值还是传引用？](https://www.cnblogs.com/loleina/p/5276918.html)**