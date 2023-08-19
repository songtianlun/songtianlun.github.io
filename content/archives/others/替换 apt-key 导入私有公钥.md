---
title: '替换 apt-key 导入私有公钥'
date: '2023-05-17T03:29:33.477Z'
tags: ['apt', 'Debian']
created: '2023-05-17T03:26:36.200Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:05, 27th 五月 2023 -->

# 替换 apt-key 导入私有公钥

在使用 `apt-key` 导入私钥时会遇到以下警告：

```bash
Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead
```

将密钥添加到 /etc/apt/trusted.gpg.d 是不安全的，因为它会为所有存储库添加密钥。这正是 apt-key 必须被弃用的原因。

为了避免该问题，下面提供一种快速且安全的导入私有公钥的方法：

```bash
sudo mkdir -p /etc/apt/keyrings/
wget -O- https://example.com/EXAMPLE.gpg |
    gpg --dearmor |
    sudo tee /etc/apt/keyrings/EXAMPLE.gpg > /dev/null

echo "deb [signed-by=/etc/apt/keyrings/EXAMPLE.gpg] https://example.com/apt stable main" |
    sudo tee /etc/apt/sources.list.d/EXAMPLE.list

# Optional (you can find the email address / ID using `apt-key list`)
sudo apt-key del support@example.com
```

## References

* [Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead](https://stackoverflow.com/questions/68992799/warning-apt-key-is-deprecated-manage-keyring-files-in-trusted-gpg-d-instead)
* [修复 Ubuntu 中的 “Key is stored in legacy trusted.gpg keyring” 问题](https://linux.cn/article-15565-1.html)