---
title: "Python解析变长结构体"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "453"
date: "2020-09-14 16:21:00"
---

最近接到一个需求，需要使用 Python 解析 C 来的数据包，而数据包中的格式是通过如下结构体定义的：

```c
typedef struct msg_t
{
    int oid;
    int msg_len;
    char msg_data[0];
}MSG_T;
```

其中的 `msg_data` 字符串的长度是由 `msg_len` 给出的，因此需要首先解析出 `msg_len` 的数值，再读取 `msg_len` 的内容。

在 Python 中可以通过 struct 模块完成这一操作，针对以上数据结构的 python 解析代码如下：

```c
		OID = 0
    msgLen = 0
    msgData = ""
    sFormat = ""

    OID, msgLen = struct.unpack('II', syncMsg[0:8])
    sFormat = 'II' + str(msgLen) + 's'
    OID, msgLen, msgData = struct.unpack(sFormat, syncMsg)
    msgData = msgData.decode()
    #print("OID: ", OID, "\nMsgLen: ", msgLen, "\nMsgData: ", msgData.decode())
```

代码最核心之处在于 `unpack` 时的单引号部分，其中 `I` 代表 `Int` ， `128s` 则代表长度为 128 的字符串。在这里首先解析长度，再拼接处数据格式，进而解析。

 

**struct** 中支持的格式如下表：

| Format      | C Type             | Python             | 字节数 |
|-------------|--------------------|--------------------|-----|
| x           | pad byte           | no value           | 1   |
| c           | char               | string of length 1 | 1   |
| b           | signed char        | integer            | 1   |
| B           | unsigned char      | integer            | 1   |
| ?           | \_Bool             | bool               | 1   |
| h           | short              | integer            | 2   |
| H           | unsigned short     | integer            | 2   |
| i           | int                | integer            | 4   |
| I \(大写的 i）  | unsigned int       | integer or long    | 4   |
| l \(小写的 L\) | long               | integer            | 4   |
| L           | unsigned long      | long               | 4   |
| q           | long long          | long               | 8   |
| Q           | unsigned long long | long               | 8   |
| f           | float              | float              | 4   |
| d           | double             | float              | 8   |
| s           | char\[\]           | string             | 1   |
| p           | char\[\]           | string             | 1   |
| P           | void \*            | long               | 4   |


## 参考文献

- 浅析Python中的struct模块： [https://www.cnblogs.com/coser/archive/2011/12/17/2291160.html](https://www.cnblogs.com/coser/archive/2011/12/17/2291160.html)
- python struct 结构体： [https://blog.csdn.net/CLinuxF/article/details/102478001](https://blog.csdn.net/CLinuxF/article/details/102478001)
- Python中对字节流/二进制流的操作:struct模块简易使用教程: [https://www.jianshu.com/p/5a985f29fa81](https://www.jianshu.com/p/5a985f29fa81)
- struct --- 将字节串解读为打包的二进制数据: [https://docs.python.org/zh-cn/3/library/struct.html](https://docs.python.org/zh-cn/3/library/struct.html)