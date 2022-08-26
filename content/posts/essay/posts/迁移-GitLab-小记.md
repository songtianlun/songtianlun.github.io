---
title: "迁移 GitLab 小记"
categories: [ "技术价值" ]
tags: [ "GitLab" ]
draft: false
slug: "310"
date: "2020-02-06 19:30:00"
---

由于服务器到期等因素，需要对 GitLab 进行迁移，在此记下一段历程。

首先要保证迁入和迁出 GitLab 的版本是一致的，使用这一条指令：

```
cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
```

我的两个服务器输出分别是：

```
# 迁入服务器
$ cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
12.7.5-ee
# 迁出服务器
$ cat /opt/gitlab/embedded/service/gitlab-rails/VERSION
12.5.2-ee
```

## 升级 GitLab

因此需要对服务器进行升级。

我采用的安装方法是 `Omnibus`, 采用官网推荐的方式进行升级：

```
# Debian/Ubuntu
sudo apt-get update
sudo apt-get install gitlab-ce

# Centos/RHEL
sudo yum install gitlab-ce

# 如果是 ee就修改为 ee
```

其他升级方式可以来这里看：[Updating GitLab installed with the Omnibus GitLab package](https://docs.gitlab.com/omnibus/update/README.html)

## 打备份包

我采用的安装方法是 `Omnibus`, 采用官网推荐的方式进行打包：[Creating a backup of the GitLab system](https://docs.gitlab.com/ee/raketasks/backup_restore.html#creating-a-backup-of-the-gitlab-system)

```
$ sudo gitlab-backup create
2020-02-06 10:23:21 +0000 -- Dumping database ...
Dumping PostgreSQL database gitlabhq_production ... [DONE]
2020-02-06 10:23:23 +0000 -- done
2020-02-06 10:23:23 +0000 -- Dumping repositories ...
 * songtianlun/journal (@hashed/6b/86/6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b) ... [SKIPPED]
[SKIPPED] Wiki
 * songtianlun/Frytea-Timeline (@hashed/d4/73/d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/haut-gis-org-github-io (@hashed/4e/07/4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/frytea-docs (@hashed/ef/2d/ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/gatsby-starter-gine-blog (@hashed/e7/f6/e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/frytea-docs-ex (@hashed/79/02/7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Frytea-DataShare (@hashed/2c/62/2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/markmap (@hashed/19/58/19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Gis-SoDev-Expriment (@hashed/4a/44/4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/jenkins-android-sample (@hashed/4f/c8/4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Markdown-Syntax-CN (@hashed/6b/51/6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/hexo-blog (@hashed/85/27/8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Flash-Light (@hashed/e6/29/e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Image-Hosting (@hashed/45/23/4523540f1504cd17100c4835e85b7eefd49911580f8efff0599a8f283be6b9e3) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/vue_vue2leaflet (@hashed/4e/c9/4ec9599fc203d176a301536c2e091a19bc852759b255bd6818810a42c5fed14a) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/home-forward (@hashed/94/00/9400f1b21cb527d7fa3d3eabba93557a18ebe7a2ca4e471cfe5e4c5b4ca7f767) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/nodeppt (@hashed/f5/ca/f5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/PathManager (@hashed/6f/4b/6f4b6612125fb3a0daecd2799dfd6c9c299424fd920f9b308110a2c1fbd8f443) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/perpetual-config (@hashed/78/5f/785f3ec7eb32f30b90cd0fcf3657d388b5ff4297f2f9716ff66e9b69c05ddd09) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/PathManager-Site (@hashed/53/5f/535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/CuteOneP (@hashed/c2/35/c2356069e9d1e79ca924378153cfbbfb4d4416b1f99d41a2940bfdb66c5319db) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Education-manage-system (@hashed/b7/a5/b7a56873cd771f2c446d369b649430b65a756ba278ff97ec81bb6f55b2e73569) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/PL-indoor-RouteAnalyser (@hashed/5f/9c/5f9c4ab08cac7457e9111a30e4664920607ea2c115a1433d7be98e97e64244ca) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/ResumeSample (@hashed/67/06/670671cd97404156226e507973f2ab8330d3022ca96e0c93bdbdb320c41adcaf) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/programmer-url-navigation (@hashed/59/e1/59e19706d51d39f66711c2653cd7eb1291c94d9b55eb14bda74ce4dc636d015a) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/putianxi-github-io (@hashed/35/13/35135aaa6cc23891b40cb3f378c53a17a1127210ce60e125ccf03efcfdaec458) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/ci-matters (@hashed/62/4b/624b60c58c9d8bfb6ff1886c2fd605d2adeb6ea4da576068201b6c6958ce93f4) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/coding-interview-university (@hashed/eb/1e/eb1e33e8a81b697b75855af6bfcdbcbf7cbbde9f94962ceaec1ed8af21f5a50f) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/zhongguojinxiandaishishijianzhou (@hashed/e2/9c/e29c9c180c6279b0b02abd6a1801c7c04082cf486ec027aa13515e4f3884bb6b) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Web-Demo (@hashed/c6/f3/c6f3ac57944a531490cd39902d0f777715fd005efac9a30622d5f5205e7f6894) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/WebGis-SIC-Dev-Experiment (@hashed/86/e5/86e50149658661312a9e0b35558d84f6c6d3da797f552a9657fe0558ca40cdef) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/Small-Supermarket-manager-system (@hashed/9f/14/9f14025af0065b30e47e23ebb3b491d39ae8ed17d33739e5ff3827ffb3634953) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/sou (@hashed/76/a5/76a50887d8f1c2e9301755428990ad81479ee21c25b43215cf524541e0503269) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/songtianlun.pages.frytea.com (@hashed/7a/61/7a61b53701befdae0eeeffaecc73f14e20b537bb0f8b91ad7c2936dc63562b25) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/setup-node (@hashed/ae/a9/aea92132c4cbeb263e6ac2bf6c183b5d81737f179f21efdc5863739672f0f470) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/trajectory-community (@hashed/0b/91/0b918943df0962bc7a1824c0555a389347b4febdc7cf9d1254406d80ce44e3f9) ... [SKIPPED]
[SKIPPED] Wiki
 * songtianlun/gis-changchun-info-vue (@hashed/d5/9e/d59eced1ded07f84c145592f65bdf854358e009c5cd705f5215bf18697fed103) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/PlanAssistant (@hashed/3d/91/3d914f9348c9cc0ff8a79716700b9fcd4d2f3e711608004eb8f138bcba7f14d9) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/materialistic (@hashed/71/ee/71ee45a3c0db9a9865f7313dd3372cf60dca6479d46261f3542eb9346e4a04d6) ... [DONE]
[SKIPPED] Wiki
 * songtianlun/android-example (@hashed/81/17/811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c) ... [DONE]
[SKIPPED] Wiki
2020-02-06 10:23:46 +0000 -- done
2020-02-06 10:23:46 +0000 -- Dumping uploads ...
2020-02-06 10:23:47 +0000 -- done
2020-02-06 10:23:47 +0000 -- Dumping builds ...
2020-02-06 10:23:47 +0000 -- done
2020-02-06 10:23:47 +0000 -- Dumping artifacts ...
2020-02-06 10:23:50 +0000 -- done
2020-02-06 10:23:50 +0000 -- Dumping pages ...
2020-02-06 10:23:51 +0000 -- done
2020-02-06 10:23:51 +0000 -- Dumping lfs objects ...
2020-02-06 10:23:51 +0000 -- done
2020-02-06 10:23:51 +0000 -- Dumping container registry images ...
2020-02-06 10:23:51 +0000 -- [DISABLED]
Creating backup archive: 1580984631_2020_02_06_12.7.5-ee_gitlab_backup.tar ... done
Uploading backup archive to remote storage  ... skipped
Deleting tmp directories ... done
done
done
done
done
done
done
done
Deleting old backups ... skipping
Warning: Your gitlab.rb and gitlab-secrets.json files contain sensitive data
and are not included in this backup. You will need these files to restore a backup.
Please back them up manually.
Backup task is done.
```

完成后就已经对 GitLab 整个系统备份到 `/var/opt/gitlab/backups`，根据官网除了打包还需要备份以下两个文件：

- `/etc/gitlab/gitlab-secrets.json`
- `/etc/gitlab/gitlab.rb`

因此将这个两个文件也拷入 `backups` 文件夹，以便后面打包迁移：

```
cp /etc/gitlab/gitlab-secrets.json /var/opt/gitlab/backups/gitlab-secrets.json
cp /etc/gitlab/gitlab.rb /var/opt/gitlab/backups/gitlab.rb
```

完成后看一下 `/var/opt/gitlab/backups` 文件夹中就是我们需要迁移走的所有文件啦

```
$ ls
1580984631_2020_02_06_12.7.5-ee_gitlab_backup.tar  gitlab.rb  gitlab-secrets.json
```

对它进行打包：

```
# 打包后，以 gzip 压缩
$ tar -zcvf /tmp/gitlab.2020.2.6.backups.tar.gz /var/opt/gitlab/backups
tar: Removing leading `/' from member names
/var/opt/gitlab/backups/
/var/opt/gitlab/backups/gitlab.rb
/var/opt/gitlab/backups/1580984631_2020_02_06_12.7.5-ee_gitlab_backup.tar
/var/opt/gitlab/backups/gitlab-secrets.json
```

## 安装 阿里云 ossutils 工具

在这里使用阿里云 oss 做中转，你也可使用其他方式将压缩包传入待转入服务器。

首先安装：

```
# 下载工具：
$ wget http://gosspublic.alicdn.com/ossutil/1.6.10/ossutil64                           

# 修改文件执行权限：
$ chmod 755 ossutil64

# 使用交互式配置生成配置文件：
$ ./ossutil64 config
请输入配置文件名，文件名可以带路径（默认为：/home/user/.ossutilconfig，回车将使用默认路径。如果用户设置为其它路径，在使用命令时需要将--config-file选项设置为该路径）：
未输入配置文件路径，将使用默认配置文件：/home/user/.ossutilconfig。
对于下述配置，回车将跳过相关配置项的设置，配置项的具体含义，请使用"help config"命令查看。
请输入endpoint：http://oss-cn-shenzhen.aliyuncs.com
请输入accessKeyID：yourAccessKeyID
请输入accessKeySecret：yourAccessKeySecret
请输入stsToken：
```

使用命令查看 endpoint,

```
$ ./ossutil64 ls
CreationTime                                 Region    StorageClass    BucketName
2020-02-06 06:06:37 +0000 UTC        oss-cn-beijing        Standard    oss://frytea-temporary
2019-01-12 01:59:01 +0000 UTC        oss-cn-beijing        Standard    oss://mywebsites
2019-11-12 06:47:12 +0000 UTC       oss-cn-shenzhen        Standard    oss://onedrive-index
Bucket Number is: 3

0.298487(s) elapsed
```

上传

```
$ ./ossutil64 cp /tmp/gitlab.2020.2.6.backups.tar.gz oss://frytea-temporary/gitlab/
Succeed: Total num: 1, size: 558,098,855. OK num: 1(upload 1 files).                                        

150.496710(s) elapsed
```

接下来来到待迁入服务器，同样执行  `安装 ` 之后进行下载：

```
$ ./ossutil64 cp oss://frytea-temporary/gitlab/gitlab.2020.2.6.backups.tar.gz ~
Succeed: Total num: 1, size: 558,098,855. OK num: 1(download 1 objects).                                     

10.706132(s) elapsed
```

在这类迁入服务器是阿里云服务器，因此下载速度很快。

## 还原备份

首先将下载好的文件夹解压：

```
$ tar -zxvf gitlab.2020.2.6.backups.tar.gz
var/opt/gitlab/backups/
var/opt/gitlab/backups/gitlab.rb
var/opt/gitlab/backups/1580984631_2020_02_06_12.7.5-ee_gitlab_backup.tar
var/opt/gitlab/backups/gitlab-secrets.json
```

压缩时保留了原有目录结构。

将备份文件拷入迁入服务器的 `/var/opt/gitlab/backups/` 文件夹：

```
mv ~/var/opt/gitlab/backups/1580984631_2020_02_06_12.7.5-ee_gitlab_backup.tar /var/opt/gitlab/backups/
```

下面停止 GitLab 中于数据库交换数据的 服务：

```
$ sudo gitlab-ctl stop unicorn
ok: down: unicorn: 3188s, normally up
$ sudo gitlab-ctl stop puma
$ sudo gitlab-ctl stop sidekiq
ok: down: sidekiq: 3186s, normally up
$ sudo gitlab-ctl status
run: alertmanager: (pid 23730) 4249s; run: log: (pid 23210) 4343s
run: gitaly: (pid 23585) 4252s; run: log: (pid 22585) 4451s
run: gitlab-exporter: (pid 23620) 4251s; run: log: (pid 23064) 4359s
run: gitlab-workhorse: (pid 23569) 4253s; run: log: (pid 22926) 4386s
run: grafana: (pid 23750) 4248s; run: log: (pid 23407) 4296s
run: logrotate: (pid 28170) 780s; run: log: (pid 22977) 4379s
run: nginx: (pid 23409) 4295s; run: log: (pid 22937) 4384s
run: node-exporter: (pid 23603) 4252s; run: log: (pid 23035) 4367s
run: postgres-exporter: (pid 23741) 4249s; run: log: (pid 23245) 4337s
run: postgresql: (pid 22682) 4446s; run: log: (pid 22731) 4443s
run: prometheus: (pid 23636) 4250s; run: log: (pid 23143) 4349s
run: redis: (pid 22520) 4458s; run: log: (pid 22535) 4457s
run: redis-exporter: (pid 23623) 4251s; run: log: (pid 23091) 4355s
run: registry: (pid 23578) 4252s; run: log: (pid 23018) 4371s
down: sidekiq: 3188s, normally up; run: log: (pid 22891) 4390s
down: unicorn: 3195s, normally up; run: log: (pid 22877) 4397s
```

恢复备份：

```
$ sudo gitlab-backup restore BACKUP=1580984631_2020_02_06_12.7.5-ee
# 这里去掉备份名字的_gitlab_backup.tar
# 以下是输出
Transfering ownership of /var/opt/gitlab/gitlab-rails/shared/registry to git:git
Unpacking backup ... done
Before restoring the database, we will remove all existing
tables to avoid future upgrade problems. Be aware that if you have
custom tables in the GitLab database these tables and all data will be
removed.

Do you want to continue (yes/no)? yes
Removing all tables. Press `Ctrl-C` within 5 seconds to abort
2020-02-06 18:47:41 +0800 -- Cleaning the database ...
2020-02-06 18:47:42 +0800 -- done
2020-02-06 18:47:42 +0800 -- Restoring database ...
Restoring PostgreSQL database gitlabhq_production ... SET
...
rake aborted!
Errno::ENOENT: No such file or directory - /var/opt/gitlab/backups/registry.tar.gz
/opt/gitlab/embedded/service/gitlab-rails/lib/backup/files.rb:76:in `run_pipeline!'
/opt/gitlab/embedded/service/gitlab-rails/lib/backup/files.rb:44:in `restore'
/opt/gitlab/embedded/service/gitlab-rails/lib/tasks/gitlab/backup.rake:234:in `block (4 levels) in <top (required)>'
/opt/gitlab/embedded/service/gitlab-rails/lib/tasks/gitlab/backup.rake:71:in `block (3 levels) in <top (required)>'
/opt/gitlab/embedded/bin/bundle:23:in `load'
/opt/gitlab/embedded/bin/bundle:23:in `<main>'
Tasks: TOP => gitlab:backup:registry:restore
(See full trace by running task with --trace)
Transfering ownership of /var/opt/gitlab/gitlab-rails/shared/registry to registry:registry
```

将之前备份的另外两个文件迁入：

```
mv /etc/gitlab/gitlab-secrets.json /etc/gitlab/gitlab-secrets.json.2020.2.6.backup
mv /etc/gitlab/gitlab.rb /etc/gitlab/gitlab.rb.2020.2.6.backup
mv ~/var/opt/gitlab/backups/gitlab-secrets.json /etc/gitlab/gitlab-secrets.json
mv ~/var/opt/gitlab/backups/gitlab.rb /etc/gitlab/gitlab.rb
```
重启 GitLab

```
sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-rake gitlab:check SANITIZE=true
```

完成！



## 参考文献

- [如何查看 GitLab 版本号](https://blog.csdn.net/wo18237095579/article/details/81106150)
- [Updating GitLab installed with the Omnibus GitLab package](https://docs.gitlab.com/omnibus/update/README.html)
- [Backing up and restoring GitLab](https://docs.gitlab.com/ee/raketasks/backup_restore.html#restore-for-omnibus-gitlab-installations)
- [gitlab迁移](https://zhuanlan.zhihu.com/p/71958507)
- [Linux下的解压命令小结](https://www.cnblogs.com/cursorhu/p/5891699.html)
- [Linux tar打包命令](https://blog.csdn.net/shenyunsese/article/details/22798235)
- [对象存储 OSS > 常用工具 > 命令行工具ossutil > 下载和安装](https://help.aliyun.com/document_detail/120075.html?spm=a2c4g.11186623.6.698.4f072e69CcXU6K)
