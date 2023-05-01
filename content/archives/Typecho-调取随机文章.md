---
title: "Typecho 调取随机文章"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "292"
date: "2020-01-06 20:17:00"
---

想要在博客每一篇博文结束的时候加上几篇博客其他文章，之后找到一个可以实现随机调取制定数量文章的方法，代码来源 [博客吧](https://www.boke8.net/)。实现方法很简单，并且可以根据自己的需求定制。

## 打开方式

1、将下面的代码添加至主题的functions.php文件：

```php
function getRandomPosts($limit = 10){    
    $db = Typecho_Db::get();
    $result = $db->fetchAll($db->select()->from('table.contents')
		->where('status = ?','publish')
		->where('type = ?', 'post')
		->where('created <= unix_timestamp(now())', 'post')
		->limit($limit)
		->order('RAND()')
	);
	if($result){
		$i=1;
		foreach($result as $val){
			if($i<=3){
				$var = ' class="red"';
			}else{
				$var = '';
			}
			$val = Typecho_Widget::widget('Widget_Abstract_Contents')->push($val);
			$post_title = htmlspecialchars($val['title']);
			$permalink = $val['permalink'];
			echo '<li><i'.$var.'>'. '</i><a href="'.$permalink.'" title="'.$post_title.'" target="_blank">'.$post_title.'</a></li></br>';
			$i++;
		}
	}
}
```

2、在要显示随机文章的地方添加以下调用代码

```php
<?php getRandomPosts('10');?>
```

`10` 代表随机调用 10 篇文章，可以在需要的位置调用，例如博主就在主题目录下的 `footer.php` 文件中加入了如下代码：

```php
...
    </br>
    <h2> 推荐阅读 </h2>
    </br>
    <?php getRandomPosts('5');?
...
```

这样就实现了在文章结束之后随机推荐五篇文章，效果如下：

![2020-01-06-20-15-49-.png](https://imagehost-cdn.frytea.com/images/2020/01/06/2020-01-06-20-15-49-.png)

喜欢的话可以试试哟，本文核心内容来自 [Typecho随机文章的调用方法代码](https://www.boke8.net/typecho-random-articles.html)