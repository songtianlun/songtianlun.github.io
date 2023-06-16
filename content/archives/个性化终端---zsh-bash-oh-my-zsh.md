---
title: "个性化终端 | zsh bash oh-my-zsh"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "430"
date: "2020-08-15 12:09:00"
---

一直搞不清楚各类终端的区别，最近看到一张图描述的不错。

![http://imagehost-cdn.frytea.com/20200808163258.png](http://imagehost-cdn.frytea.com/20200808163258.png)

自己装虚拟机发现为什么自己的虚拟机默认sh这么丑，而且自动补全不好用，今天才发现原来看到很好看的终端默认sh是zsh，而非bash。

对于如今的绝大部分GNU/Linux（Debian系除外）和Mac OS X用户来说，系统默认的`/bin/sh`指向的是`bash`：

```jsx
$ file /bin/sh/bin/sh: symbolic link to `bash'
```

不妨试试用`zsh`来取代`bash`作为系统的`/bin/sh`：

```jsx
# ln -sf /bin/zsh /bin/sh
```

## 安装步骤

下面就来讲讲配置过程，以及个性化方法：

### 第一步，安装zsh并修改为默认shell

```jsx
sudo apt-get install zsh
chsh -s /bin/zsh
```

### 第二步，安装oh-my-zsh

```jsx
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 若不可用可查询官网
```

### 第三步，配置oh-my-zsh主题

```jsx
vim ~/.zshrc
```

修改其中的 `ZSH_THEME="robbyrussell"` ，根据你的喜好设置，比如：

`ys`

![https://imagehost-cdn.frytea.com/images/archives/20200815120758.png](https://imagehost-cdn.frytea.com/images/archives/20200815120758.png)

更多主题可以查阅官网：[https://github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

## 参考文献

- [在MAC下面有什么好用的终端工具？](https://www.zhihu.com/question/21865155)：[https://www.zhihu.com/question/21865155](https://www.zhihu.com/question/21865155)
- Ubuntu的终端美化：[https://www.jianshu.com/p/a0884732c8c1](https://www.jianshu.com/p/a0884732c8c1)
- Zsh和Bash究竟有何不同：[https://blog.csdn.net/lixinze779/article/details/81012318](https://blog.csdn.net/lixinze779/article/details/81012318)
- oh-my-zsh：[https://ohmyz.sh/](https://ohmyz.sh/)
- oh-my-zsh-theme：[https://github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)