---
title: "Perl 调试打印 HASH 内容"
date: 2021-12-23T14:15:45+08:00
description: "将 HASH 转换为 JSON 打印出来的思路。"
categories: ["技术笔记集","Linux 笔记集"]
tags: ["perl", "HASH"]
draft: true
---

在调试 Perl 程序时常常需要打印哈希表内容，虽然可以直接使用 `foreach` 打印，但数据复杂了就难办了，也可以使用 `Data::Dumper` 的方式打印，但貌似无法打到 `syslog` 中。

此时可以将 Hash 表转换为 json 文本再打印：

```perl
use JSON;

my $data = {'info'=> "test", 'struct' => {'test1'=>'test1', 'test2'=>'test2'}};
my $json = new JSON;
#$json->sort_by(sub { ncmp($JSON::PP::a, $JSON::PP::b) });
my $json_text = $json->pretty->encode ($data);
print $json_text;
```

如果没有 json 包需要安装一下：

```bash
cpan -i JSON
```

如果下载太慢，可以使用 tuna 提供的 cpan 国内镜像源：

```bash
# 若tuna cpan不在镜像列表中则将其加入列表首位
if ! (
    perl -MCPAN -e 'CPAN::HandleConfig->load();' \
        -e 'CPAN::HandleConfig->prettyprint("urllist")' |
    grep -qF 'https://mirrors.tuna.tsinghua.edu.cn/CPAN/'
); then
    perl -MCPAN -e 'CPAN::HandleConfig->load();' \
        -e 'CPAN::HandleConfig->edit("urllist", "unshift", "https://mirrors.tuna.tsinghua.edu.cn/CPAN/");' \
        -e 'CPAN::HandleConfig->commit()'
fi
```

测试一下，效果还可以：

```bash
$ perl -e 'use JSON;
> 
> my $data = {'info'=> "test", 'struct' => {'test1'=>'test1', 'test2'=>'test2'}};
> my $json = new JSON;
> #$json->sort_by(sub { ncmp($JSON::PP::a, $JSON::PP::b) });
> my $json_text = $json->pretty->encode ($data);
> print $json_text;'
{
   "struct" : {
      "test2" : "test2",
      "test1" : "test1"
   },
   "info" : "test"
}
```

## 参考文献

- [perl JSON与HASH 互相转换](https://blog.csdn.net/konglongaa/article/details/51557756)
- [CPAN 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CPAN/) By Tuna
- [How can I print the contents of a hash in Perl?](https://stackoverflow.com/questions/1162245/how-can-i-print-the-contents-of-a-hash-in-perl)