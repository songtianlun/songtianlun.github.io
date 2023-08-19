---
title: "香港平价 VPS 汇总（2023）"
date: 2023-08-17T12:40:22Z
description: "整理香港地区稳定、平价的vps供应商及最佳方案."
categories: ["云服务"]
tags: ["云主机","HK云主机"]
draft: false
---

整理这张表格的初衷，是我个人一直在寻找线路较好、价格较便宜的香港云主机。于是就整理了目前提供香港云主机服务的比较靠谱的几家云厂商，连同其最低价套餐的信息整理在这里，希望对有同样需求的你有一些帮助。

搜寻下来大体上符合那句老话：一份价钱一分货。同时，也并不是好的服务就一定让普通人望而却步，需要对整个市场有整体的认知。

| 主机商名称                                                        | 线路类型       | 最低价套餐 | 优势       | 测试 IP                | 参考延迟 | 入口                                                                                |
| :--:                                                              | :--:           | :--:       | :--:       | :--:                   | :--:     | :--:                                                                                |
| [VMISS](https://app.vmiss.com/aff.php?aff=1155)                   | BGB/CN2        | 5CAD/m     | 直连路由   | hk.bgp.vss.im          | 40ms     | [详情](https://app.vmiss.com/aff.php?aff=1155&pid=50)                               |
| [Evoxt](https://console.evoxt.com/aff.php?aff=559)                | CMI            | $2.99/m    | 性价比     | www.accountgooglle.com | 96ms     | [官网](https://console.evoxt.com/aff.php?aff=559)                                   |
| [Misaka](http://misaka.io)                                        | Unknow         | $10/m      | 便宜       | 45.11.104.130          | 206ms    | [详情](https://app.misaka.io/iaas/vm/create/hkg12/s3n-1c1g)                         |
| [Dmit](https://www.dmit.io/aff.php?aff=7205)                      | Tier 1         | $36.9/Y    | 稳定       | 154.12.176.1           | 250ms    | [详情](https://www.dmit.io/aff.php?aff=7205&pid=168)                                |
| [Dmit](https://www.dmit.io/aff.php?aff=7205)                      | Tier 1         | $6.9/m     | 稳定       | 154.12.176.1           | 250ms    | [详情](https://www.dmit.io/aff.php?aff=7205&pid=161)                                |
| [Dmit](https://www.dmit.io/aff.php?aff=7205)                      | Eyeball        | $17.9/m    | 稳定       | 154.3.39.3             | 95ms     | [详情](https://www.dmit.io/aff.php?aff=7205&pid=154)                                |
| [Dmit](https://www.dmit.io/aff.php?aff=7205)                      | CN2/CMI        | $39.9/m    | 稳定       | 103.117.100.20         | 69ms     | [详情](https://www.dmit.io/aff.php?aff=7205&pid=123)                                |
| [GigsGigsCloud](https://clientarea.gigsgigscloud.com/?affid=3883) | 香港非直连     | $5/m       | 便宜       | 27.122.56.1            | 140ms    | [详情](https://clientarea.gigsgigscloud.com/?affid=3883&cmd=cart&action=add&id=339) |
| [GigsGigsCloud](https://clientarea.gigsgigscloud.com/?affid=3883) | 香港 PCCW/HKBN | $10/m      | 均衡       | 103.113.159.1          | 114ms    | [详情](https://clientarea.gigsgigscloud.com/?affid=3883&cmd=cart&action=add&id=333) |
| [GigsGigsCloud](https://clientarea.gigsgigscloud.com/?affid=3883) | 香港 CN2 GIA   | $22/m      | 线路       | 43.251.159.1           | 50ms     | [详情](https://clientarea.gigsgigscloud.com/?affid=3883&cmd=cart&action=add&id=342) |
| [搬瓦工](https://bwh81.net/aff.php?aff=70976)                     | 香港 CN2 GIA   | $89.99/m   | 稳定大带宽 | 93.179.124.115         | 48ms     | [详情](https://bwh81.net/aff.php?aff=70976&pid=95)                                  |

经过搜寻，我目前购入了列表中第一家 VMISS 的 CN.HK.BGP.Basic 套餐，比较让我惊喜的是他们家居然是 **三网直连！** 目前除了最昂贵的 香港 CN2 GIA 线路以外，即使是以优质线路著称的搬瓦工提供的 CMI 线路香港云主机也会绕路，但是 VMISS 家的套餐在我所在的地方无论是家里的移动还是公司的电信都可以做到 20ms 的延迟，真的很让我惊喜。

除此之外，还找了一些口碑较好提供香港云主机套餐的商家，DMIT 和 BWG 均是老牌的主机提供商了，相信各位对于他们的大名早有耳闻，他们的服务也是严格秉承一份价钱一分货，比如这里列出的 DMIT 的最相廉价香港套餐，是可以以较低成本入手 DMIT 的途径，但是线路极不稳定，而提供的稳定低延迟套餐价格令人望而却步。

如果看上了某个套餐，购买前请仔细查验好套餐详情，不要买错，同时付款前记得在网上搜索一下 **优惠码** ，大部分厂商会提供一些 5%-20% 的优惠码，可以找找。

最后，本文整理于 2023年8月18日，测试IP搜集于网络，各种数据都有可能发生变化，请以官网为准。本文给出的延迟仅供参考，延迟取决于 **区域+运营商**，不同的组合都会有不同的效果，具体怎么样还是要自己亲自使用 ping、mtr 这些命令测试过才知道。

## Referenses
- [EVOXT](https://evoxt.com)
- [Evoxt HK LookingGlass](http://www.accountgooglle.com)
- [Misaka](https://www.misaka.io)
- [Miaska Speedtest](https://www.misaka.io/speedtest/mc2)
- [VMISS](https://www.vmiss.com)
- [Vmiss HK LookingGlass](http://hk.bgp.vss.im)
- [VMISS全场7折起,洛杉矶CN2 GIA/AS9929/香港CN2/韩国CN2/日本VPS月付3.5加元起](https://www.zrblog.net/30278.html)
- [vmiss香港BGP VPS补货，8折优惠，21元/月起，三网CMI](https://www.daniao.org/20287.html)
- [有什么推荐稳定的香港 vps?价格不要太贵](https://www.v2ex.com/t/964480)
- [Evoxt：国外VPS云服务器95折优惠，可选香港xtom/马来西亚/德国/英国和美国，全区域1Gbps端口，月付$2.99起](https://www.veidc.com/41072.html)
- [豆丁博客](https://github.com/shluqu/shluqu.github.io)
- [GigsGigsCloud 2023年最新优惠码 香港/美西/日本/新加坡及测试IP](https://www.moeelf.com/archives/3.html)
