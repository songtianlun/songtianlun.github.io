---
title: "一种C程序使用IPC多进程共享内存并实现热迁移的方法"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "501"
date: "2020-12-31 00:23:00"
---

> 在软件中，术语共享内存指可被多个进程存取的内存，一个进程是一段程序的单个运行实例。在这种情况下，共享内存被用作进程间的通讯。——WikiPedia

在Linux系统中，有多种C语言支持的共享内存使用方法，包括以下几种：

1. 基于传统 `SYS V` 的共享内存；
2. 基于 `POSIX mmap` 文件映射实现共享内存；
3. 通过 `memfd_create()` 和 `fd` 跨进程共享实现共享内存；
4. 多媒体、图形领域广泛使用的基于 `dma-buf` 的共享内存。

> `CRIU` 是用于 `Linux` 操作系统的软件工具。使用此工具，可以冻结正在运行的应用程序，并将其作为文件集合检查点到持久性存储中。然后，人们可以使用这些文件从冻结点还原并运行应用程序。但不是所有程序都支持通过CRIU进行热迁移，例如使用了 `SYS V` 的C程序就不可以使用 CRIU 进行 进程热迁移。

这篇文章讨论如何使用CRIU迁移使用了共享内存的程序，主要讨论其中的前两种共享内存方法，最终介绍**一种支持热迁移的C程序共享内存使用方法**。

## 共享简单实现

 `System V` ，曾经也被称为 AT&T System V，是Unix操作系统众多版本中的一支， `SYS V` 共享内存历史悠久、年代久远、API怪异，对应内核代码 `linux/ipc/shm.c` ，使用命令 `ipcs` 看到的就是这种内存； `Posix` 表示可移植操作系统接口（Portable Operating System Interface ，缩写为 POSIX ），POSIX标准定义了操作系统应该为应用程序提供的接口标准，是IEEE为要在各种 `UNIX` 操作系统上运行的软件而定义的一系列API标准的总称，其正式称呼为IEEE 1003，而国际标准名称为ISO/IEC 9945。

下面列举了两种共享内存的C程序使用方法。

### （1）Sys V 共享内存

`ipc_share_mem_write` ，共享内存写入示例程序。

```bash
/*************************************************************************
	> File Name : ipc_share_mem_write.c
	> Author : TL Song
	> EMail : songtianlun@frytea.com
	> Created Time : Wed 30 Dec 2020 03:17:00 PM CST
 ************************************************************************/

#include <stdio.h>
#include <sys/shm.h>
#include <unistd.h>
#include <string.h>

int main(int argc, char ** argv)
{
    key_t key = ftok("/dev/shm/myshm2",0);
    int shm_id = shmget(key, 0x400000, IPC_CREAT | 0666);
    char *p = (char *)shmat(shm_id, NULL, 0);
    char cIndex = 'A';
    int i = 0;
    for(i=0;i<100;i++){
        memset(p, cIndex++, 0x400000);
        printf("Write '%c' to mem '%p'\n", *p, p);
        sleep(1);
    }
    shmdt(p);
    return 0;
}
```

`ipc_share_mem_read` ，共享读取示例程序。

```bash
/*************************************************************************
	> File Name : ipc_share_mem_read.c
	> Author : TL Song
	> EMail : songtianlun@frytea.com
	> Created Time : Wed 30 Dec 2020 03:22:20 PM CST
 ************************************************************************/

#include <stdio.h>
#include <unistd.h>
#include <sys/shm.h>

int main(int argc, char ** argv)
{
    key_t key = ftok("/dev/shm/myshm2", 0);
    int shm_id = shmget(key, 0x400000, 0666);
    char *p = (char *)shmat(shm_id, NULL, 0);
    int i = 0;
    for(i = 0 ;i < 100; i++)
    {
        printf("Read '%c' in mem '%p'\n", *p, p);
        sleep(1);
    }
    shmdt(p);
    return 0;
}
```

直接编译运行即可：

```bash
$ gcc ipc_share_mem_write.c -o ipc_share_mem_write
$ gcc ipc_share_mem_read.c -o ipc_share_mem_read
$ touch /dev/shm/myshm2

# 在两个终端分别执行程序即可。
```

可以使用 `free` 命令查看执行前后共享内存空间的变化情况：

```bash
[root@criu_go ~]# free
              total        used        free      shared  buff/cache   available
Mem:        3880732     3193512      421660        9216      265560      461624
Swap:       4063228           0     4063228
[root@criu_go ~]# free
              total        used        free      shared  buff/cache   available
Mem:        3880732     3193744      417308       13312      269680      457292
```

### （2）POSIX 共享内存

`ipc_share_mem_posix_write` ，共享内存写入示例程序。

