---
title: "Python 实战项目解决循环依赖问题"
date: 2021-12-27T14:13:26+08:00
description: "记录一次定为解决 python 循环依赖问题。"
categories: ["技术笔记集"]
tags: ["python"]
draft: false
---

## 问题重现

在一次简单的代码合并后，发现 Python 项目跑不起来了，报错如下：

```bash
ssh://root@192.168.226.76:22/usr/bin/python3 -B -u /tmp/pycharm_project_882/mimic_daemon_server/helper_main.py
Traceback (most recent call last):
  File "/tmp/pycharm_project_882/mimic_daemon_server/helper_main.py", line 1, in <module>
    from mimic_daemon_server import create_app
  File "/tmp/pycharm_project_882/mimic_daemon_server/__init__.py", line 14, in <module>
    from mimic_daemon_server.nodes import nodes
  File "/tmp/pycharm_project_882/mimic_daemon_server/nodes/__init__.py", line 2, in <module>
    from . import route
  File "/tmp/pycharm_project_882/mimic_daemon_server/nodes/route.py", line 5, in <module>
    from mimic_daemon_server.guest_common import ReplicationConfig
  File "/tmp/pycharm_project_882/mimic_daemon_server/guest_common/__init__.py", line 3, in <module>
    from .abstract_config import AbstractConfig
  File "/tmp/pycharm_project_882/mimic_daemon_server/guest_common/abstract_config.py", line 16, in <module>
    import mimic_daemon_server.qemu_server.Drive
  File "/tmp/pycharm_project_882/mimic_daemon_server/qemu_server/__init__.py", line 25, in <module>
    from .QemuConfig import QemuConfig
  File "/tmp/pycharm_project_882/mimic_daemon_server/qemu_server/QemuConfig.py", line 12, in <module>
    from mimic_daemon_server.guest_common import AbstractConfig
ImportError: cannot import name 'AbstractConfig' from 'mimic_daemon_server.guest_common' (/tmp/pycharm_project_882/mimic_daemon_server/guest_common/__init__.py)

进程已结束,退出代码1
```

由于我在 Python 领域还是个初学者，没有遇到类似问题，但是根据分析，问题应该是出在了 **循环依赖**。

```bash
a------->b-------->c
         ^         |
         |         |
         +----d<---+
```

## 报错分析

何为循环依赖呢？首先要搞清楚一点，python模块是天然的单例类，就是说第一次导入时会产生一个实例，后面再导入都会直接返回该实例。

模块的初始化时被导入时进行的，就是说每一次 `import` 都会执行 `__init__.py` 内的代码。

一旦 Python 的模块导入规划不合理，造成了多个互相依赖的模块均在第一次进入时开始实例化，就会产生 **循环依赖** 问题。

总结一下，**Python 模块是可以循环依赖的，但是必须避免循环实例化**。

## 解决方法

解决循环依赖的方法也有很多：

### (1)打破循环实例化态

如果想快速解决，在报错日志中找到循环实例化的两个模块，打破其循环实例化的状态即可。

例如观察文首的一段日志，会很明显的发现调用栈中前后引入了同一个模块，很容易定位到问题。

### (2) 强制指定实例化顺序

可以在整个项目的根模块中的 `__init__.py` 中将所有子模块依赖一遍，调整可能出现循环依赖的顺序，就可以避免后期模块间依赖时产生不可预知的循环依赖问题。

也可以在模块中提供一个 `init` 方法，在需要的地方手动控制实例化顺序，避免导入时意外的循环依赖。

## 总结

Python 模块间可以随意引用，但是必须注意实例化的前后顺序，否则就会出现这种循环实例化问题，让人摸不着头脑。

## 参考文献

- **[python导入模块交叉引用](https://blog.csdn.net/qq_34146899/article/details/52530844)**
- **[python项目内import其他内部package的模块的正确方法](https://blog.csdn.net/u011089523/article/details/52931844)**
- **[如何避免Python的循环导入问题](https://blog.igevin.info/posts/how-to-avoid-python-circle-import-error/)**
- **[Python 中循环 import 造成的问题如何解决？](https://www.zhihu.com/question/19887316)**
- [Python 循环导入(依赖)](http://xuzhaoyang.fun/2019/05/25/Python-%E5%BE%AA%E7%8E%AF%E5%AF%BC%E5%85%A5/)
- **[Python导入循环方法](https://blog.51cto.com/dangzhiqiang/1536298)**
- **[python中的循环引用](https://hustyichi.github.io/2018/10/30/circular-import/)**
- [https://asciiflow.com/#/](https://asciiflow.com/#/)
- **[Python模块的交叉引用（导入循环）问题分析](https://cloud.tencent.com/developer/article/1580883)**