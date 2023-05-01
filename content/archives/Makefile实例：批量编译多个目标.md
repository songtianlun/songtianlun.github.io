---
title: "Makefile实例：批量编译多个目标"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "467"
date: "2020-10-14 22:56:37"
---

gist: [https://gist.github.com/songtianlun/8984626fd80cd20b7c2e71f95caaf8d1](https://gist.github.com/songtianlun/8984626fd80cd20b7c2e71f95caaf8d1)


```
# Batch Single C file MakeFile

# 指定CPU架构 Architecture -> ARCH
ARCH ?= 
CC = $(ARCH)gcc
SUFFIX = .c
CFLAGS += -Wall -g
LD = 

CUR_SOURCE = $(wildcard *$(SUFFIX))
CUR_TARGETS = $(patsubst %$(SUFFIX), %, $(CUR_SOURCE))

all:$(CUR_TARGETS)

# %:%.c 是一个表示与目标相同 文件的模式变量 
$(CUR_TARGETS):%:%$(SUFFIX)
	$(CC) $< $(CFLAGS) -o $@ $(LD)

# 指定伪目标
.PHONY:clean all
	clean:
		-rm -rf $(TARGETS)
```


## 参考文献

- arch 这个词到底是什么意思？：[https://www.v2ex.com/t/389388](https://www.v2ex.com/t/389388)
- 玩转Makefile | 一次编译多个目标：[https://blog.csdn.net/yychuyu/article/details/79950414](https://blog.csdn.net/yychuyu/article/details/79950414)