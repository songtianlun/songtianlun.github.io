---
title: "申威（神/声）（SW）1621 + UOS 20 编译安装 Docker | 容器国产化适配"
categories: [ "编程开发" ]
tags: [ "docker","申威" ]
draft: false
slug: "598"
date: "2021-11-10 18:08:00"
---

## 环境

- OS: `UOS 20 1021 12011.101`
- CPU: `SW_64` `SW1621`

## 步骤

### 本地编译 runc

1.解压 runc 源码至 `~/go/src/github.com/opencontainers` 目录；

```bash
~/go/                                                                                
└── src                                                                                              
    └── github.com                                                                                       
        └── opencontainers                                                                           
            └── runc
```

2.进入 `runc` 主目录，替换 `vendor/golang.org/x/sys/unix` 目录为申威平台 `golang1.14.1` 源码 `go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix` 目录。

3.修改 `libcontainer/system/syscall_linux_64.go` 文件，在文件头添加 sw64 架构定义 `//+build sw64`。

```bash
$ head libcontainer/system/syscall_linux_64.go 
// +build sw64
// +build linux
// +build arm64 amd64 mips mipsle mips64 mips64le ppc ppc64 ppc64le riscv64 s390x sw64
```

4.修改 Makefile，去掉 runc 编译过程的-buildmode=pie，执行 `make && make install` 进行编译、安装。

```bash
$ make
go build  -ldflags "-X main.gitCommit="04433551a33fa0c5e1c547759074e4bce9a7ecde-dirty" -X main.version=1.0.0-rc10 " -tags "seccomp" -o runc .
$ sudo make install
验证成功
install -D -m0755 runc /usr/local/sbin/runc
```

### 本地编译 containerd

1.解压 `containerd` 源码至 `~/go/src/github.com/containerd` 目录，重命名为 `containerd`；

```bash
~/go/
└── src
    └── github.com
        └── containerd
            └── containerd
```

2.进入 `containerd` 主目录，替换 `vendor/golang.org/x/sys/unix` 目录为申威平台 `golang1.14.1` 源码中的 `go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix` 目录。

```bash
cp -r ~/go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix vendor/golang.org/x/sys/unix
```

3.修改 `vendor/github.com/containerd/fifo/handle_linux.go` 文件，并将 `const O_PATH=010000000` 改为 `040000000` 。

```bash
$ vim vendor/github.com/containerd/fifo/handle_linux.go
- const O_PATH = 010000000
+ const O_PATH = 040000000
```

4.修改 `platforms/database.go` 文件，在 `isKnownArch` 函数中添加 `sw64` 

```go
// isKnownArch returns true if we know about the architecture.
//
// The arch value should be normalized before being passed to this function.
func isKnownArch(arch string) bool {
        switch arch {
        case "386", "amd64", "amd64p32", "arm", "armbe", "arm64", "arm64be", "ppc64", "ppc64le", "mips", "mipsle", "mips64", "mips64le", "mips64p32", "mips64p32le", "ppc", "riscv", "riscv64", "s390", "s390x", "sparc", "sparc64", "wasm", "sw64":
                return true
        }
        return false
}
```

5.修改 `containerd` 主目录下的 `Makefile.linux` 文件，取消 `sw64` 的 `-buildmode=pie` 编译选项，执行 `make && make install` 进行编译、安装。

```bash
$ vim Makefile.linux
ifeq ($(GOOS),linux,!sw64)
        GO_GCFLAGS +=
endif

$ make                                
+ bin/ctr
+ bin/containerd
+ bin/containerd-stress
+ bin/containerd-shim
+ bin/containerd-shim-runc-v1
+ bin/containerd-shim-runc-v2
+ binaries
$ sudo make install                   
+ install bin/ctr bin/containerd bin/containerd-stress bin/containerd-shim bin/containerd-shim-runc-v1 bin/containerd-shim-runc-v2
```

6. 使用 `systemd` 管理 `containerd` 服务。首先将 `containerd` 主目录下的 `containerd.service` 文件复制到 `/usr/lib/systemd/system/` 目录，然后执行 `systemctl daemon-reload` 、 `systemctl start containerd` 、 `systemctl enable containerd`，最后执行 `systemctl status containerd` 查看服务状态。

