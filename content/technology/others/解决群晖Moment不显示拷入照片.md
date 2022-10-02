---
title: "解决群晖Moment不显示拷入照片"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "477"
date: "2020-11-07 23:19:00"
---

近期趁着双十一购入群晖一台，装好Moments，将照片导入Moment文件夹，但刷新并没有在Moments主页看到直接考入文件夹内的照片。

开始以为是正在转码，搜索一圈也有人这么说，后来有人提出是由于权限问题，于是尝试修复。

首先将Moment文件夹下的所有文件所有者授予当前账户：

![https://imagehost-cdn.frytea.com/images/2020/11/07/202011072316057727cfb2f6215904.png](https://imagehost-cdn.frytea.com/images/2020/11/07/202011072316057727cfb2f6215904.png)

再给当前账户完全控制权限：

![https://imagehost-cdn.frytea.com/images/2020/11/07/202011072316366ef3fe01d9080ef3.png](https://imagehost-cdn.frytea.com/images/2020/11/07/202011072316366ef3fe01d9080ef3.png)

再进入Moment发现多出了许多照片的灰色占位区域，这才是正在转码的样子：

![https://imagehost-cdn.frytea.com/images/2020/11/07/202011072313506369d4124d556308.png](https://imagehost-cdn.frytea.com/images/2020/11/07/202011072313506369d4124d556308.png)

猜测是由于此前文件所有者并非当前账户，因此群晖Moment无权访问这些文件，也就访问不到，更无法缓存，将所有文件权限给够，正常缓存。

这下好了，六年前的照片都躺在了这段时间线里，突然感受到科技的美好。

## 参考文献

- 群晖moments无法显示copy进去的照片问题解决：[https://zhuanlan.zhihu.com/p/38032735](https://zhuanlan.zhihu.com/p/38032735)