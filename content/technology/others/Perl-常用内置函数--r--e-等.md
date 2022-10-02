---
title: "Perl 常用内置函数 -r -e 等"
categories: [ "编程开发" ]
tags: [ "Perl" ]
draft: false
slug: "617"
date: "2022-01-11 15:55:24"
---

```perl
-r: File is readable by effective uid/gid.
-w: File is writable by effective uid/gid.
-x: File is executable by effective uid/gid.
-o: File is owned by effective uid.

-R: File is readable by real uid/gid.
-W: File is writable by real uid/gid.
-X: File is executable by real uid/gid.
-O: File is owned by real uid.

-e: File exists.
-z: File has zero size (is empty).
-s: File has nonzero size (returns size in bytes).

-f: File is a plain file.
-d: File is a directory.
-l: File is a symbolic link.
-p: File is a named pipe (FIFO), or Filehandle is a pipe.
-S: File is a socket.
-b: File is a block special file.
-c: File is a character special file.
-t: Filehandle is opened to a tty.

-u: File has setuid bit set.
-g: File has setgid bit set.
-k: File has sticky bit set.

-T: File is an ASCII text file (heuristic guess).
-B: File is a "binary" file (opposite of -T).

-M: Script start time minus file modification time, in days.
-A: Same for access time.
-C: Same for inode change time (Unix, may differ for other platforms)
```

## 参考文献

- **[Alphabetical Listing of Perl Functions](https://perldoc.perl.org/perlfunc#Alphabetical-Listing-of-Perl-Functions)**
- [What does if( -f <filename> ) in Perl do?](https://stackoverflow.com/questions/6172957/what-does-if-f-filename-in-perl-do)
- [perl中 -e, -z, -s, -M, -A, -C, -r, -w, -x, -o, -f, -d , -l 含义](https://blog.csdn.net/qq_21478261/article/details/105399532)