---
title: "Windows 开机自启VMware虚拟机"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "413"
date: "2020-07-22 09:08:11"
---

由于进行Linux下软件开发，需要频繁使用 VMware 虚拟机，为提高效率找到一种开机启动启动 VMware 虚拟机的方法，可以大大提升效率。

## 第一步，编写脚本

首先编写 `自启` 脚本 `vm_start.bat` ，内容如下：

```cpp
"C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe" start "E:\Virtual Machines\CentOS 7 64 位\CentOS 7 64 位.vmx" nogui
```

其中前面部分替换为自己 VMware 安装目录下的 `vmrun.exe` 文件所在路径，后部分替换为自己虚拟机的  `*.vmx` 文件路径。不要丢掉了双引号。

如果像我一样路径里面包含中文，记得将编码转化为 `ANSI` 编码即可正常使用，否则运行会乱码。

![https://imagehost-cdn.frytea.com/20200722085533.png](https://imagehost-cdn.frytea.com/20200722085533.png)

如果需要关机自动关闭脚本 `vm_stop.bat` ，内容如下：

```cpp
"C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe" stop "E:\Virtual Machines\CentOS 7 64 位\CentOS 7 64 位.vmx" soft
```

## 第二步，加入启动策略

这里有两种方法：

- 将脚本加入开机启动策略
- 将脚本拷入 `启动` 文件夹

首先第一种，运行 `gpedit.msc` >  用户配置 > windows设置 > 脚本(登录/注销) > 添加

第二种比较简单，将脚本拷入启动文件夹： 

*`X:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp*(注：X为Win10系统盘盘符)`

比如，我的启动文件夹就是 `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`

第三步，enjoy it！

## 参考文献

- [Windows设置VMware开机自动启动，虚拟机也启动](https://www.cnblogs.com/chenxiaonian/p/6274965.html)
- [Windows“启动”文件夹](https://blog.csdn.net/Lavi_Driver/article/details/77435400)
- [Windows设置VMware开机自动启动，虚拟机也启动](https://blog.csdn.net/libinemail/article/details/55050306)
- [如何解决Bat脚本中包含中文，运行乱码](https://blog.csdn.net/yang889999888/article/details/72934787)