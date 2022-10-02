---
title: "Docker 内部安装 postfix"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "576"
date: "2021-09-18 17:42:36"
---

今天写 Dockerfile 定制 Docker 镜像需要在内部安装 postfix ，但是其默认安装后会弹出配置界面，DOcker 构建过程是无法进行交互的，结果就是卡在该界面无法继续：

![https://imagehost-cdn.frytea.com/images/2021/09/18/_1631946203798041f1bce8fb47a294.png](https://imagehost-cdn.frytea.com/images/2021/09/18/_1631946203798041f1bce8fb47a294.png)

搜寻一圈发现一个github仓库（[cisagov](https://github.com/cisagov)/**[postfix-docker](https://github.com/cisagov/postfix-docker)**）中打包镜像时也包含了 postfix，在这里找到了解决办法，很简单：

```bash
FROM perl:5.28-buster

RUN apt-get update && \
        DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
            postfix \
    && apt-get clean all
```

主要是这里：

- `DEBIAN_FRONTEND=noninteractive` ：告知操作系统直接运行命令，而无需向用户请求输入（所有操作都是非交互式的）

构建OK，解决。

## 参考文献

- [DEBIAN_FRONTEND noninteractive参数](https://blog.csdn.net/oguro/article/details/102840215)