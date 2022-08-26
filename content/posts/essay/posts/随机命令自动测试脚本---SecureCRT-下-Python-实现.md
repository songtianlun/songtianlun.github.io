---
title: "随机命令自动测试脚本 | SecureCRT 下 Python 实现"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "485"
date: "2020-11-17 11:52:00"
---

在进行命令终端软件开发及通信道路开发时，常常需要测试终端的稳定性，此时通过命令脚本自动化的敲命令可以节省许多人力，这里写了一个SecureCRT终端模拟软件下python实现的自动化测试脚本，可以从命令列表中随笔选取命令进行测试，具有设置睡眠时间及超时发现功能。

```jsx
# $language = "python"
# $interface = "1.0"

# This automatically generated script may need to be
# edited in order to work correctly.

import time
import math
import random

start_time = time.time()
end_time = time.time()
cmd = "show sw"
cmd_list = [
    'show interface switchport xge 1/0/20',
    'show vlan all',
    'show arp all',
    'show mac-address all',
    'show trap message filter level 1'
]
cmd_list_len = len(cmd_list) - 1
time_sleep = 0.1
time_out = 30

def Main():
    crt.Screen.Send("co te\r\n")
    crt.Screen.Send("int xge 1/0/6\r\n")
    while True:
        end_time = time.time()
        crt.Screen.Synchronous = False
        #crt.Screen.Send(cmd)
        CmdNum = random.randint(0,cmd_list_len)
        crt.Screen.Send(cmd_list[CmdNum])
        crt.Screen.Send("\r\n")
        running_time = end_time - start_time
        running_min = math.ceil(running_time / 60) - 1
        if (crt.Screen.WaitForCursor(time_out)):
            #crt.Screen.Send("\r\n")
			#crt.Screen.Send("\r\n")
			#crt.Screen.Send("\r\n")
			#crt.Screen.Send("\r\n")
			#crt.Screen.Send("\r\n")
            if CmdNum == 10:
                time.sleep(10)
            else:
                time.sleep(time_sleep)
			#time.sleep(100 / (running_time / 1000))
        else:		
            msg = "超时无响应，运行报告：\n" + \
                "running time : " + str( running_min ) + " min " + str(running_time - running_min * 60 - time_out) + " s "  + "\n" + \
                "start ms        : " + str(start_time)             + "\n" + \
                "ent ms          : " + str(end_time)               + "\n"
            crt.Dialog.MessageBox(msg,"session",64|2)

Main()
```