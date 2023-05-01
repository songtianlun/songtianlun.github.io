---
title: "kali linux 配置 xrdp 远程桌面服务"
categories: [ "技术" ]
tags: [ "RDP","kali","xrdp" ]
draft: false
slug: "645"
date: "2022-11-08 14:53:00"
---

xrdp 的配置让我充满疑惑，今天误打误撞完成了 kali 下的 xrdp 配置，能够顺利远程桌面进入 kali，这里记录一些可能必须的步骤，以备后用。

首先按照 kali 官网给出的 xrdp 配置脚本：

```bash
#!/bin/sh
echo "[i] Updating and upgrading Kali (this will take a while)"
apt-get update
apt-get dist-upgrade -y

echo "[i] Installing Xfce4 & xrdp (this will take a while as well)"
apt-get install -y kali-desktop-xfce xorg xrdp

echo "[i] Configuring xrdp to listen to port 3390 (but not starting the service)"
sed -i 's/port=3389/port=3390/g' /etc/xrdp/xrdp.ini
```

保存后 `sudo` 执行，自动配置 xrdp。

> 如果下载慢可以配一下 [USTC Kali](https://mirrors.ustc.edu.cn/help/kali.html) 软件源。 

之后设定默认命令行启动，否则无法加载远程桌面：

```bash
# 命令行启动
$ systemctl set-default multi-user.target

# 图形界面启动
$ systemctl set-default graphical.target
```

之后使能 `xrdp` 服务：
```bash
$ systemctl enable xrdp
$ systemctl start xrdp
```

避免 `ssl` 证书无法验证，将 `xrdp` 用户加入 `ssl-cert` 用户组：

```bash
sudo adduser xrdp ssl-cert
```

之后可以重启试一下能否成功，记得官方配置端口为 `3390` 而非 `3389`:

```bash
$ reboot
```

如果不行配置一下这个再重启尝试：

```bash
# To set the system default to xfce4:-
$ **sudo update-alternatives --config x-session-manager**
There are 3 choices for the alternative x-session-manager (providing /usr/bin/x-session-manager).

  Selection    Path                    Priority   Status
------------------------------------------------------------
* 0            /usr/bin/gnome-session   50        auto mode
  1            /usr/bin/gnome-session   50        manual mode
  2            /usr/bin/startxfce4      50        manual mode
  3            /usr/bin/xfce4-session   40        manual mode

Press  to keep the current choice[*], or type selection number: **3**
update-alternatives: using /usr/bin/xfce4-session to provide /usr/bin/x-session-manager (x-session-manager) in manual mode

Try that
```
然后应该就可以了。如果不行欢迎留言。

## 参考文献

- [Ubuntu 20.04: connects, then immediately disconnects #2293](https://github.com/neutrinolabs/xrdp/issues/2293)
- [Setting up RDP with Xfce - kali](https://www.kali.org/docs/general-use/xfce-with-rdp/)
- [【工具使用】kali 安装后要做的事情](https://www.cnblogs.com/v1vvwv/p/kali-settings.html)
