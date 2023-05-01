---
title: "Mac 下解决 zsh: no matches found: postcss@^7"
categories: [ "技术" ]
tags: [ "MacBook","tailwindcss" ]
draft: false
slug: "554"
date: "2021-08-08 19:22:24"
---

mac开发引入 tailwindcss 库时遇到如下错误：

```bash
zsh: no matches found: postcss@^7
```

可以这样解决：

```bash
# 官网给出的命令如下
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@\^7 autoprefixer@\^9

# mac的zsh中需要这样，因为错误的 ^ 解析
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

## 参考文献

- [zsh: no matches found: HEAD^ #449](https://github.com/ohmyzsh/ohmyzsh/issues/449)
- [zsh: no matches found: postcss@^7 #3575](https://github.com/tailwindlabs/tailwindcss/discussions/3575)