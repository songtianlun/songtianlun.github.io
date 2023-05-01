---
title: "迁移 Docker volume 到本地挂载点"
categories: [ "技术" ]
tags: [ "docker" ]
draft: false
slug: "760"
date: "2023-03-28 18:22:02"
---

要将 Docker volume 迁移到本地挂载点，您需要执行以下步骤：

1. 首先，确保已停止正在使用此 volume 的所有容器。您可以使用以下命令停止容器（将 <container_name> 替换为您的容器名称）：    ```
   docker stop <container_name>

```
1. 使用 docker cp 命令将 volume 的内容复制到本地文件系统。首先，创建一个临时容器，将要迁移的 volume 挂载到该容器：    ```
docker run -d --name temp_container -v <volume_name>:/volume_data busybox tail -f /dev/null
```

将 <volume_name> 替换为要迁移的 volume 的名称。

1. 使用 docker cp 命令将 volume 数据从临时容器复制到本地目录：    ```
   docker cp temp_container:/volume_data <local_mount_point>

```
将 <local_mount_point> 替换为要将数据复制到的本地目录。
1. 删除临时容器：    ```
docker rm -f temp_container
```

1. 更新您的 docker run 命令或 docker-compose.yml 文件，将原来的 volume 更改为本地挂载点。例如，如果您以前的 docker run 命令如下：    ```
   docker run -d --name my_container -v <volume_name>:/data my_image

```
将其更改为：
```

docker run -d --name my_container -v <local_mount_point>:/data my_image

```
将 <local_mount_point> 替换为您在步骤 3 中使用的本地目录。
1. 启动更新后的容器，并验证数据是否已成功迁移到本地挂载点。

请注意，根据 volume 的大小和复杂性，迁移过程可能会花费一定时间。在迁移期间，请确保不要对 volume 进行修改以避免数据不一致。
```

