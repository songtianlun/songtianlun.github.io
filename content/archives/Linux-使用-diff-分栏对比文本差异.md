---
title: "Linux 使用 diff 分栏对比文本差异"
categories: [ "技术" ]
tags: [ "linux","diff" ]
draft: false
slug: "640"
date: "2022-11-02 10:19:00"
---

首先看一下帮助文档：

```bash
$ diff --help  
用法：diff [选项]... 文件列表  
逐行比较<各文件>。  
  
长选项的必需参数也是相应短选项的必需参数。  
     --normal                  以正常的 diff 方式输出 (默认)  
 -q, --brief                   只有在文件不同时报告  
 -s, --report-identical-files  当两个一样时仍然显示结果  
 -c, -C NUM, --context[=NUM]   同时输出 NUM 行（默认为 3 行）的复制上下文内容  
 -u, -U 数量, --unified[=数量] 输出 <数量>（默认为 3）行一致化上下文  
 -e, --ed                      以 ed script 方式输出  
 -n, --rcs                     以 RCS diff 格式输出  
 -y, --side-by-side            以两栏的格式输出  
 -W, --width=数量              每行显示最多 <数量>（默认 130）个字符  
     --left-column             当有两行相同时只显示左边栏的一行  
     --suppress-common-lines   当有两行相同时不显示  
  
 -p, --show-c-function         显示每个变更位于哪个 C 函数中  
 -F, --show-function-line=正则 显示匹配给定<正则>表达式的最近一行  
     --label 标签              使用给定<标签>替代文件名和时间戳  
                                 （可以重复）  
  
 -t, --expand-tabs             将输出中的 tab 转换成空格  
 -T, --initial-tab             每行先加上 tab 字符，使 tab 字符可以对齐  
     --tabsize=数字           TAB 格的宽度，默认为 8 个打印列宽  
     --suppress-blank-empty    在空的输出行之前去除空白或制表符  
 -l, --paginate                将输出送至 “pr” 指令来分页  
  
 -r, --recursive                 连同所有子目录一起比较  
     --no-dereference            不要跟随符号链接  
 -N, --new-file                  不存在的文件以空文件方式处理  
     --unidirectional-new-file   若第一文件不存在，以空文件处理  
     --ignore-file-name-case     忽略文件名大小写的区别  
     --no-ignore-file-name-case  不忽略文件名大小写的区别  
 -x, --exclude=模式              排除匹配 <模式> 的文件  
 -X, --exclude-from=文件         排除所有匹配在<文件>中列出的模式的文件  
 -S, --starting-file=文件        当比较目录時，由<文件>开始比较  
     --from-file=文件1           将<文件1>和操作数中的所有文件/目录作比较；  
                                   <文件1>可以是目录  
     --to-file=文件2             将操作数中的所有文件/目录和<文件2>作比较；  
                                   <文件2>可以是目录  
  
 -i, --ignore-case               忽略文件内容大小写的区别  
 -E, --ignore-tab-expansion      忽略由制表符宽度造成的差异  
 -Z, --ignore-trailing-space     忽略每行末端的空格  
 -b, --ignore-space-change       忽略由空格数不同造成的差异  
 -w, --ignore-all-space          忽略所有空格  
 -B, --ignore-blank-lines        忽略任何因空行而造成的差异  
 -I, --ignore-matching-lines=正则 若某行完全匹配 <正则>，则忽略由该行造成的差异  
  
 -a, --text                      所有文件都以文本方式处理  
     --strip-trailing-cr         去除输入内容每行末端的回车（CR）字符  
  
 -D, --ifdef=名称                输出的内容以 ‘#ifdef <名称>’ 方式标明差异  
     --GTYPE-group-format=GFMT   以 GFMT 格式处理 GTYPE 输入行组  
     --line-format=LFMT          以 LFMT 格式处理每一行资料  
     --LTYPE-line-format=LFMT    以 LFMT 格式处理 LTYPE 输入的行  
   这些格式化选项提供对 diff 输出的精细控制，从而泛化 -D/--ifdef。  
   LTYPE 可以是 “old”、“new” 或 “unchanged”。GTYPE 可以是 LTYPE 的选择  
   或是 “changed”。  
   （仅）GFMT 可包括：  
     %<  该组中每行属于<文件1>的差异  
     %>  该组中每行属于<文件2>的差异  
     %=  该组中同时在<文件1>和<文件2>出现的每一行  
     %[-][宽度][.[精确度]]{doxX}字符  以 printf 格式表示该<字符>代表的内容  
       大写<字符>表示属于新的文件，小写表示属于旧的文件。<字符>的意义如下：  
         F  行组中第一行的行号  
         L  行组中最后一行的行号  
         N  行数 ( =L-F+1 )  
         E  F-1  
         M  L+1  
     %(A=B?T:E)  如果 A 等于 B 那么 T 否则 E  
   （仅）LFMT 可包括：  
     %L  该行的内容  
     %l  该行的内容，但不包括结束的换行符  
     %[-][宽度][.[精确度]]{doxX}n  以 printf 格式表示的输入行号  
   GFMT 或 LFMT 都可包括：  
     %%        %  
     %c'C'     单个字符 C  
     %c'\OOO'  八进制码 OOO 所代表的字符  
     C         字符 C（处上述转义外的其他字符代表它们自身）  
  
 -d, --minimal            尽可能找出最小的差异集  
     --horizon-lines=数量 保持指定行数的一致前后缀  
     --speed-large-files  假设文件十分大而且文件中含有许多微小的差异  
     --color[=何时]       给输出上色；“何时”可以是“never”（从不）、  
                            “always”（总是）或“auto”（自动，默认）；  
                            仅指定 --color 与 --color='auto' 效果相同  
     --palette=调色板     在 --color 选项启用时使用的颜色；<调色板>参数应当是  
                            一个冒号分隔的列表以提供 terminfo capabilities 信息  
  
     --help               显示此帮助信息并退出  
 -v, --version            输出版本信息并退出  
  
 <文件列表> 的格式可以是“文件1 文件2”、“目录1 目录2”、“目录 文件”或  
     “文件 目录”。  
如果使用 --from-file 或 --to-file 选项，<文件名> 的格式则不受限制。  
如果 FILE 是 “-”，则由标准输入读取内容。  
如果输入相同，则退出状态为 0；1 表示输入不同；2 表示有错误产生。  
  
报告程序错误到: bug-diffutils@gnu.org  
报告翻译错误到: https://translationproject.org/teams/zh_CN.html  
GNU diffutils 主页: <https://www.gnu.org/software/diffutils/>  
使用 GNU 软件的通用帮助：<https://www.gnu.org/gethelp/>
```
用的时候可以横排查看不同的地方：

```bash
$ diff pmxcfs.kylin.e pmxcfs.debian10.e -y -W 180
```

使用 `-y` 表示两列查看，使用 `-W` 设定宽度，这样就可以在终端里分栏查看文件差异：

![](https://imagehost-cdn.frytea.com/images/2022/11/02/2022110210198428d258fd9fcf77fbc.png)

## 参考文献

- [Linux diff 命令](https://www.runoob.com/linux/linux-comm-diff.html)
