---
title: "Parallels m1 安装 arch 虚拟机并配置 KDE 和辅助程序"
categories: [ "技术" ]
tags: [ "MacBook","m1","macOS","Paralles Desktop","arch linux" ]
draft: false
slug: "740"
date: "2023-02-11 19:32:00"
---

最近在探索 m1 MacBook 下运行 linux 虚拟机的可能性，计划未来在 linux 虚拟机下完成所有开发工作，parallels desktop 天然提供了 debian/ubuntu/fedora 等 linux 发行版支持，但是在我个人使用场景中还是多少有些问题。

几天在浏览 archWiki 时发现社区提供了一个直接可用的 parallels Deskto 虚拟机模版，可以用来快速配置 linux 开发环境，比较省时省力，在这里介绍几个关键步骤。

## 获取 arch linux 虚拟机模版

在[这里](https://pkgbuild.com/~tpowa/parallels/)下载 Arch Linux Parallels Desktop 虚拟机模版。

下载完毕后解压，使用 Parallels 打开即可。

在 对应的 [README](https://pkgbuild.com/~tpowa/parallels/Readme.txt) 文件中可以看到默认的用户名和密码。

如果一切顺利，启动虚拟机，即可看到一个配置好的 arch linux。

## 安装 KDE 桌面

```bash
# 根据需要配置镜像后进行
# 建议配置 ustc arch arm 镜像后继续
pacman -Syyu # 升级系统中全部包
pacman -S sudo vim xf86-video-vesa 

# 创建非 root 账号
useradd -m -G wheel -s /bin/bash myusername
passwd myusername
# 最后记得赋予新用户 sudo 权限

# 安装 kde plasma 桌面
pacman -S plasma-meta konsole dolphin 
# plasma-meta 元软件包、konsole 终端模拟器和 dolphin 文件管理器
pacman -S plasma-wayland-session xdg-desktop-portal
sudo pacman -S packagekit-qt5 packagekit appstream-qt appstream # 确保 Discover（软件中心）可用，需重启
systemctl enable sddm
systemctl start sddm  # 直接启动显示管理器

# 安装中文字体
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei # 安装几个开源中文字体。一般装上文泉驿就能解决大多 wine 应用中文方块的问题
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra # 安装谷歌开源字体及表情
sudo pacman -S kdeconnect # 安装 KDE Connect，可以用智能手机控制 KDE
```

## 安装 Parallels Tools

实测默认无法通过 Parallels 菜单栏的安装 Parallels Tools 来安装辅助工具，需要手动挂载安装。

前往 `/Applications/Parallels Desktop.app/Contents/Resources/Tools` 文件夹，找到 `prl-tools-lin-arm.iso` 文件，手动挂载到虚拟机中，运行安装即可。

![](https://imagehost-cdn.frytea.com/images/2023/02/11/202302111912165876436a1ddf7d51.png)

## 效果展示

以上描述了几个需要特别注意的点，之后按照需要配置系统即可：

![](https://imagehost-cdn.frytea.com/images/2023/02/11/202302111920178d3d8d8ede938c4d.png)

搭载 Apple Sillicon 芯片的 MacBook 目前软件生态还有待完善，虚拟化方面，我尝试了 UTM、VMware Fusion 和 Parallels Desktop 三种虚拟化桌面软件，以及 Debian/Fedora/Ubuntu 等系统。

体验下来 Parallels Desktop 比较省时省力，系统方面貌似 Arch 和 Debian 下 aarch64 的软件生态相对完善，如果有时间建议都尝试一下选择适合自己的。

体验下来我个人更倾向 Arch Linux，KDE 支持比较好，软件生态也相对更好。不管选择什么，记得日常配置多打快照，避免哪一天滚挂了。

相比于 macOS，linux 下的 aarch64 软件生态相对更好些，特别是开源软件和终端下常用的软件，未来我是打算将所有开发和终端操作全部放在 linux 虚拟机中使用了。

## 参考文献

- [Installing Parallels Tools](https://download.parallels.com/stm/docs/en/Parallels_Desktop_Users_Guide/22507.htm)
- [Parallels Desktop - ArchWiki](https://wiki.archlinux.org/title/Parallels_Desktop#Parallels_tools)
- [桌面环境与常用应用安装 - archlinux 简明指南](https://arch.icekylin.online/rookie/desktop-env-and-app.html)



