---
title: "Linux部署私钥实现免密登录"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "409"
date: "2020-07-20 09:37:37"
---

### 第一步，生成密钥对（windows或linux均可）：

```bash
ssh-keygen
```

之后一路回车，默认不设密码，默认目录为 `~/.ssh`

### 第二步，部署公钥至服务器端（Linux），并赋权限

```bash
cat id_rsa.pub >> authorized_keys
sudo chmod 600 authorized_keys
sudo chmod 700 ~/.ssh
```

- 将 `id_rsa.pub` 替换为你的公钥路径即可，如果是在本地生成需上传至服务器端。
- 这项操作可以部署多个公钥，命令会在 `authorized_keys` 后面追加，而 Linux 公钥验证检测 `authorized_keys` 文件中的公钥
- 一个萝卜一个坑，一个公钥只运行一个用户使用登录

### 第三步，检查密钥登陆功能是否开启

1、打开SSH配置文件

```
sudo vim /etc/ssh/sshd_config
```

2、查看确认下面两项配置

```
RSAAuthentication yes
PubkeyAuthentication yes
```

- 当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录（可选）

```
PasswordAuthentication no
```

3、重启SSH

```
sudo service sshd restart
```

### 第四步，检查本地私钥部署

如果客户端为windows，您的私钥应存在于 `C:\Users\your name\.ssh\` 目录下，或是在登陆时指定私钥地址：

```bash
$ ssh -i id_rsa remote-username@remote-ip
```

如果是使用 `VS Code` 远程连接则需要在配置中指定私钥地址：

```bash
Host Ali-Dev-Test
  HostName *.*.*.*
  User root
  IdentityFile "H:\我的云端硬盘\Security\ssh-key\aliyun-frytea-edu-t5.pem"
```

### 第五步，enjoy it！

## 参考文献

- [Linux使用.pem文件实现免密登录](https://blog.csdn.net/TQWei00001/article/details/96431523)
- [SSH配置-在Windows下远程登陆Linux服务器Shell](https://fancyseeker.github.io/2013/12/31/ssh_connect/)