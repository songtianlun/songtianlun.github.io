---
title: "macOS 清理时间机器快照"
categories: [ "技术" ]
tags: [ "macOS" ]
draft: false
slug: "750"
date: "2023-03-14 08:48:24"
---


安装 Asahi Linux 发现磁盘可用空间为 0，查阅文档发现是时间机器的问题。

```
We're going to resize this partition:
  APFS [Macintosh HD] (245.11 GB, 6 volumes)
  Total size: 245.11 GB
  Free space: 132.23 GB
  Available space: 0 B
  Overhead: 94.23 GB
  Minimum total size: 245.11 GB (100.00%)
```

开启时间机器后系统会自动进行本地快照，这将会占满所所有可用空间，需要手动清理一下:

```bash
$ tmutil listlocalsnapshots /
$ sudo tmutil deletelocalsnapshots # For example, 
$ sudo tmutil deletelocalsnapshots 2021-06-26-123740
# Once you see the statement "Delete local snapshot" followed by the date and time stamp, the local snapshot has been deleted.
```

## Reference

* [How to delete Time Machine local snapshots in macOS](https://appleinsider.com/articles/21/06/26/how-to-delete-time-machine-local-snapshots-in-macos)
* [安装Asahi Linux](https://cloud-atlas.readthedocs.io/zh_CN/latest/linux/asahi_linux/install_asahi_linux.html)