```bash
$ sudo cp containerd.service /usr/lib/s
ystemd/system/                                                                                       
songtianlun@user-uos:~/go/src/github.com/containerd/containerd$ systemctl daemon-reload              
==== AUTHENTICATING FOR org.freedesktop.systemd1.reload-daemon ===                                   
Info: Verification successful
==== AUTHENTICATION COMPLETE ===
$ sudo systemctl enable containerd
$ sudo systemctl start containerd
$ sudo systemctl status containerd
● containerd.service - containerd container runtime                                                 
   Loaded: loaded (/lib/systemd/system/containerd.service; enabled; vendor preset: enabled)         
   Active: active (running) since Wed 2021-11-10 10:00:29 CST; 1h 9min ago                          
     Docs: https://containerd.io
 Main PID: 707 (containerd)
    Tasks: 22
   Memory: 50.8M
   CGroup: /system.slice/containerd.service
           └─707 /usr/local/bin/containerd

```

### 本地编译 docker 相关组件

解压 `docker-ce-18.09.zip` ，将 `components` 目录下的 `cli` 和 `engine` 复制到 `~/go/src/github.com/docker` 目录下，并将 `engine` 目录改名为 `docker` ，分别编译得到 `docker-cli` 及 `dockerd` 组件。

```bash
~/go/
└── src
    └── github.com
        └── docker
            ├── cli
            └── docker
```

### 编译 `docker-cli`

1.进入 `cli` 目录，替换 `vendor/golang.org/x/sys/unix` 目录为申威平台 `golang1.14.1` 源码中的  `go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix`  目录。

```bash
$ cp -r ~/go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix vendor/golang.org/x/sys/unix
```

2.修改 `vendor/github.com/containerd/fifo/handle_linux.go` 文件，并将 `const O_PATH=010000000` 改为 `040000000`。

```bash
$ vim vendor/github.com/containerd/fifo/handle_linux.go
- const O_PATH = 010000000
+ const O_PATH = 040000000
```

3.执行 `make VERSION=18.09.9` 进行本地编译，编译后得到的二进制文件在 `build` 目录下。

```bash
$ make VERSION=18.09.9                            
                                                                                                     
                                                                                                     
WARNING: you are not in a container.                                                                 
Use "make -f docker.Makefile " or set                                                                
DISABLE_WARN_OUTSIDE_CONTAINER=1 to disable this warning.                                            
                                                                                                     
Press Ctrl+C now to abort.                                                                           
                                                                                                     
WARNING: binary creates a Linux executable. Use cross for macOS or Windows.                          
./scripts/build/binary                                                                               
Building statically linked build/docker-linux-sw64

$ sudo cp docker /usr/bin/
```

### 编译 `dockerd`

1.进入 `docker` 目录，替换 `vendor/golang.org/x/sys/unix` 目录为申威平台 `golang1.14.1` 源码中的 `go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix` 目录。

```bash
$ cp -r ~/data/go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix vendor/golang.org/x/sys/unix
```

2.修改 `vendor/github.com/containerd/fifo/handle_linux.go` 文件，将 `const O_PATH=010000000` 改为 `040000000`。

```bash
$ vim vendor/github.com/containerd/fifo/handle_linux.go
- const O_PATH = 010000000
+ const O_PATH = 040000000
```

3.修改 `vendor/github.com/containerd/containerd/platforms/database.go` 文件，在 `isKnownArch` 函数中添加 `sw64` 。

```bash
// isKnownArch returns true if we know about the architecture.
//
// The arch value should be normalized before being passed to this function.
func isKnownArch(arch string) bool {
        switch arch {
        case "386", "amd64", "amd64p32", "arm", "armbe", "arm64", "arm64be", "ppc64", "ppc64le", "mips", "mipsle", "mips64", "mips64le", "mips64p32", "mips64p32le", "ppc", "riscv", "riscv64", "s390", "s390x", "sparc", "sparc64", "wasm", "sw64":
                return true
        }
        return false
}
```

