---
title: "VS Code 免密登录Linux服务器"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "410"
date: "2020-07-20 09:38:00"
---

使用 VS Code 中提供的 `Remote Development` 可以实现连接远程服务器，管理文件、远程调试、远程管理等功能，实现远程开发。今天主要介绍如何通过配置SSH公钥实现 VC Code 免密登录 Linux 服务器。

## 前提条件

- 安装 VS Code
- 安装了 `Remote Development` 插件

## 部署步骤

### 第一步，服务器端部署公钥

参考：[Linux部署私钥实现免密登录](https://blog.frytea.com/archives/409/)

### 第二步，找到 VS Code 配置文件

![https://imagehost-cdn.frytea.com/images/archives/20200720093404.png](https://imagehost-cdn.frytea.com/images/archives/20200720093404.png)

### 第三步，修改 VS Code 配置文件

```bash
Host Ali-Dev-Test
  HostName *.*.*.*
  User root
  IdentityFile "H:\我的云端硬盘\Security\ssh-key\aliyun-frytea-edu-t5.pem"
```

按照上面的格式，指定主机名称、地址、用户以及密钥路径。

### 第四步，Enjoy it！

## 参考文献

- [vscode远程开发及公钥配置（告别密码登录）](https://blog.csdn.net/u010417914/article/details/96918562)
- [VScode使用ssh钥匙连接远程服务器（免去重复输入密码的烦恼）](https://blog.csdn.net/euphorias/article/details/104818566?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase)
- [Linux使用.pem文件实现免密登录](https://blog.csdn.net/TQWei00001/article/details/96431523)