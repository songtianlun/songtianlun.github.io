---
title: "Vim第五讲 内部命令、另存、部分保存、插入文件"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "395"
date: "2020-07-03 18:06:20"
---

## 5.1 在 VIM 内执行外部命令的方法

```bash
** 输入 :! 然后紧接着输入一个外部命令可以执行该外部命令。**
```

1. 按下我们所熟悉的 `:` 命令使光标移动到屏幕底部。这样您就可以输入一行命令了。
2. 接着输入感叹号 `!` 这个字符，这样就允许您执行外部的 shell 命令了。
3. 我们以 `ls` 命令为例。输入 `!ls <回车>` 。该命令就会列举出您当前目录的
内容，就如同您在命令行提示符下输入 `ls` 命令的结果一样。如果 `!ls` 没起
作用，您可以试试 `:!dir` 看看。

提示：所有的外部命令都可以以这种方式执行，包括带命令行参数的那些。

提示：所有的 `:` 命令都必须以敲 `<回车>` 键结束。从今以后我们就不会总是提到这一点
了。

## 5.2 关于保存文件的更多信息

```bash
** 要将对文件的改动保存到文件中，请输入 :w FILENAME 。**
```

1. 输入 `:!dir` 或者 `:!ls` 获知当前目录的内容。您应当已知道最后还得敲
`<回车>` 吧。
2. 选择一个未被用到的文件名，比如 `TEST`。
3. 接着输入 `:w TEST` (此处 `TEST` 是您所选择的文件名。)
4. 该命令会以 `TEST` 为文件名保存整个文件 (Vim 教程)。为了验证这一点，
请再次输入 `:!dir` 或 `:!ls` 查看您的目录列表内容。

请注意：如果您退出 Vim 然后在以命令 `vim TEST` 再次启动 Vim，那么该文件内
容应该同您保存时的文件内容是完全一样的。

1. 现在您可以删除 TEST 文件了。

在 `MS-DOS` 下，请输入： `:!del TEST`
在 `Unix` 下，请输入： `:!rm TEST`

## 5.3 一个具有选择性的保存命令

```bash
** 要保存文件的部分内容，请输入 v motion :w FILENAME **
```

1. 移动光标到本行。
2. 接着按 `v` 键，将光标移动至下面第五个条目上。您会注意到之间的文本被高亮了。
3. 然后按 `:` 字符。您将看到屏幕底部会出现 `:'<,'>` 。
4. 现在请输入 `w TEST` ，其中 `TEST` 是一个未被使用的文件名。确认您看到了
`:'<,'>w TEST` 之后按 `<回车>` 键。
5. 这时 Vim 会把选中的行写入到以 TEST 命名的文件中去。使用 `:!dir` 或 `:!ls`
确认文件被正确保存。这次先别删除它！我们在下一讲中会用到它。

提示：按 `v` 键使 `Vim` 进入可视模式进行选取。您可以四处移动光标使选取区域变大或
变小。接着您可以使用一个操作符对选中文本进行操作。例如，按 `d` 键会删除
选中的文本内容。

## 5.4 提取和合并文件

```bash
   ** 要向当前文件中插入另外的文件的内容，请输入 :r FILENAME **
```

1. 通过命令 `:r TEST` 将前面创建的名为 TEST 的文件提取进来。
您所提取进来的文件将从光标所在位置处开始置入。
2. 为了确认文件已经提取成功，移动光标回到原来的位置就可以注意有两份第
五讲第三节的内容，一份是原始内容，另外一份是来自文件的副本。

提示：您还可以读取外部命令的输出。例如， `:r !ls` 可以读取 `ls` 命令的输出，并
把它放置在光标下面。

## 总结

1. `:!command` 用于执行一个外部命令 command。

    请看一些实际例子：
    (MS-DOS) (Unix)
    `:!dir` `:!ls` - 用于显示当前目录的内容。
    `:!del FILENAME` `:!rm FILENAME` - 用于删除名为 FILENAME 的文件。

2. `:w FILENAME` 可将当前 VIM 中正在编辑的文件保存到名为 FILENAME 的文
件中。
3. `v motion :w FILENAME` 可将当前编辑文件中可视模式下选中的内容保存到文件
FILENAME 中。
4. `:r FILENAME` 可提取磁盘文件 FILENAME 并将其插入到当前文件的光标位置
后面。
5. `:r !dir` 可以读取 `dir` 命令的输出并将其放置到当前文件的光标位置后面。