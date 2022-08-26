---
title: "裸金属服务器kvm虚拟化安装win10"
categories: [ "编程开发" ]
tags: [ "KVM" ]
draft: false
slug: "261"
date: "2019-11-21 16:39:00"
---

受够了小鸡的各种卡顿以及各种套路，就想要一只"大鸡"，趁着双十一的余热购入[达州创梦网络](https://www.dzisp.cn)的[江苏宿迁高防裸金属服务器](https://www.dzisp.cn/baremetal/)（一种集合了虚拟机和物理机优点的产物），本人没有使用或配置过独立服务器，不过多评价。但和普通的 VPS 相比，裸金属服务器属于物理服务器，我的数据和其他用户数据做到了物理隔离，同时服务器本身是支持二次虚拟化的。

裸金属服务器的购入主要为满足自己下列几点需求：

 - 较高性能低延迟的 Windows 桌面工作台
 - 高防大容量的 Linux 网站服务器

当服务器交付完成，第一步就是对它进行**虚拟化**！这一台主机有下列硬件资源：

- CPU model            : Intel(R) Xeon(R) CPU           L5630  @ 2.13GHz
- Number of cores      : 16
- Thread(s) per core:    2
- Core(s) per socket:    4
- Socket(s):             2
- CPU frequency        : 1600.000 MHz
- Total size of Disk   : 932.0 GB (7.1 GB Used)
- OS                   : CentOS 7.5.1804
- Arch                 : x86_64 (64 Bit)
- Kernel               : 3.10.0-862.el7.x86_64

目前计划在宿主机上虚拟化一台 `win10` 和一台 `Debian`，其中为 `win10` 分配 `6C/8G/100GB`的硬件资源。下面就记录一下在 `CentOS 7.5`环境下使用 `KVM`架构虚拟化安装 `Win10 Pro`的过程。

## 环境准备

以下为摘录的部分关于 `KVM` 的描述，运行描述后的命令以完成 `KVM` 的环境准备。

KVM架构：

KVM 是基于虚拟化扩展（Intel VT 或者 AMD-V）的 X86 硬件的开源的 Linux 原生的全虚拟化解决方案。KVM 中，虚拟机被实现为常规的 Linux 进程，由标准 Linux 调度程序进行调度；
虚机的每个虚拟 CPU 被实现为一个常规的 Linux 进程。这使得 KMV 能够使用 Linux 内核的已有功能。
但是，KVM 本身不执行任何硬件模拟，需要客户空间程序通过 /dev/kvm 接口设置一个客户机虚拟服务器的地址空间，向它提供模拟的 I/O，并将它的视频显示映射回宿主的显示屏。
目前这个应用程序是 QEMU。

KVM 工具集合
 - libvirt：操作和管理KVM虚机的虚拟化 API，使用 C 语言编写，可以由 Python,Ruby, Perl, PHP, Java 等语言调用。可以操作包括 KVM，vmware，XEN，Hyper-v, LXC 等 Hypervisor。
 - Virsh：基于 libvirt 的 命令行工具 （CLI）
 - Virt-Manager：基于 libvirt 的 GUI 工具
 - virt-v2v：虚机格式迁移工具
 - virt-* 工具：包括 Virt-install （创建KVM虚机的命令行工具）， Virt-viewer （连接到虚机屏幕的工具），Virt-clone（虚机克隆工具），virt-top 等
 - sVirt：安全工具

（⚠️注："$" 后代表一条命令，没有该符号的行代表运行结果，"\"结尾代表多行命令，请注意）


```bash
$ yum -y install vim lrzsz
$ cat /etc/centos-release
　　CentOS Linux release 7.4.1708 (Core) 
$ uname -a
　　Linux bogon 3.10.0-693.el7.x86_64 #1 SMP Tue Aug 22 21:09:27 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux

$ yum -y install qemu-kvm virt-manager python-virtinst qemu-kvm-tools libvirt virt-install libvirt-python	　　　　	# 其中第2-4个是KVM的管理工具
$ lsmod |grep kvm 　　　　 　　 # 确定是否正确加载kvm模块
$ reboot	　　　　　　　　　　  	# 重启后下面的命令才管用，否则会出错
$ systemctl enable libvirtd　　     # 将libvitd服务加入开机自启
$ systemctl start libvirtd	　　　　	# 启动libvitd服务
$ systemctl status libvirtd	　　　　	# 查看libvitd服务的状态

$ virsh -c qemu:///system list （或者virsh  list）　　　　	# 如出现下面的信息则表明kvm成功安装

Id 名称 　　　　　　　　 　　 状态
----------------------------------------------------
```

## 准备资源

经过一番搜索和实践，创建一台虚拟机需要的资源清单如下：

- 桥接网卡(br0)
- 虚拟磁盘文件(WASU_AF.qcow2)
- virtio驱动(virtio-win-0.1.126_amd64.vfd)
- windows 10镜像(Win10_1903_V2_Chinese_Simplified_x64.iso)

### 需下载的资源

在进行下面的操作前先说需要下载的资源，可以在进行下列操作前先将这些资源下载好并整理好，创建虚拟机需要指定以上资源的路径，因此建议根据需求将需要的文件归类。

下面先来说说 `virtio驱动`， kvm 的虚拟硬盘的模式是virtio，virtio的性能和稳定性上佳， 但是windows安装盘是找不到virtio模式的虚拟硬盘的， 因此必须要加载virtio的磁盘驱动。驱动可以在安装前加载或是直接使用包含了驱动的镜像（第三方），此外还可以在安装时加载，本次安装就是在安装时加载驱动，将驱动作为磁盘进行加载，因此首先需要下载驱动，创建虚拟机时这个驱动将会和镜像一起加载。

Virtio驱动官方渠道: <https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/>

根据需要选择，在这里我选择 `virtio-win-0.1.173_amd64.vfd`
`wget https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.173-2/virtio-win-0.1.173_amd64.vfd`

windows10镜像不必多说，网上途径很多，在这里我选择通过官方渠道下载：

下载 Windows 10 光盘映像（ISO 文件） : <https://www.microsoft.com/zh-cn/software-download/windows10ISO>

准备好以上资源，接下来进行下面的步骤。



### 网卡配置

KVM 客户机网络连接有三种方式：

 - host-only：虚拟机使用的是当前计算机中的虚拟网卡，如VMWare Network Adaptor（这是VMWare的），仅主机模式，意思就是将所有的虚拟机组成一个局域网，不能和外界通信，不能访问Internet，其他主机也不能访问虚拟主机，安全性高，只能与本台真实机通信。
 - NAT方式（网络地址转换模式）：让虚拟机访问主机、互联网或本地网络上的资源的简单方法，但是不能从网络或其他的客户机访问客户机，性能上也需要大的调整。
 - Bridge方式「虚拟网桥（Virtual Bridge）」：这网络模式下客户机与宿主机处于同一网络环境，类似于一台真实的宿主机，直接访问网络资源，设置好后客户机与互联网，客户机与主机之间的通信都很容易。

---
2019.11.22更新

实际配置发现网桥可以使虚拟机和物理机处于同一级别，但是我并不知道我的服务器在当前局域网中的配置，此外我仅有一个ip，因此使用网桥并不合适（不知道理解的对不对，这是我目前的理解，后续有误再更）。因此这里修改为采用 `Nat` 方式配置网络。

开启 `IPV4转发`:

`vim /etc/sysctl.conf`

把 `net.ipv4.ip_forward = 1`  值原来是 `0`, 改成 `1`

执行命令 `sysctl -p` 使配置生效.

KVM虚拟机Nat方式上网：

`virsh net-list`

查看当前活跃的网络，可以看到一个`default`网络，这个就是安装 `KVM` 后自带的一个默认的Nat网络了。后面我们直接使用这个网络进行配置。

---
注：如果还没有进行bridge配置，继续下面的操作（磁盘配置）就好，如果已经使用 bridge 安装了虚拟机，可以按照以下的步骤修改`/etc/libvirt/qemu/`下的同名`xml`文件。

配置 bridge 的虚拟机XML配置文件中的网络配置部分形如：

```
<interface type='bridge'>
  <mac address='52:54:00:84:e9:e1'/>
  <source bridge='br0'/>
  <model type='rtl8139'/>
  <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
</interface>
```
只需将其中的 `bridge` 修改为 `network` 并修改网卡为 `default`即可，最后重启`libvirt`服务使之生效，`systemctl restart libvirtd` ，再启动虚拟机即可。

---
再次更新：如果需要使用外网访问 虚拟机，就需要使用 nat端口转发，在配置端口转发前需要先配置网桥，此时的网桥不是给虚拟机使用，而是为了端口转发。

配置过程中的物理机默认网卡信息可以在 `/etc/sysconfig/network-scripts/ifcfg-eth0`文件中看到(`vim /etc/sysconfig/network-scripts/ifcfg-eth0`)，从上述文件中获取到物理机的 `IPADDR`, `NETMASK`, `GATEWAY`，之后在`/etc/sysconfig/network-scripts/`目录下新建`ifcfg-br0`文件(`vim /etc/sysconfig/network-scripts/ifcfg-br0`)，写入以下信息（⚠️ 实际操作时请自动删除注释部分）：


``` BOOTPROTO=static DEVICE=br0 TYPE=Bridge NM_CONTROLLED=no IPADDR=112.3.24.154 //设置为物理机所占有的ip地址 NETMASK=255.255.255.0 GATEWAY=112.3.24.1 ```

配置好桥接网卡后还需要到默认网卡中添加这个桥接网卡，修改默认网卡(`vim /etc/sysconfig/network-scripts/ifcfg-eth0`)，既在最后加入一行`BRIDGE=br0` ，修改后的默认网卡文件文本如下： ``` DEVICE=eth0 ONBOOT=yes TYPE=Ethernet BOOTPROTO=static PEERDNS=no NM_CONTROLLED=no IPADDR=112.3.24.154 NETMASK=255.255.255.0 GATEWAY=112.3.24.1 MACADDR=00:26:6c:f5:01:18 BRIDGE=br0 ```


关闭 `NetworkManager `

```

$ systemctl stop NetworkManager

$ systemctl disable NetworkManager
```

重启网络服务

``` service network restart ```

通过brctl命令查看网桥状态

``` [root@localhost ~]# brctl show bridge name     bridge id           STP enabled        interfaces br0             8000.00266cf50118       noeth0
                                          vnet0 virbr0          8000.5254009b1724       yevirbr0-nic ```


### 虚拟磁盘配置

使用如下命令在需要的位置创建虚拟磁盘，根据需要调整名称和大小.

```
$ qemu-img create -f qcow2 win10.qcow2 100G
```

## 安装虚拟机

准备好所需资料，就差临门一脚，运行如下命令就可以完成虚拟机的创建，请根据自己的实际情况对每一行的内容进行修改，在此有一些备注：

1. 虚拟机名称 `name` 必须唯一
2. 分配给虚拟机的vCPU个数由sockets、cores、threads三个参数的乘积来控制，sockets指代CPU插槽数目，cores指代每个插槽芯片的核心数，threads指代那个核心的超线程，如下所示创建的虚拟机共有6个逻辑cpu (cpu 情况可以使用这个命令: `lscpu`)。
3. listen指代的是虚拟机的VNC监听接口，默认是localhost，0:0:0:0指带所有的IPv4接口，::指代所有接口，包括IPv4和IPv6。

```bash
louie@ubuntu:~$ virt-install \
--name Frytea-Win10 \
--memory 8192 \
--vcpus sockets=1,cores=3,threads=2 \
--cdrom=/srv/kvm/win10/Win10_1909_Chinese_Simplified_x64.iso \
--os-type=windows \
--os-variant=auto \
--disk /srv/kvm/win10/Win10.qcow2,bus=virtio,size=100 \
--disk /srv/kvm/win10/virtio-win-0.1.173_amd64.vfd,device=floppy \
--network bridge=default,model=virtio \
--graphics vnc,password=kvmwin10,listen=::,port=5910 \
--hvm \
--autostart \
--virt-type kvm

WARNING  Unable to connect to graphical console: virt-viewer not installed. Please install the 'virt-viewer' package.
WARNING  No console to launch for the guest, defaulting to --wait -1

Starting install...
Allocating 'win10.qcow | 100 GB  00:00     ERROR    Cannot get interface MTU on 'default': No such device
Removing disk 'win10.q |    0 B  00:00     Domain installation does not appear to have been successful.
If it was, you can restart your domain by running:
  virsh --connect qemu:///system start Frytea-Win10
otherwise, please restart your installation.

```

操作：

```
# 查看虚拟机运行状态
$ virsh list
 Id    Name                           State
----------------------------------------------------
 3     Frytea-Win10               running

# 查看所有
$ virsh list -l

# 关机
$ sudo virsh shutdown Frytea-Win10

# 开机
$ sudo virsh start Frytea-Win10

# 重启
$ sudo virsh reboot Frytea-Win10

# 暂停（挂起）
$ sudo virsh suspend Frytea-Win10

# 删除(强行关机)
$ sudo virsh destroy DELL_STORAGE
# 要想彻底删除一个虚拟机需要将其xml文件一并删除，即删除/etc/libvirt/qemu/下的同名xml文件.

# 移除虚拟机，虚拟机处于关闭状态后还可以启动，但是被该指令删除后不能启动。在虚拟机处于Running状态时，调用该指令，该指令暂时不生效，但是当虚拟机被关闭后，该指令生效移除该虚拟机，也可以在该指令生效之前调用define+TestKVM.xml取消该指令
$ virsh undefine DomainName

# 重启libvirt服务
$ systemctl restart libvirtd

```

## 安装 Win10

执行到这个阶段如果一切顺利就可以进入 `win10` 安装了，使用 `VNC`客户端连接到虚拟机，其中地址为宿主机 `ip`端口为命令中配置的`5910`，密码为`kvmwin10`。

VNC（Virtual Network Computing），为一种使用RFB协议的屏幕画面分享及远程操作软件。此软件借由网络，可发送键盘与鼠标的动作及即时的屏幕画面。
VNC与操作系统无关，因此可跨平台使用，例如可用Windows连线到某Linux的电脑，反之亦同。甚至在没有安装客户端程序的电脑中，只要有支持JAVA的浏览器，也可使用。

VNC 是独立于操作系统而存在的，因此当 ssh/RDP 找不到服务器时，就可以进入 VNC 进行维护。网上有一些人会将 VNC和RDP放在一起做对比，个人认为这是没有什么可比性的，因为 RDP 是需要 windows 服务启动后才会随之启动，而 VNC 与操作系统无关，比如本次安装就可以看出 VNC 是可以看到 Windows 的整个安装过程的，如果没有这个想要为服务器远程安装系统就是一抹黑了。

安装win10需要提供激活码，在这里贴上几个来自互联网分享的激活码，截止到2019年6月：

```
六月最新win10永久激活key密钥攻略(大集合)：

Operating system edition(操作系统版本)：KMS Client Setup Key(KMS客户端安装序列号)

Windows 10 Professional(专业版)：W269N-WFGWX-YVC9B-4J6C9-T83GX

Windows 10 Professional N(专业版N)：MH37W-N47XK-V7XM9-C7227-GCQG9

Windows 10 Enterprise(企业版)：NPPR9-FWDCX-D2C8J-H872K-2YT43

Windows 10 Enterprise N(企业版N)：DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4

Windows 10 Education(教育版)：NW6C2-QMPVW-D7KKK-3GKT6-VCFB2

Windows 10 Education N(教育版N)：2WH4N-8QGBV-H22JP-CT43Q-MDWWJ 
```

[全球主机论坛](https://www.hostloc.com/)的 [gyld](https://www.hostloc.com/space-uid-28731.html)大佬分享了一个 `win10 pro` 的激活码，本人 2019.11.22 日亲测直接激活。激活码: `9HTXD-BWVFH-PP4JD-2V43X-JCPJP`

本文内容为多方探索后实践验证，最终整理的产物，在最后列出参考文献，本文若有描述不清楚的地方可以到参考文献中试试。

## Nat 端口转发

```

[root@localhost ~]# ifconfig
...

virbr0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.122.1  netmask 255.255.255.0  broadcast 192.168.122.255
        ether 52:54:00:a0:ea:03  txqueuelen 1000  (Ethernet)
        RX packets 544450  bytes 27198927 (25.9 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 593033  bytes 1680545079 (1.5 GiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

...
```

通过上图，我们可以看出网卡virbr0就是NAT方式连接网络时，所使用到的网卡。

除此之外我们还可以通过配置文件，来查看NAT方式的DHCP地址池。该配置文件为：/etc/libvirt/qemu/networks/default.xml。如下:

```
<network>
  <name>default</name>
  <uuid>1ea78a7d-4776-4e7e-99f1-aab6b9cba8b2</uuid>
  <forward mode='nat'/>
  <bridge name='virbr0' stp='on' delay='0'/>
  <mac address='52:54:00:a0:ea:03'/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
<range start='192.168.122.2' end='192.168.122.254'/>
    </dhcp>
  </ip>
</network>
```

我们可以看出，目前`NAT`使用的IP地址池是`192.168.122.2-192.168.122.254`，网关为`192.168.122.1`，子网掩码为`255.255.255.0`。

下面开始配置 `nat` 端口转发 , 宿主机的公网 `ip` 为 `112.3.24.154` VM的IP为`192.168.122.2`，现在我要求通过访问KVM的 `3389` 端口访问VM的 `3389` 端口。

开启KVM服务器的IP转发功能。编辑/etc/stsctl.conf文件，把其中的net.ipv4.ip_forward = 0修为net.ipv4.ip_forward = 1，如下：

开启KVM服务器的IPtables的转发功能，使用如下命令：

`iptables -t nat -A POSTROUTING -o br0 -j MASQUERADE`

注意该命令中的网卡时br0，而不是eth0。转发许可：

`iptables -I FORWARD -o virbr0 -d 192.168.122.2 -j ACCEPT`

需要注意的是 , 这里的 192.168.122.111 是你虚拟机的 IP, 如果你需要端口转发 , 建议在虚拟机里面设置成固定 IP, 而不是 dhcp 获取 . 否则你虚拟机 ip 变了就又连不上了 .

下面是一个代码段 , 有要开放的端口都可以依次设置 . 比如要开放 3389, 那么 iptables 命令就是 : 192.168.122.111 是虚拟机的 ip

```

$ iptables -A INPUT -p tcp --dport 3389 -j ACCEPT
$ iptables -t nat -A PREROUTING -p tcp -m tcp -i br0 --dport 3389 -j DNAT --to-destination 192.168.122.2:3389

$ service iptables save
$ service iptables restart

```

执行这个命令的时候有时候可能会报错：`The service command supports only basic LSB actions (start, stop, restart, try-restart, reload, force-reload, status). For other actions, please try to use systemctl.`

这是因为没有安装`iptables`服务，直接使用`yum`安装`iptables`服务再执行未执行完的命令即可.

```
yum install iptables-services
```

执行如下命令（老版本命令为：`service iptables on`），设置`iptables`开机自启

```
systemctl enable iptables.service
```

需关闭firewalld防火墙

```
$ systemctl stop firewalld.service

$ systemctl disable firewalld.service
```

## 补充，为宿主机安装桌面系统

Linux系统在服务器上一般都直接最小化安装，是不安装图形界面的，但是有时候，有一些特殊情况，需要使用图形界面，下面是安装 `GNOME` 桌面的步骤。

```
$ yum grouplist
# 列出的组列表里有GNOME Desktop。安装之
$ yum groupinstall -y "GNOME Desktop"
# 安装完成后，修改默认启动方式为图形化界面
$ systemctl set-default graphical.target  //设置成图形模式

# 如果要换回来
$ systemctl set-default multi-user.target  //设置成命令模式

# 然后重启即可，或者startx开启图形界面。第一次启动可能时间会长一点，耐心等待即可。
```

## KVM 调整内存

ps：调小内存可以动态实现，不用关机

1、产看当前配置：

```
$ virsh dominfo vm | grep memory    

Max memory: 8388608 KiB
Used memory: 4194304 KiB
```

2、设置虚拟机内存： 512M

```
$ virsh setmem vm 524288
```

## KVM 调整cpu

1、关闭虚机

```
$ virsh shutdown vm    | virsh destroy vm
```

2、编辑虚拟机配置文件，调整

```
#virsh edit vm

<memory unit='KiB'>8388608</memory>
<currentMemory unit='KiB'>8388608</currentMemory>
<vcpu placement='static'>4</vcpu>
```

3、从配置文件启动虚机

```
$ virsh create /etc/libvirt/qemu/vim.xml
```

4、查看当前内存大小

```
$ virsh dominfo vm | grep memory        

Max memory: 8388608 KiB
Used memory: 8388608 KiB
```

5、验证：

```
$ virsh dominfo vm
```

## 参考文献

 - [Centos 7 KVM安装win10](https://www.cnblogs.com/smlile-you-me/p/8980599.html)
 - [KVM 安装windows 虚拟机](https://blog.csdn.net/nvd11/article/details/79323412)
 - [KVM安装windows](http://ylong.net.cn/KVM_install_windows.html)
 - [kvm虚拟机的桥接网络配置](https://my.oschina.net/amui/blog/851797)
 - [2019年6月win10免费激活密钥 最新win10激活码序列号](https://blog.csdn.net/erdfty/article/details/91511499)
 - [LINUX查看CPU个数/多核/多线程的查看](http://smilejay.com/2011/03/linux_cpu_core_thread/)
 - [VNC - WikiPedia](https://zh.wikipedia.org/wiki/VNC)
 - [配置KVM虚拟机的网络，Bridge和Nat方式](https://blog.csdn.net/jiuzuidongpo/article/details/44677565)
 - [教程:CentOS服务器安装windows虚拟机(NAT版),解决KVM中windows10安装蓝屏的问题](https://www.91yun.co/archives/31611#)
 - [谁的小店有WIN10专业版的激活码呀？ - hostloc](https://www.hostloc.com/thread-608834-1-1.html)
 - [烂泥：KVM使用NAT联网并为VM配置iptables端口转发](https://www.ilanni.com/?p=7016)
 - [CentOS配置iptables规则并使其永久生效](https://www.cnblogs.com/jinjiyese153/p/8600855.html)
 - [Centos7 安装VNC实现远程桌面](https://blog.csdn.net/weixin_41004350/article/details/80805927)
 - [kvm调整配置cpu、内存](https://blog.csdn.net/haoxiaoyan/article/details/96859837)