4.修改 `vendor/github.com/opencontainers/runc/libcontainer/system/syscall_linux_64.go` 文件，在文件头添加 `//+build sw64` 。

```bash
$ head vendor/github.com/opencontainers/runc/libcontainer/system/syscall_linux_64.go 
// +build linux
// +build arm64 amd64 mips mipsle mips64 mips64le ppc ppc64 ppc64le s390x sw64
```

5.修改 `hack/make/.binary` 文件，取消 `linux/sw64` 平台的 `buildmode=pie` 选项。

```bash
case "$(go env GOOS)/$(go env GOARCH)" in
        windows/*|linux/mips*|linux/sw64)
                ;;
        *)
                BUILDFLAGS+=( "" )
                ;;
esac
```

6.执行 `VERSION=18.09.9 GOPATH="/root/go" DOCKER_GITCOMMIT=new ./hack/make.sh
dynbinary-daemon` 进行本地编译，编译后得到的二进制文件在 `bundles` 目录下。

```bash
$ VERSION=18.09.9 GOPATH="/home/songtianlun/go" DOCKER_GITCOMMIT=new ./hack/make.sh
$ sudo cp bundles/binary-daemon/dockerd /usr/bin/
sudo VERSION=18.09.9 GOPATH="/home/songtianlun/go" DOCKER_GITCOMMIT=new KEEPBUNDLE=1 ./hack/make.sh install-binary
```

### 编译 `docker-init`

