---
title: "[编程题]minimum-depth-of-binary-tree"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "317"
date: "2020-02-23 18:18:00"
---

## 题目来源

- [牛客网首页 > 试题广场 > minimum-depth-of-binary-tree](https://www.nowcoder.com/questionTerminal/e08819cfdeb34985a8de9c4e6562e724?f=discussion)

> 时间限制：C/C++ 1秒，其他语言2秒空间限制：C/C++ 32M，其他语言64M

## 题目描述

求给定二叉树的最小深度。最小深度是指树的根结点到最近叶子结点的最短路径上结点的数量。
Given a binary tree, find its minimum depth.The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

## 解题思路

- 递归，若为空树返回0；
- 若左子树为空，则返回右子树的最小深度+1；（加1是因为要加上根这一层，下同）
- 若右子树为空，则返回左子树的最小深度+1；
- 若左右子树均不为空，则取左、右子树最小深度的较小值，+1；

> 来自 [@Msean](https://www.nowcoder.com/profile/231467)

- C++11，其中有一个是新的关键字nullptr, 如果我们的编译器是支持nullptr的话，那么我们应该直接使用nullptr来替代NULL的宏定义。正常使用过程中他们是完全等价的。

## 参考代码

```cpp
// 运行时间：12ms
// 占用内存：1024k

class Solution {
public:
    int run(TreeNode *root) {
        if(root == nullptr) return 0;
        if(root->left == nullptr) return run(root->right)+1;
        if(root->right == nullptr) return run(root->left)+1;
        int leftDepth = run(root->left);
        int rightDepth = run(root->right);
        return (leftDepth<rightDepth)?(leftDepth+1):(rightDepth+1);
    }
};

```

## 参考文献

- [null和NULL和nullptr和””区别](https://blog.csdn.net/cc1949/article/details/51249555)
- [什么是二叉树，二叉树及其性质详解](http://data.biancheng.net/view/192.html)
- [牛客网首页 > 试题广场 > minimum-depth-of-binary-tree](https://www.nowcoder.com/questionTerminal/e08819cfdeb34985a8de9c4e6562e724?f=discussion)
