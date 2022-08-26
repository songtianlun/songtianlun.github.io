---
title: "为Linux发行版安装中文字体"
categories: [ "编程开发" ]
tags: [  ]
draft: false
slug: "296"
date: "2020-01-16 11:17:00"
---

前文提到博主为自己的 `ThinkPad E450` 安装了一款来自爱尔兰的 `Linux/GNU 发行版` 作为主力系统使用：[这款来自爱尔兰的操作系统真的是爱了](https://blog.frytea.com/archives/293/)。近期需要进行文字处理工作，安装了` WPS 2019 Linux 版` ，但是发现这款外来的 `Linux/GNU 发行版` 并没有自带一些常用的中文字体，如 宋体、仿宋、黑体 等字体，经过一番检索，博主使用从 Windows 10 家庭中文版中提取出中文字体导入，并在系统中刷新字体以使字体生效。下面就来讲讲详细步骤：

## 字体资源准备

 - 方案一：字体可以自行从windows系统下进入 `C:\windows\Fonts` 文件夹，挑选常用的中文字体拷贝到U盘。
 - 方案二：为方便需要的人，博主已从 `windows` 系统中提取了常用中文字体并打包，放进博主的资源站(<https://res.frytea.com/>)开放下载，需要的伙伴可以从下列地址进入下载(若地址实效请自行进入资源站寻找或联系博主)：

 - 直链地址：<https://res.frytea.com/Others/Fonts/win_cn_fonts.zip>
 - 资源来源详情：
  - 系统版本：Windows 10 家庭中文版
  - 系统版本号：1903
  - 系统安装日期：2019/10/29
  - 操作系统版本：18362.535
  - 路径：C://windows/fonts
  - 中文：C://windows/fonts/中文简体部分

  若从本站资源站下载请在下载完成后进入下载目录，执行下列命令：

```bash
$  unzip win_cn_fonts.zip
```

## 命令行操作

1、 移动字体库到linux系统下的字体库文件夹/usr/share/fonts/下：

```bash
$  sudo mv win_cn_fonts/ /usr/share/fonts/win_font/
```

2、让linux系统识别新的中文字体：

```bash
$ sudo fc-cache -fv
```

3、如需确认新的中文字体库是否已经安装，可在终端中输入：

```bash
$ fc-list :lang=zh-cn | sort

...
/usr/share/fonts/win_font/Dengb.ttf: 等线,DengXian:style=Bold
/usr/share/fonts/win_font/Dengl.ttf: 等线,DengXian,DengXian Light,等线 Light:style=Light,Regular
/usr/share/fonts/win_font/Deng.ttf: 等线,DengXian:style=Regular
/usr/share/fonts/win_font/FZLTCXHJW.ttf: 方正兰亭超细黑简体,FZLanTingHeiS\-UL\-GB:style=Regular
/usr/share/fonts/win_font/FZSTK.TTF: 方正舒体,FZShuTi:style=Regular
/usr/share/fonts/win_font/FZYTK.TTF: 方正姚体,FZYaoTi:style=Regular
/usr/share/fonts/win_font/msyhbd.ttc: 微软雅黑,Microsoft YaHei:style=Bold,Negreta,tučné,fed,Fett,Έντονα,Negrita,Lihavoitu,Gras,Félkövér,Grassetto,Vet,Halvfet,Pogrubiony,Negrito,Полужирный,Fet,Kalın,Krepko,Lodia
/usr/share/fonts/win_font/msyhbd.ttc: Microsoft YaHei UI:style=Bold,Negreta,tučné,fed,Fett,Έντονα,Negrita,Lihavoitu,Gras,Félkövér,Grassetto,Vet,Halvfet,Pogrubiony,Negrito,Полужирный,Fet,Kalın,Krepko,Lodia
/usr/share/fonts/win_font/msyhl.ttc: 微软雅黑,Microsoft YaHei,Microsoft YaHei Light,微软雅黑 Light:style=Light,Regular
/usr/share/fonts/win_font/msyhl.ttc: Microsoft YaHei UI,Microsoft YaHei UI Light:style=Light,Regular
/usr/share/fonts/win_font/msyh.ttc: 微软雅黑,Microsoft YaHei:style=Regular,Normal,obyčejné,Standard,Κανονικά,Normaali,Normál,Normale,Standaard,Normalny,Обычный,Normálne,Navadno,Arrunta
/usr/share/fonts/win_font/msyh.ttc: Microsoft YaHei UI:style=Regular,Normal,obyčejné,Standard,Κανονικά,Normaali,Normál,Normale,Standaard,Normalny,Обычный,Normálne,Navadno,Arrunta
/usr/share/fonts/win_font/simfang.ttf: 仿宋,FangSong:style=Regular,Normal,obyčejné,Standard,Κανονικά,Normaali,Normál,Normale,Standaard,Normalny,Обычный,Normálne,Navadno,Arrunta
/usr/share/fonts/win_font/simhei.ttf: 黑体,SimHei:style=Regular,Normal,obyčejné,Standard,Κανονικά,Normaali,Normál,Normale,Standaard,Normalny,Обычный,Normálne,Navadno,Arrunta
/usr/share/fonts/win_font/simkai.ttf: 楷体,KaiTi:style=Regular,Normal,obyčejné,Standard,Κανονικά,Normaali,Normál,Normale,Standaard,Normalny,Обычный,Normálne,Navadno,Arrunta
/usr/share/fonts/win_font/SIMLI.TTF: 隶书,LiSu:style=Regular
/usr/share/fonts/win_font/simsun (2).ttc: 宋体,SimSun:style=常规,Regular
/usr/share/fonts/win_font/simsun (2).ttc: 新宋体,NSimSun:style=常规,Regular
/usr/share/fonts/win_font/simsun.ttc: 宋体,SimSun:style=常规,Regular
/usr/share/fonts/win_font/simsun.ttc: 新宋体,NSimSun:style=常规,Regular
/usr/share/fonts/win_font/SIMYOU.TTF: 幼圆,YouYuan:style=Regular
/usr/share/fonts/win_font/STCAIYUN.TTF: 华文彩云,STCaiyun:style=Regular
/usr/share/fonts/win_font/STFANGSO.TTF: 华文仿宋,STFangsong:style=Regular
/usr/share/fonts/win_font/STHUPO.TTF: 华文琥珀,STHupo:style=Regular
/usr/share/fonts/win_font/STKAITI.TTF: 华文楷体,STKaiti:style=Regular
/usr/share/fonts/win_font/STLITI.TTF: 华文隶书,STLiti:style=Regular
/usr/share/fonts/win_font/STSONG.TTF: 华文宋体,STSong:style=Regular
/usr/share/fonts/win_font/STXIHEI.TTF: 华文细黑,STXihei:style=Regular
/usr/share/fonts/win_font/STXINGKA.TTF: 华文行楷,STXingkai:style=Regular
/usr/share/fonts/win_font/STXINWEI.TTF: 华文新魏,STXinwei:style=Regular
/usr/share/fonts/win_font/STZHONGS.TTF: 华文中宋,STZhongsong:style=Regular
```

4、enjoy it.

## 参考文献

 - [linux安装windows常用中文字体库](https://blog.csdn.net/atpalain_csdn/article/details/50801639)
 - [Linux下使用unzip解压缩中文乱码问题](https://blog.csdn.net/gatieme/article/details/44807105)
