---
title: "Docker 热迁移探索，基于CRIU实现运行状态迁移"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "499"
date: "2020-12-23 13:57:29"
---

## 版本限制

- Docker: `17.06.0-ce`
- criu: `3.12`
- kernal: `3.10.0-957.el7.x86_64` || `5.10.2-1.el7.elrepo.x86_64` (Optional)
- os: `CentOS Linux release 7.9.2009 (Core)` (Optional)

> 实测在该环境下，容器热迁移可用，热迁移成功与否与 `docker` 和 `criu` 版本强相关。

## 环境部署

```bash

# Docker 安装
$ sudo yum install -y yum-utils
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum list docker-ce --showduplicates | sort -r
$ sudo yum install docker-ce-17.06.0.ce
$ sudo systemctl start docker

# 启动Docker实验特征
vim **/etc/docker/daemon.json
+ { "experimental": true }**

# criu 安装
$ sudo yum install criu -y

# Go安装(可选)
wget https://golang.org/dl/go1.15.6.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
vim /etc/profile
+ export PATH=$PATH:/usr/local/go/bin
source /etc/profile
```

## 热迁移示例

```bash
# On the host
$ docker run -d --name looper2 --security-opt seccomp:unconfined busybox \
         /bin/sh -c 'i=0; while true; do echo $i; i=$(expr $i + 1); sleep 1; done'

# wait a few seconds to give the container an opportunity to print a few lines, then
$ docker checkpoint create looper2 checkpoint2

# check your container & print log file
$ docker logs looper2

# On the client
$ docker create --name looper-clone --security-opt seccomp:unconfined busybox \
         /bin/sh -c 'i=0; while true; do echo $i; i=$(expr $i + 1); sleep 1; done'

$ docker start --checkpoint=checkpoint2 looper-clone

# check your container
$ docekr ps
$ docker logs looper-clone
```

以上步骤将容器 `looper2` 的状态迁移到 `looper-clone` ，可实现当前容器、跨容器的状态迁移，甚至可以实现跨主机的迁移，只需将该目录 `/var/lib/docker/{docker id}/checnkpoints/` 下面与检查点同名的文件夹迁移即可。

## 附件

### 附件一：C测试程序

```c
/*************************************************************************
	> File Name : fork_test.c
	> Author : TL Song
	> EMail : songtianlun@frytea.com
	> Created Time : Wed 23 Dec 2020 08:46:47 AM CST
 ************************************************************************/

#include <stdio.h>
#include <unistd.h>
#include <time.h>
#include <sys/types.h>
 
int main(int arg,char* argv[]) {
 
    int i = 0;
    time_t t;
    struct tm *timeinfo;
    // int 被 typedef为 pid_t
    pid_t pid=fork();
 
    // 当pid==0时，是子进程代码运行区域。其他则是父进程运行区域。
    if(pid<0) {
        printf("Create child process failure ...\n");
    }else if(pid==0) {
        //子进程执行体
        printf("Hi i am child process ,my processId is %i \n",getpid());
        i = 0;
        while (1) {
            sleep(1);
            time(&t);
            timeinfo = localtime(&t);
            printf("Child: %d %s\n", i++, asctime(timeinfo));
            fflush(stdout);
            if(i>100)
                break;
        }
    }
    else{
        //父进程执行体
        printf("parent process is run ,myid is %i \n",getpid());
        i = 0;
        while (1) {
            sleep(1);
            time(&t);
            timeinfo = localtime(&t);
            printf("Main : %d %s\n", i++, asctime(timeinfo));
            fflush(stdout);
            if(i>100)
                break;
        }
    }
    // 执行体结束标志
    if(pid==0) {
        printf("pid=%i child process end ... \n",getpid());
    }
    else {
        // 睡眠5s,等待子先进程结束
        sleep(5);
        printf("pid=%i Parent process End ... \n",getpid());
    }
 
    return 0;
}
```

## 参考文献

- docker集成criu实现热迁移功能的使用方法：[http://luqitao.github.io/2019/01/24/Docker_and_criu_migrate_containers/#创建checkpoint-1](http://luqitao.github.io/2019/01/24/Docker_and_criu_migrate_containers/#%E5%88%9B%E5%BB%BAcheckpoint-1)
- Download and install：[https://golang.google.cn/doc/install](https://golang.google.cn/doc/install)
- CentOS Docker 安装：[https://www.runoob.com/docker/centos-docker-install.html](https://www.runoob.com/docker/centos-docker-install.html)
- centos 7 安装golang1.13.5：[https://www.cnblogs.com/nickchou/p/10934025.html](https://www.cnblogs.com/nickchou/p/10934025.html)
- <C语言>打印（输）出系统时间-----time相关函数：[https://blog.csdn.net/WU9797/article/details/76922323](https://blog.csdn.net/WU9797/article/details/76922323)
- docker 内部文件没有权限的解决方法_xcagy - 国际性的文档记录中心 - CSDN 博客：[https://blog.csdn.net/ccagy/article/details/85859256](https://blog.csdn.net/ccagy/article/details/85859256)
- CRIU和Pod在线迁移：[https://blog.gmem.cc/live-migration-of-pods](https://blog.gmem.cc/live-migration-of-pods)
- centos7升级内核至最新：[https://www.cnblogs.com/ding2016/p/10429640.html](https://www.cnblogs.com/ding2016/p/10429640.html)
- Install Docker Engine on CentOS：[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)