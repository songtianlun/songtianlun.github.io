---
title: "解决 perl: warning: Setting locale failed."
categories: [  ]
tags: [  ]
draft: false
slug: "609"
date: "2021-12-27 09:28:48"
---

使用 Ubuntu 主机远程 PVE 服务器执行命令时报错：

```bash
# qm list
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LANGUAGE = (unset),
	LC_ALL = (unset),
	LC_ADDRESS = "zh_CN.UTF-8",
	LC_NAME = "zh_CN.UTF-8",
	LC_MONETARY = "zh_CN.UTF-8",
	LC_PAPER = "zh_CN.UTF-8",
	LC_IDENTIFICATION = "zh_CN.UTF-8",
	LC_TELEPHONE = "zh_CN.UTF-8",
	LC_MEASUREMENT = "zh_CN.UTF-8",
	LC_TIME = "zh_CN.UTF-8",
	LC_NUMERIC = "zh_CN.UTF-8",
	LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_US.UTF-8").
```

查看字符集配置发现有报错：

```bash
# locale
locale: Cannot set LC_ALL to default locale: No such file or directory
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC=zh_CN.UTF-8
LC_TIME=zh_CN.UTF-8
LC_COLLATE="en_US.UTF-8"
LC_MONETARY=zh_CN.UTF-8
LC_MESSAGES="en_US.UTF-8"
LC_PAPER=zh_CN.UTF-8
LC_NAME=zh_CN.UTF-8
LC_ADDRESS=zh_CN.UTF-8
LC_TELEPHONE=zh_CN.UTF-8
LC_MEASUREMENT=zh_CN.UTF-8
LC_IDENTIFICATION=zh_CN.UTF-8
LC_ALL=
```

经过分析错误为  `LC_ALL` 没设置值，`LC_CTYPE` 和 `LC_MESSAGES` 的值 `zh_CN.UTF-8` 系统未安装。

远程主机默认仅支持 `en_US.UTF-8`  ，而我的客户端默认配置为 `zh_CN.UTF-8` ，结果远程时服务端继承了客户端配置，导致字符集报错。

此时无需在远程做任何配置，只需断开远程连接，将下面一行配置写入我的 Ubuntu 主机中的 `~./bashrc` 即可：

```bash
export LC_ALL=C
```

## 原理

在设定主机 `locale` 时存在一个优先级，可总结为 `LC_ALL > LC_* >LANG` ，可以说 `LC_ALL` 是**最上级设定或者强制设定**，而 `LANG` 是默认设定值。

若需了解详情可拓展阅读参考文献。

## 参考文献

- **[解决perl: warning: Setting locale failed.](https://www.cnblogs.com/djiankuo/p/6653180.html)**
- **[【转】locale的设定及其LANG、LC_ALL、LANGUAGE环境变量的区别](https://www.cnblogs.com/alfiewm/articles/2142823.html)**