---
title: 'sshd 拒绝连接错误 refused connected from'
date: '2023-05-19T02:16:16.713Z'
tags: ['SSH']
created: '2023-05-19T02:13:36.630Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:04, 27th 五月 2023 -->

# sshd 拒绝连接错误 refused connected from

最近发现一种会导致 sshd 拒绝登陆的方法：

登陆时 sshd 会报出日志：

```bash
refused connected from
```

以下是集中可能的原因/方法：

1. **检查主机的访问权限**：你需要检查 `/etc/hosts.allow` 和 `/etc/hosts.deny` 文件，看看是否有阻止 192.168.25.11 访问的规则。如果有，你需要修改这些文件以允许访问。

2. **防火墙设置**：你可能需要检查防火墙设置，看看是否有阻止 SSH 访问的规则。在 Linux 中，你可以使用 `iptables` 或 `firewalld` 来管理防火墙规则。

3. **SSHD配置**：检查 `/etc/ssh/sshd_config` 文件，看看是否有任何限制或拒绝访问的规则。例如，`AllowUsers`、`AllowGroups`、`DenyUsers` 或 `DenyGroups` 的设置可能会阻止某些用户或组的访问。

4. **公钥/私钥**：如果你使用的是公钥认证，那么需要确保客户端的公钥已添加到服务器的 `~/.ssh/authorized_keys` 文件中。

5. **服务状态**：确认 SSHD 服务正在运行。你可以使用 `systemctl status sshd` 检查状态，如果服务没有运行，你可以使用 `systemctl start sshd` 启动服务。

6. **错误日志**：查看 SSHD 的日志文件，这可能会给你提供更多的线索。你可以查看 `/var/log/auth.log`（Ubuntu）或 `/var/log/secure`（CentOS）来获取更多信息。

记住，每次修改配置文件后，都需要重启 SSHD 服务来应用新的配置。你可以使用 `systemctl restart sshd` 来重启服务。