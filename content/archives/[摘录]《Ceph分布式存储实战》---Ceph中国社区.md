---
title: "[摘录]《Ceph分布式存储实战》 - Ceph中国社区"
categories: [ "阅读摘录" ]
tags: [  ]
draft: false
slug: "701"
date: "2022-12-22 08:59:58"
---

Ceph分布式存储实战
Ceph中国社区
135个笔记


◆ 本书赞誉

>> Ceph的CRUSH算法引擎，聪明地解决了数据分布效率问题

>> 开源系统是Linux的世界，开源管理平台是OpenStack的世界，开源存储是Ceph的世界。


◆ 前言

>> 美国雅虎公司使用Ceph构建对象存储系统，用于Flickr、雅虎邮箱和Tumblr（轻量博客）的后端存储；国内不少公有云和私有云商选择Ceph作为云主机后端存储解决方案。


◆ 第1章 初识Ceph

>> Ceph可以同时提供对象存储RADOSGW（Reliable、Autonomic、Distributed、Object Storage Gateway）、块存储RBD（Rados Block Device）、文件系统存储Ceph FS（Ceph Filesystem）3种功能

>> 其对象存储可以对接网盘（owncloud）应用业务等；其块设备存储可以对接（IaaS）

>> 以OpenStack为核心的云厂商：例如UnitedStack、Awcloud等国内云计算厂商。

>> 在Ceph存储中，包含了几个重要的核心组件，分别是Ceph OSD、Ceph Monitor和Ceph MDS

>> 一个Ceph的存储集群至少需要一个Ceph Monitor和至少两个Ceph的OSD。

>> 运行Ceph文件系统的客户端时，Ceph的元数据服务器（MDS）是必不可少的

>> Ceph OSD：全称是Object Storage Device，主要功能包括存储数据，处理数据的复制、恢复、回补、平衡数据分布，并将一些相关数据提供给Ceph Monitor，例如Ceph OSD心跳等

>> 每一个Disk、分区都可以成为一个OSD。

>> Ceph MDS：全称是Ceph Metadata Server，主要保存的是Ceph文件系统（File System）的元数据（metadata）。

>> RADOSGW功能特性基于LIBRADOS之上，提供当前流行的RESTful协议的网关，并且兼容S3和Swift接口，作为对象存储，可以对接网盘类应用以及HLS流媒体应用等。

>> RBD（Rados Block Device）功能特性也是基于LIBRADOS之上，通过LIBRBD创建一个块设备，通过QEMU/KVM附加到VM上，作为传统的块设备来用。

>> Ceph FS（Ceph File System）功能特性是基于RADOS来实现分布式的文件系统，引入了MDS（Metadata Server），主要为兼容POSIX文件系统提供元数据。一般都是当做文件系统来挂载。

>> Ceph底层核心是RADOS

>> [插图]

>> RADOS:RADOS具备自我修复等特性，提供了一个可靠、自动、智能的分布式存储。

>> LIBRADOS:LIBRADOS库允许应用程序直接访问，支持C/C++、Java和Python等语言

>> RADOSGW:RADOSGW是一套基于当前流行的RESTful协议的网关，并且兼容S3和Swift。

>> RBD:RBD通过Linux内核（Kernel）客户端和QEMU/KVM驱动，来提供一个完全分布式的块设备

>> Ceph FS:Ceph FS通过Linux内核（Kernel）客户端结合FUSE，来提供一个兼容POSIX的文件系统。

>> Ceph系统最终采用Crush、Hash环等方法更彻底地解决了这个问题。很显然Sage的眼光和设想还是很超前的。


◆ 第2章 存储基石RADOS

>> Cluster Map是整个RADOS系统的关键数据结构，管理集群中的所有成员、关系和属性等信息以及数据的分发。

>> 对于RADOS系统，节点组织管理和数据分发策略均由内部的Mon全权负责，因此，从Client角度设计相对比较简单，它给应用提供存储接口

>> Ceph monitor map包括OSD Map、PG Map、MDS Map和CRUSH等，这些Map被统称为集群Map。

>> Monitor Map。Monitor Map包括有关monitor节点端到端的信息，其中包括Ceph集群ID，监控主机名和IP地址和端口号，它还存储了当前版本信息以及最新更改信息

>> 可以通过以下命令查看monitor map。
​​#ceph mon dump​​

>> OSD Map。OSD Map包括一些常用的信息，如集群ID，创建OSD Map的版本信息和最后修改信息，以及pool相关信息，pool的名字、pool的ID、类型，副本数目以及PGP，还包括OSD信息，如数量、状态、权重、最新的清洁间隔和OSD主机信息

