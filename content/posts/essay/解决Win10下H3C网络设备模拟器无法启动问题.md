---
title: "解决Win10下H3C网络设备模拟器无法启动问题"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "338"
date: "2020-06-10 10:39:04"
---

由于工作学习需要，需在win10上安装H3C网络设备模拟器，但无奈安装好后各种启动不起来。

![image9dc86ee623493f66.png](https://imagehost-cdn.frytea.com/images/2020/06/10/image9dc86ee623493f66.png)

查看日之后发现报错如下：

```
Traceback (most recent call last):
  File "HCLUpdate.py", line 9, in <module>
  File "Ui_PopUp.pyc", line 10, in <module>
  File "PyQt4\QtGui.pyc", line 12, in <module>
  File "PyQt4\QtGui.pyc", line 10, in __load
ImportError: DLL load failed: 操作系统无法运行 %1。
```

刚开始以为是Python问题，其实这个方向是错误的。

后来在贴吧找到答案，这其实是软件兼容性问题，给的解决方案是采用老版系统运行，或是采用兼容性模式运行。

![image92641013e214747a.png](https://imagehost-cdn.frytea.com/images/2020/06/10/image92641013e214747a.png)

保存运行，成功启动！

![image56ee5bd43720f576.png](https://imagehost-cdn.frytea.com/images/2020/06/10/image56ee5bd43720f576.png)

## 参考文献

- [本人菜鸟一枚，请大神指教 自从电脑系统升级后，HCL就打不开了](https://tieba.baidu.com/p/5522591830?traceid=)
- [H3C网络设备模拟器官方免费下载](https://www.h3c.com/cn/Service/Document_Software/Software_Download/Other_Product/H3C_Cloud_Lab/Catalog/HCL/)