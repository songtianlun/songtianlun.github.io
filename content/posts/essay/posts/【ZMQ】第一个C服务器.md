---
title: "【ZMQ】第一个C服务器"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "335"
date: "2020-06-08 16:47:00"
---

## 技术背景

ØMQ （也拼写作ZeroMQ，0MQ或ZMQ)，号称号称是“史上最快的消息队列”，基于c语言开发。ZMQ(以下ZeroMQ简称ZMQ)是一个简单好用的传输层，像框架一样的一个socket library，他使得Socket编程更加简单、简洁和性能更高。是一个消息处理队列库，可在多个线程、内核和主机盒之间弹性伸缩。

作为C开发人员有两个选择 [CZMQ](https://zeromq.org/languages/c/#czmq) 或 [libzmq](https://zeromq.org/languages/c/#libzmq) （低级zeromq库）。

在这里简单记录 `CentOS` 下从零安装ZMQ相关依赖、解决各种问题最终实现一个最简单的请求-应答服务器-客户端效果。

## ZeroMQ 在 centos下的安装

1）下载ZeroMQ

执行命令：

```
wget http://download.zeromq.org/zeromq-4.0.4.tar.gz
```

2）解压ZeroMQ

```
$ tar zvxf zeromq-4.0.4.tar.gz
$ mv zeromq-4.0.4 zeromq
$ cd zeromq
```

3）安装依赖

```
$ yum install libtool
$ ./autogen.sh 
```


4）编译安装

```
$ ./configure
......
checking for gcc... no
checking for cc... no
checking for cl.exe... no
configure: error: in `/home/chuser/zeromq':
configure: error: no acceptable C compiler found in $PATH
See `config.log' for more details
```
提示缺少C编译器，先安装`GCC`。

```
$ sudo yum install gcc
```

安装OK！再次执行

```
$ ./configure
......
checking whether the C++ compiler works... no
configure: error: Unable to find a working C++ compiler
```

提示缺少C++编译器，先安装G++。

```
$ sudo yum install gcc-c++ 
```

安装OK！再次执行

```
$ ./configure
$ make
$ sudo make install
```

ZeroMQ安装成功！

## libzmq 在 `CentOS` 下的安装

libzmq开源仓库： https://github.com/zeromq/libzmq

```
# 对于 CentOS 8，请以根用户 root 运行下面命令：
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/network:messaging:zeromq:release-stable/CentOS_8/network:messaging:zeromq:release-stable.repo
yum install zeromq-devel

# 对于 CentOS 7，请以根用户 root 运行下面命令：
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/network:messaging:zeromq:release-stable/CentOS_7/network:messaging:zeromq:release-stable.repo
yum install zeromq-devel

# 对于 CentOS 6，请以根用户 root 运行下面命令：
cd /etc/yum.repos.d/
wget https://download.opensuse.org/repositories/network:messaging:zeromq:release-stable/CentOS_6/network:messaging:zeromq:release-stable.repo
yum install zeromq-devel
```

## Demo

(来源:https://zeromq.org/languages/c/#libzmq)


Server:

```c
#include <zmq.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <assert.h>

int main (void)
{
    //  Socket to talk to clients
    void *context = zmq_ctx_new ();
    void *responder = zmq_socket (context, ZMQ_REP);
    int rc = zmq_bind (responder, "tcp://*:5555");
    assert (rc == 0);

    while (1) {
        char buffer [10];
        zmq_recv (responder, buffer, 10, 0);
        printf ("Received Hello\n");
        sleep (1);          //  Do some 'work'
        zmq_send (responder, "World", 5, 0);
    }
    return 0;
}
```

Client:

```c
Copy
#include <zmq.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main (void)
{
    printf ("Connecting to hello world server…\n");
    void *context = zmq_ctx_new ();
    void *requester = zmq_socket (context, ZMQ_REQ);
    zmq_connect (requester, "tcp://localhost:5555");

    int request_nbr;
    for (request_nbr = 0; request_nbr != 10; request_nbr++) {
        char buffer [10];
        printf ("Sending Hello %d…\n", request_nbr);
        zmq_send (requester, "Hello", 5, 0);
        zmq_recv (requester, buffer, 10, 0);
        printf ("Received World %d\n", request_nbr);
    }
    zmq_close (requester);
    zmq_ctx_destroy (context);
    return 0;
}
```

将文件存入以`libzmq_server.c`，`libzmq_client.c`命名的文件。

运行下列命令编译：

```
gcc libzmq_server.c -o libzmq_server -lzmq
gcc libzmq_client.c -o libzmq_client -lzmq
```

若出现错误，请移步异常问题记录区寻找答案

分别在两个终端运行，若成功，效果如下：

```
$ ./libzmq_server
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
Received Hello
```

```
$ ./libzmq_client
Connecting to hello world server…
Sending Hello 0…
Received World 0
Sending Hello 1…
Received World 1
Sending Hello 2…
Received World 2
Sending Hello 3…
Received World 3
Sending Hello 4…
Received World 4
Sending Hello 5…
Received World 5
Sending Hello 6…
Received World 6
Sending Hello 7…
Received World 7
Sending Hello 8…
Received World 8
Sending Hello 9…
Received World 9
```

## 异常记录

### undefined reference to `zmq_sendmsg'

解决方案:
编译时带上 `-lzmq`

例如：`gcc -o hello hello.c -lzmq`

### error while loading shared libraries: libzmq.so.3

方法1：

找一下动态文件安装到哪里了：

```
$ whereis libzmq.so.3

$ find / -name libzmq.so.3
```

将 `/usr/local/lib` 加到共享库配置文件 `/etc/ld.so.conf` 中，该方法一劳永逸，但是需要有操作权限

```
# cat /etc/ld.so.conf
include ld.so.conf.d/*.conf
# echo "/usr/local/lib">>/etc/ld.so.conf
# ldconfig
```

再执行成功.


方法2：设置环境变量LD_LIBRARY_PATH，适合没有操作权限时使用
```
# vi ~/.bash_profile 
```
编辑你当前用户的用户目录下的.bash_profile文件
在文件后面加上：
```
export LD_LIBRARY_PATH=/usr/local/lib/:$LD_LIBRARY_PATH
```
保存并关闭文件
```
# source ~/.bash_profile 
```
使该文件改动生效（每次登录该用户时也会自动加载该文件，使文件生效）
执行成功

### C程序头文件引用问题

一直没有搞清楚头文件引用 "" 和 <> 的区别，今天偶然查到：

- first：include<fileName.h> 引用系统头文件一般用<>。
- second：include"fileName.h" 引用自己定义的头文件一般用" "。

区别是<>首先去系统中去找，" "则在自己当前文件夹找。

一般情况下系统头文件在 `usr/include/`中。
## 参考文献

- [ZMQ 官方指南](http://zguide.zeromq.org/page:all)
- [ZMQ 指南汉化版](https://github.com/anjuke/zguide-cn)
- [ZMQ - C语言](https://zeromq.org/languages/c/#libzmq)
- [Wikipedia/ZeroMQ](https://zh.wikipedia.org/wiki/%C3%98MQ)
- [浅析ZeroMQ](https://blog.csdn.net/weixin_40685388/article/details/81197552)
- [【Linux】ZeroMQ 在 centos下的安装](https://www.cnblogs.com/wangzhongqiu/p/6542892.html)
- [安装zeroMQ以及error while loading shared librarie找不多对应so文件的错误解决](https://blog.csdn.net/tomorrowmorningj/article/details/66982261?utm_source=blogxgwz7)
- [c – g未定义的对ZMQ的引用](http://www.6tie.net/p/1082504.html)
- [C语言头文件引用](https://www.cnblogs.com/blueberry006/p/7830883.html)
- [Linux下C语言的系统头文件](https://blog.csdn.net/weixin_30872671/article/details/97592203)
