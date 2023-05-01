---
title: "Perl //= 和 ||= 的区别 | 附实验"
categories: [ "技术" ]
tags: [ "Perl" ]
draft: false
slug: "619"
date: "2022-01-12 15:42:03"
---

## 结论

- `$var//=2`：等价于 `defined($var)||2`，即 **未定义** 时才赋值为 `2` ，否则不变（ 即使是 `0`或 `空字符串`  ）
- `$var||=2` ：除非定义且为 `true` 才不会赋值，否则赋值（比如 `0` 或 `空字符串` 时）为2。

## //=

### Step-1 空串

```perl
$var='';
$var//=2;
print "'$var'\n";
```

```bash
# perl atest4.pl 
''
```

### Step-2 0

```perl
$var=0;
$var//=2;
print "'$var'\n";
```

```bash
# perl atest4.pl 
'0'
```

### Step-3 1

```perl
$var=1;
$var//=2;
print "'$var'\n";
```

```bash
# perl atest4.pl 
'1'
```

### Step-4 undef

```perl
$var=undef;
$var//=2;
print "'$var'\n";
```

```bash
# perl atest4.pl 
'2'
```

## ||=

### Step-1 空串

```perl
$var='';
$var||=2;
print $var;
```

```bash
# perl atest4.pl 
2
```

### Step-2 0

```perl
$var=0;
$var||=2;
print $var;
```

```bash
# perl atest4.pl 
2
```

### Step-3 1

```perl
$var=1;
$var||=2;
print $var;
```

```bash
# perl atest4.pl 
1
```

### Step-4 undef

```perl
$var=undef;
$var||=2;
print $var;
```

```bash
# perl atest4.pl 
2
```