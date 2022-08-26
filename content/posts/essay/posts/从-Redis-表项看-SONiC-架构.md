---
title: "从 Redis 表项看 SONiC 架构"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "533"
date: "2021-06-08 17:18:00"
---

SONiC 系统的架构由各种模块组成，这些模块通过集中式和可扩展的基础架构相互交互。这个基础设施依赖于使用一个 **redis-database** 引擎来提供一个独立于语言的接口，一个在所有 SONiC 子系统之间进行数据持久化、复制和多进程通信的方法。

通过依赖 redis 引擎基础设施提供的 **发布者/订阅者** 消息传递范式，应用程序可以只订阅它们需要的数据视图，并避免与其功能无关的实现细节。

SONiC 将每个模块放置在独立的 docker 容器中。这些组件中的每一个都是完全独立于平台特定细节而编写的，这些细节是与底层抽象交互所必需的。

## SONiC 容器架构

截至目前（6 Jun 2019），SONiC 将其主要功能组件分解为以下 docker 容器：

- **Dhcp-relay**: 将DHCP请求从没有DHCP服务器的子网中继到其他子网的一个或多个DHCP服务器。
- **Pmon**: 负责运行“sensor”，这是一个守护进程，用于定期记录硬件组件的传感器读数，并在警报发出时发出警报。Pmon容器还承载“风扇控制”进程，从相应的平台驱动程序中收集风扇相关的状态。
- **Snmp**: 承载Snmp特性。
- **Lldp**: 承载Lldp功能。
- **Bgp**: 运行支持的路由栈之一: Quagga或FRR。（实际上，这些路由栈可以运行各种其他协议(如ospf、isis、ldp等)）
- **Teamd**: 在SONiC设备中运行链接聚合功能(LAG)。“teamd”是一个基于linux的LAG协议的开源实现。“团队同步”过程允许“团队”和南向子系统之间的交互。
- **Databas**e: 承载redis-database引擎：
- **Swss**: Switch State Service (Swss)容器由一组工具组成，允许所有SONiC模块之间进行有效通信，主要侧重于提供促进所有不同方之间的通信和仲裁的机制。
- **Syncd**: 容器的目标是提供一种机制，允许交换机的网络状态与交换机的实际硬件/ASIC同步。这包括初始化、配置和收集交换机的ASIC当前状态。

右图显示了每个docker容器中包含的功能的高级视图，以及这些容器之间如何相互作用。注意，并不是所有的SONiC应用程序都与其他SONiC组件交互，因为其中一些组件从外部实体收集它们的状态。我们使用 **蓝色箭头** 表示与集中的 **redis引擎** 的交互，使用 **黑色箭头** 表示所有其他的( `netlink` ， `/sys` 文件系统等)。

尽管 SONiC 的大部分主要组件都在 `docker` 容器中，但也有一些关键模块位于 `linux` 主机系统本身。这就是 SONiC 的配置模块 `SONiC -cfggen` 和 SONiC 的 `CLI` 。

### 数据库架构

