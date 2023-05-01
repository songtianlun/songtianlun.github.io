---
title: "apt 查看软件库中软件包所有可用版本"
categories: [ "技术" ]
tags: [ "debian","apt" ]
draft: false
slug: "786"
date: "2023-05-01 00:06:32"
---

要查看软件库中现有的所有可用版本，您可以使用以下命令：

```
apt-cache madison <package-name>
```

将 `<package-name>` 替换为您要查看版本信息的软件包名称。此命令将显示所有可用版本的软件包及其详细信息，包括软件包名称、版本号、发行版、构建日期和软件源等信息。

例如，要查看 Node.js 的所有可用版本，请使用以下命令：

```
apt-cache madison nodejs
```

此命令将显示所有可用版本的 Node.js 软件包及其详细信息。

您还可以使用以下命令来查看软件包的详细信息，包括其依赖项、描述、文件列表等：

```
apt-cache show <package-name>
```

例如，要查看 Node.js 的详细信息，请使用以下命令：

```
apt-cache show nodejs
```

此命令将显示 Node.js 软件包的详细信息，包括其依赖项、描述、文件列表等。

希望这些命令可以帮助您查看软件库中现有的所有可用版本。

