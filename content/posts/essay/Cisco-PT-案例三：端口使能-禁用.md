---
title: "Cisco PT 案例三：端口使能/禁用"
categories: [ "基础学科" ]
tags: [  ]
draft: false
slug: "344"
date: "2020-06-19 09:48:54"
---

# <a name="DAUUT"></a>
## 环境
- Cisco Packet Tracer 5.3
- Windows 10
<a name="4z7HD"></a>
## 操作
操作：按照如图所示连接拓扑图<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/376635/1592201187715-61b24705-daed-455a-abb4-76678fcada2f.png#align=left&display=inline&height=154&margin=%5Bobject%20Object%5D&name=image.png&originHeight=154&originWidth=416&size=10044&status=done&style=none&width=416)
```bash
# 进入特权模式
Switch>enable
# 进入全局配置模式
Switch#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#
# 进入端口
Switch(config)#interface FastEthernet0/1
Switch(config-if)#
# 禁用
Switch(config-if)#shutdown


%LINK-5-CHANGED: Interface FastEthernet0/1, changed state to administratively down
Switch(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down
# 使能
Switch(config-if)#no shutdown

%LINK-5-CHANGED: Interface FastEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to up

Switch(config-if)#
```
