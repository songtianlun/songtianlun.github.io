---
title: "PVE 批量销毁虚拟机"
categories: [ "技术" ]
tags: [ "PVE" ]
draft: false
slug: "771"
date: "2023-04-08 14:56:44"
---

可以使用以下命令一次性删除所有 QEMU 虚拟机：

## 串行

```
qm list | awk 'NR>1 {print $1}' | xargs -I {} qm destroy {}
```

解释：

* `qm list` 命令获取所有虚拟机的列表。
* `awk 'NR>1 {print $1}'` 命令跳过第一行（表头）并提取 VMID 列。
* `xargs -I {} qm destroy {}` 命令将每个 VMID 作为参数传递给 `qm destroy` 命令，从而删除每个虚拟机。

注意：此命令会删除所有虚拟机，请确保在执行前已进行适当备份和确认。

## 并行

您可以使用以下命令并行地删除所有 QEMU 虚拟机：

```
qm list | awk 'NR>1 {print $1}' | xargs -P 0 -I {} sh -c 'qm destroy {} || true'
```

解释：

* `qm list` 命令获取所有虚拟机的列表。
* `awk 'NR>1 {print $1}'` 命令跳过第一行（表头）并提取 VMID 列。
* `xargs -P 0 -I {} sh -c 'qm destroy {} || true'` 命令将每个 VMID 作为参数传递给 `qm destroy` 命令，从而删除每个虚拟机。 `-P 0` 选项告诉 `xargs` 并行运行尽可能多的进程。如果 `qm destroy` 命令失败， `|| true` 确保退出状态为 `0` ，因此其他删除操作仍然会继续。

> 注意：此命令会删除所有虚拟机，请确保在执行前已进行适当备份和确认。

