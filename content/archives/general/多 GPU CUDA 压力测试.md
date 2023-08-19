---
title: '多 GPU CUDA 压力测试'
date: '2023-08-19T04:15:25.841Z'
tags: ['CUDA', 'NVIDIA']
created: '2023-07-17T09:09:35.202Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
bag: 'default'
revision: '3'
---

<!-- Exported from TiddlyWiki at 12:15, 19th 八月 2023 -->

# 多 GPU CUDA 压力测试

1.下载软件

```bash
$ wget https://codeload.github.com/wilicc/gpu-burn/zip/master
```

2.解压缩

```bash
$ unzip gpu-burn-master.zip
```

3.进入目录编译(确保cuda环境变量已经配置成功 nvcc -v能显示结果)

```bash
$ cd gpu-burn-master
make
```

4.编译成功后,会在当前目录生成 gpu_burn 这个文件

```bash
$ gpu_burn
```

5.默认执行,跑全部GPU卡,空格后面参数为时间,一般快速测试设置100,稳定性测试为500

```bash
$ ./gpu_burn 100
```

6.可以指定某几张卡跑,比如指定0和1号卡

```bash
$ CUDA_VISIBLE_DEVICES=0,1 ./gpu_burn 100
```

## References

* <http://wili.cc/blog/gpu-burn.html>
* [GPU burn 测试gpu](https://www.amaxchina.com/op/Attachments/Public/202007/0b4a8ae492084c279e2ce9db12a9abd7.pdf)
* [如何对 Linux 操作系统的 GPU 实例进行压测？ - 火山引擎-技术服务](https://developer.volcengine.com/articles/7116816569191104519)