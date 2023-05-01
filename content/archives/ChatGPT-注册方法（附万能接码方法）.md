---
title: "ChatGPT 注册方法（附万能接码方法）"
categories: [ "技术" ]
tags: [ "ChatGPT","OpenAI" ]
draft: false
slug: "671"
date: "2022-12-06 23:25:00"
---

ChatGPT 是一个训练有素的语言模型，由 OpenAI 公司训练而成。目的是帮助回答问题，提供信息和支持，但不具备人类的感知能力，也不会回答所有问题。

> 以上自我介绍原始内容来自 ChatGPT 回答。

目前已经有人用 ChatGPT 开始水帖、水回答，目前 Stack Overflow 已经暂时屏蔽来自 ChatGPT 的回答。

V2ex，即刻等社交媒体的 ChatGPT 浓度极高，这样一款充满争议性和未来感的 AI，目前处于公测阶段，可以尝试，本文介绍其注册方法。

## 注册步骤

注册步骤就是常规的帐号密码，难点主要在短信验证，其余部份暂时略过。

## 短信验证

使用 [sms-man](https://sms-man.com/) 接码，一次几美分，失败可退款重试。

充值有最低值限制，也不浪费，还能用于注册各种平台，如 Apple ID， PayPal 等。

![](https://imagehost-cdn.frytea.com/images/2022/12/06/20221206083994408f7955e626ee468.png)

注册充值后，购买一次 OpenAI 的短信接码，之后不断点击接收，若长时间无法接收，则删除重试：

![](https://imagehost-cdn.frytea.com/images/2022/12/06/202212060841157abfb09eee6b4df78.png)

成功后将验证码回填 OpenAI 即可。

对了，这个 OpenAI 登陆时的验证码是区分大小写的：

![](https://imagehost-cdn.frytea.com/images/2022/12/06/2022120609289187c3fbd74506515f0.png)

## 演示

可以请他帮忙写文章：

![](https://imagehost-cdn.frytea.com/images/2022/12/06/202212060931664fbb8483e57edceac.png)

甚至实现常见算法：

![](https://imagehost-cdn.frytea.com/images/2022/12/06/20221206093534074dfe18aff23a8fc.png)

有没有一种强烈的危机感。

这款软件的出现，将大神和菜鸟的差距进一步拉大。

## 一次简单的对话

tl.song:
Can you help me implement insertion sort in python

ChatGPR:
Yes, I'd be happy to help you implement insertion sort in Python! Here's an implementation you can use as a starting point:

```python
def insertion_sort(arr):

# Iterate over the array, starting at index 1

for i in range(1, len(arr)):

# Save the value at the current index

current_value = arr[i]


# Iterate backwards over the sorted portion of the array

j = i
while j > 0 and arr[j - 1] > current_value:
# Shift the larger value to the right
arr[j] = arr[j - 1]
j -= 1

# Insert the saved value into the correct position

arr[j] = current_value

return arr
```

To use this implementation, you can call the insertion_sort function and pass in the array you want to sort. For example:

```
arr = [5, 1, 4, 2, 8]
sorted_arr = insertion_sort(arr)

# sorted_arr will be [1, 2, 4, 5, 8]
```

Insertion sort is a simple sorting algorithm that works well for small arrays or partially-sorted arrays, but it is not very efficient for large arrays. It has a time complexity of O(n^2) in the worst case, so it is not suitable for sorting very large arrays.

不仅实现了代码，还附带分析时间复杂度，程序员这碗饭越来越难抢了。

## 参考文献

- [Stack Overflow temporarily bans answers from OpenAI's ChatGPT chatbot ](https://www.zdnet.com/article/stack-overflow-temporarily-bans-answers-from-openais-chatgpt-chatbot/)

