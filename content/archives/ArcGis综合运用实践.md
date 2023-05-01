---
title: "ArcGis综合运用实践"
categories: [ "技术" ]
tags: [ "arcgis" ]
draft: false
slug: "46"
date: "2019-01-15 17:46:00"
---



准备工作
----

  
环境：windows 10 home  
软件：Arcgis 10.5  
数据：  
（1）新乡市矢量边界  
（2）包含新乡及周边的dem高程数据  
（3）新乡市多波段合成遥感数据

环境：windows 10 home  
软件：Arcgis 10.5  
数据：  
（1）新乡市矢量边界  
（2）包含新乡及周边的dem高程数据  
（3）新乡市多波段合成遥感数据

环境：windows 10 home  
软件：Arcgis 10.5  
数据：  
（1）新乡市矢量边界  
（2）包含新乡及周边的dem高程数据  
（3）新乡市多波段合成遥感数据

在进行综合实验之前先总结一下小实验都做过哪些内容。

小实验内容总结：
--------

实验四：  
（1）dem数据掩膜提取  
（2）投影转换  
（3）矢量数据选择提取  
实验五：  
（1）专题图表达  
实验七  
（1）居住适宜性分析  
（2）最短路径分析  
实验八：  
（1）学校选址适宜性分析  
（2）最佳路径分析  
（3）熊猫分布密度分析（插值）  
（4）GDP区域分布图（插值）  
（5）山顶点提取  
实验九：  
（1）地形指标提取（坡度、坡度变率、地形起伏度、地面粗糙度）  
（2）地形特征信息提取（正负地形、山脊线、山谷线 -栅格提取）  
（3）三维表面创建  
（4）污物蓄水层分布可视化  
（5）模拟飞行  
（6）爆炸影响分析  
实验十：  
（1）克里金方法内插生成高程曲面  
实验十一：  
（1）地形提取（水文分析方法提取-山脊线、山谷线、正负地形）  
（2）鞍部提取  
（3）沟壑网络提取及沟壑密度计算  

综合实验目标：
-------

  
（1）制作山体阴影晕渲图  
（2）提取山脊线  
（3）提取山谷线  
（4）创建研究区三维表面（TIN）  
（5）在三维表面上显示山脊线、山谷线  
（6）制作三维场景飞行动画  
  
计划拓展：  
（1）鞍部提取  
（2）沟壑网络提取

准备工作：dem数据掩模提取
--------------

  
dem属于栅格数据，常常是长宽相同的正方形形状，想要准确的提取研究区dem数据首先进行掩膜提取。

在arcgis软件中打开dem数据和研究区边界栅格数据

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-32.png)

实用掩模提取工具

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-33.png)

设置输入的dem，按照矢量数据提取，生成结果如下：

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-34.png)

任务一、晕渲图制作
---------

首先，使用arcgis山体阴影制作工具制作山体阴影

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-35.png)

生成山体阴影后，改变其透明度为60%，放在dem数据上层，再将dem数据配色修改为如下色块：

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-36.png)

最终叠置生成山体晕渲图。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-37.png)

任务二、提取山脊线
---------

在这里采用水文分析中的方法进行山脊线提取。

1）正负地形的提取。

（1）使用arcgis领域分析→焦点统计工具，利用领域分析方法以11*11的的窗口计算平均值。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-38-1024x428.png)

（2）使用地图代数→栅格计算器。使用上一步进行过领域分析后的数据同源dem数据做减法运算

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-39-1024x455.png)

（3）重分类。使用重分类→重分类工具，首先分类给大于“1”的数据赋值“1”其余“0”，得出正地形；再给小于“1”的数据赋值“1”  
其余“0” ，得到负地形。得出的二值化数据如下图。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-40-1024x412.png)

2）山脊线提取

（1）洼地填充。首先处理洼地数据，避免流域分析过程中将洼地误提取为河流导致关系错误。使用space analyse工具→水文分析→填洼，输入原始dem数据，输出填洼后的dem数据。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-41-1024x462.png)

（2）水流流向计算。使用水文分析→流向，对去洼地后的数据进行流向分析。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-42-1024x463.png)

（3）汇流流量计算。使用水流分析→流量，分析水流汇流流量。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-43-1024x451.png)

（4）汇流流量为零值提取。使用地图代数→栅格计算器，计算汇流流量图层==0的数据。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-44-1024x467.png)

（5）进一步提取。会发现提取出来的线很多不是山脊线，此时需要进行一次处理，将求出的内容进行一次领域分析，使用3*3领域分析，求均值，使数据变得平滑。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-45-1024x467.png)

（6）制作等值线。使用表面分析→等值线，制作50、100、200三种等值线，作为下一步提取山脊线的依据。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-46-1024x467.png)

（7）提取山脊线。进入上一步数据的属性，打开山体阴影作为底图，配合山体阴影和等值线对数据进行重分类。结合直方图，发现在0.5附近出现了断点，因此选择在这个部分取值。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-47.png)

再结合晕渲图及等高线图，选择最终的中断值为0.546496469。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-48.png)

（8）重分类，根据中断值提取山脊线所在位置。使用重分类→重分类，将接近1的部分赋值1，其余为0。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-49-1024x450.png)

（9）得到山脊线。将重分类后的结果和正地形相乘，去除错误山脊线。再将结果重分类，将属性不为“1”的值赋为“NO DATA”，得到山脊线。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-50-1024x456.png)

任务三、提取山谷线
---------

山谷线的提取方法同山脊线，只是对反地形（即使用一个足够大的值减去dem得到反地形，再求得山脊线，即正地形的山谷线）。  
提过过程中的几个部分如图所示。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-51.png)

中断点

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-52.png)

根据如图所示的直方图和等高线及晕渲图，选择中断值为：0.751669156

再进行重分类、将结果和负地形相乘，去除错误山谷线，然后将数据重分类，将赋值为1的值提取出来，就得到了山谷线。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-53.png)

任务四、创建研究区三维表面
-------------

1）打开软件ArcScna

2）加载50米等高线数据

3）创建区域TIN表面  
（1）打开工具箱 3D ANALYSE→TIN管理→创建TIN  
（2）输入等高线数据，选择软边，生成TIN

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-54-1024x480.png)

此时显示效果不够明显，可以右键tin数据选择属性，进入对高程夸张显示，在下图位置设置夸大倍率。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-55-1024x555.png)

最终显示效果如图所示：

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-56.png)

还可以对数据显示符号进行重分类，将分类个数选择为32，显示效果更为精细。

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-57.png)