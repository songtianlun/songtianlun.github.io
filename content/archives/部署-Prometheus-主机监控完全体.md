---
title: "部署 Prometheus 主机监控完全体"
categories: [ "技术" ]
tags: [ "docker","prometheus","node-exporter","cadvisor","grafana" ]
draft: false
slug: "664"
date: "2022-12-02 09:57:00"
---

![](https://imagehost-cdn.frytea.com/images/2022/12/02/202212020957362a5ac543b2ec7f2be.png)

监控完全体 = Prometheus + Node Exporter + cadvisor + grafana

Prometheus 作为轮转数据库，从各个服务器采集数据；
node-exporter 作为数据采集器，接受 prometheus 采集请求，上报主机各项参数；
vadvisor 作为容器数据采集器，接受 prometheus 采集请求，上报主机 docker 各项参数；
grafana 作为看板，从 prometheus 查询数据做数据可视化。

## 部署 Promoetheus

准备配置文件 `/data/docker/prometheus/prometheus.yml`

```yaml
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']

  # 采集node exporter监控数据
  - job_name: 'vps2'
    static_configs:
      - targets: ['10.28.0.1:9100']
```

准备数据文件夹，并设置访问权限为 nobody

```bash
# 创建文件夹
mkdir -p /data/docker/prometheus/data

# 取得nobody的uid
docker run --rm quay.io/prometheus/busybox cat /etc/passwd
···
nobody:x:65534:65534:nobody:/home:/bin/false

# 配置文件夹权限
chown 65534:65534 -R /data/docker/prometheus/data
```

启动 prometheus

```bash
$ docker run -d \
    --name=prometheus \
    -p 9090:9090 \
    --network=myDefault \
    --restart always \
    --volume /data/docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    --volume /data/docker/prometheus/data:/prometheus \
    prom/prometheus:v2.40.4 \
    --web.enable-lifecycle \
    --config.file=/etc/prometheus/prometheus.yml \
    --storage.tsdb.path=/prometheus \
    --storage.tsdb.retention=365d

$ docker run -d \
    --name=prometheus \
    -p 9090:9090 \
    --network=myDefault \
    --restart always \
    --volume /data/docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
    --volume /data/docker/prometheus/data:/prometheus \
    prom/prometheus:v2.40.4 \
    --web.enable-lifecycle \
    --config.file=/etc/prometheus/prometheus.yml \
    --storage.tsdb.path=/prometheus \
    --storage.tsdb.retention=365d
# --web.enable-lifecycle 允许热加载配置文件
# 注意放在镜像名后面的内容为映射到内部的配置标志
```

## 部署 Node Exporter 采集主机数据

可采用编译安装或包管理器直接安装。

编译安装

```bash
# x86
$ curl -OL https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz
$ tar -xzf node_exporter-1.5.0.linux-amd64.tar.gz
$ cp node_exporter-1.5.0.linux-amd64/node_exporter /usr/local/bin/
# arm64
$ curl -OL https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-arm64.tar.gz
$ tar -xzf node_exporter-1.5.0.linux-arm64.tar.gz
$ cp node_exporter-1.5.0.linux-arm64/node_exporter /usr/local/bin/

$ sudo useradd -rs /bin/false nodeusr

$ echo "[Unit]
Description=Node Exporter
After=network.target

[Service]
User=nodeusr
Group=nodeusr
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/node_exporter.service

$ sudo systemctl daemon-reload
$ sudo systemctl enable node_exporter && systemctl start node_exporter
```

Ubuntu 等直接安装：

```bash
$ apt search node_exporter
Sorting... Done
Full Text Search... Done
prometheus-node-exporter-collectors/focal 0+git20200110.fc91c86-1 all
  Supplemental textfile collector scripts for Prometheus node_exporter

$ apt install -y prometheus-node-exporter-collectors

# 启动服务
$ systemctl enable prometheus-node-exporter.service && systemctl start prometheus-node-exporter.service
Synchronizing state of prometheus-node-exporter.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable prometheus-node-exporter

# OpenWRT
opkg update
opkg install prometheus-node-exporter-lua \
prometheus-node-exporter-lua-nat_traffic \
prometheus-node-exporter-lua-netstat \
prometheus-node-exporter-lua-openwrt \
prometheus-node-exporter-lua-wifi \
prometheus-node-exporter-lua-wifi_stations

curl localhost:9100/metrics

cat /etc/config/prometheus-node-exporter-lua
config prometheus-node-exporter-lua 'main'
        option listen_ipv6 '0'
        option listen_port '9100'
        option listen_interface 'lan'

/etc/init.d/prometheus-node-exporter-lua restart
```

重载 prometheus 配置文件

```bash
# 方法一  使用 SIGHUP 信号
kill -HUP $(pidof prometheus)
# 方法二 使用 POST 请求，需 --web.enable-lifecycle
curl -X POST http://localhost:9090/-/reload
# 实测两种方法在 Docker 下均不生效，猜测外部修改必须重启才能映射入容器，原因待查
```

## 部署 **[cadvisor](https://github.com/google/cadvisor)**

```bash
# 这里使用了我在 docker hub 镜像的官方 gcr 源镜像
# 避免无法拉取问题
# 普通 docker hub 镜像即可拉取
$ sudo docker run \
  --restart always \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  --net=myDefault \
  songtianlun/cadvisor:v0.46.0
$ curl http://localhost:8080
```

## 部署 grafana

```bash
docker run -d \
    --name=grafana \
    -p 3000:3000 \
    --network=myDefault \
    --restart always \
    grafana/grafana
```

默认帐号： `admin/admin`

看板模版在这里找： https://grafana.com/grafana/dashboards/

## 参考文献

- [部署 Prometheus By monaive Gitbook](https://monaive.gitbook.io/prometheus/)
- [Prometheus - book By yunlzheng Gitbook](https://yunlzheng.gitbook.io/prometheus-book/)
- [How to persist data in Prometheus running in a Docker container?](https://stackoverflow.com/questions/50009065/how-to-persist-data-in-prometheus-running-in-a-docker-container)
- [Cannot launch with --web.enable-lifecycle #5986](https://github.com/prometheus/prometheus/issues/5986)
- https://github.com/prometheus/prometheus/issues/5986#issuecomment-528290050
- [在运行时热加载Prometheus的配置信息](https://blog.frognew.com/2018/09/prometheus-config-hotreload.html)
- [How I monitor my OpenWrt router with Grafana Cloud and Prometheus](https://grafana.com/blog/2021/02/09/how-i-monitor-my-openwrt-router-with-grafana-cloud-and-prometheus/)
- [在运行时热加载Prometheus的配置信息](https://blog.frognew.com/2018/09/prometheus-config-hotreload.html)
- [根据PID获取进程名&根据进程名获取PID【转】](https://www.cnblogs.com/sky-heaven/p/12101618.html)
- [How to install Node Exporter on CentOS 7 - Linux Monitoring](https://www.theairtips.com/post/how-to-install-node-exporter-on-centos-7-linux-monitoring)
- [prometheus](https://github.com/prometheus) / **[node_exporter](https://github.com/prometheus/node_exporter)**
- [cadvisor docker container fails to start "mountpoint for cpu not found" (clearcontainers) #1943](https://github.com/google/cadvisor/issues/1943)