>> 可以通过执行以下命令查看集群的OSD Map。
​​#ceph osd dump​​

>> PG Map包括当前PG版本、时间戳、最新的OSD Map的版本信息、空间使用比例，以及接近占满比例信息，同时，也包括每个PG ID、对象数目、状态、OSD的状态以及深度清理的详细信息

>> 可以通过以下命令来查看PG Map。
​​#ceph pg dump​​

>> CRUSH Map包括集群存储设备信息，故障域层次结构和存储数据时定义失败域规则信息

>> 可以通过以下命令查看CRUSH Map。
​​#ceph osd crush dump​​

>> MDS Map包括存储当前MDS Map的版本信息、创建当前Map的信息、修改时间、数据和元数据POOL ID、集群MDS数目和MDS状态

>> 可通过以下命令查看集群MDS Map信息。
​​#ceph mds dump​​

>> Ceph Monitor并未为客户提供数据存储服务，而是为Ceph集群维护着各类Map，并服务更新群集映射到客户机以及其他集群节点。客户端和其他群集节点定期检查并更新于Monitor的集群Map最新的副本。

>> 一个典型的Ceph集群包含多个Monitor节点

>> 一个多Monitor的Ceph的架构通过法定人数来选择leader，并在提供一致分布式决策时使用Paxos算法集群

>> 在Ceph集群中有多个Monitor时，集群的Monitor应该是奇数；最起码的要求是一台监视器节点

>> 由于Monitor工作在法定人数，一半以上的总监视器节点应该总是可用的，以应对死机等极端情况，这是Monitor节点为N（N>0）个且N为奇数的原因

>> 所有集群Monitor节点，其中一个节点为Leader。如果Leader Monitor节点处于不可用状态，其他显示器节点有资格成为Leader

>> 生产群集必须至少有N/2个监控节点提供高可用性。

>> Ceph OSD将数据以对象的形式存储到集群中每个节点的物理磁盘上，完成存储用户数据的工作绝大多数都是由OSD deamon进程来实现的

>> Ceph集群一般情况都包含多个OSD，对于任何读写操作请求，Client端从Ceph Monitor获取Cluster Map之后，Client将直接与OSD进行I/O操作的交互，而不再需要Ceph Monitor干预

>> Ceph的核心功能特性包括高可靠、自动平衡、自动恢复和一致性

>> 对于Ceph OSD而言，基于配置的副本数，Ceph提供通过分布在多节点上的副本来实现，使得Ceph具有高可用性以及容错性

>> OSD中的每个对象都有一个主副本，若干个从副本，这些副本默认情况下是分布在不同节点上的

>> 每个OSD都可能作为某些对象的主OSD，与此同时，它也可能作为某些对象的从OSD，从OSD受到主OSD的控制，然而，从OSD在某些情况也可能成为主OSD

>> 在磁盘故障时，Ceph OSD Deamon的智能对等机制将协同其他OSD执行恢复操作。在此期间，存储对象副本的从OSD将被提升为主OSD，与此同时，新的从副本将重新生成，这样就保证了Ceph的可靠和一致。

>> Ceph OSD架构实现由物理磁盘驱动器、在其之上的Linux文件系统以及Ceph OSD服务组成

>> Ceph OSD操作必须在一个有效的Linux分区的物理磁盘驱动器上，Linux分区可以是BTRFS、XFS或者EXT4分区，文件系统是对性能基准测试的主要标准之一

>> BTRFS：在BTRFS文件系统的OSD相比于XFS和EXT4提供了最好的性能

>> XFS：一种高性能的日志文件系统，XFS特别擅长处理大文件，同时提供平滑的数据传输。目前CentOS 7也将XFS+LVM作为默认的文件系统

>> Ext4：第四代扩展文件系统，是Linux系统下的日志文件系统，是Ext3文件系统的后继版本

>> Ceph OSD把底层文件系统的扩展属性用于表示各种形式的内部对象状态和元数据

>> Ceph使用日志文件系统，如增加了BTRFS和XFS的OSD

>> 在提交数据到后备存储器之前，Ceph首先将数据写入称为一个单独的存储区，该区域被称为journal，这是缓冲器分区在相同或单独磁盘作为OSD，一个单独的SSD磁盘或分区，甚至一个文件文件系统

>> journal允许Ceph OSD功能很快做小的写操作；一个随机写入首先写入在上一个连续类型的journal，然后刷新到文件系统。这给了文件系统足够的时间来合并写入磁盘。使用SSD盘作为journal盘能获得相对较好的性能。