![https://imagehost-cdn.frytea.com/images/2021/06/08/202106081716469ccbb04be94fc671.png](https://imagehost-cdn.frytea.com/images/2021/06/08/202106081716469ccbb04be94fc671.png)

以下是redis引擎所承载的主要数据库:

APPL_DB:存储所有应用程序容器生成的状态——路由、下一跳、邻居等。这是所有希望与其他SONiC子系统交互的应用程序的南向入口点。

CONFIG_DB:存储由SONiC应用程序创建的配置状态——端口配置、接口、vlan等。

STATE_DB:为系统中配置的实体存储“key”操作状态。此状态用于解析不同SONiC子系统之间的依赖关系。例如，一个LAG端口通道(由teamteam子模块定义)可以潜在地引用系统中可能存在也可能不存在的物理端口。另一个例子是VLAN的定义(通过vlanmgrd组件)，它可能引用系统中未确定是否存在的端口成员。本质上，这个DB存储了解决跨模块依赖关系所必需的所有状态。

ASIC_DB:存储驱动asic配置和操作所需的状态——这里的状态以asic友好的格式保存，以简化syncd(参见后面的详细信息)和asic sdk之间的交互。

COUNTERS_DB:存储与系统中每个端口关联的计数器/统计信息。此状态可用于满足CLI本地请求，或为远程使用提供遥测通道。

## SONiC 子系统交互

### **LLDP 状态交互**

下图描述了在 `lldp` 状态转移期间观察到的一组相互作用。在这个特定的示例中，我们迭代了在携带状态变化的 `LLDP` 消息到达时发生的一系列步骤。

(1)在 `LLDP` 容器初始化期间， `lldpmgrd` 订阅 **STATE_DB** 以实时获取系统中物理端口的状态—— `lldpmgrd` 的轮询周期每5秒运行一次。基于这些信息， `Lldpd` (及其网络对等体)将了解系统端口状态的变化以及影响其运行的任何配置变化。

(2)一个新的 `LLDP` 报文到达内核空间的 `LLDP socket` 。内核的网络栈最终将相关的有效负载交付给 `lldp` 进程。

(3) `Lldp` 解析并消化这个新状态， `lldp_syncd` 在执行 `lldpctl cli` 命令(通常每10秒运行一次)的过程中最终获取这个新状态。

`Lldp_syncd` 将这个新状态推到 **APPL_DB** 中，具体地说，推到**LLDP_ENTRY_TABLE** 表中。

(5)从现在开始，所有订阅这个表的实体都应该收到一个新状态的副本(目前， `snmp` 是唯一感兴趣的侦听器)。

![https://imagehost-cdn.frytea.com/images/2021/06/08/2021060817171113f0b73ae9072558.png](https://imagehost-cdn.frytea.com/images/2021/06/08/2021060817171113f0b73ae9072558.png)

---

### **SNMP 状态交互**

如前所述， `snmp` 容器同时承载一个snmp主代理(snmpd)和一个特定于sonic的agentX进程( `snmp_subagent` )。该子代理与所有redis数据库/表进行交互，这些redis数据库/表提供了可以派生MIB状态的信息。具体来说， `snmp-agent` 订阅了以下数据库/表:

- **APPL_DB**: PORT_TABLE, LAG_TABLE, LAG_MEMBER_TABLE, LLDP_ENTRY_TABLE
- **STATE_DB**: *
- **COUNTERS_DB**: *
- **ASIC_DB**: ASIC_STATE:SAI_OBJECT_TYPE_FDB*

下图描述了系统处理传入 `snmp` 查询期间各种 `SONiC` 组件之间的典型交互。

(0)在初始化snmp-subagent进程中支持的不同MIB子组件时，该MIB子组件与上述各个db建立连接。从这一刻起，从所有这些db获得的状态被本地缓存到snmp-subagent中。该信息每隔几秒(< 60)刷新一次，以确保db和snmp-subagent完全同步。

(1)一个snmp查询到达内核空间的snmp的套接字。内核的网络栈将数据包发送给snmpd进程。

(2) snmp消息被解析，一个相关的请求被发送到SONiC的agentX子代理(即sonic_ax_impl)。

(3) Snmp-subagent服务于其本地数据结构中缓存的状态之外的查询，并将信息发送回snmpd进程。

(4) Snmpd最终通过常用的socket接口向发起者发送一个应答。

![https://imagehost-cdn.frytea.com/images/2021/06/08/202106081717261c81afc21457834b.png](https://imagehost-cdn.frytea.com/images/2021/06/08/202106081717261c81afc21457834b.png)

---

### **路由状态交互**

在本节中，我们将遍历发生在SONiC中的一系列步骤，以处理从eBGP对等体接收到的新路由。我们假设这个会话已经建立，并且我们正在学习一条新的路由，它使用一个直接连接的对等体作为它的下一跳。

(0)在 `BGP` 容器初始化过程中， `zebra` 通过常规TCP套接字连接到 `fpmsyncd` 。在稳定/非瞬态条件下，存放在 `zebra` 、 `linux` 内核、**APPL_DB**和**ASIC_DB**中的路由表应该是完全一致/等效的。

(1)一个新的TCP报文到达内核空间的bgp socket。内核的网络栈最终将相关的有效载荷传递给bgpd进程。

(2) Bgpd解析新报文，处理bgp-update，并通知zebra这个新前缀的存在及其相关的下一跳协议。

(3) zebra通过判断该前缀的可行性/可达性(例如现有的转发nh)，生成一个route-netlink消息将这个新的状态注入到kernel中。 Zebra利用FPM接口将这个网络链路路由消息传递给fpmsyncd。

(5) Fpmsyncd处理netlink消息，并将此状态推入 **APPL_DB**。

作为一个APPL_DB订阅者，它将接收先前推送到 **APPL_DB** 的信息的内容。

(7)处理完接收到的信息后，orchagentd会调用sairedis api将路由信息注入到**ASIC_DB** 中。同步一个ASIC_DB订阅者时，它将接收由orchagentd生成的新状态。

(9) Syncd将处理该信息，并调用SAI api将该状态注入到相应的asic驱动程序中。

(10)新路由最终推送到硬件。

![https://imagehost-cdn.frytea.com/images/2021/06/08/20210608171744539868b84fce9068.png](https://imagehost-cdn.frytea.com/images/2021/06/08/20210608171744539868b84fce9068.png)

---

### **端口状态交互**

本节描述在端口相关信息传输过程中发生的系统交互。考虑到portsyncd扮演的关键角色，以及它在其他SONiC子系统中施加的依赖关系，我们将从介绍它的初始化过程开始本节。

这个练习有两个目的。首先，我们公开了系统中对生成或使用端口相关信息感兴趣的多个组件。其次，我们将通过一个图形示例向读者介绍 **STATE_DB** 在系统中是如何使用的，以及不同的应用程序如何依赖它的信息进行内部操作。

(0) 在初始化过程中，portsyncd 与redis-engine 中的主要数据库建立通信通道。Portsyncd 声明其意图充当 **APPL_DB** 和 **STATE_DB** 的发布者，以及 **CONFIG_DB** 的订阅者。同样，portsyncd 也订阅系统的 netlink 通道，负责携带端口/链路状态信息。

(1) Portsyncd 通过解析与系统中使用的硬件配置文件/sku 相关联的端口配置文件 (port_config.ini) 开始（有关更多详细信息，请参阅配置部分）。通道、接口名称、接口别名、速度等与端口相关的信息通过该通道传输到 **APPL_DB**。

(2) Orchagent 会听到所有这些新状态，但会推迟对其采取行动，直到 portsyncd 通知它已完全解析 port_config.ini 信息。一旦发生这种情况，orchagent 将继续在硬件/内核中初始化相应的端口接口。Orchagent 调用 sairedis API 以通过通常的 **ASIC_DB** 接口将此请求传送到同步。

(3) Syncd 通过 **ASIC_DB** 接收到这个新请求，并准备调用满足 Orchagent 请求所需的 SAI API。

(4) Syncd 利用 SAI APIs + ASIC SDK 创建与正在初始化的物理端口相关联的内核主机接口。

(5) 上一步将生成一个 netlink 消息，该消息将被 portsyncd 接收。当与先前从 port_config.ini 解析的所有端口相关联的消息到达 portsyncd 时（在步骤 1 中），portsyncd 将继续声明“初始化”过程已完成。

(6) 作为上一步的一部分，portsyncd 将记录条目写入与成功初始化的每个端口对应的 STATE_DB。

(7) 从这一刻起，之前订阅了 **STATE_DB** 内容的应用程序将收到通知，允许这些应用程序开始使用它们所依赖的端口。换句话说，如果在 **STATE_DB** 中找不到特定端口的有效条目，则任何应用程序都无法使用它。

![https://imagehost-cdn.frytea.com/images/2021/06/08/202106081717566d8d80df28b7b6c0.png](https://imagehost-cdn.frytea.com/images/2021/06/08/202106081717566d8d80df28b7b6c0.png)

```c
NOTE : As of today, these are the applications actively
listening to the changes in STATE_DB: teamsyncd, intfmgrd, vlanmgrd
and lldpmgr. We will cover all these components in subsequent
sections -- lldpmgr has been already tackled abov
```

现在，让我们遍历物理端口关闭时发生的一系列步骤：

(0) 正如前面概述部分中提到的，syncd 在 **ASIC_DB** 的上下文中既作为发布者又作为订阅者执行。“订阅者”模式显然是因为需要 syncd 从北向应用程序接收状态，就像迄今为止看到的所有模块交互的情况一样。需要“发布者”模式以允许 syncd 将硬件产生的事件到达通知更高级别的组件。

(1) 在相应 ASIC 的光模块检测到载波丢失后，将向相关驱动程序发送通知，后者又将此信息传递给 syncd。

(2) Syncd 调用适当的通知处理程序并将端口关闭事件发送到 **ASIC_DB**。

(3) Orchagent 利用其通知线程（专用于此任务）从 **ASIC_DB** 收集新状态，并执行“port-state-change”处理程序以：

```c
a.  Generate an update to APPL\_DB to alert applications relying on
    this state for their operation (e.g. CLI -- "show interface
    status").

b.  Invoke sairedis APIs to alert syncd of the need to update the
    kernel state associated to the host-interface of the port being
    brought down. Again, orchagent delivers this request to syncd
    through the usual ASIC\_DB interface.
```

(4) Syncd 通过**ASIC_DB** 接收到这个新请求，并准备调用满足orchagent 请求所需的SAI API。

(5) Syncd 使用 SAI APIs + ASIC SDK 来更新内核与受影响主机接口的最新操作状态 (DOWN)。

(6) 在 portsyncd 处接收到与上一步相关联的 netlink 消息，由于所有 SONiC 组件现在完全知道端口关闭事件，因此该消息被静默丢弃。

![https://imagehost-cdn.frytea.com/images/2021/06/08/20210608171807dc16592980fabb79.png](https://imagehost-cdn.frytea.com/images/2021/06/08/20210608171807dc16592980fabb79.png)

## 参考文献

- SONiC official wiki: [https://github.com/Azure/SONiC/wiki](https://github.com/Azure/SONiC/wiki) （SONiC 官方维基）
- SONiC architecture: [https://github.com/Azure/SONiC/wiki/Architecture](https://github.com/Azure/SONiC/wiki/Architecture) （SONiC架构）
- SAI API: [https://github.com/opencomputeproject/SAI](https://github.com/opencomputeproject/SAI) （SAI接口）
- Redis documentation: [https://redis.io/documentation](https://redis.io/documentation) （Redis官方文档）
- Click module: [http://click.pocoo.org/5/](http://click.pocoo.org/5/)
- JSON introduction: [https://www.json.org/](https://www.json.org/) （JSON简介）
- SONiC supported platforms: [https://github.com/Azure/SONiC/wiki/Supported-Devices-and-Platforms](https://github.com/Azure/SONiC/wiki/Supported-Devices-and-Platforms) （SONiC支持的硬件平台）
- SONiC Software Architecture 2018 Workshop： [Videos](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DwU-j68wYB0Q%26feature%3Dyoutu.be&data=02%7C01%7Cxinxliu%40microsoft.com%7Ca6c96a222ffd47b0d34b08d6aef206f7%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C636888751855614656&sdata=rtV%2BadcQZLBz1mtX6kiTE2EfiezabsmiMdn2WBIilPs%3D&reserved=0) [Slides](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Ff990335bdbb4aebc3131-b23f11c2c6da826ceb51b46551bfafdc.ssl.cf2.rackcdn.com%2Fimages%2F1d66e872946c15dc71031301994daba0cf21512f.pdf&data=02%7C01%7Cxinxliu%40microsoft.com%7Ca6c96a222ffd47b0d34b08d6aef206f7%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C636888751855624664&sdata=xPEb2EvivG8zLaddD8r9f0GSftjgUklScFTwrs8oSZc%3D&reserved=0) （SONiC软件架构研讨会）