---
title: "macOS 使用 remote-viewer 连接 spice 服务 ｜ PC 连接 spice 云桌面方法"
categories: [ "技术" ]
tags: [ "macOS","spice","remote-viewer","vier-manager" ]
draft: false
slug: "624"
date: "2022-01-25 15:10:58"
---

最近需要使用到云桌面办公，但目前仅支持 windows 客户端。后经过询问，发现是使用 spice 协议链接，提供地址后，即可使用第三方客户端链接。

MacOS 平台下没有很好的支持 spice 协议的图形化客户端，但是可以使用 `remote-viewer` 这个工具，也比较好用，下面介绍安装方法：

```bash
# jeffreywildman/homebrew-virt-manager 有些问题
# Krish-sysadmin 对它进行了修复，因此首先卸载参与包和地址
brew remove virt-manager
brew remove virt-viewer
brew untap jeffreywildman/homebrew-virt-manager

# 安装工具
brew tap Krish-sysadmin/homebrew-virt-manager
brew install virt-manager virt-viewer

# 如果缺少某些依赖库，安装后重试即可

# 使用
remote-viewer
```

![https://imagehost-cdn.frytea.com/images/2022/01/25/2022-01-25-2.59.39816bc8ffe02fa999.png](https://imagehost-cdn.frytea.com/images/2022/01/25/2022-01-25-2.59.39816bc8ffe02fa999.png)

输入 spice 地址链接即可。

![https://imagehost-cdn.frytea.com/images/2022/01/25/2022-01-25-3.03.34fe54a45c4b94b76c.png](https://imagehost-cdn.frytea.com/images/2022/01/25/2022-01-25-3.03.34fe54a45c4b94b76c.png)

## 总结

这次探索走了不少弯路，从尝试各种第三方远程桌面客户端，到 `remote-viewer` 的安装，工具的安装也遇到不少问题，最后在我的 MacBook Air m1 上成功安装，在这里分享方法。

在 Linux 下可以使用 [remmina](https://remmina.org) 这款工具，支持 「[X2Go](https://remmina.org/remmina-x2go/)  [RDP](https://remmina.org/remmina-rdp/)  [SPICE](https://remmina.org/remmina-spice/)  [VNC](https://remmina.org/remmina-vnc/)  [SSH](https://remmina.org/remmina-ssh/)  [HTTP/HTTPS](https://remmina.org/remmina-www/)」。

在 Windows 下则可以使用 [virt-mananger](http://virt-manager.org) 来链接，参考「**[windows和linux下的spice客户端使用方法](https://www.cnblogs.com/jython/p/4301568.html)**」。

至此，Windows、Linux、MacOS 链接 spice 服务的方法介绍完毕。

## 参考文献

- **[windows和linux下的spice客户端使用方法](https://www.cnblogs.com/jython/p/4301568.html)**
- [Manage virtual machines with virt-manager](https://virt-manager.org)
- [virt-manager installation error #184](https://github.com/jeffreywildman/homebrew-virt-manager/issues/184)
- [MacOS Connect to KVM Client Desktop](https://johnsiu.com/blog/macos-kvm-remote-connect/)