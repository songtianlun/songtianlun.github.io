---
title: "Linux USB 设备基础理论"
categories: [ "技术" ]
tags: [ "linux","USB" ]
draft: false
slug: "633"
date: "2022-08-24 18:04:46"
---


通过扫描以下目录获取物理节点所有 USB 设备：

```
/sys/bus/usb/devices/usb*
/sys/bus/usb/devices/usb*/$busnum-*
```

从该文件系统收集某一个设备的主要信息如下：

```json
{
    "busnum": 1,
    "class": 0,
    "devnum": 2,
    "level": 1,
    "manufacturer": "QEMU",
    "port": 0,
    "prodid": "0001",
    "product": "QEMU USB Tablet",
    "speed": "12",
    "usbpath": "1",
    "vendid": "0627"
}
```

## 文件含义

目录下部分文件含义如下：

- `busnum`: 总线号
- `devnum`: 设备号（该总线的第几台设备）
- `speed`: 速率
- `bDeviceClass`: 设备类型
- `idVendor`: 设备的生产商ID,由USB设备生产商向USB-IF官方来统一管理和申请
- `idProduct`: 该生产商生产的产品编号，同一厂商下的不同idProduct代表着该公司不同的产品系列
- `product`: 制造商
- `manufacturer`: 产品
- `serial`： USB 硬件设备序列号 ，例如 `0000:00:01.2`

## 定位方法

定位某一个 USB 设备的方法有两种：

- `busnum` + `devnum`
- `idVendor` + `idProduct`

## 设备类型`bDeviceClass`

| 类代码 | 用法          | 描述                                                  |
|:---:|:-----------:|:---------------------------------------------------:|
| 00h | 设备描述符       | Use class information in the interface Descriptors  |
| 01h | 接口描述符       | 音频                                                  |
| 02h | 设备描述符、接口描述符 | 通讯设备，如电话，moden等等                                    |
| 03h | 接口描述符       | HID设备                                               |
| 05h | 接口描述符       | Physical                                            |
| 06h | 接口描述符       | Image                                               |
| 07h | 接口描述符       | 打印机                                                 |
| 08h | 接口描述符       | 大容量存储                                               |
| 09h | 设备描述符       | Hub USB集线器                                          |
| 0Ah | 接口描述符       | CDC-Data                                            |
| 0Bh | 接口描述符       | Smart Card                                          |
| 0Dh | 接口描述符       | Content Security                                    |
| 0Eh | 接口描述符       | UVC视频/CAMERA                                        |
| 0Fh | 接口描述符       | Personal Healthcare                                 |
| 10h | 接口描述符       | 音视频设备                                               |
| 11h | 设备描述符       | Billboard Device Class                              |
| 12h | 接口描述符       | USB Type-C Bridge Class                             |
| DCh | 设备描述符、接口描述符 | Diagnostic Device                                   |
| E0h | 接口描述符       | 无线控制器                                               |
| EFh | 设备描述符、接口描述符 | Miscellaneous                                       |
| FEh | 接口描述符       | Application Specific                                |
| FFh | 设备描述符、接口描述符 | 厂商用自定义                                              |


## 参考文献

- [USB设备类bDeviceClass、bDeviceSubClass、bDeviceProtocol](https://www.usbzh.com/article/detail-273.html) By USB 中文网
- [USB设备描述符中的idVendor、idProduct和bcdDevice](https://www.usbzh.com/article/detail-953.html) By USB 中文网
- [USB 硬件设备的序列号](https://www.ibm.com/docs/zh/zdt/11.0.0?topic=device-serial-number-usb-hardware) By IBM

