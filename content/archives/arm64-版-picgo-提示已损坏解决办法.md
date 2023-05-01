---
title: "arm64 版 picgo 提示已损坏解决办法"
categories: [ "技术" ]
tags: [ "picgo" ]
draft: false
slug: "739"
date: "2023-02-09 22:31:00"
---

[PicGo](https://github.com/Molunerfinn/PicGo) 是一款很好用的图床辅助软件，一直在使用。

最新下载最新版的 picGo arm64 版安装，提示已损坏，执行以下命令解决：

```bash
sudo xattr -d com.apple.quarantine "/Applications/PicGo.app"
```

参考

  - https://github.com/1zilc/fishing-funds/issues/149#issuecomment-928044197
  - https://github.com/Molunerfinn/PicGo/issues/1055

