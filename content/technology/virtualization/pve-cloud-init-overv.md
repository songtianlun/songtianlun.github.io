---
title: "Cloud-init 概述及 PVE 下创建步骤说明"
date: 2021-12-06T14:31:23+08:00
description: "介绍 pve 虚拟化系统对于 cloud-init 的支持和使用方法."
categories: ["技术笔记集","虚拟化笔记集"]
tags: ["linux", "pve", "cloud-init", "debian"]
draft: false
---

Cloud-init 是一个程序，它在启动时在客户机上运行，是用于 **跨平台云实例初始化** 的行业标准多分发方法。它支持所有主要的 **公共云提供商、私有云基础设施的供应系统和裸机安装**。

云实例将由磁盘映像和实例数据初始化：

- 云元数据
- 用户数据(可选)
- 供应商数据(可选)

Cloud-init 将识别在引导期间运行的云，从云中读取任何提供的 **元数据**，并相应地初始化系统。这可能涉及到设置网络、存储设备、配置 SSH 访问密钥和其他各种系统配置。之后，cloud-init 还将解析和处理传递给实例的任何可选用户或供应商数据。

## Proxmox VE Cloud-Init 支持

Proxmox VE 支持 Cloud-init ，使用 Cloud-Init，就可以在管理程序端配置网络设备和 ssh 密钥。当 VM 第一次启动时，VM 中的 Cloud-Init 软件将应用这些设置。

### Step 1: 准备 Cloud-Init 模板

许多发行版本已经提供了即时可用的 Cloud-Init 映像(作为 `.qcow2` 文件) ，所以你也可以直接下载和导入这样的镜像。在下面的例子中，我们将使用 Ubuntu [https://cloud-images.Ubuntu.com](https://cloud-images.ubuntu.com/) 中心提供的云映像。

```xml
# 下载镜像
wget https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-amd64.img

# 创建新的虚拟机
qm create 9000 --memory 2048 --net0 virtio,bridge=vmbr0

# 将下载好的磁盘镜像导入 local-lvm 存储
qm importdisk 9000 bionic-server-cloudimg-amd64.img local-lvm

# 最后将新的磁盘加载到虚拟机上作为 scsi 设备
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-9000-disk-1
```

> Ubuntu Cloud-Init 映像需要 SCSI 驱动器的 `virtio-SCSI-pci` 控制器类型。
> 

> 注：经过实测，除了 importdisk 步骤外，其余步骤均可在 PVE 的 web 面板上完成，建议终端操作并观察 web 变化后，再尝试纯 web 界面操作。
> 

**添加 Cloud-Init CD-ROM 驱动器**

下一步是配置 CD-ROM 驱动器，用于将 Cloud-Init 数据传递给 VM。

```xml
qm set 9000 --ide2 local-lvm:cloudinit
```

要能够直接从 Cloud-Init 映像引导，需要将引导磁盘参数设置为 `scsi0` ，并将 BIOS 限制为仅从磁盘引导。这将加速引导，因为 VM BIOS 会跳过可引导 CD-ROM 的测试。

```xml
qm set 9000 --boot c --bootdisk scsi0
```

还要配置一个串行控制台并将其用作显示器。许多 Cloud-Init 映像都依赖于此，因为这是 OpenStack 映像的一个需求。

```xml
qm set 9000 --serial0 socket --vga serial0
```

在最后一个步骤中，将 VM 转换为模板会很有帮助。然后，您可以从这个模板快速创建链接克隆。从 VM 模板进行部署要比创建完整的克隆(副本)快得多。

```xml
qm template 9000
```

### Step 2: 部署 Cloud-Init 模板

您可以通过克隆轻松地部署这样的模板:

```xml
qm clone 9000 123 --name ubuntu2
```

然后配置用于身份验证的 SSH 公钥，并配置 IP 设置（可选）:

```
qm set 123 --sshkey ~/.ssh/id_rsa.pub
qm set 123 --ipconfig0 ip=10.0.10.123/24,gw=10.0.10.1
```

此外还可以配置 DNS 域等，更多配置项请查看 PVE 官网 [Cloud-Init Support](https://pve.proxmox.com/wiki/Cloud-Init_Support) 。

之后启动虚拟机，即可验证之前的配置是否生效。

## 参考文献

- [cloud-init Documentation](https://cloudinit.readthedocs.io/en/latest/index.html)
- [Cloud-Init Support](https://pve.proxmox.com/wiki/Cloud-Init_Support)
- [Cloud-Init 常见问题解答](https://pve.proxmox.com/wiki/Cloud-Init_FAQ#What_is_cloud-init.3F)