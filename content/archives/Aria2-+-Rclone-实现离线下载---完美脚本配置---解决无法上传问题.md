---
title: "Aria2 + Rclone 实现离线下载 | 完美脚本配置 | 解决无法上传问题"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "433"
date: "2020-08-19 20:08:00"
---

首先声明，本文完美脚本来自于： [P3TERX/aria2.conf](https://github.com/P3TERX/aria2.conf)，本文记录的是安装完美脚本 2020.08.08 版本时遇到的问题。

## 安装步骤

### 第一步，安装 Aria2

这里使用 [Aria2 一键安装管理脚本 增强版](https://github.com/P3TERX/aria2.sh)，执行下面的代码下载并运行脚本，出现脚本操作菜单输入 `1` 开始安装。

```
wget -N git.io/aria2.sh && chmod +x aria2.sh && ./aria2.sh
```

### 第二步，安装和配置 Rclone

RCLONE 官方提供了[一键安装脚本](https://rclone.org/install/#script-installation)：

```
curl https://rclone.org/install.sh | sudo bash
```

安装完后，输入 `rclone config` 命令进入交互式配置选项，按照提示一步一步来进行操作即可。

### 第三步，配置自动上传脚本

[Aria2 一键安装管理脚本 增强版](https://github.com/P3TERX/aria2.sh) 整合了 [Aria2 完美配置](https://github.com/P3TERX/aria2.conf) ，安装后会附带一些附加功能脚本功能脚本，RCLONE 自动上传脚本就是其中之一。由于默认不启用，所以需要手动启用。

- 输入`vim /root/.aria2c/script.conf`打开附加功能脚本配置文件进行修改，有中文注释，按照自己的实际情况进行修改，一般只需要修改网盘名称和下载路径。

```
# 网盘名称(RCLONE 配置时填写的 name)
drive-name=OneDrive
```

- 输入`nano /root/.aria2c/aria2.conf`打开 Aria2 配置文件进行修改。或使用[Aria2 一键安装管理脚本 增强版](https://github.com/P3TERX/aria2.sh)中的手动修改选项打开配置文件进行修改。找到“下载完成后执行的命令”，把`clean.sh`替换为`upload.sh`。

```
# 下载完成后执行的命令
on-download-complete=/root/.aria2c/upload.sh
```

- 重启 Aria2

```
service aria2 restart
```

## 问题记录

### 问题一、找不到jq命令

我在安装后测试下载无法上传网盘，通过命令查看日志：

```bash
tail -f /root/.aria2c/aria2.log
```

在下载结束后报了如下错误：

```bash
8/19 07:26:59 [^[[1;32mNOTICE^[[0m] Download complete: /root/downloads/aria2.conf
/root/.aria2c/core: line 109: jq: command not found
/root/.aria2c/core: line 111: jq: command not found
08/19 07:26:59 [^[[31mERROR^[[0m] Failed to get download directory!
```

发现是由于 `jq` 命令找不到到导致的，Centos下通过如下命令安装 `jq`

```bash
# 安装EPEL源：
yum install epel-release

# 安装完EPEL源后，可以查看下jq包是否存在：
yum list jq

# 安装jq：
yum install jq
```

重试问题解决。

## 参考文献

- Aria2 + Rclone 实现 OneDrive、Google Drive 等网盘离线下载：[https://p3terx.com/archives/offline-download-of-onedrive-gdrive.html](https://p3terx.com/archives/offline-download-of-onedrive-gdrive.html)
- Aria2 相关项目常见问题及解决方案（FAQ）：[https://p3terx.com/archives/aria2_perfect_config-faq.html](https://p3terx.com/archives/aria2_perfect_config-faq.html)
- centos7安装jq命令：[https://blog.csdn.net/PWBGJX/article/details/90055339](https://blog.csdn.net/PWBGJX/article/details/90055339)