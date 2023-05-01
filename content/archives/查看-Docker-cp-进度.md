---
title: "查看 Docker cp 进度"
categories: [ "技术" ]
tags: [ "docker" ]
draft: false
slug: "762"
date: "2023-03-29 09:18:12"
---

docker cp 命令本身不提供进度查看功能。但是，您可以使用第三方工具，如 pv（Pipe Viewer）在执行 docker cp 时查看进度。以下是使用 pv 查看 docker cp 进度的步骤：

首先，安装 pv。根据您的操作系统，使用相应的包管理器安装 pv。

```
# Ubuntu/Debian：
sudo apt-get install pv

# CentOS/RHEL：
sudo yum install pv

# macOS（使用 Homebrew）：
brew install pv
```

## 容器到主机

要将文件从容器复制到主机并查看进度，请执行以下命令：

```
docker exec <container_name> tar -cf - <source_path_inside_container> | pv | tar -xf - -C <destination_path_on_host>
```

将 <container_name> 替换为容器名称，<source_path_inside_container> 替换为容器内的源文件/目录路径，<destination_path_on_host> 替换为主机上的目标文件/目录路径。

例如，从名为 my_container 的容器复制 /data 目录到主机上的 /tmp/data 目录：

```
docker exec my_container tar -cf - /data | pv | tar -xf - -C /tmp/data
```

pv 将显示一个进度条，以及已传输、剩余和总字节数。

## 主机到容器

如果要从主机复制到容器并查看进度，可以使用以下命令：

```
tar -cf - <source_path_on_host> | pv | docker exec -i <container_name> tar -xf - -C <destination_path_inside_container>
```

将 `<source_path_on_host>` 替换为主机上的源文件/目录路径，`<container_name> ` 替换为容器名称，`<destination_path_inside_container>` 替换为容器内的目标文件/目录路径。

例如，从主机上的 /tmp/data 目录复制到名为 my_container 的容器中的 /data 目录：

```
tar -cf - /tmp/data | pv | docker exec -i my_container tar -xf - -C /data
```

这个命令会将主机上的文件/目录通过 tar 命令打包，然后通过 pv 查看进度，并通过管道将数据发送到容器中。在容器中，tar 命令会将数据解包到指定的目录。pv 将显示一个进度条，以及已传输、剩余和总字节数。

