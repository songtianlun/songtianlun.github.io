---
title: "Android 集成腾讯定位"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "28"
date: "2019-01-17 23:44:00"
---


# Android 集成腾讯定位

## 概述

在安卓软件开发过程中需要用到定位，在对比了国内比较知名的三种：

- 高德定位
- 百度定位
- 腾讯定位

后选择了第三种，腾讯定位，原因主要是：

- 支持获取WGS-84坐标
- 支持网络定位

<!--more-->

由于众所周知的原因，在中国境内所有的出版电子地图都必须要经过至少一次加偏（也就是所谓的国测局火星坐标系），因此国内地图提供商为了更好的对接产品，纷纷推出了自家的坐标系，也就是在火星坐标系基础之上再次加偏的高德坐标、百度坐标。

坐标加偏之后再恢复就不那么容易了，解偏本身就会带来一些误差。

因此为了使得开发的软件有更好的扩展性，想要得到网络定位的WGS-84坐标，就要用到腾讯定位。

在使用的过程中遇到以下几个问题：

- 位置监听服务器注册失败
- so文件导入错误

## 配置定位

官网教程：[Android定位SDK的安装和使用](https://lbs.qq.com/geo/guide-install.html)

下面记录以下主要流程和解决问题的方法：

### 第一步、导入库文件

找到开发包中的 libtencentloc.zip文件夹，拷贝相应目录下的so文件到目标工程中的 libs目录下。

#### jar包导入

找到开发包中的 TencentLocationSDK_v4.3.0_r196568.jar 文件，拷贝到目标工程中的 libs 目录下。

注意： 如果 TencentLocationSDK_v4.3.0_r196568.jar没有自动加入到工程的 build path 中，则需要手动添加。手动添加的步骤如下：右击工程，在 工程属性->Java Build Path->Libraries中选择“Add External JARs”，选定 TencentLocationSDK_v4.3.0_r196568.jar，确定后返回。这样您就可以在程序中使用腾讯地图定位SDK了。

#### so文件导入

讲需要的so文件导入，详细介绍如下
##### 方法一：
将so文件导入如下的目录（若没有则新建）
![深度截图_选择区域_20190519165452.png](https://i.loli.net/2019/05/19/5ce11ee9a48ff56351.png)
##### 方法二：
在build.gradle中加入如下代码：
```java
android {
    ......
    sourceSets {
        main {
            jniLibs.srcDir 'libs' //设置so文件位置
        }
    }

}
```
之后讲so文件放入如下目录
![深度截图_选择区域_20190519165751.png](https://i.loli.net/2019/05/19/5ce11eea110c730624.png)
### 第二步、配置 manifest及权限
#### 权限声明
在 AndroidManifest.xml 中添加使用权限：
```java
<!-- 通过GPS得到精确位置 -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<!-- 通过网络得到粗略位置 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<!-- 访问网络，某些位置信息需要从网络服务器获取 -->
<uses-permission android:name="android.permission.INTERNET" />
<!-- 访问WiFi状态，需要WiFi信息用于网络定位 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<!-- 修改WiFi状态，发起WiFi扫描, 需要WiFi信息用于网络定位 -->
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<!-- 访问网络状态, 检测网络的可用性，需要网络运营商相关信息用于网络定位 -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- 访问网络的变化, 需要某些信息用于网络定位 -->
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
<!-- 访问手机当前状态, 需要某些信息用于网络定位 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

#### 动态申请权限
ａｎｄｒｏｉｄ　６．０以上的系统需要动态申请一些敏感权限，这里涉及到定位权限，因此需要使用如下代码获取权限：
```java
if (Build.VERSION.SDK_INT >= 23) {
     String[] permissions = {
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
        };
 
    if (checkSelfPermission(permissions[0]) != PackageManager.PERMISSION_GRANTED)
    {
        requestPermissions(permissions, 0);
    }
}
```

#### 配置ｋｅｙ
在 AndroidManifest.xml 中配置Key
```java
<application>
    ...
    <meta-data android:name="TencentMapSDK" android:value="您申请的Key" />
</application>
```
### 第三步、创建位置监听器
TencentLocationListener 接口代表位置监听器，您的APP 通过位置监听器接收定位SDK的位置变化通知。创建位置监听器非常简单，通常您只需实现 TencentLocationListener 接口。如下所示:
```java
public class MyActivity extends Activity implements TencentLocationListener {
    ...
  
    @Override
    public void onLocationChanged(TencentLocation location, int error, String reason) {
        // do your work
    }
  
    @Override
    public void onStatusUpdate(String name, int status, String desc) {
        // do your work
    }          
}
```

### 第四步、创建定位请求
TencentLocationRequest 类代表定位请求， 您的APP通过向定位SDK发送定位请求来启动定位。通常您只需获取 TencentLocationRequest 实例即可，如下所示：
```
TencentLocationRequest request = TencentLocationRequest.create()
```

### 第五步、注册位置监视器
```java
mLocationManager = TencentLocationManager.getInstance(this);

        /* 保证调整坐标系前已停止定位 */
        mLocationManager.removeUpdates(null);
        // 设置 wgs84 坐标系
        mLocationManager
                .setCoordinateType(TencentLocationManager.COORDINATE_TYPE_WGS84);
```

### 第六步、开始定位并获取定位结果
####　开始定位
```java
private void start(){
        // 创建定位请求
        TencentLocationRequest request = TencentLocationRequest.create();

        // 修改定位请求参数, 定位周期 3000 ms
        request.setInterval(3000);

        // 开始定位
        mLocationManager.requestLocationUpdates(request, this);
    }
```
注：在这一步可能会出现错误导致后面定位失败，开始定位的方法会返回一个特征码，标示定位监视器是否成功注册。
```
int error = locationManager.requestLocationUpdates(request, listener);
```
因此最好获取一下这个特征码，下表展示标识码含义：
返回值	| 含义
:-- | :--
0 | 注册位置监听器成功
1 | 设备缺少使用腾讯定位SDK需要的基本条件
2 | 配置的 key 不正确
3 | 自动加载libtencentloc.so失败，可能由以下原因造成：

>返回码３可能是以下原因造成：
>1、这往往是由工程中的so与设备不兼容造成的，应该添加相应版本so文件;
>2、如果您使用AndroidStudio,可能是gradle没有正确指向so文件加载位置，可以按照这里配置您的gradle;
---------------------
>作者：隔壁大虾 
>来源：CSDN 
>原文：https://blog.csdn.net/iamsamzhang/article/details/64129924 
>版权声明：本文为博主原创文章，转载请附上博文链接！

#### 获取定位结果
在位置监视器接口中获取到定位结果。
```java
@Override
    public void onLocationChanged(TencentLocation location, int i, String reason) {
        Log.i("MainActivity","位置改变回调！");
        String msg = null;
        if (i == TencentLocation.ERROR_OK) {
            // 定位成功
            StringBuilder sb = new StringBuilder();
            sb.append("(纬度=").append(location.getLatitude()).append(",经度=")
                    .append(location.getLongitude()).append(",精度=")
                    .append(location.getAccuracy()).append("), 来源=")
                    .append(location.getProvider()).append(", 地址=")
                    // 注意, 根据国家相关法规, wgs84坐标下无法提供地址信息
                    .append("{84坐标下不提供地址!}");
            msg = sb.toString();
        } else {
            // 定位失败
            msg = "定位失败: " + reason;
        }
        textView.setText(msg);
        Log.i("MainActivity",msg);
    }

    @Override
    public void onStatusUpdate(String s, int i, String s1) {

    }
```
### 第七步、删除位置监视器
```java
Context context = ...
TencentLocationListener listener = ...
TencentLocationManager locationManager =
                        TencentLocationManager.getInstance(context);
locationManager.removeUpdates(listener);
```

效果图：
![Screenshot_20190519-171420_TencentLocation.jpg](https://i.loli.net/2019/05/19/5ce11eeb711dd93806.jpg)

参考文献
- [如何在安卓项目里部署so文件 ](http://www.sohu.com/a/252106786_100180425)
- [腾讯地图开放平台定位服务使用注意事项](https://blog.csdn.net/iamsamzhang/article/details/64129924)