>> 文件映射到Object后，利用Cluster Map通过CRUSH计算而不是查找表方式定位文件数据到存储设备中的位置。优化了传统的文件到块的映射和BlockMap管理。

>> RADOS充分利用了OSD的智能特点，将部分任务授权给OSD，最大程度地实现可扩展。


◆ 第3章 智能分布CRUSH

>> 对象存储中一致性Hash和Ceph的CRUSH算法是使用比较多的数据分布算法

>> 在磁盘阵列中，数据是以条带（stripe）的方式贯穿在磁盘阵列所有硬盘中的

>> 将条带单元（stripe unit）从阵列的第一个硬盘到最后一个硬盘收集起来，就可以称为条带（stripe）

>> 从本质上讲，CRUSH算法是通过存储设备的权重来计算数据对象的分布的

>> 在计算过程中，通过Cluster Map（集群映射）、Data Distribution Policy（数据分布策略）和给出的一个随机数共同决定数据对象的最终位置

>> PG在CRUSH策略的影响下，最终会被映射到OSD上。


◆ 第4章 三大存储访问类型

>> 块是一个有序字节，普通的一个块大小为512字节

>> 基于块的存储是最常见的存储方式，比如常见的硬盘、软盘和CD光盘等

>> RBD具有快照、多副本、克隆和一致性功能。

>> Format 1是原始格式，也是创建image的默认格式，Format 2支持RBD分层￼（layering），是实现COW（Copy-On-Write）的前提。


◆ 第5章 可视化管理Calamari

>> Calamari是一个管理和监控Ceph集群的Web平台，提供了漂亮的管理和监控界面，还提供了一套RESTful API接口，目的是为了简化Ceph集群管理

>> Calamari包括前端和后端两个部分，每个部分都有各自的代码库。


◆ 第6章 文件系统——高性能计算与大数据

>> 在高性能计算领域，MPI是重要的分布式计算模型。MPI是一种基于消息传递的并行编程技术，其定义了一组具有可移植性的编程接口。通过MPI编程模型，程序员能编写基于消息通信的应用程序，而这个应用程序能在不同的节点上启动并协调工作，它们需访问共享存储，而Ceph FS正好提供共享存储的访问。


◆ 第7章 块存储——虚拟化与数据库

>> 时，将qcow2转化成raw格式。这是由于KVM虚拟化访问Ceph RBD存储时将会配置raw的访问格式，故在此步骤中转换成raw格式

>> 因为只有RAW格式的镜像才支持COW（Copy On Write）秒级创建。

>> CloudStack，项目地址http://cloudstack.apache.org/，提供一个开源的“基础设施即服务”（IaaS）的解决方案，特点是高可用和高扩展的能力。

>> CloudStack前身是Cloud.com, 2011年7月被Citrix思杰收购并100%开源。2012年4月，Citrix思杰宣布把CloudStack交给Apache软件基金会管理以及开发

>> 目前CloudStack最新版本为4.6.0，支持虚拟化包含XenServer、KVM、LXC、VMware、HyperV和OVM3，同时支持物理服务器（Baremetal）。

>> 1998年，iSCSI由IBM公司和Cisco公司开发，允许在硬件设备、IP协议上层运行SCSI指令集（SCSI over TCP）

>> iSCSI最大的特点就是，可以实现在IP网络上运行SCSI协议，使其能够在100/1000/10000Mbps的以太网上进行传输

>> Ceph通过Tgtd方式实现将RBD块存储转译为iSCSI存储访问协议，可以提供VMware ESXi、Citrix XenServer、Microsoft Hyper-V、oVirt和Oracle VM等虚拟化场景，也可以提供如Oracle RAC和Microsoft MSCS等高可用集群数据库场景。


◆ 第9章 Ceph硬件选型、性能测试与优化

>> 超线程技术（Hyper-Threading, HT）就是利用特殊的硬件指令，把两个逻辑内核模拟成两个物理芯片，让单个处理器都能使用线程级并行计算，进而兼容多线程操作系统和软件，减少了CPU的闲置时间，提高CPU的运行效率，

>> DPDK（Data Plane Deveploment Kit）抛弃了传统使用CPU中断处理数据包的方式，采用了轮询方式实现数据包处理过程：DPDK重载了网卡驱动，驱动在收到数据包后不使用中断通知CPU，而是直接使用零拷贝存入用户态内存中，使得应用程序可以通过DPDK提供的接口从内存中直接读取数据包

>> 使用DPDK类似RDMA，避免了内存拷贝、上下文切换的时间

>> Ceph OSD进程在往数据盘上刷数据的过程中，是停止写操作的。

