---
title: "Juice FS 初探 ｜ 一种为 VPS 提供无限磁盘空间的解决方案"
categories: [ "技术" ]
tags: [ "vps","linux","docker","JuicsFS","s3" ]
draft: false
slug: "660"
date: "2022-11-20 21:56:00"
---

![](https://imagehost-cdn.frytea.com/images/2022/11/20/202211202157973a3a77a11832318cf.png)

**JuiceFS** 是一款面向云原生设计的高性能分布式文件系统，在 Apache 2.0 开源协议下发布。提供完备的 [POSIX](https://en.wikipedia.org/wiki/POSIX) 兼容性，可将几乎所有对象存储接入本地作为海量本地磁盘使用，亦可同时在跨平台、跨地区的不同主机上挂载读写。

![](https://imagehost-cdn.frytea.com/images/2022/11/20/20221120220073387bb88f980f1a5f0.png)

使用 JunicsFS 将云厂商的 S3 对象存储挂载到本地，就得到一个几乎无限容量的 VPS 空间了。目前 Juice 支持大部份主流厂商提供的 s3 服务，具体请查阅官方文档。

本文以 腾讯云 COS + 腾讯云轻量服务器，演示一下基本使用。

## 挂载 COS 到本地

使用以下命令即可创建一个基于 COS  的文件系统，下面演示基于 sqlite 和 redis 的创建、挂载、卸载命令。

```bash
# Jfs With Redis
juicefs format \
    --storage cos \
    --bucket jfs-redis-******** \
    --access-key ******** \
    --secret-key ******** \
    "redis://127.0.0.1:6379/1" \
    jfs-redis
# 挂载
juicefs mount -d "redis://127.0.0.1:6379/1" /mnt/jfs-redis/
# 卸载
juicefs umount /mnt/jfs-redis/

# Jfs With sqlite
juicefs format \
    --storage cos \
    --bucket jfs-******** \
    --access-key ******** \
    --secret-key ******** \
    "sqlite3:///opt/jfs/jfs.db" \
    jfs
# 挂载
juicefs mount -d "sqlite3:///opt/jfs/jfs.db" /mnt/jfs/
# 卸载
juicefs umount /mnt/jfs/
```

## 自动挂载

具体使用时，可以配置一下自动挂载，方法如下。

首先创建一个从 `/sbin/mount.juicefs` 到 `juicefs` 可执行文件的软链接，操作系统解析 fstab 时会调用 `/sbin/mount.juicefs` 命令。

```bash
$ which juicefs
/usr/local/bin/juicefs
$ ln -s /usr/local/bin/juicefs /sbin/mount.juicefs
```

新增以下内容到  `/etc/fstab` 使得开机自动挂载，这里以上文 sqlite 为例：

```bash
sqlite3:///opt/jfs/jfs.db    /mnt/jfs       juicefs     _netdev,max-uploads=50,writeback,cache-size=204800     0  0
```

使用 `mount -a` 使配置生效

## 限制容量和文件数

没有限制的行为可想而知，JuicsFS 的默认限制较高，可以手动限制一下文件系统的容量和文件数量。

```bash
# 限制文件系统容量 (GiB)
$ juicefs config "sqlite3:///opt/jfs/jfs.db" --capacity 102400
# 限制文件数量 (inode 数)
$ juicefs config "sqlite3:///opt/jfs/jfs.db" --inodes 100000
```

限制容量举例，可以看到设定前后可以看到挂载点容量的变化：

```bash
# 示例
$ df -h | grep jfs
Filesystem      Size  Used Avail Use% Mounted on
JuiceFS:jfs     1.0P  8.0K  1.0P   1% /mnt/jfs

# 设定容量上限为 128 GiB
$ juicefs config "sqlite3:///opt/jfs/jfs.db" --capacity 128
2022/11/20 21:07:08.832094 juicefs[2253158] <INFO>: Meta address: sqlite3:///opt/jfs/jfs.db [interface.go:402]
  capacity: 0 GiB -> 128 GiB

# 再次查看发现大小为 128GiB
$ df -h | grep jfs
JuiceFS:jfs     128G  8.0K  128G   1% /mnt/jfs
```

限制文件 inodes 数量举例，可以看到设定前后可以看到挂载点容量的变化：

```bash
# 示例
$ df -i
Filesystem       Inodes  IUsed    IFree IUse% Mounted on
/dev/vda2       3901440 367127  3534313   10% /
JuiceFS:jfs    10485762      2 10485760    1% /mnt/jfs

$ juicefs config "sqlite3:///opt/jfs/jfs.db" --inodes 3901440
2022/11/20 21:13:30.977616 juicefs[2255902] <INFO>: Meta address: sqlite3:///opt/jfs/jfs.db [interface.go:402]
    inodes: 0 -> 3901440
$ df -i
Filesystem       Inodes  IUsed    IFree IUse% Mounted on
/dev/vda2       3901440 367128  3534312   10% /
JuiceFS:jfs     3901440      2  3901438    1% /mnt/jfs
```

## 性能测试

文件系统怎么能没有性能测试呢，下面分别使用 `dd` 和自带 `bench` 演示性能。

### dd 简单读写测试

```bash
# 本地文件系统 io 性能
$ sync; dd if=/dev/zero of=/tmp/tempfile-12138 bs=1M count=1024; sync
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 5.563 s, 193 MB/s

# JuicfFS sqlite 元数据驱动性能
$ sync; dd if=/dev/zero of=/mnt/jfs/tmpfile bs=1M count=1024; sync
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 6.97672 s, 154 MB/s

# JuicfFS redis 元数据驱动性能
$ sync; dd if=/dev/zero of=/mnt/jfs-redis/tmpfile-12138 bs=1M count=1024; sync
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 5.59675 s, 192 MB/s
```

### juicefs bench 测试

#### 本地文件系统成绩

```bash
# juicefs bench -p 4 /tmp/
  Write big blocks count: 4096 / 4096 [==============================================================]  done
   Read big blocks count: 4096 / 4096 [==============================================================]  done
Write small blocks count: 400 / 400 [==============================================================]  done
 Read small blocks count: 400 / 400 [==============================================================]  done
  Stat small files count: 400 / 400 [==============================================================]  done
Benchmark finished!
BlockSize: 1 MiB, BigFileSize: 1024 MiB, SmallFileSize: 128 KiB, SmallFileCount: 100, NumThreads: 4
+------------------+------------------+--------------+
|       ITEM       |       VALUE      |     COST     |
+------------------+------------------+--------------+
|   Write big file |     153.98 MiB/s | 26.60 s/file |
|    Read big file |     148.60 MiB/s | 27.56 s/file |
| Write small file |   2064.9 files/s | 1.94 ms/file |
|  Read small file |   3150.8 files/s | 1.27 ms/file |
|        Stat file | 111847.4 files/s | 0.04 ms/file |
+------------------+------------------+--------------+
```

#### juicefs + sqlite 成绩

```bash
$ juicefs bench -p 4 /mnt/jfs
  Write big blocks count: 4096 / 4096 [==============================================================]  done
   Read big blocks count: 4096 / 4096 [==============================================================]  done
Write small blocks count: 400 / 400 [==============================================================]  done
 Read small blocks count: 400 / 400 [==============================================================]  done
  Stat small files count: 400 / 400 [==============================================================]  done
Benchmark finished!
BlockSize: 1 MiB, BigFileSize: 1024 MiB, SmallFileSize: 128 KiB, SmallFileCount: 100, NumThreads: 4
Time used: 72.0 s, CPU: 35.5%, Memory: 704.1 MiB
+------------------+------------------+---------------+
|       ITEM       |       VALUE      |      COST     |
+------------------+------------------+---------------+
|   Write big file |     148.25 MiB/s |  27.63 s/file |
|    Read big file |     144.29 MiB/s |  28.39 s/file |
| Write small file |     40.5 files/s | 98.83 ms/file |
|  Read small file |    715.9 files/s |  5.59 ms/file |
|        Stat file |   3759.0 files/s |  1.06 ms/file |
|   FUSE operation | 71735 operations |    2.99 ms/op |
|      Update meta |  4773 operations |   27.18 ms/op |
|       Put object |  1424 operations |  443.33 ms/op |
|       Get object |     0 operations |    0.00 ms/op |
|    Delete object |     0 operations |    0.00 ms/op |
| Write into cache |  1424 operations |  281.82 ms/op |
|  Read from cache |  1428 operations |  556.68 ms/op |
+------------------+------------------+---------------+
```

#### juicefs + redis 成绩

> 试着跑了一次，结果跑崩了，想玩的自己跑一跑吧。

由于 redis 是内存数据库，跑这种没有上限的测试一定要谨慎。在实际使用中，也要根据自己的需要选择，否则机器很容易 gg。

## 垃圾清理

juicefs 默认有回收站机制，删除文件默认在回收站保留一天。

可以去挂载目录下执行这条命令彻底删除：

```bash
$ find .trash -name '*.tmp' | xargs rm -f
```

## 总结

本文介绍了 JuiceFS 的基本用法，为“大盘鸡”需求提供一种新的思路，展示了使用对象存储挂载到机器作为文件系统的基本效果。

目前看来是解决系统盘过小问题的好方案，但具体是不是采纳这种方案，等我明天看看账单再做决定。

第二天看了下账单，跑了大概 10 轮测试，账单 0.02¥ ，初步看还能接受：

![](https://imagehost-cdn.frytea.com/images/2022/11/21/202211211045303449068bcdf165218.png)

至于元数据引擎的选择，在单节点服务器的需求上我还是偏向 sqlite 或 mysql 集群的方案，redis 虽然性能强劲，但实在有点吃不消。

最后，这一定是一个很棒的项目，在对接 docker、k8s 之类的容器设施非常方便，提供了插件，可以像操作默认存储卷一样使用，还可以直接使用挂载在本地的路径，总之，在一些方面 JuiceFS 做的已经很好了，下面就是等待时间的检验了。

## 参考文献

- [JuicsFS](https://www.juicefs.com/zh-cn/)
- [不用重启也能让fstab生效的一条命令](https://untitled.pw/software/linux/716.html)
- [在 Linux 上测试硬盘读写速度](https://einverne.github.io/post/2019/10/test-disk-write-and-read-speed-in-linux.html)
- [Linux df排查inode已满及解决方法](https://www.jianshu.com/p/42eb8c495811)

