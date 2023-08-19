---
title: '使用 java 手动执行生成的类文件'
date: '2023-06-20T15:59:20.609Z'
tags: ['JAVA']
created: '2023-06-20T15:57:13.755Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '3'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 17:07, 22nd 七月 2023 -->

# 使用 java 手动执行生成的类文件

下面以执行使用 `mvn compile` 编译好的 `cn.gson.oasys.OasysApplication` Java 类为例。

你可以使用 `java` 命令直接运行编译后的 Java 类文件，但是你需要明确指定所需要的类路径 `-cp` 或者 `-classpath`，包括你的项目的所有依赖库。

首先，需要通过 `mvn dependency:copy-dependencies` 命令将所有依赖库复制到项目的一个目录下，例如 `target/dependency`：

```bash
mvn dependency:copy-dependencies
```

然后，使用 `java` 命令执行 main 方法，你需要将项目的 `target/classes` 目录和所有的依赖库一起加入到类路径 `-cp` 中。可以使用下面的命令：

```bash
java -cp target/classes:target/dependency/* cn.gson.oasys.OasysApplication
```

在这个命令中，`target/classes:target/dependency/*` 指定了类路径，包含了你的项目编译后的类文件和所有的依赖库。`cn.gson.oasys.OasysApplication` 是你的应用的 main 方法所在的类的完全限定名。

这种方式虽然可以运行你的 Spring Boot 应用，但是相比于使用 `mvn exec:java` 或者 `mvn spring-boot:run`，它更加复杂，需要手动管理类路径。而且，如果你的项目的依赖发生了改变，你需要重新运行 `mvn dependency:copy-dependencies` 来更新依赖库。因此，一般推荐直接使用 Maven 来运行你的 Spring Boot 应用。