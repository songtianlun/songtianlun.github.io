---
title: "[编程题]evaluate-reverse-polish-notati"
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "319"
date: "2020-02-25 11:44:00"
---

## 题目来源

- [牛客网首页 > 试题广场 > evaluate-reverse-polish-notati](https://www.nowcoder.com/questionTerminal/22f9d7dd89374b6c8289e44237c70447)

> 时间限制：C/C++ 1秒，其他语言2秒空间限制：C/C++ 32M，其他语言64M

## 题目描述

链接：https://www.nowcoder.com/questionTerminal/22f9d7dd89374b6c8289e44237c70447
来源：牛客网

计算逆波兰式（后缀表达式）的值
运算符仅包含"+","-","*"和"/"，被操作数可能是整数或其他表达式
例如：

```
   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9↵  ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
```

Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are+,-,*,/. Each operand may be an integer or another expression.

Some examples:

```
  ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9↵  ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
```

## 解题思路

### 思路一

1. 利用stack来计算波兰表达式的值，这都是套路
2. 程序鲁棒性，考虑各种可能的异常

思路：

1. 遇到操作数就出栈，把计算结果入栈
  - 计算结果时，stack至少2个数，否则不合法，返回0
2. 遇到数字就入栈
  - 如果不是操作数，也无法转换为数字，就返回0，这里用try catch
3. 结果要合法：
  - 如果遍历完成,stack的元素不止1个，说明不合法，返回0
  - 当stack元素只有一个的时候，返回结果

> 来自 [@hustZa](https://www.nowcoder.com/profile/1420779)

### 思路二

1. 逆波兰表达式，用栈求解。
2. 需要注意的一点，就是来一个新的符号的时候，将栈中的两个值取出进行操作，再放回栈中。
此时先取出的为num2,后取出的为num1，进行num1 (+-/*) num2 操作

> 来自 [@haorlee](https://www.nowcoder.com/profile/9475541)

### 补充

- c++stack(堆栈）是一个容器的改编，它实现了一个先进后出的数据结构（FILO）

```
使用该容器时需要包含#include<stack>头文件；

定义stack对象的示例代码如下：

stack<int>s1;

stack<string>s2;

stack的基本操作有：

1.入栈：如s.push(x);

2.出栈:如 s.pop().注意：出栈操作只是删除栈顶的元素，并不返回该元素。

3.访问栈顶：如s.top();

4.判断栈空：如s.empty().当栈空时返回true。

5.访问栈中的元素个数，如s.size();
```

- atoi()函数将数字格式的字符串转换为整数类型
- c_str()函数返回一个指向正规C字符串的指针常量, 内容与本string串相同. （这是为了与c语言兼容，在c语言中没有string类型，故必须通过string类对象的成员函数c_str()把string 对象转换成c中的字符串样式。）

## 参考代码

```cpp
class Solution {
public:
    int evalRPN(vector<string> &tokens) {
        if(tokens.size() == 0)
            return 0;
        stack<int> st;
        for(int i=0;i<tokens.size();++i) {
            string s = tokens[i];
            if(s == "+" || s == "-" || s== "*" || s == "/"){
                if(st.size() < 2)
                    return 0;
                int num2 = st.top(); st.pop();
                int num1 = st.top(); st.pop();
                int result = 0;
                
                if(s == "+")
                    result = num1 + num2;
                else if(s == "-")
                    result = num1 - num2;
                else if(s == "*")
                    result = num1 * num2;
                else if(s == "/")
                    result = num1 / num2;
                st.push(result);
            }
            else{
                st.push(atoi(s.c_str()));
            }
        }
        return st.top();
    }
};
```

## 参考文献

- [牛客网首页 > 试题广场 > evaluate-reverse-polish-notati](https://www.nowcoder.com/questionTerminal/22f9d7dd89374b6c8289e44237c70447)
- [百度百科/逆波兰式](https://baike.baidu.com/item/逆波兰式)
- [C++ stack的使用](https://blog.csdn.net/Jim_Magic_2018/article/details/86142386)
- [C++中的c_str()函数用法](https://blog.csdn.net/nancy_m/article/details/7583550)
- [C++中atoi()函数的用法](https://blog.csdn.net/hou09tian/article/details/85230898)