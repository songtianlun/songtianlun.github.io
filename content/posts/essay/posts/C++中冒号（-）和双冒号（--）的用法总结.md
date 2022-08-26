---
title: "C++中冒号（:）和双冒号（::）的用法总结"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "536"
date: "2021-06-09 11:53:00"
---

## 冒号（:）用法

（1）表示**机构内位域**的定义（即该变量占几个 bit 空间）

```cpp
typedef struct _XXX{
unsigned char a:4;
unsigned char c;
} ; XXX
```

（2）**构造函数**后面的冒号起分割作用，是类给**成员变量赋值**的方法，初始化列表，更适用于成员变量的常量 `const` 型。

```cpp
// 例1
struct _XXX{
	_XXX() : y(0xc0) {}
};

相当于
struct _XXX{
	_XXX() {
		y = 0xc0;
	}
};

// 例2
class myClass
{
public :
myClass();// 构造函数，无返回类型，可以有参数列表，这里省去
~myClass();// 析构函数
int a;
const int b;
}

myClass::myClass():a(1),b(1)// 初始化列表
{
}
```

* 注 1：初始化列表的作用相当于在构造函数内进行相应成员变量的赋值，但两者是有差别的。

> 在初始化列表中是对变量进行**初始化**，而在构造函数内是进行**赋值操作**。两都的差别在对于像 const 类型数据的操作上表现得尤为明显。我们知道，const 类型的变量必须在定义时进行**初始化**，而不能对 const 型的变量进行**赋值**，因此 const 类型的成员变量**只能（而且必须）**在初始化列表中进行**初始化**，即下面的代码将会出错：

```cpp
myClass::myClass()
{
a = 1;// 没错，效果相当于在初始化列表中进行初始化
b = 1;// 出错，const变量不能进行赋值操作；
}
```

* 注 2：初始化的顺序与成员变量声名的顺序相同。

先看一下下面的程序：

```cpp
myClass::myClass():b(1),a(b)
{
}
```

这样的执行结果 a,b 各是多少呢？b=1,a=1?不是，**b=1 而 a 是个随机数**。这一点是相当重要的哦，一般在初始化列表中进行初始化时，初始化的顺序应与声明的顺序保持一致，防止出现不必要的错误。

* 注 3：对于继承的类来说，在初始化列表中也可以进行基类的初始化，初始化的顺序是**先基类初始化**，然后再根据该类自己的变量的声明顺序进行初始化。

（3） `public:` 和 `private:` 后面的冒号，表示后面定义的所有成员都是公有或私有的，直到下一个 `public:` 或 `private:` 出现为止。

（4）类名冒号后面的是用来定义类的继承。

```cpp
class 派生类名 :继承方式 基类名
{
派生类的成员
};

// 继承方式：public、private和protected，默认处理是public。
```

## 双冒号(::)用法

（1）表示 **域操作符** / **作用域分解运算符**

```cpp
[cpp] view plaincopy
class CA {  
public:  
  int ca_var;  
  int add(int a, int b);  
  int add(int a);  
};   
   
//那么在实现这个函数时，必须这样书写：  
int CA::add(int a, int b)  
{  
  return a + b;  
}  
  
//另外，双冒号也常常用于在类变量内部作为当前类实例的元素进行表示，比如:  
int CA::add(int a)  
{  
  return a + ::ca_var;  
}   
//表示当前类实例中的变量ca_var
```

（2）**全局作用域**符号：当全局变量在局部函数中与其中某个变量重名，那么就可以用 `::` 来区分如

```cpp
char zhou; //全局变量 
void sleep()
{
	char zhou; //局部变量
	zhou(局部变量) = zhou(局部变量) * zhou(局部变量);
	::zhou(全局变量) =::zhou(全局变量) *zhou(局部变量);
}
```

（3）表示引用成员函数及变量，作用域成员运算符

```cpp
System::Math::Sqrt()
// 相当于
System.Math.Sqrt()
```

## 参考文献

* [c++ 中冒号（:）和双冒号（::）的用法](https://segmentfault.com/a/1190000000345680)
* [c++ 函数后面加一个冒号的含义](https://www.cnblogs.com/Allen-rg/p/11529949.html)
* [C++ 中在变量或函数前加双冒号的含义：命名空间或类域](https://blog.csdn.net/weixin_43869898/article/details/105761137)
