---
title: "k3s 使用 Letsencrypt 和 Traefik 完成 https 入口部署"
date: 2022-03-08T14:43:39+08:00
description: "k3s自动完成 ssl 证书签发和续签方法，并使用 https 协议暴露服务方法介绍。"
categories: ["技术笔记集","云原生笔记集"]
tags: ["linux", "docker", "k8s", "kubernetes","k3s", "vps", "云原生"]
draft: false
---

完成了 k3s 集群的部署，下一步就是需要对外暴露服务，在当下这个网络安全日趋紧迫的时刻，加密传输已经成为 Web 服务的标配。

在网络上可以很轻易的搜索到 k3s 使用 ingress 完成域名暴露的技术文章，但是大部分都是针对旧版本的，旧版配置文件在书写格式上有变化，这篇文章的内容也不能保证最新，一切请以官方文档为准。

> 本文使用的 k3s 版本为 `v1.22.6+k3s1`
> 

## 内容提要

本文介绍 cert-manager 插件的安装，之后以一个简单的 web 服务部署为例，演示 https 服务的部署过程。

## 安装 cert-manager

```bash
# 首先创建 cert-manager 所需的命名空间
$ kubectl create namespace cert-manager

# 使用官网提供的配置文件一键安装
# 如果拉取 github 资源有困难，可以从网络通畅的位置下载好粘贴过去
$ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.yaml
```

如果没有报错，稍等片刻查看 cert-manager 运行正常，就可以继续下一步了：

```bash
$ kubectl get pods --namespace cert-manager
NAME                                     READY   STATUS    RESTARTS   AGE
cert-manager-6d8d6b5dbb-wg8p7            1/1     Running   0          44m
cert-manager-cainjector-d6cbc4d9-t9pn9   1/1     Running   0          44m
cert-manager-webhook-85fb68c79b-2bfmh    1/1     Running   0          44m
```

## 部署 ****Issuing Certificates****

按照官网描述，需要声明一个 Issuing ，可理解为“签名人”，大致就是用来认证服务归属者的。这部分对应官网文档在这里 → [[cert-manager](https://cert-manager.io/docs/) / [Configuration](https://cert-manager.io/docs/configuration/) / [ACME](https://cert-manager.io/docs/configuration/acme/)]，可以前往详细了解。

下面给出一个示例的 `letsencrypt.yml` 配置，替换其中的 <YOUR EMAIL> 即可快速查看配置。

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: <YOUR EMAIL> # replace this
    privateKeySecretRef:
      name: prod-issuer-account-key
    server: https://acme-v02.api.letsencrypt.org/directory
    solvers:
      - http01:
          ingress:
            class: traefik
        selector: {}
```

部署，并查看部署描述：

```bash
$ kubectl apply -f letsencrypt.yml
$ kubectl describe clusterissuer letsencrypt
...
Status:
  Acme:
    Last Registered Email:  songtianlun@frytea.com
    Uri:                    https://acme-v02.api.letsencrypt.org/acme/acct/430905970
  Conditions:
    Last Transition Time:  2022-03-01T01:32:36Z
    Message:               The ACME account was registered with the ACME server
    Observed Generation:   1
    Reason:                ACMEAccountRegistered
    Status:                True
    Type:                  Ready
Events:                    <none>
```

看到 Ready 说明一切正常，可以继续下一步了。

## 部署 Web 程序

在这里就以 `ruanbekker/logos:rancer` 为例，该容器对外暴露 `80` 端口，展示一张静态图片。

首先为此次部署准备一个命名空间 `logos` 

```bash
$ kubectl create namespace logos
```

之后编写 deployment 配置文件：

```bash
$ cat deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rancher-logo-app
  namespace: logos
spec:
  selector:
    matchLabels:
      name: rancher-logo-backend
  template:
    metadata:
      labels:
        name: rancher-logo-backend
    spec:
      containers:
        - name: backend
          image: ruanbekker/logos:rancher
          ports:
            - containerPort: 80
```

部署到集群并查看状态：

```bash
$ kubectl apply -f deployment.yml
$ kubectl get deployment -n logos
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
rancher-logo-app   1/1     1            1           29m
```

如果一切正常就可以继续下一步。

接下来部署一个 service 资源，为了下一步的 ingress 作准备：

```bash
$ cat service.yml
apiVersion: v1
kind: Service
metadata:
  name: rancher-logo-service
  namespace: logos
spec:
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    name: rancher-logo-backend
```

惯例，部署并查看状态：

```bash
$ kubectl apply -f service.yml
$ kubectl get service -n logos
NAME                   TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
rancher-logo-service   ClusterIP   10.43.87.67   <none>        80/TCP    33m
```

如果一切正常，就可以开始部署入口( `ingress` )了。

```bash
$ cat ingress.yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    annotations:
        cert-manager.io/cluster-issuer: letsencrypt-prod
    name: rancher-logo-ingress
    namespace: logos
spec:
  tls:
    - secretName: rancher-logo-k3s-ruan-dev-tls
      hosts:
        - logos.k3s.frytea.com
  rules:
  - host: logos.k3s.frytea.com
    http:
      paths:
        - pathType: Prefix
          path: /
          backend:
            service:
              name: rancher-logo-service
              port:
                number: 80
```

这个 ingress 会将流量路由到对应 service 的80 端口，之后进入对应的 pod 中，部署并查看一下吧：

```bash
$ kubectl apply -f ingress.yml
$ kubectl get ingress -n logos
NAME                   CLASS    HOSTS                  ADDRESS                       PORTS     AGE
rancher-logo-ingress   <none>   logos.k3s.frytea.com   x.x.x.x,x.x.x.x   80, 443   26m
```

由于使用了 cert-manager 证书资源，该插件会自动完成证书的认证、部署和续签，看一下证书状态：

```bash
$ kubectl -n logos describe certificate
...
Status:
  Conditions:
    Last Transition Time:  2022-03-01T01:54:19Z
    Message:               Certificate is up to date and has not expired
    Observed Generation:   1
    Reason:                Ready
    Status:                True
    Type:                  Ready
  Not After:               2022-05-30T00:54:17Z
  Not Before:              2022-03-01T00:54:18Z
  Renewal Time:            2022-04-30T00:54:17Z
  Revision:                1
Events:
  Type    Reason     Age   From          Message
  ----    ------     ----  ----          -------
  Normal  Issuing    28m   cert-manager  Issuing certificate as Secret does not exist
  Normal  Generated  28m   cert-manager  Stored new private key in temporary Secret resource "rancher-logo-k3s-ruan-dev-tls-rgrd8"
  Normal  Requested  28m   cert-manager  Created new CertificateRequest resource "rancher-logo-k3s-ruan-dev-tls-g8rm7"
  Normal  Issuing    28m   cert-manager  The certificate has been successfully issued
```

可以看到一切正常，现在使用 https 就可以正常访问服务了。

![https://imagehost-cdn.frytea.com/images/2022/03/01/2022-03-01-10.24.30cbee848875c87c88.png](https://imagehost-cdn.frytea.com/images/2022/03/01/2022-03-01-10.24.30cbee848875c87c88.png)

大功告成。

## 参考文献

- **[Default static install By cert-manager](https://cert-manager.io/docs/installation/#default-static-install)**
- [Traefik Docs](https://doc.traefik.io/traefik/)
- **[HTTPS using Letsencrypt and Traefik with k3s](https://sysadmins.co.za/https-using-letsencrypt-and-traefik-with-k3s/)**