---
title: 'go 闭包函数问题'
date: '2023-08-19T04:16:49.275Z'
tags: ['GO']
created: '2023-07-25T06:34:49.825Z'
creator: 'songtianlun'
modifier: 'songtianlun'
type: 'text/vnd.tiddlywiki'
bag: 'default'
revision: '1'
---

<!-- Exported from TiddlyWiki at 12:16, 19th 八月 2023 -->

# go 闭包函数问题

在 Go 里，闭包里的变量会被**共享**使用，这就意味着当你在运行闭包函数的时候，函数中使用的变量其实是循环的最后一次改变后的值。

为了理解上面这段话，给出一段测试程序：

```go
package main

import "fmt"

func main() {
    data := []string{"one","two","three"}

    // 非正确的捕获方式
    wrongFunctions := make([]func(), 0, 3)
    for _, v := range data {
        wrongFunctions = append(wrongFunctions, func() {
            fmt.Println(v)
        })
    }

    for _, wrongFunc := range wrongFunctions {
        wrongFunc() // 输出 three three three，而不是期望的 one two three
    }

    // 正确的捕获方式
    correctFunctions := make([]func(), 0, 3)
    for _, v := range data {
        value := v // 将值复制到了函数的每个局部版本
        correctFunctions = append(correctFunctions, func() {
            fmt.Println(value)
        })
    }

    for _, correctFunc := range correctFunctions {
        correctFunc() // 输出 one two three
    }
}
```

运行上述程序输出如下：

```bash
go run main.go
three
three
three
one
two
three
```

问题和解决方案也就很清晰了。