```bash
/*************************************************************************
	> File Name : ipc_share_mem_posix_write.c
	> Author : TL Song
	> EMail : songtianlun@frytea.com
	> Created Time : Wed 30 Dec 2020 03:17:00 PM CST
 ************************************************************************/

#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char ** argv)
{
    int fd = shm_open("posixsm", O_CREAT | O_RDWR, 0666);
    ftruncate(fd, 0x400000);
    
    char *p = mmap(NULL, 0x400000, PROT_READ| PROT_WRITE, MAP_SHARED, fd, 0);
    char cIndex = 'A';
    int i = 0;
    for(i=0;i<100;i++){
        memset(p, cIndex++, 0x400000);
        printf("Write '%c' to mem '%p'\n", *p, p);
        sleep(1);
    }
    munmap(p, 0x400000);
    return 0;
}
```

`ipc_share_mem_posix_read` ，共享读取示例程序。

```bash
/*************************************************************************
	> File Name : ipc_share_mem_posix_read.c
	> Author : TL Song
	> EMail : songtianlun@frytea.com
	> Created Time : Wed 30 Dec 2020 03:22:20 PM CST
 ************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(int argc, char ** argv)
{
    int fd = shm_open("posixsm", O_RDONLY, 0666);
    ftruncate(fd, 0x400000);

    char *p = mmap(NULL, 0x400000, PROT_READ, MAP_SHARED, fd, 0);
    int i = 0;
    for(i = 0 ;i < 100; i++)
    {
        printf("Read '%c' in mem '%p'\n", *p, p);
        sleep(1);
    }
    munmap(p, 0x400000);
    return 0;
}
```

直接编译运行即可：

```bash
$ gcc ipc_share_mem_posix_write.c -o ipc_share_mem_posix_write -lrt
$ gcc ipc_share_mem_posix_read.c -o ipc_share_mem_posix_read -lrt

# 在两个终端分别执行程序即可。
```

之后可以在 `/dev/shm/` 、 `/run/shm` 下面看到一个文件。

## 进程热迁移

上文简单提到了 `criu` 工具，本文的目标即迁移使用了共享内存的C程序，实测使用了 `Sys V` 共享内存的C程序无法迁移，报错如下：

```jsx
Task 4526 with SysVIPC shmem map @7fdff5956000 doesn't live in IPC ns
```

使用`POSIX mmap` 文件映射实现共享内存的C程序可以使用 criu 实现进程热迁移，只需迁移共享内存文件及相关程序和文件即可实现本机和跨主机间的进程迁移，前提是内核、criu版本保持一致。迁移方法很简单，至于criu的安装，使用以下命令安装即可。

```jsx
$ yum install criu -y 
$ criu check
Looks good.
```

### CLI 进行进程迁移

```c
# 获取进程 PID
$ ps -ef | grep ipc
root     15748 15340  0 10:56 pts/1    00:00:00 ./checkpoint_demo
root     15751 15479  0 10:56 pts/2    00:00:00 grep --color=auto checkpoint_demo

# 对进程打快照
$ criu dump -D ./migrate_imgs/ -j -t 15748

# 略去拷贝快照文件夹的步骤，自行拷贝至目标机器任意位置即可

# 拷贝共享内存文件至目标位置
$ scp /dev/shm/posixsm root@192.168.7.48:/dev/shm/posixsm 

# 拷贝程序文件至目标位置，注意迁移前后的程序和依赖文件的路径必须保持一致
$ scp PracticeDev/clang/ipc_test/ipc_share_mem_posix_write root@192.168.7.48:/root/PracticeDev/clang/ipc_test

# 恢复进程状态
$ criu restore -D ./migrate_imgs/ -j
```

使用该方法可以将使用了共享内存的C程序冻结，之后恢复进程状态，`Posix`  共享内存的API略有不同，但使用方法类似，至于更进一步的探索，还需继续努力。

## 参考文献

- 宋宝华：世上最好的共享内存(Linux共享内存最透彻的一篇)：[https://blog.csdn.net/21cnbao/article/details/103470878](https://blog.csdn.net/21cnbao/article/details/103470878)
- Linux下的几种IPC方式及其C语言实现：[https://www.cnblogs.com/acm-icpcer/p/8933628.html](https://www.cnblogs.com/acm-icpcer/p/8933628.html)
- Linux Namespace : IPC：[https://www.cnblogs.com/sparkdev/p/9400673.html](https://www.cnblogs.com/sparkdev/p/9400673.html)
- IPC之Posix共享内存详解：[https://blog.csdn.net/daiyudong2020/article/details/50500651](https://blog.csdn.net/daiyudong2020/article/details/50500651)
- UNIX System V - WikiPedia：[https://zh.wikipedia.org/wiki/UNIX_System_V](https://zh.wikipedia.org/wiki/UNIX_System_V)
- 共享内存 - WikiPedia：[https://zh.wikipedia.org/wiki/共享内存](https://zh.wikipedia.org/wiki/%E5%85%B1%E4%BA%AB%E5%86%85%E5%AD%98)
- What software is supported - criu wiki：[https://criu.org/What_software_is_supported](https://criu.org/What_software_is_supported)
- Shared memory - criu wiki：[https://criu.org/index.php?title=Shared_memory](https://criu.org/index.php?title=Shared_memory)