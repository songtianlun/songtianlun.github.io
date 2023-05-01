---
title: "linux grep 过滤多个单词"
categories: [ "技术" ]
tags: [ "linux","Bash" ]
draft: false
slug: "636"
date: "2022-10-31 17:49:00"
---

有时会需要使用 grep 做多关键词匹配，这里给出集中方法，简单记录：

```bash
grep 'word1\|word2\|word3' /path/to/file
### Search all text files ###
$ grep 'word*' *.txt
### Search all python files for 'wordA' or 'wordB' ###
$ grep 'wordA*'\''wordB' *.py
$ grep -E 'word1|word2' *.doc
$ grep -e string1 -e string2 *.pl
$ grep -E "word1|word2" *.c
### Show all the lines that do not match given pattern/words/strings ###
$ grep -v 'bar\|foo' /dir1/dir2/file1
$ grep -E -v 'pattern1|pattern2' /path/to/file
```

## 参考文献

- [How To Search Multiple Words / String Pattern Using grep Command on Bash shell](https://www.cyberciti.biz/faq/searching-multiple-words-string-using-grep/)