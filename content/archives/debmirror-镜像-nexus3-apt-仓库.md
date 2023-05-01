---
title: "debmirror 镜像 nexus3 apt 仓库"
categories: [ "技术" ]
tags: [ "debian","nexus3" ]
draft: false
slug: "790"
date: "2023-05-01 00:06:21"
---

nexus3 没有很好的目录重命名方法。

使用 apt-mirror 镜像会出错，实测 debmirror 没问题。下面记录方法：

首先导入公钥

## 导入 apt 公钥

如果你已经有了公钥文件（如 `public.key`），你可以使用以下命令将其导入到 GPG 密钥环和 APT 的受信任密钥列表中：

1. 导入 GPG 密钥到密钥环：

```
gpg --import public.key
```

2. 查找密钥 ID。在导入密钥后，`gpg` 将显示类似于以下内容的输出：

```
gpg: key 1234567890ABCDEF: public key "Your Name <your.email@example.com>" imported
```

在这个示例中，`1234567890ABCDEF` 是密钥 ID。

3. 将 GPG 公钥导出到 APT 的受信任密钥列表中：

```
gpg --export --armor 1234567890ABCDEF | sudo tee /etc/apt/trusted.gpg.d/1234567890ABCDEF.gpg
```

将 `1234567890ABCDEF` 替换为你的 GPG 密钥 ID。

现在，你已经成功地将公钥导入到 GPG 密钥环和 APT 的受信任密钥列表中。在使用 `apt` 或 `debmirror` 时，它们应该能够验证签名的仓库。

## 镜像仓库

为了使用 `debmirror` 镜像你的 Nexus3 APT 仓库，请按照以下步骤操作：

1. 首先确保你已经安装了 `debmirror`。在基于 Debian/Ubuntu 的系统上，可以使用以下命令安装：

```
sudo apt-get install debmirror
```

2. 在运行 `debmirror` 之前，首先确保已经导入了 GPG 密钥。你可以使用以下命令导入密钥：

见上一步。

3. 运行 `debmirror` 命令，指定仓库地址、发行版、组件和架构等参数。这里是一个示例命令：

```
debmirror --host=192.168.25.8:8081 \
    --root=repository/test-apt-host \
    --method=http --progress --dist=bullseye \
    --section=main --arch=arm64 \
    --rsync-extra=none \
    --ignore-release-gpg ./pve-arm/
```

这个命令将从 `http://192.168.25.8:8081/repository/test-apt-host` 镜像别名为 `bullseye` 的发行版中 `arm64` 架构的相关 apt 包到本地的 `./apt-arm/` 目录。

根据需求，可以修改这些参数。

注意：`--ignore-release-gpg` 参数会跳过 GPG 签名检查。在确认仓库是可信的情况下，可以使用此参数。

`--rsync-extra=none` 会跳过 rsync 下载额外文件。

4. 等待 `debmirror` 完成镜像过程。这可能需要一段时间，具体取决于仓库的大小。

完成这些步骤后，你应该在本地 `./pve-arm/` 目录中找到镜像的仓库。如果遇到任何问题，请确保检查命令中的参数是否正确。

