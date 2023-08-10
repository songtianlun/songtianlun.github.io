---
title: 'LXC 开机自启'
date: '2023-05-08T11:56:54.452Z'
tags: ['LXC']
type: '·'
created: '2023-05-08T11:53:01.829Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:06, 27th 五月 2023 -->

# LXC 开机自启

旧版本的 LXC 和新版本的 LXC 操作命令略有不同，请注意，我这里使用的是 `lxc 4.0.12/5.0.2` 版本。

容器默认在系统启动时不会自动启动，但是提供了 `lxc-autostart` 命令来帮我们启动所有设置了开机自启的容器。 我们可以在容器的配置文件中添加以下内容来让容器自启动：

```
lxc.start.auto = 1
lxc.start.delay = 10
lxc.group = onboot
```

`lxc.start.auto` 表示允许自启。`lxc.start.delay` 表示启动延迟，在处理互相依赖的容器中，启动延迟会比较有用。`lxc.group` 表示定义启动组，这样就可以通过 `lxc-autostart -g onboot` 来启动所有属于 `onboot` 组的容器了。

当设置好容器开机自启动后，将 `lxc-autostart` 命令添加到宿主机的 `/etc/rc.local` 中，这样就可以实现开机时自动启动容器了。

## 允许自启

配置玩观察自启日志会看到下面这行：

```
systemd-rc-local-generator[660]: /etc/rc.d/rc.local is not marked executable, skipping.
```

该错误提示是因为 `/etc/rc.d/rc.local` 文件没有被标记为可执行文件，导致 `systemd-rc-local-generator` 跳过了它。

要解决这个问题，你需要给 `/etc/rc.d/rc.local` 文件添加可执行权限。你可以使用 `chmod` 命令来添加权限，如下所示：

```
sudo chmod +x /etc/rc.d/rc.local
```

运行完这个命令后，再次启动系统，`systemd-rc-local-generator` 应该就能够执行 `/etc/rc.d/rc.local` 文件了。

请注意，在某些系统中，使用 `/etc/rc.local` 文件而不是 `/etc/rc.d/rc.local` 文件来运行启动脚本。如果你使用的是 `/etc/rc.local` 文件，你需要将它标记为可执行文件，方法与上述相同：

```
sudo chmod +x /etc/rc.local
```

然后，再次启动系统，`systemd-rc-local-generator` 应该就能够执行 `/etc/rc.local` 文件了。

## 自启失败排查

排查 `rc.local` 日志：

`/etc/rc.local` 文件中包含的命令将在系统启动时自动执行。该文件的输出将被记录到系统日志中。

可以使用 `dmesg` 命令或者 `journalctl` 命令来查看系统日志。

使用 `dmesg` 命令查看启动日志：

```
dmesg | grep rc.local
```

使用 `journalctl` 命令查看系统日志：

```
journalctl -u rc-local.service
```

这将显示 `/etc/rc.local` 文件中的任何输出。请注意，如果该文件没有输出，则在日志中不会看到任何内容。

## References

* [LXC Linux系统容器](https://yunfwe.cn/2019/09/23/2019/LXC%20Linux%E7%B3%BB%E7%BB%9F%E5%AE%B9%E5%99%A8/)
* [如何在Linux启动时自动启动LXD容器 ](https://www.51cto.com/article/561911.html)