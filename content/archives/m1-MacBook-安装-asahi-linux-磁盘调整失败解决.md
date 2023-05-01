---
title: "m1 MacBook 安装 asahi linux 磁盘调整失败解决"
categories: [ "技术" ]
tags: [ "linux","macOS","asahi linux" ]
draft: false
slug: "725"
date: "2023-01-10 21:05:22"
---

尝试在 MacBook Air m1 安装 asahi linux ，在磁盘分区过程遭遇报错，具体过程没有留下来，是类似这样的报错：

```bash
error: doc-id tree: record exists for doc-id 64, file-id 9665861 but no inode references this doc-id
```

大致解决是要进恢复模式，之后使用急救程序尝试修复。

尝试后发现还是报错，后来在 asahi linux 的 github 找到一个类似问题，使用下列方法解决：

I had a similar issue, where /dev/disk3s5 had warnings that wouldn't go away, and I solved it as follows:

    Boot into recovery and open a terminal
    `diskutil unmountdisk /dev/disk3`
    `fsck_apfs /dev/disk3` (and hit y in response to the various prompts)

I believe unmounting was the important part.


之后磁盘分区就不报错了。

参考文献: https://github.com/AsahiLinux/asahi-installer/issues/88#issuecomment-1095019173