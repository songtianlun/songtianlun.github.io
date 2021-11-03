---
title: "Bash快捷指令"
date: 2021-11-03T14:39:21+08:00
description: "常用指令速查."
categories: ["技术笔记集","Linux 笔记"]
tags: ["linux"]
draft: false
---

## 查看磁盘使用情况命令

```bash
$ df -lh                # 查看磁盘使用情况及文件系统挂载位置， -h 为根据大小适当显示
$ fdisk -l              # 查看磁盘分区表及分区结构, -l 获得所有硬盘的分区情况
$ du -sh                # 查看当前目录的大小
$ du -lh --max-depth=1  # 查看当前目录下一级子文件和子目录占用的磁盘容量。

# df -lh
文件系统                        容量  已用  可用 已用% 挂载点
devtmpfs                        937M     0  937M    0% /dev
tmpfs                           958M     0  958M    0% /dev/shm
tmpfs                           383M  924K  383M    1% /run
/dev/mapper/fedora_fedora-root   15G  5.1G   10G   34% /
tmpfs                           958M  4.0K  958M    1% /tmp
/dev/sda2                      1014M  193M  822M   19% /boot
/dev/sda1                       599M  8.5M  591M    2% /boot/efi
tmpfs                           192M  4.0K  192M    1% /run/user/0

# fdisk -l
Disk /dev/sda：127 GiB，136365211648 字节，266338304 个扇区
磁盘型号：Virtual Disk
单元：扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理)：512 字节 / 4096 字节
I/O 大小(最小/最佳)：4096 字节 / 4096 字节
磁盘标签类型：gpt
磁盘标识符：83C725D2-CC2F-428D-9B8F-195886809B76

设备          起点      末尾      扇区   大小 类型
/dev/sda1     2048   1230847   1228800   600M EFI 系统
/dev/sda2  1230848   3327999   2097152     1G Linux 文件系统
/dev/sda3  3328000 266336255 263008256 125.4G Linux LVM

Disk /dev/mapper/fedora_fedora-root：15 GiB，16106127360 字节，31457280 个扇区
单元：扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理)：512 字节 / 4096 字节
I/O 大小(最小/最佳)：4096 字节 / 4096 字节

Disk /dev/zram0：957 MiB，1003487232 字节，244992 个扇区
单元：扇区 / 1 * 4096 = 4096 字节
扇区大小(逻辑/物理)：4096 字节 / 4096 字节
I/O 大小(最小/最佳)：4096 字节 / 4096 字节
```

### git 设置和取消代理

```bash
git config --global http.proxy http://192.168.6.233:7890
git config --global https.proxy https://192.168.6.233:7890

git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890

只对github进行代理，对国内的仓库不影响
git config --global http.https://github.com.proxy http://192.168.6.107:7890
git config --global https.https://github.com.proxy https://192.168.6.107:7890

git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy https://127.0.0.1:7890

git config --global --unset http.proxy
git config --global --unset https.proxy

npm config delete proxy
```

### 设置和取消代理

```cpp
export http_proxy=192.168.6.233:7890
export https_proxy=192.168.6.233:7890

export http_proxy="socks5://127.0.0.1:7070"
export https_proxy="socks5://127.0.0.1:7070"
要取消该设置：1)

unset http_proxy
unsethttps_proxy
```

## 参考文献

- [Linux查看磁盘使用情况命令](https://www.huaweicloud.com/articles/0ae40c31c4f17389a3313b022bcbdd21.html)
- [Linux 查看磁盘空间](https://www.runoob.com/w3cnote/linux-view-disk-space.html)
- [linux 查看当前目录占用空间](https://blog.csdn.net/db2china/article/details/84032137)