- [https://github.com/krallin/tini/archive/refs/tags/v0.19.0.tar.gz](https://github.com/krallin/tini/archive/refs/tags/v0.19.0.tar.gz)

1.解压 `tini` 源码，进入 `tini` 主目录；

```bash
$ wget https://github.com/krallin/tini/archive/refs/tags/v0.19.0.tar.gz
$ mv v0.19.0.tar.gz tini-v0.19.0.tar.gz
$ tar xvf tini-v0.19.0.tar.gz
$ cd tini-0.19.0
```

2.执行 `cmake . && make tini-static` ，编译得到 `tini-static` 二进制文件；

```bash
$ cmake .
-- The C compiler identification is GNU 8.3.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
fatal: 不是一个 git 仓库：'/home/songtianlun/data/tini-0.19.0/.git'
fatal: 不是一个 git 仓库：'/home/songtianlun/data/tini-0.19.0/.git'
-- Performing Test HAS_BUILTIN_FORTIFY
-- Performing Test HAS_BUILTIN_FORTIFY - Failed
-- Configuring done
-- Generating done
-- Build files have been written to: /home/songtianlun/data/tini-0.19.0

$ make tini-static
Scanning dependencies of target tini-static
[ 50%] Building C object CMakeFiles/tini-static.dir/src/tini.c.o
[100%] Linking C executable tini-static
[100%] Built target tini-static
```

3.执行 `cp tini-static docker-init`，得到 `docker-init`。

```bash
sudo cp docker-init /usr/bin/
```

### 编译 `docker-proxy`

- [https://github.com/moby/libnetwork/archive/refs/tags/v0.3.tar.gz](https://github.com/moby/libnetwork/archive/refs/tags/v0.3.tar.gz)

1.解压 `libnetwork` 源码到 `~/go/src/github.com` 目录，重命名为 `libnetwork` ；

```bash
$ git clone https://github.com/moby/libnetwork.git
```

2.进入 `libnetwork` 主目录，替换 `vendor/golang.org/x/sys/unix` 目录为申威平台`golang1.14.1` 源码中的 `go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix` 目录。

```bash
$ cp -r ~/data/go-sw64-1.14.1/src/cmd/vendor/golang.org/x/sys/unix vendor/golang.org/x/sys/unix
```

3.进入 `cmd/proxy` 目录，执行 `CGO_ENABLED=0 go build -o docker-proxy` ，得到 `docker-proxy` 二进制文件。

```bash
$ go get
$ CGO_ENABLED=0 go build -o docker-proxy
$ sudo cp docker-proxy /usr/bin/
```

## 本地编译安装验证

1.按上述步骤安装 `runc` 、 `containerd` ，并启动 `containerd` 服务；

2.复制编译得到的二进制文件 `docker` 、 `dockerd` 、 `docker-init` 、 `docker-proxy`  到 `/usr/bin`  目录下；

3. 将 `docker/contrib/init/systemd` 目 录 下 的 `docker.service` 和 `docker.socket` 文 件 复 制 到 `/lib/systemd/system` 目录下，添加 `docker` 组： `groupadd --system docker`。

```bash
$ sudo cp ~/go/src/github.com/docker/docker/contrib/init/systemd/docker.service /lib/systemd/system/
$ sudo cp ~/go/src/github.com/docker/docker/contrib/init/systemd/docker.socket /lib/systemd/system/
```

4.执行 `systemctl daemon-reload` 、 `systemctl start docker` 、 `systemctl enable docker` 启动 docker 服务。

```bash
$ sudo systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2021-11-10 17:32:07 CST; 4min 33s ago
     Docs: https://docs.docker.com
 Main PID: 815 (dockerd)
    Tasks: 21 (limit: 4915)
   Memory: 94.9M
   CGroup: /system.slice/docker.service
           └─815 /usr/bin/dockerd -H fd://
```

## 测试镜像

拉取测试镜像

```bash
docker pull harbor.sh.deepin.com/library/minideb:latest
```

docker运行

```bash
docker run -d -it harbor.sh.deepin.com/library/minideb sh
```

## F&Q

- 解决 `Package libseccomp was not found in the pkg-config search path.`

```bash
sudo apt install libseccomp-dev
```

- `fatal error: btrfs/ioctl.h: No such file or directory`

```bash
$ sudo apt-get install libbtrfs-dev
$ yum install btrfs-progs-devel
```

- `Package devmapper was not found in the pkg-config search path.`

```bash
$ sudo apt-get install libdevmapper-dev
$ yum install device-mapper-devel
```

- **`Iptables/1.8.2 Failed to initialize nft: Protocol not supported`**

```bash
# update-alternatives --set iptables /usr/sbin/iptables-legacy
# update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
# update-alternatives --set arptables /usr/sbin/arptables-legacy
# update-alternatives --set ebtables /usr/sbin/ebtables-legacy
```

## 附件

[go-sw64-1.14.1.tar.gz](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7edfa4fe-596d-45ed-aecb-ead3a2f878af/go-sw64-1.14.1.tar.gz)

[docker-18.09.9-sw64.tar.gz](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db572ead-47b1-474d-8b30-4a9ee9bdc501/docker-18.09.9-sw64.tar.gz)

> 附件若无法下载请转到本文的 Notion 共享页下载：[https://fryteacs.notion.site/SW-1621-UOS-20-Docker-c1d7ff16b6a4492a99c794fab253b24d](https://www.notion.so/SW-1621-UOS-20-Docker-c1d7ff16b6a4492a99c794fab253b24d)
> 

## 参考文献

- [docker 编译指南 By SW](https://developer.wxiat.com/api/v1/file_system/download/docker%E7%BC%96%E8%AF%91%E6%8C%87%E5%8D%97.pdf?path=2d6cd308ac7d41a19860e8c712114212)
- [docker By SW 生态](https://developer.wxiat.com/understand/ecologial/2)
- **[[runc] No package 'libseccomp' found](https://zhuanlan.zhihu.com/p/83541094)**
- [No package 'libseccomp' found error during runc build #1032](https://github.com/opencontainers/runc/issues/1032)
- [btrfs error on build #3488#issuecomment-51832461](https://github.com/containerd/containerd/issues/3488#issuecomment-518324610)
- [docker 编译问题](https://blog.csdn.net/u010066807/article/details/84134809)
- [Iptables/1.8.2 Failed to initialize nft: Protocol not supported](https://itectec.com/superuser/iptables-1-8-2-failed-to-initialize-nft-protocol-not-supported/)
- [容器国产化适配](http://www.iceyao.com.cn/2019/09/29/%E7%94%B3%E5%A8%81k8s%E4%B9%8B%E6%97%85/)