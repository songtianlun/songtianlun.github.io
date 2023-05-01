---
title: "Android编程之Navigation项目迁移AndroidX踩坑记录"
categories: [ "技术" ]
tags: [ "android" ]
draft: false
slug: "27"
date: "2019-05-08 19:19:00"
---


# Android编程之Navigation项目迁移AndroidX踩坑记录


androidx 是对 android.support.xxx 包的整理后产物。由于之前的support包过于混乱，所以，google推出了 androidX。

在项目迁移AndroidX的过程中遇到一些问题，特别是Navigation抽屉页面迁移的过程中遇到一些问题，跟着网上的教程走完了全程，却总是闪退，原因直指xml布局文件。

经过一番斗争，终于完成了Android studio原生Navigation Drawer Activity的AndroidX迁移工作，在这里仅以此为例，记录迁移流程，及注意细节。

<!--more-->

![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190508185045.png)

## 迁移固有流程

### 第一步：在project的`gradle.properties`文件里添加如下配置：
```
android.useAndroidX=true
android.enableJetifier=true
```
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190508185207.png)

### 第二 步：将依赖库替换成AndroidX的库

比如将`com.android.support:appcompat-v7`库替换为`androidx.appcompat:appcompat:1.0.0-alpha1`

**具体对应关系可以查看Google官方文档：[ndroidX refactoring](https://developer.android.com/jetpack/androidx/migrate)**
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190508185407.png)

### 第三步：修改import
将原来import的`android.**`的包删除重新import为`androidx.**`的新的包。
![](https://raw.githubusercontent.com/songtianlun/Image-Hosting/image/20190508185552.png)

### 注：
1. Android Studio 3.2 Canary 14及以上版本提供了更加方便快捷的方法一键重构到AndroidX。选择菜单上的ReFactor->Refactor to AndroidX...即可
2. AndroidX需要使用最新的Android sdk，打开Android Studio的设置找到Android SDK下载最新的Android P Preview的sdk，然后将module的build.gradle里的compileSdkVersion改为compileSdkVersion '28'然后再编译

## 迁移Navigation
一般的项目经过以上的步骤就完成了，但是在我迁移Navigation时候发现还是无法运行，经过不断的排查发现在xml文件中使用的所有support型控件也需要替换，下面记录下我替换的控件。

1. `android.support.v4.widget.DrawerLayout`替换为`androidx.drawerlayout.widget.DrawerLayout`
2. `android.support.design.widget.NavigationView`替换为`com.google.android.material.navigation.NavigationView`
3. `android.support.design.widget.CoordinatorLayout` 替换为 `androidx.coordinatorlayout.widget.CoordinatorLayout` 
4. `android.support.design.widget.AppBarLayout`替换为`com.google.android.material.appbar.AppBarLayout`
5. `android.support.v7.widget.Toolbar`替换为`androidx.appcompat.widget.Toolbar`
6. `android.support.design.widget.FloatingActionButton`替换为`com.google.android.material.floatingactionbutton.FloatingActionButton`
7. `android.support.constraint.ConstraintLayout`替换为 `androidx.drawerlayout.widget.DrawerLayout`

结束！


## 参考文献
- [Android AndroidX的集成](https://www.loongwind.com/archives/368.html)
- [AndroidX了解一下](https://blog.csdn.net/qq_17766199/article/details/81433706)
- [Android:你好,androidX！再见,android.support](https://www.jianshu.com/p/41de8689615d)
- [不推荐使用androidx.test.InstrumentationRegistry](https://cloud.tencent.com/developer/ask/203111)
- [AndroidX官方新旧对比](https://developer.android.com/jetpack/androidx/migrate)
- [一个神奇的控件——Android CoordinatorLayout与Behavior使用指南](https://www.jianshu.com/p/488283f74e69)
- [Android框架之路——NavigationView的使用（结合ToolBar）](https://blog.csdn.net/bskfnvjtlyzmv867/article/details/70245826)