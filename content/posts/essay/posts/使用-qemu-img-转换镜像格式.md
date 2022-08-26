---
title: "使用 qemu-img 转换镜像格式"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "632"
date: "2022-08-16 16:00:04"
---


qemu-img镜像格式转换工具支持vhd、vmdk、qcow2、raw、vhdx、qcow、vdi或qed社区格式的镜像的相互转换。

## 查看信息

```bash
$ qemu-img info vzdump-qemu-125-2022_08_16-13_40_42.vma                                                                                                                                                                                    
image: vzdump-qemu-125-2022_08_16-13_40_42.vma                                                                                                                                                                                                                                
file format: raw                                                                                                                                                                                                                                                              
virtual size: 3 GiB (3221810176 bytes)                                                                                                                                                                                                                                        
disk size: 3 GiB

$ qemu-img info vzdump-qemu-125-2022_08_16-13_40_42.qcow2 
image: vzdump-qemu-125-2022_08_16-13_40_42.qcow2
file format: qcow2
virtual size: 3 GiB (3221810176 bytes)
disk size: 3 GiB
cluster_size: 65536
Format specific information:
    compat: 1.1
    compression type: zlib
    lazy refcounts: false
    refcount bits: 16
    corrupt: false
    extended l2: false
```

## 格式转换
执行如下命令转换镜像文件格式。

```bash
# 转换 vmdk 格式为 qcow2 格式
$ qemu-img convert -p -f vmdk -O qcow2 centos6.9.vmdk centos6.9.qcow2

# 转换 vma(raw) 为 qcow2
$ qemu-img convert -p -f raw -O qcow2 vzdump-qemu-125-2022_08_16-13_40_42.vma vzdump-qemu-125-2022_08_16-13_40_42.qcow2
    (100.00/100%)

```

上述命令中各参数对应的说明如下：

- `-p`  标识转换的进度条。
- `-f` 源镜像格式。
- `-O` 目标镜像格式 + 源镜像文件名称 + 目标文件名称。

转换完成后，目标文件会出现在源镜像文件所在的目录下。


## 参考文献

- [通过qemu-img工具转换镜像格式](https://support.huaweicloud.com/intl/zh-cn/bestpractice-ims/ims_bp_0030.html) By Huawei Cloud
- [Converting between image formats](https://docs.openstack.org/image-guide/convert-images.html) By OpenStack