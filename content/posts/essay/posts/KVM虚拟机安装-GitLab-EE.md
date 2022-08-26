---
title: "KVM虚拟机安装 GitLab EE"
categories: [ "编程开发" ]
tags: [ "linux","Ubuntu","KVM","GitLab" ]
draft: false
slug: "266"
date: "2019-11-28 16:20:00"
---

GitLab 是一个基于网页的软件开发生命周期管理工具，提供了 git 代码仓库、知识库、问题追踪、CI/CD 流水线功能，使用开源许可证，由 GitLab 公司开发（来自 WikiPedia）。

自建 GitLab 服务器基于以下原因:

1. GitHub 到国内的访问速度实在堪忧
2. 随着某种关系的变化发展，作者并不指望这种状况有什么改善
3. Git 仓库速度缓慢会拖慢开发效率
4. GitHub Pages 的访问速度慢，托管在此的网页对于国内用户实在太不友好
5. GitLab 提供的 CI/CD 流水线功能比较完善
6. GitLab 的文档很全面，英文说明还不错，值得探索
7. 借此机会提高英文

自建方法还是基于 KVM 虚拟化一台 Ubuntu 虚拟机，并由这台虚拟机提供服务，外网由宿主机反向代理到内网实现外网访问。本文记录基于此上描述的环境及日后遇到的解决方案，本文带有一个持续更新区。

## 虚拟化

1. 创建虚拟磁盘
```
qemu-img create -f qcow2 ubuntu_gitlab.qcow2 100G
```

2. 新建虚拟机
```
virt-install \
--virt-type=kvm \
--name=ubuntu_gitlab \
--hvm \
--vcpus=4 \
--memory=6144 \
--cdrom=/srv/kvm/iso/ubuntu-18.04.3-live-server-amd64.iso \
--disk path=/srv/kvm/ubuntu_gitlab.qcow2,size=100,format=qcow2 \
--network network=default \
--graphics vnc,password=tianlun666,listen=::,port=5914 \
--autostart \
--force

```

3. 安装

在安装的过程中，为虚拟机配置网络如下:

 - statics ip : `192.168.122.4`
 - GatWay: `192.168.122.1`
 - name server: `192.168.122.1`
 - Subnet: `192.168.122.0/24`

## 安装 GitLab

GitLab 官方提供的[安装说明](https://about.gitlab.com/install/)很全面，本文提取其中关键步骤，具体安装请以官网文档为准。

1. 安装并配置相关依赖

```
$ sudo apt-get update
$ sudo apt-get install -y curl openssh-server ca-certificates   

```

[tip type="info" title="安装Postfix （选装）"]
GitLab 支持 Postfix, SMTP 等方式实现邮件通知，使用SMTP请跳过此步，如果需要安装Postfix邮件请执行以下的命令：

```
sudo apt-get install -y postfix   
```
安装过程中可能会出现一个全屏显示窗口，此时选择'Internet Site'并回车，使用你服务器的外部 DNS 作为'mail name'并回车，不出意外的话安装会继续进行。
[/tip]

2. 添加 GitLab 软件源

```
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
```

3. 运行 GitLab 安装

将代码中的网址替换为您为 GitLab 准备的地址，GitLab 会使用 Let's Encrypt 验证您的域名并自动为其配置 SSL。

```
sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee   
```

4. 设置默认 root 密码。

使用浏览器进入您上一步设置的地址，使用 `root` 账户登录，系统会提示您为其设置密码。

## 案例汇总（持续更新区）

### 为 GitLab 配置 SMTP 邮箱

1. 依次修改配置文件

```

vim /etc/gitlab/gitlab.rb

# 依次修改
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.mxhichina.com"
gitlab_rails['smtp_port'] = 25
gitlab_rails['smtp_user_name'] = "gitlab@yinnote.com"
gitlab_rails['smtp_password'] = "xxxxxx"
gitlab_rails['smtp_domain'] = "yinnote.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false

gitlab_rails['gitlab_email_from'] = "gitlab@yinnote.com"
user["git_user_email"] = "gitlab@yinnote.com"

```

2. 生效配置并重启 GitLab

```

$ gitlab-ctl reconfigure
$ gitlab-ctl restart

```

3. 监听日志打印

如果出现问题，可以使用该命令在控制台监听日志。

```
$ gitlab-ctl tail
```

4. 可能用到的 VIM 命令

```
# 整页翻页 ctrl-f ctrl-b
f就是forword b就是backward

# 翻半页
ctrl-d ctlr-u
d=down u=up

# 滚一行
ctrl-e ctrl-y

zz 让光标所在的行居屏幕中央
zt 让光标所在的行居屏幕最上一行 t=top
zb 让光标所在的行居屏幕最下一行 b=bottom

# 查找
/string
# 向前（Forward）查找字符串string
# 按下回车后，光标就能跳到正确的地方

```

### 手动刷新 Let’s Encrypt 证书

```
sudo gitlab-ctl reconfigure
sudo gitlab-ctl renew-le-certs
```

## 参考文献

 - [GitLab Installation](https://about.gitlab.com/install/)
 - [WikiPedia/GitLab](https://en.wikipedia.org/wiki/GitLab)
 - [VIM中的翻页命令](https://blog.csdn.net/nyist327/article/details/48625385)
 - [VIM 查找文本](https://blog.csdn.net/hitustc/article/details/5585101)
 - [GitLab邮件配置](https://www.jianshu.com/p/b91d2e676cba)
 - [Git：gitlab修改域名配置](https://blog.csdn.net/qq_36937234/article/details/89381857)
 - [SSL Configuration](https://docs.gitlab.com/omnibus/settings/ssl.html)
 - [使用SSL证书保护GitLab服务器的方法](https://ywnz.com/linuxyffq/3961.html)

