---
title: "一键修改Windows远程桌面（RDP）端口号"
categories: [ "技术价值" ]
tags: [ "windows","RDP" ]
draft: false
slug: "555"
date: "2021-08-10 11:25:36"
---

本文主要内容来微软官方文档，命令未 PowerShell 命令，管理员权限运行，最后给出链接。

若要查看当前 RDP 端口，可使用以下 PowerShell 命令：

```powershell
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "PortNumber"
```

若要修改 RDP 端口，可使用以下命令（以3390为例）：

```powershell
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\W
```

若要添加新的 RDP 监听端口，可以这样（未验证）：

```powershell
inStations\RDP-Tcp' -name "PortNumber" -Value 3390
New-NetFirewallRule -DisplayName 'RDPPORTLatest' -Profile 'Public' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3390
```

重启生效！

## 参考文献

- [更改计算机上的远程桌面的侦听端口](https://docs.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/change-listening-port)