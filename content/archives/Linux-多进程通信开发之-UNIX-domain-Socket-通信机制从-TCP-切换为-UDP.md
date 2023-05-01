---
title: "Linux 多进程通信开发之 UNIX domain Socket 通信机制从 TCP 切换为 UDP"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "505"
date: "2021-01-13 18:09:00"
---


> Unix domain socket 或者 IPC socket是一种终端，可以使同一台操作系统上的两个或多个进程进行数据通信。提供 UDP 和 TCP 两种通信机制。

因为一些原因，项目现有软件架构采用的都是 `IPC sockte` 中的 `TCP` 通信机制，虽然保证了通信的可靠性，但近期需要对该程序进行热迁移（基于 `criu` ），有连接的 IPC 套接字状态很难被保存和恢复，而 无连接的 UDP 只需要保证服务端先冻结、先恢复即可实现程序整体状态迁移，因此写下本文，记录迁移过程，最后提供示例程序，可以自行通过 `BCompare` 等文本对比工具对比差异。

## 模式差异

至于两种通信机制的差异，除了在创建套接字时声明的差异，具体的通信流程也有差异，在这里找到 CSDN [@frank909](https://frank909.blog.csdn.net/) 的两张图片，感觉很有代表性，在这里引用一下。

首先是 TCP的：

![https://imagehost-cdn.frytea.com/images/2021/01/13/202101131815253d04d69f377dae01.png](https://imagehost-cdn.frytea.com/images/2021/01/13/202101131815253d04d69f377dae01.png)

![https://imagehost-cdn.frytea.com/images/2021/01/13/202101131815253d04d69f377dae01.png](https://imagehost-cdn.frytea.com/images/2021/01/13/202101131815253d04d69f377dae01.png)

接下来是 UDP 的：

![https://imagehost-cdn.frytea.com/images/2021/01/13/2021011318145069f28463e2e1709c.png](https://imagehost-cdn.frytea.com/images/2021/01/13/2021011318145069f28463e2e1709c.png)

二者的差异，主要是这几点：

- 服务端：

（1）TCP连接在 `bind()` 之后需要 `listen()` ，而UDP不需要。

（2）TCP连接在 `bind()` 和 `listen()` 后还需要 `accept()`，用来得到客户端连接描述符，而UDP不需要。

（3）收发数据，TCP使用 `recv()` , `send()` , 而 UDP 使用 `recvfrom()`, `sendto()`。

（4）释放连接，TCP在客户端释放连接后需先释放 `accept()` 得到的客户端连接描述符，再 `close(socket)` ，而UDP直接 `close(socket)`。

- 客户端：

（1）TCP连接在bind()后需要 `connect()`，而UDP不需要。

（2）收发数据，TCP使用 `recv()` , `send()` , 而 UDP 使用 `recvfrom()`, `sendto()`。

具体的差异可以查看下方的示例程序。

## 参考程序

### TCP-Server

```cpp
/*************************************************************************
  > File Name: ipc_tcp_server.cpp
  > Author: TianLun Song
  > Mail: songtianlun@frytea.com
  > Blog: https://blog.frytea.com
  > Created Time: Wed 13 Jan 2021 09:53:06 AM CST
 ************************************************************************/
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <memory.h>
#include <unistd.h>
#include <stdio.h>
#include <iostream>

using namespace std;
const char* server_file = "/tmp/ipc_tcp_server.sock";

int main(int argc,char** argv)
{
    int socket_fd = socket(AF_UNIX,SOCK_STREAM,0);
    if (socket_fd < 0)
    {
        perror("socket");
        return -1;
    }
    struct sockaddr_un addr;
    memset(&addr,0,sizeof(addr));
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path,server_file);
    if (access(addr.sun_path,0) != -1)
    {
        remove(addr.sun_path);
    }
    if (bind(socket_fd,(sockaddr*)&addr,sizeof(addr)) < 0)
    {
        perror("bind");
        return -1;
    }
    /* --------DIFF, ipc tcp only------------ */
    if (listen(socket_fd,12) < 0)
    {
        perror("listen");
        return -1;
    }
    /* ---------------end------------ */
    struct sockaddr_un clientaddr;
    socklen_t addrlen = sizeof(clientaddr);
    char msg_buf[1024];
    /* --------DIFF, ipc tcp only------------ */
    int newcon = -1;
    newcon = accept(socket_fd,(sockaddr*)&clientaddr,&addrlen);
    if (newcon < 0)
    {
        perror("accept");
        return -1;
    }
    /* ---------------end------------ */
    while (1)
    {
        memset(msg_buf,'\0',1024);
        int rsize = recv(newcon,msg_buf,sizeof(msg_buf),0);
        if (rsize < 0)
        {
            perror("server recv error!");
            break;
        }
        cout << "I'm Unix socket(TCP) server, recv a msg:" << msg_buf << " from: " << clientaddr.sun_path << endl;
        strcpy(msg_buf, "OK,I got it!");
        int ssize = send(newcon, msg_buf, sizeof msg_buf, 0);
        if (ssize < 0)
        {
            perror("server send error!");
            break;
        }
        sleep(1);
    }
    /* --------DIFF, ipc tcp only------------ */
    if (close(newcon) < 0)
    {
        perror("close accept");
        return -1;
    }
    /* ---------------end------------ */
    if (close(socket_fd) < 0)
    {
        perror("close socket");
        return -1;
    }
    return 0;
}
```

### TCP-Client

```cpp
/*************************************************************************
  > File Name: ipc_tcp_client.cpp
  > Author: TianLun Song
  > Mail: songtianlun@frytea.com
  > Blog: https://blog.frytea.com
  > Created Time: Wed 13 Jan 2021 10:14:09 AM CST
 ************************************************************************/
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <memory.h>
#include <unistd.h>
#include <stdio.h>
#include <iostream>

using namespace std;

const char* server_file = "/tmp/ipc_tcp_server.sock";
const char* client_file = "/tmp/ipc_tcp_client.sock";

int main(int argc,char** argv)
{
    int socket_fd = socket(AF_UNIX,SOCK_STREAM,0);
    if (socket_fd < 0)
    {
        perror("client socket");
        return -1;
    }
    struct sockaddr_un client_addr;
    memset(&client_addr,0,sizeof(client_addr));
    client_addr.sun_family = AF_UNIX;
    strcpy(client_addr.sun_path,client_file);

    if (access(client_addr.sun_path,0) != -1)
    {
        remove(client_addr.sun_path);
    }

    if(bind(socket_fd,(sockaddr*)&client_addr,sizeof(client_addr)) < 0)
    {
        perror("client bind");
        return -1;
    }
    struct sockaddr_un serveraddr;
    memset(&serveraddr,0,sizeof(serveraddr));
    socklen_t addrlen = sizeof(serveraddr);
    serveraddr.sun_family = AF_UNIX;
    strcpy(serveraddr.sun_path,server_file);
    char msg_buf[1024];
    /* --------DIFF, ipc tcp only------------ */
    int newcon = -1;
    newcon = connect(socket_fd,(sockaddr*)&serveraddr,addrlen);
    if (newcon < 0){
        perror("client connect");
    }
    /* ---------------end------------ */
    while(1)
    {
        strcpy(msg_buf, "How are you !!!");
        int ssize = send(socket_fd, msg_buf, sizeof msg_buf, 0);
        if (ssize < 0)
        {
            perror("client send");
            continue;
        }
        int rsize = recv(socket_fd, msg_buf, sizeof(msg_buf), 0);
        if (rsize < 0)
        {
            perror("client recv");
            continue;
        }
        cout << "I'm Unix socket(TCP) client，receive a msg :" << msg_buf << endl;
        sleep(1);
    }
    if (close(socket_fd) < 0)
    {
        perror("close");
        return -1;
    }
    return 0;
}
```

### UDP-Server

```cpp
/*************************************************************************
  > File Name: ipc_udp_server.cpp
  > Author: TianLun Song
  > Mail: songtianlun@frytea.com
  > Blog: https://blog.frytea.com
  > Created Time: Wed 13 Jan 2021 09:53:06 AM CST
 ************************************************************************/
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <memory.h>
#include <unistd.h>
#include <stdio.h>
#include <iostream>

using namespace std;
const char* server_file = "/tmp/ipc_udp_server.sock";

int main(int argc,char** argv)
{
    int socket_fd = socket(AF_UNIX,SOCK_DGRAM,0);
    if (socket_fd < 0)
    {
        perror("socket");
        return -1;
    }
    struct sockaddr_un addr;
    memset(&addr,0,sizeof(addr));
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path,server_file);
    if (access(addr.sun_path,0) != -1)
    {
        remove(addr.sun_path);
    }
    if (bind(socket_fd,(sockaddr*)&addr,sizeof(addr)) < 0)
    {
        perror("bind");
        return -1;
    }
    struct sockaddr_un clientaddr;
    socklen_t addrlen = sizeof(clientaddr);
    char msg_buf[1024];
    while (1)
    {
        memset(msg_buf,'\0',1024);
        int rsize = recvfrom(socket_fd,msg_buf,sizeof(msg_buf),0,(sockaddr*)&clientaddr,&addrlen);
        if (rsize < 0)
        {
            perror("server recv error!");
            break;
        }
        cout << "I'm Unix socket(UDP) server, recv a msg: " << msg_buf  << " from: " << clientaddr.sun_path << endl;
        strcpy(msg_buf, "OK,I got it!");
        int ssize = sendto(socket_fd, msg_buf, sizeof msg_buf,0,(sockaddr*)&clientaddr,addrlen);
        if (ssize < 0)
        {
            perror("server send error!");
            break;
        }
        sleep(1);
    }
    if (close(socket_fd) < 0)
    {
        perror("close socket");
        return -1;
    }
    return 0;
}
```

### UDP-Client

```cpp
/*************************************************************************
  > File Name: ipc_udp_client.cpp
  > Author: TianLun Song
  > Mail: songtianlun@frytea.com
  > Blog: https://blog.frytea.com
  > Created Time: Wed 13 Jan 2021 10:14:09 AM CST
 ************************************************************************/
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <memory.h>
#include <unistd.h>
#include <stdio.h>
#include <iostream>

using namespace std;

const char* server_file = "/tmp/ipc_udp_server.sock";
const char* client_file = "/tmp/ipc_udp_client.sock";

int main(int argc,char** argv)
{
    int socket_fd = socket(AF_UNIX,SOCK_DGRAM,0);
    if (socket_fd < 0)
    {
        perror("client socket");
        return -1;
    }
    struct sockaddr_un client_addr;
    memset(&client_addr,0,sizeof(client_addr));
    client_addr.sun_family = AF_UNIX;
    strcpy(client_addr.sun_path,client_file);

    if (access(client_addr.sun_path,0) != -1)
    {
        remove(client_addr.sun_path);
    }

    if(bind(socket_fd,(sockaddr*)&client_addr,sizeof(client_addr)) < 0)
    {
        perror("client bind");
        return -1;
    }
    struct sockaddr_un serveraddr;
    memset(&serveraddr,0,sizeof(serveraddr));
    socklen_t addrlen = sizeof(serveraddr);
    serveraddr.sun_family = AF_UNIX;
    strcpy(serveraddr.sun_path,server_file);
    char msg_buf[1024];
    while(1)
    {
        strcpy(msg_buf, "How are you !!!");
        int ssize = sendto(socket_fd, msg_buf, sizeof msg_buf, 0, (sockaddr*)&serveraddr,addrlen);
        if (ssize < 0)
        {
            perror("client sendto");
            continue;
        }
        int rsize = recvfrom(socket_fd, msg_buf, sizeof(msg_buf), 0,(sockaddr*)&serveraddr, &addrlen);
        if (rsize < 0)
        {
            perror("client recv");
            continue;
        }
        cout << "I'm Unix socket(TCP) client，receive a msg :" << msg_buf << endl;
        sleep(1);
    }
    if (close(socket_fd) < 0)
    {
        perror("close");
        return -1;
    }
    return 0;
}
```

## 源文件

[ipc_test.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea27dc8e-b717-471a-b2f9-dc892d8127a3/ipc_test.zip)

## 参考文献

- Linux 多进程通信开发(七): unix domain socket 之 UDP 通信：[https://blog.csdn.net/briblue/article/details/89350869](https://blog.csdn.net/briblue/article/details/89350869)
- Linux 多进程通信开发(八): unix domain socket 之 TCP 通信：[https://frank909.blog.csdn.net/article/details/89435736](https://frank909.blog.csdn.net/article/details/89435736)
- Unix domain socket 简介：[https://www.cnblogs.com/sparkdev/p/8359028.html](https://www.cnblogs.com/sparkdev/p/8359028.html)
- linux 进程间使用unix socket通信：[https://blog.csdn.net/nurke/article/details/77621782](https://blog.csdn.net/nurke/article/details/77621782)