>> PG和PGP数量一定要根据OSD的数量进行调整，计算公式如下，但是最后算出的结果一定要接近或者等于2的指数。

>> 要区分硬盘、SSD、RAID、SAN和云硬盘等，因为它们有不同的特点。

>> 测试指标：IOPS和MBPS（吞吐率）

>> 测试工具：Linux下常用Fio、dd工具，Windows下常用IOMeter。

>> 块存储系统本质是一个排队模型

>> 响应时间=服务时间+等待时间。

>> 性能=单位时间内处理业务数量。

>> 服务时间 = 寻道时间 + 旋转时间 + 传输时间

>> 对于10000转速的SATA硬盘来说，一般寻道时间是7 ms，旋转时间是3 ms,64KB的传输时间是0.8 ms，则SATA硬盘每秒可以进行随机IO操作是1000/(7 + 3 + 0.8) = 93。所以，我们估算SATA硬盘64KB随机写的IOPS是93

>> 一般的硬盘厂商都会标明顺序读写的MBPS（吞吐量）。

>> 我们在列出IOPS时，需要说明IO大小、寻址空间、读写模式、顺序/随机和队列深度。一般常用的IO大小是4KB，这是因为文件系统常用的块大小是4KB。

>> 在dd测试的同时也要对系统IO进行监控，使用iostat命令对系统IO进行查看。
​​#iostat -x sdd 5 10￼

>> 加大硬盘队列深度就是让硬盘不断工作，减少硬盘的空闲时间。

>> 加大队列深度→提高利用率→获得IOPS和MBPS峰值→注意响应时间在可接受的范围内

>> 增加队列深度的办法有很多，如下。
❑使用异步IO，同时发起多个IO请求，相当于队列中有多个IO请求。
❑多线程发起同步IO请求，相当于队列中有多个IO请求。
❑增大应用IO大小，到达底层之后，会变成多个IO请求，相当于队列中有多个IO请求队列深度增加了。

>> 现在，我们来测试SATA硬盘的4KB随机写的IOPS。因为环境是Linux，所以使用fio来测试。

