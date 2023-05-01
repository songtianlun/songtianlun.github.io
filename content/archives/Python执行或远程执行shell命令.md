---
title: "Python执行或远程执行shell命令"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "471"
date: "2020-10-21 21:34:00"
---

最近想要实现通过脚本循环再 Linux 下运行 shell 命令，经过探索发现使用 Python 语言有几种解决方案，在此简单记录。

## 方案一：脚本本地执行命令

在 Python 中有两个库都可以实现运行 shell 命令的效果：

```python
import subprocess
import os
```

使用方法也很简单：

```python
# subprocess 使用方法
subprocess.call("ls") # 执行ls命令

# os 使用方法
# 使用system模块执行linux命令时，如果执行的命令没有返回值res的值是256
# 如果执行的命令有返回值且成功执行，返回值是0
res = os.system("ls")
# popen模块执行linux命令。返回值是类文件对象，获取结果要采用read()或者readlines()
val = os.popen('ls').read() # 执行结果包含在val中
```

## 方案二：脚本远程执行命令

在 Python 中有一个库可以实现 SSH 客户端及 SFTP 的功能。

```python
#!/usr/bin/python
import paramiko
```

使用方法大致如下：

```python
# 连接方法
def ssh_connect( _host, _username, _password ):
    try:
        _ssh_fd = paramiko.SSHClient()
        _ssh_fd.set_missing_host_key_policy( paramiko.AutoAddPolicy() )
        _ssh_fd.connect( _host, username = _username, password = _password )
    except Exception, e:
        print( 'ssh %s@%s: %s' % (_username, _host, e) )
        exit()
    return _ssh_fd

# 运行命令
def ssh_exec_cmd( _ssh_fd, _cmd ):
    return _ssh_fd.exec_command( _cmd )

# 关闭SSH
def ssh_close( _ssh_fd ):
    _ssh_fd.close()
```

## 方案三：使用 SecureCRT 脚本

该方法参见此前的博文：[SecureCRT 下 Python 脚本编写](https://blog.frytea.com/archives/469/)

## 参考文献

- Python 学习总结 06 paramiko 远程执行命令：[https://www.cnblogs.com/wangshuo1/p/6265360.html](https://www.cnblogs.com/wangshuo1/p/6265360.html)
- Python 模块学习 - Paramiko：[https://www.cnblogs.com/xiao-apple36/p/9144092.html](https://www.cnblogs.com/xiao-apple36/p/9144092.html)
- python 中执行 linux 命令(调用 linux 命令)：[https://blog.csdn.net/shanliangliuxing/article/details/8811701](https://blog.csdn.net/shanliangliuxing/article/details/8811701)
- (转)python 中执行 linux 命令：[https://blog.csdn.net/laiahu/article/details/6697930](https://blog.csdn.net/laiahu/article/details/6697930)
- python 执行 linux 命令的三种方式：[https://zhuanlan.zhihu.com/p/100946961](https://zhuanlan.zhihu.com/p/100946961)

