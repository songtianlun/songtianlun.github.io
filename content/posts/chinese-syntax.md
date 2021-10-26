---
title: "中文 Markdown 渲染测试"
date: 2021-10-24T19:16:52+08:00
description: "中文 markdown 测试文档，希望一切安好。"
draft: true
---

这篇文档是用于测试中文 Markdown 渲染效果的。

## 标题

# 这是一级标题

## 这是二级标题

### 这是三级标题

#### 这是四级标题

##### 这是五级标题

###### 这是六级标题

## 引用

Blockquote 元素表示从其他来源引用的内容，可以选择使用一个引用，引用必须在“ footer”或“ cite”元素中，也可以选择使用内行更改，如注释和缩写。

### 没有署名的引用块

> 这是一段随便敲的文字。
> 
> **注意**  ，你可以在一个区块引用中使用 _Markdown 语法_ 。

### 带有署名的引用块

> 不要通过共享内存来交流，而是通过交流来共享内存。
>
> — <cite>Rob Pike[^1]</cite>

[^1]: 以上引用摘自 Rob Pike 在 Gopherfest 节日期间的 [谈话](https://www.youtube.com/watch?v=PAAkCSZUG1c) , November 18, 2015.

## 表格

表格并不是 Markdown 规范的核心部分，但是 Hugo 支持开箱即用。

| Name  | Age | Name  | Age | Name  | Age | Name  | Age | Name  | Age |
| ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- |
| Bob   | 27  | Bob   | 27  | Bob   | 27  | Bob   | 27  | Bob   | 27  |
| Alice | 23  | Alice | 23  | Alice | 23  | Alice | 23  | Alice | 23  |

### 表内嵌 Markdown

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## 代码块

### 带回标的代码块

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Example HTML5 Document</title>
    </head>
    <body>
        <p>Test</p>
    </body>
</html>
```

## 列表类型

### 有序列表

1. First item
2. Second item
3. Third item

### 无序列表

-   List item
-   Another item
-   And another item


### 嵌套列表

-   Fruit
    -   Apple
    -   Orange
    -   Banana
-   Dairy
    -   Milk
    -   Cheese

## 其他元素 — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.