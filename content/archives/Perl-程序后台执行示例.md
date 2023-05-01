---
title: "Perl 程序后台执行示例"
categories: [ "技术" ]
tags: [ "Perl" ]
draft: false
slug: "563"
date: "2021-08-26 11:51:48"
---

最近阅读 PVE 源码发现一处源码这样使用了 `fork()` 方法：

```perl
$spid = fork();
	if (!defined ($spid)) {
	    die "can't put server into background - fork failed";
	} elsif ($spid) { # parent
	    exit (0);
	}
```

自己写示例发现这种方法可以使程序进入后台执行状态，大概原理是 **fork 子进程，退出主进程，使得程序被 1 号父进程接管，在终端表现则是进入了后台执行状态**。

以下是实例代码：

```perl
#!/usr/bin/perl

sub mainThread() {
    print "---------- Main Thread! ------------\n";
    $spid = fork();
    if (!defined ($spid)) {
        die "can't put server into background - fork failed";
    } elsif ($spid) { # parent
        exit (0);
    }
    for(;;)
    {
        print "Hello, world in main thread!\n";
        sleep 1;
    }
}

mainThread();
```

看下进程状态：

![https://imagehost-cdn.frytea.com/images/2021/08/26/_1629948977368e83558ffb3dfcdb2.png](https://imagehost-cdn.frytea.com/images/2021/08/26/_1629948977368e83558ffb3dfcdb2.png)

退出程序则是指定 PID 即可：

```bash
$ kill -9 3300
```

## 参考文献

- [functions / exit (source, CPAN)](https://perldoc.perl.org/functions/exit)
- [functions / fork (source, CPAN)](https://perldoc.perl.org/functions/fork)
- [在linux中如何关闭或者停用守护进程](https://bbs.csdn.net/topics/270083776)
- [关于perl中Exit的函数使用](https://blog.csdn.net/gan690416372/article/details/5172883)
- [Linux中的程序和进程，PID和PPID](https://blog.csdn.net/sinat_25457161/article/details/48596797)