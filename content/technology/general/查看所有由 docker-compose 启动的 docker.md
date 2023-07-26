---
title: '查看所有由 docker-compose 启动的 docker'
date: '2023-07-19T02:51:10.800Z'
tags: ['Docker']
created: '2023-07-19T02:03:42.562Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
revision: '1'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 10:11, 22nd 七月 2023 -->

# 查看所有由 docker-compose 启动的 docker

Docker Compose会为其创建的每个容器添加标签。如果您想获取由Compose创建的所有容器，可以执行container ls并应用过滤器。

```bash
docker container ls --filter label=com.docker.compose.project
```

例如，我从不同的Compose项目中创建了一些容器。通过使用过滤器，我只获取那些由Compose创建的容器，而没有其他未经Compose创建且因此没有项目标签的容器。

```bash
$ base='{{.Status}}\t{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Networks}}\t{{.Mounts}}'
$ compose='{{.Label "com.docker.compose.project"}}\t{{.Label "com.docker.compose.service"}}'

$ docker container ls --all \
  --filter label=com.docker.compose.project \
  --format "table $compose\t$base"

project        service     STATUS                      CONTAINER ID   NAMES                IMAGE                   PORTS                                                                     NETWORKS               MOUNTS
kafka          kafka       Up 5 minutes                3f97a460266e   kafka_kafka_1        bitnami/kafka:3         0.0.0.0:9092->9092/tcp, :::9092->9092/tcp                                 kafka_default          kafka_kafka_da…,kafka_kafa_con…
kafka          zookeeper   Up 5 minutes                0b6f32ccd196   kafka_zookeeper_1    bitnami/zookeeper:3.7   2888/tcp, 3888/tcp, 0.0.0.0:2181->2181/tcp, :::2181->2181/tcp, 8080/tcp   kafka_default          kafka_zookeepe…
manager        db          Up 22 minutes               4f0e799b4fd7   manager_db_1         da2cb49d7a8d            5432/tcp                                                                  manager_default        0d667a0e48a280…
foo            db          Exited (0) 37 minutes ago   e106c5cdbf5e   foo_db_1             da2cb49d7a8d                                                                                      foo_default            5a87e93627b8f6…
foo            backend     Up 10 minutes               08a0873c0587   foo_backend_2        c316d5a335a5            80/tcp                                                                    foo_default            
foo            frontend    Up 10 minutes               be723bf41aeb   foo_frontend_1       c316d5a335a5            80/tcp                                                                    foo_default            
foo            backend     Up 10 minutes               5d91d4bcfcb3   foo_backend_1        c316d5a335a5            80/tcp                                                                    foo_default            
manager        app         Up 22 minutes               2ca4c0920807   manager_app_1        c316d5a335a5            80/tcp                                                                    manager_default        
manager        app         Up 22 minutes               b2fa2b9724b0   manager_app_2        c316d5a335a5            80/tcp                                                                    manager_default        
loadbalancer   app         Exited (0) 37 minutes ago   791f4059b4af   loadbalancer_app_1   c316d5a335a5                                                                                      loadbalancer_default
```

如果您想查看所有容器，无论其状态如何，可以在ls命令中添加 `--al` l或简写的 `-a` 标志，就像我在示例中所做的那样。否则，只会显示正在运行的容器。

## References

* [How to show all running containers created by docker-compose, globally, regardless of docker-compose.yml](https://stackoverflow.com/questions/70915151/how-to-show-all-running-containers-created-by-docker-compose-globally-regardle)