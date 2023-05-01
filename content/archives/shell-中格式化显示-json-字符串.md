---
title: "shell 中格式化显示 json 字符串"
categories: [ "技术" ]
tags: [ "json","python","shell" ]
draft: false
slug: "629"
date: "2022-04-20 10:11:00"
---


有时需要在终端环境中查看 json 数据，比如使用 `curl`  调试接口时。直接看到的 json 数据是类似这样的：

```bash
$ echo '{"foo": "lorem", "bar": "ipsum"}'
{"foo": "lorem", "bar": "ipsum"}
```


如果想要以更直观的方式格式化显示 json 数据，可以利用 `python3` 提供的标准库 `json` 来实现：

```bash
$ echo '{"foo": "lorem", "bar": "ipsum"}' | python3 -m json.tool
{
    "foo": "lorem",
    "bar": "ipsum"
}
```

为了更方便地使用这一工具，可以为它设置一个别名：

将下面内容写入 `~/.bashrc` 或其他您的 shell 配置文件中：

```
alias pjson='python3 -m json.tool'
```

执行 `source ~/.bashrc`

之后在该 shell 下就可以这样用了：

```bash
$ echo '{"foo": "lorem", "bar": "ipsum"}' | pjson
{
    "foo": "lorem",
    "bar": "ipsum"
}
```

## 参考文献
-  [How can I pretty-print JSON in a shell script?](https://stackoverflow.com/questions/352098/how-can-i-pretty-print-json-in-a-shell-script)
-  [`json`](https://docs.python.org/zh-cn/3/library/json.html#module-json "json: Encode and decode the JSON format.") --- JSON 编码和解码器 By Python