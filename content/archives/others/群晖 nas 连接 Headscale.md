---
title: '群晖 nas 连接 Headscale'
date: '2023-05-11T09:42:54.576Z'
tags: ['Headscale', 'Synology']
created: '2023-05-11T09:42:01.067Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '0'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 23:05, 27th 五月 2023 -->

# 群晖 nas 连接 Headscale

```bash
tailscale up --reset --login-server https://headscale.mydomain.com --authkey ... --accept-routes
```

## References

* [How to connect Synology NAS to Headscale](https://techoverflow.net/2022/03/26/how-to-connect-synology-nas-to-headscale/)