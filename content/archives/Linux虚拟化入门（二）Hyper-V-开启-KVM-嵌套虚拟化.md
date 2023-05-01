---
title: "Linux虚拟化入门（二）Hyper-V 开启 KVM 嵌套虚拟化"
categories: [ "技术" ]
tags: [ "KVM" ]
draft: false
slug: "540"
date: "2021-07-05 15:02:00"
---

日常办公使用 Windows 平台，需要研究 KVM 的使用，此时就需要在 Windows 提供的 Hyper-V 工具运行 Linux 虚拟机来测试 KVM 相关的使用，但是在 Hyper-V 虚拟机中再次运行 KVM 虚拟化属于嵌套虚拟化，需要开启相关功能。

下面给出 Hyper-V 开启嵌套虚拟化的方法，默认您已经创建出一个虚拟机实例，下面的操作在虚拟**实例**中进行。

- 查看 Hyper-V 虚拟机是否支持虚拟化

```
egrep -o 'vmx|svm' /proc/cpuinfo
```

没有输出说明不支持，下面进行设置，在 **Windows 宿主机**进行：

- 查看虚拟机参数

关闭虚拟机，管理员权限打开 `Powershell`

```powershell
Get-VM  ##列出虚拟机
Get-VMProcessor -VMName [KVM主机] | fl
#查看虚拟化选项参数

# 示例，ExposeVirtualizationExtensions 为 false 说明不支持虚拟化
PS C:\Users\lenovo> Get-VMProcessor -VMName Fedora-Dev | fl
ResourcePoolName                             : Primordial
Count                                        : 2
CompatibilityForMigrationEnabled             : False
CompatibilityForOlderOperatingSystemsEnabled : False
HwThreadCountPerCore                         : 0
ExposeVirtualizationExtensions               : False
EnablePerfmonPmu                             : False
EnablePerfmonLbr                             : False
EnablePerfmonPebs                            : False
EnablePerfmonIpt                             : False
EnableLegacyApicMode                         : False
AllowACountMCount                            : False
Maximum                                      : 100
Reserve                                      : 0
RelativeWeight                               : 100
MaximumCountPerNumaNode                      : 12
MaximumCountPerNumaSocket                    : 1
EnableHostResourceProtection                 : False
OperationalStatus                            : {Ok, HostResourceProtectionDisabled}
StatusDescription                            : {确定, 主机资源保护已禁用。}
Name                                         : 处理器
Id                                           : Microsoft:369F6873-EDEE-4FCB-B154-E09A3095C743\b637f346-6a0e-4dec-af52-b
                                               d70cb80a21d\0
VMId                                         : 369f6873-edee-4fcb-b154-e09a3095c743
VMName                                       : Fedora-Dev
VMSnapshotId                                 : 00000000-0000-0000-0000-000000000000
VMSnapshotName                               :
CimSession                                   : CimSession: .
ComputerName                                 : MYIEUCD_DP
IsDeleted                                    : False
VMCheckpointId                               : 00000000-0000-0000-0000-000000000000
VMCheckpointName                             :
```

- 开启嵌套虚拟化

```powershell
Set-VMProcessor -ExposeVirtualizationExtensions $true -VMName [KVM主机]
##将其设置为True
# 重启虚拟机，查看已支持虚拟化
```

```powershell
# 示例，ExposeVirtualizationExtensions 已经被设置为 true

PS C:\Users\lenovo> Get-VMProcessor -VMName Fedora-Dev | fl

ResourcePoolName                             : Primordial
Count                                        : 2
CompatibilityForMigrationEnabled             : False
CompatibilityForOlderOperatingSystemsEnabled : False
HwThreadCountPerCore                         : 0
ExposeVirtualizationExtensions               : True
EnablePerfmonPmu                             : False
EnablePerfmonLbr                             : False
EnablePerfmonPebs                            : False
EnablePerfmonIpt                             : False
EnableLegacyApicMode                         : False
AllowACountMCount                            : False
Maximum                                      : 100
Reserve                                      : 0
RelativeWeight                               : 100
MaximumCountPerNumaNode                      : 12
MaximumCountPerNumaSocket                    : 1
EnableHostResourceProtection                 : False
OperationalStatus                            : {}
StatusDescription                            : {}
Name                                         : 处理器
Id                                           : Microsoft:369F6873-EDEE-4FCB-B154-E09A3095C743\b637f346-6a0e-4dec-af52-b
                                               d70cb80a21d\0
VMId                                         : 369f6873-edee-4fcb-b154-e09a3095c743
VMName                                       : Fedora-Dev
VMSnapshotId                                 : 00000000-0000-0000-0000-000000000000
VMSnapshotName                               :
CimSession                                   : CimSession: .
ComputerName                                 : MYIEUCD_DP
IsDeleted                                    : False
VMCheckpointId                               : 00000000-0000-0000-0000-000000000000
VMCheckpointName                             :
```

```bash
# 虚拟机上查看，已经有多个VMX，有几个就意味着有几个CPU
$ egrep -o 'vmx|svm' /proc/cpuinfo
vmx
vmx
vmx
vmx
```

## 参考文献

- [Hyper-v 开启嵌套虚拟化的方法](https://blog.51cto.com/u_4746316/2334705)
- [Hyper-V 虚拟机实现嵌套KVM虚拟化](https://blog.csdn.net/rockstics/article/details/107862806)