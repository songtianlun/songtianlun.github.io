---
title: "解决VMeare 安装 Android x86 错误"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "309"
date: "2020-02-05 22:04:25"
---

今天尝试使用 VMware 安装Android x86 9.0 时出现一个问题。

安装过程参考教程：

- [VMware实现Android x86 8.1 从安装到使用](https://blog.csdn.net/weixin_43913500/article/details/88760557)
- [VMware 安装 Android x86 7.1.2 64 位](https://www.npbeta.com/2017/11/vmware_android/)

安装镜像来源：https://www.android-x86.org/download

完成安装进行 `Reboot` 时，出现了 `detecting android-x86 found at /dev/sda1` 错误。

此时参考文章：[vmware虚拟机安装android-x86-8.1-rc2遇到的坑](https://seonoco.com/blog/vmware-android-x86) 解决这一错误。

解决方法摘录如下：

启动项选择时按 `e` 编辑
找到字串 `quiet`
改成 `nomodeset xforcevesa`
然後按 `Enter`
按 `b` 啟動

运行效果：

![2020-02-05-21-11-51-0c749eb685577f67.png](https://imagehost-cdn.frytea.com/images/2020/02/05/2020-02-05-21-11-51-0c749eb685577f67.png)

![2020-02-05-22-03-01-e3801ae55f5fd7e6.png](https://imagehost-cdn.frytea.com/images/2020/02/05/2020-02-05-22-03-01-e3801ae55f5fd7e6.png)

## 参考文献

- [VMware实现Android x86 8.1 从安装到使用](https://blog.csdn.net/weixin_43913500/article/details/88760557)
- [VMware 安装 Android x86 7.1.2 64 位](https://www.npbeta.com/2017/11/vmware_android/)
- [vmware虚拟机安装android-x86-8.1-rc2遇到的坑](https://seonoco.com/blog/vmware-android-x86)
