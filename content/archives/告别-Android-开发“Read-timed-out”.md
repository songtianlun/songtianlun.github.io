---
title: "告别 Android 开发“Read timed out”"
categories: [ "技术" ]
tags: [ "android" ]
draft: false
slug: "304"
date: "2020-02-01 15:34:00"
---

## 问题背景

困扰博主近一个月的问题，导致近一个月没办法进行 Android 开发的问题终于解决了！

## 问题错误特征

- `Could not run phased build action using Gradle distribution 'https://services.gradle.org/distributions/gradle-5.5.1-all.zip'`
- `A problem occurred configuring root project 'PlanAssistant'.`
- `Could not resolve all artifacts for configuration ':classpath'.`
- `Could not resolve com.android.tools.build:gradle:3.5.3.`
- `Could not get resource 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.3/gradle-3.5.3.pom'.`
- `Could not GET 'https://dl.google.com/dl/android/maven2/com/android/tools/build/gradle/3.5.3/gradle-3.5.3.pom'.`
- **Read timed out**

就是这一句 `Read timed out`，在过去的一个月里，我天天都看到这句报错，始终找不到比较好的解决方案。经过各种 Google，Baidu，bing，发现解决方案大致分为两种：

1. 为 Gradle 配置 socks 代理
2. 配置阿里云 maven 仓库源

## 问题解决

尝试了以上两种方法之后全都无法解决，依然是那一句可恶的 **Read timed out**.终于在今天我发现了自己存在的问题：**全局Gradle代理配置错有问题**。

![2020-02-01-14-46-44-cab165ae590fb026.png](https://imagehost-cdn.frytea.com/images/2020/02/01/2020-02-01-14-46-44-cab165ae590fb026.png)

当我为 Android Studio 配置了代理后，编译时询问是否要为 Gradle 也配置代理，年少无知的我果断选择了 **配置** ，但事实证明，这样的方式配置的是 `HTTP Proxy`，但是我的 `ssr` 运行的是 `socks` 协议，这么一来就算我如何操作，都无法摆脱
`Read timed out` 的诅咒了。

![2020-02-01-15-10-54-e54fe1e99737299e.png](https://imagehost-cdn.frytea.com/images/2020/02/01/2020-02-01-15-10-54-e54fe1e99737299e.png)

解决方法很简单，找到 `gradle` 的位置，将其中 `gradle.properties` 文件中关于 `HTTP Proxy` 的部分全部注释：

```
## For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html
#
# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx1024m -XX:MaxPermSize=256m
# org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true
#Mon Jan 27 12:42:16 CST 2020
#systemProp.https.nonProxyHosts=localhost, 127.0.0.0/8, \:\:1
#systemProp.http.proxyHost=127.0.0.1
#systemProp.https.proxyPort=1080
#systemProp.https.proxyHost=127.0.0.1
#systemProp.http.proxyPort=1080
```
这样一来，就可以通过重新配置 `socks` 代理或是改用阿里云 maven 库的方式解决问题。如果需要使用`socks` 代理，需要在文件中使用这一句：

```
org.gradle.jvmargs=-Xmx4536m -DsocksProxyHost\=127.0.0.1 -DsocksProxyPort\=1080
```

如果使用 `HTTP` 代理就是以上导致我出错的部分：

```
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1080
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1080
```

## 代理总结

下面根据个人理解对 Androoid Studio 中的代理进行一下小结，代理分两种

 - Android Studio 自身
- Gradle

配置代理时二者也是分开的，为 Android Studio 配置代理就可以在下载 SDK，IDE更新时走代理；而 Gradle 代理就是在进行编译时走代理，配置方法在上文已经详述了 Gradle 的配置，想为 Android Studio 配置代理只需在设置中配置即可（注意区分代理协议）。

![2020-02-01-15-30-42-5cab0a4f79838b91.png](https://imagehost-cdn.frytea.com/images/2020/02/01/2020-02-01-15-30-42-5cab0a4f79838b91.png)

下面作一次搬运工，将阿里云官网给出的配置阿里云 maven 库 的方法在此一并叙述，方便需要的人。

## 配置国内 maven 库

在build.gradle文件中加入以下代码:

```
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public/' }
        mavenLocal()
        mavenCentral()
    }
}
```

ps: 仓库位置顺序有讲究，如果想要阿里云库优先就把它放在靠前的位置。更多信息见 [阿里云文档/公共代理库](https://help.aliyun.com/document_detail/102512.html?spm=a2c40.aliyun_maven_repo.0.0.36183054QyIwQp)

想要告别 Read timed out，本文介绍了两种方法，一种需要您会点魔法，第二种就是配置国内仓库源，方法在文中都有介绍，若本文有不严谨之处欢迎在我的博文下留言。

## 参考文献

 - [阿里云文档/公共代理库](https://help.aliyun.com/document_detail/102512.html?spm=a2c40.aliyun_maven_repo.0.0.36183054QyIwQp)
 - [AndroidStudio中Gradle的Socks代理设置](https://blog.csdn.net/WittyCollegeStudent/article/details/78954200)
 - [Flutter gradle采坑](https://www.cnblogs.com/lonenysky/p/11531997.html)