>> ​​$fio -ioengine=libaio -bs=4k -direct=1-thread -rw=randwrite -size=1000G-filename=/dev/vdb -name="EBS 4K randwrite test" -iodepth=64-runtime=60​​
简单介绍一下fio的参数如下。
❑Ioengine：负载引擎，我们一般使用libaio，发起异步IO请求。
❑bs:IO大小。
❑direct：直写，绕过操作系统Cache。因为我们测试的是硬盘，而不是操作系统的Cache，所以设置为1。
❑rw：读写模式，有顺序写write、顺序读read、随机写randwrite和随机读randread等。
❑size：寻址空间，IO会落在[0, size）这个区间的硬盘空间上。这是一个可以影响IOPS的参数。一般设置为硬盘的大小。
❑filename：测试对象。
❑iodepth：队列深度，只有使用libaio时才有意义。这是一个可以影响IOPS的参数。
❑runtime：测试时长。

>> 硬盘厂商提高硬盘性能的方法主要是降低服务时间（延迟）。
❑提高转速（降低旋转时间和传输时间）。
❑增加Cache（降低写延迟，但不会提高IOPS）。
❑提高单磁道密度（变相提高传输时间）。

>> 我们首先进行4K随机写测试，具体如下。
​​#fio -ioengine=libaio -bs=4k -direct=1-thread -rw=randwrite -size=100G-filename=/dev/vdb \￼ -name="EBS 4KB randwrite test" -iodepth=32-runtime=60​​


◆ 第10章 自定义CRUSH

>> 计算机界有句名言： 计算机的任何问题都可以通过增加一个虚拟层来解决，计算机硬件、计算机网络、计算机软件等方面概莫如此。

>> 在Ceph里，PG是数据存储的管理单元，如果把PG当作一致性Hash里的存储节点，那么它就是最简单的数据分布（即取余算法）方式。不同的是，PG是抽象的存储节点，它不会随着物理节点的加入或者离开而增加或减少，因此数据到PG的映射是稳定的。

>> 本章中列举了常用的CRUSH使用场景，通过灵活设计CRUSH方案，实现“指哪存哪”的目标，真正做到了软件定义存储


◆ 第11章 缓冲池与纠删码

>> 传统上，Cache为了缓和CPU和IO设备速度不匹配的矛盾，提高CPU和IO设备的并行性而存在的

>> 在计算机组成里，每个部件的设计都可以看到Cache的影子

>> Cache的设计原理是把读取过的数据保存起来，如果在以后的操作中重新读取时则命中（找到需要的数据），就不要去读较慢的设备，若没有命中就读较慢的设备。

>> Buffer的设计原理是把分散的写数据内容集中进行，按照一定周期写到目标设备。

>> 我们可以暂且认为Cache是针对读优化，而Buffer是针对写优化。

>> 在本地计算机结构组成里，相比CPU和内存之间的IO差距，内存和机械硬盘的IO差距较为明显

>> 比较内存、固态硬盘和机械硬盘的每GB单位成本，得出的结果是内存>固态硬盘>机械硬盘

>> 使用SSD固态硬盘这一类的高速且价格昂贵的存储介质组成高性能资源池，使用SATA机械硬盘这一类低速廉价的介质组成低速高容量资源池

>> 要实现缓冲池技术，首先需要将整个存储系统按照存储介质的性能分为前端高速缓冲池和后端低速存储池，使用特定算法将数据写入和读取流程进行适当的调整，将访问次数比较频繁的热数据缓存储在前端高速缓冲池中（对应热数据上浮），而访问量比较低的冷数据则存储在后端低速存储池中（冷数据下沉），从而实现提高读写性能的目的

>> 虽然纠删码能够提供和副本相近的数据可靠性，并降低冗余数据的开销，整体上能提高存储设备的可用空间。但是，纠删码所带来的额外开销主要是大量计算和网络高负载，优点同时伴随缺点

>> 使用纠删码对硬件的设备性能是一个较大的考验，这点需要注意。另外，需要注意的是，使用纠删码所建立的存储资源池无法新建RBD块设备。


◆ 第12章 生产环境应用案例

>> Ceph FS主要对接于传统的应用，例如直接mount到服务器作为文件系统使用，另外就是用来对接Hadoop和对接OpenStack Manila项目

>> NFS（Network FileSystem）是类UNIX系统中最流行的网络共享文件系统之一。即使是不支持Ceph FS文件系统的类UNIX系统，也可以通过NFS来访问Ceph文件系统。

>> 由于Ceph-Dokan只能正确读取UNIX格式的ceph.conf文件，因此你要用dos2unix把你的ceph.conf转换成UNIX格式。

>> OpenStack对接Ceph之后可以实现COW（Copy On Write）秒速开机，避免了Nova下载上传的一个动作，可以直接拷贝Glance存储池的镜像数据进行启动

>> HLS￼是Apple公司推出的一套基于HTTP的流媒体实时传输协议，全称是HTTP Live Streaming，同时能够跨多种平台和操作系统，在视频分享、在线教育等领域得到了广泛的应用


◆ 第13章 Ceph运维与排错

>> 默认情况下，磁盘可以使用by-id/by-partlabel/by-parttypeuuid/by-partuuid/by-path/by-uuid等多种形式的名称对磁盘设备进行管理，但是在Ceph中，如果磁盘数量过多，加上为了更好区别每一个OSD对应的磁盘分区用途（比如filestore或journal），同时确保物理磁盘发生变更（故障盘替换后）后对应的名称不变，对OSD对应的磁盘设备命名提出新的管理需求

>> 例使用udev的方式，将磁盘按照osd[N]的方式进行命名，比如/dev/osd5_filestore_1表示osd5的第一个filestore分区，/dev/osd5_journal_5表示osd5的第一个journal分区（表示该磁盘用于osd.5的filestore）

>> Cgroups是Control Groups的缩写，是Linux内核提供的一种可以限制、记录、隔离进程组（Process Groups）所使用的物理资源（如CPU、Memory和IO等）的机制。最初由Google公司的工程师提出，后来被整合进Linux内核。Cgroups也是LXC为实现虚拟化所使用的资源管理手段，可以说没有Cgroups就没有LXC。

>> Virtual Storage Manager
Virtual Storage Manager（VSM）是Intel公司研发并且开源的一款Ceph集群管理和监控软

>> Inkscope是一个Ceph的管理和监控系统，依赖于Ceph提供的API，使用MongoDB来存储实时的监控数据和历史信息

>> 组件之间的通信都以保证时间同步为前提，否则，会导致数据不完整与不一致性

>> 根据不少生产环境反映，调整抖动时间会引发一些未知的问题，在此建议设置时间强同步更为妥当。

>> 默认的Crush Rule设置的隔离是Host级，即多副本（如三副本）情况下，每一副本都必须分布在不同的节点上。

>> 当节点数不满足大于或等于副本数时，PG的状态自然就不能是active+clean，而会显示为“degraded”（降级）状态。

>> [插图]

>> 计算的最终结果应该是2的幂次方。采用2的幂次方是为了提高CRUSH算法的效率

