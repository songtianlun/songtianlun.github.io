---
title: "[编程题]和为S的连续正数序列"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "320"
date: "2020-03-03 18:01:00"
---

## 题目来源

- [牛客网首页 > 试题广场 > 和为S的连续正数序列](https://www.nowcoder.com/questionTerminal/c451a3fd84b64cb19485dad758a55ebe)

> 时间限制：C/C++ 1秒，其他语言2秒空间限制：C/C++ 32M，其他语言64M

## 题目描述

小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!

输出描述:

> 输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序

## 解题思路

- 所求序列是连续的递增序列，所以需要前后指针包含的是连续的数据。 
- Big指针在前，当和小于target时继续向前增加数字；small在后，当和大于target时向前减少数字。
- 边界条件：因为结果数组必须包含两个数字以上，所以small<(s+1)/2，比如target为15，small不能到8，因为big至少为9超过了target。

## 参考代码

```
class Solution {
public:
    vector<vector<int> > FindContinuousSequence(int sum) {
        vector<vector<int>> res;
        if(sum < 3)
            return res;
        // 边界值
        int small = 1;
        int big = 2;
        // 初试累加
        int calculate = small + big;
        // 限定边界为 sum 的一半
        while(small < (sum + 1) /2 ){
            // 相等，保存结果，前进big
            if(calculate == sum){
                vector<int> line;
                for(int i = small; i <= big; ++i)
                    line.push_back(i);
                res.push_back(line);
                calculate += ++big;
            }
            // 过小，加数，前进big
            else if(calculate < sum)
                calculate += ++big;
            // 过大，减数，前进small
            else
                calculate -= small++;
        }
        return res;
    }
};
```

## 参考文献

- [牛客网首页 > 试题广场 > 和为S的连续正数序列](https://www.nowcoder.com/questionTerminal/c451a3fd84b64cb19485dad758a55ebe)
- [和为S的连续正数序列](https://blog.csdn.net/sinat_27612639/article/details/51884478)