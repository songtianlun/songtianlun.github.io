---
title: 使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion
author: songtianlun
type: post
date: 2023-04-03T15:20:39+00:00
url: /58.html
baidu_submit_url_status:
  - 1
views:
  - 568
puock_like:
  - 1
categories:
  - AI 技巧
tags:
  - Apple
  - Mochi Diffusion
  - Stable Diffusion

---
<a href="https://github.com/godly-devotion/MochiDiffusion" target="_blank"  rel="nofollow">Mochi Diffusion</a> 是一个开源的在 Mac 上原生运行 Stable Diffusion 的客户端，可以在 iOS 和 Mac 上使用 Stable Diffusion 画图而无需联网。

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/03/20230403231822638479abdda136bb.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

项目基于 Apple 前阵子发布的针对 M1/M2 芯片优化的 Stable Diffusion (开源文生图项目) 版本 —— <a href="https://github.com/apple/ml-stable-diffusion" target="_blank"  rel="nofollow">ml-stable-diffusion</a>

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/03/2023040323243317123d5a237df9f7.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

据网友测试支持多个 SD 主流的画图模型，都已经转换成了 Core ML 模型，包括大家熟悉的 ChilloutMix，M1 的 Macbook Pro 大概 14 秒生成一张图。

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/03/20230403231904ad31e3abb1d1fda1.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

## 使用方法  {#pk-menu-0}

使用本人的 MacBook Air m1 是可以正常运行出图的，安装方法真的非常简单，简单总结仅需两步：

  * 第一步：下载安装 
  * 第二步：下载模型载入 

下载安装这一步直接在  <a href="https://github.com/godly-devotion/MochiDiffusion/releases" target="_blank"  rel="nofollow">官网 release</a> 页面下载即可，如果下载有困难，可以在  <a href="https://res.frytea.com/Dev/MochiDiffusion" target="_blank"  rel="nofollow">这里 </a> 下载试试。

载入模型这一步稍微复杂一些，可以在 <a href="https://huggingface.co/coreml?sort_models=likes#models" target="_blank"  rel="nofollow">Core ML Models</a> 下载到一些已经转换好的模型。

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/20230409133549db9fdb2dcb36b809.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

下面以下载 <a href="https://huggingface.co/coreml/coreml-ChilloutMix" target="_blank"  rel="nofollow">coreml/coreml-ChilloutMix</a> 模型举例：

进入模型页面后找到 `Clone Repository` 按钮：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/202304091337008f294a48c861b454.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

点击按钮可以看到一些命令：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/202304091338093b7d9be0273e3f38.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

下面我们来到自己的电脑上，找到模型文件夹所在位置：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/202304091340476a82ffd4611f51f3.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

切换到该文件夹，之后 Clone 该模型：

> Clone 前需要启动 Git LFS 模块，如果没有安装过该模块可以参照  [这篇教程][1] 安装启动。

<pre><code class="language-bash">$ cd /Users/songtianlun/Documents/MochiDiffusion/models/
$ git clone https://huggingface.co/coreml/coreml-ChilloutMix

Cloning into &#039;coreml-ChilloutMix&#039;...
remote: Enumerating objects: 42, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 42 (delta 2), reused 0 (delta 0), pack-reused 36
Unpacking objects: 100% (42/42), 8.08 KiB | 375.00 KiB/s, done.
Filtering content: 100% (15/15), 35.36 GiB | 13.31 MiB/s, done.
# 这里需要等待很久，大概需要处理几十 GB 的数据
# 耐心等待命令执行完毕 </code></pre>

> 如果这一步有困难，也可以在  <a href="https://res.frytea.com/Dev/MochiDiffusion" target="_blank"  rel="nofollow">这里 </a> 直接获取下一步所需的 `chilloutmix-ni_split-einsum.zip` 模型文件，快速体验一下效果。

执行完毕后看一下目录结构大概是这样：

<pre><code class="language-bash">$ tree coreml-ChilloutMix --filelimit=4
coreml-ChilloutMix
├── README.md
├── original  [10 entries exceeds filelimit, not opening dir]
└── split_einsum
    └── chilloutmix-ni_split-einsum.zip</code></pre>

我们需要解压 split\_einsum 中的 chilloutmix-ni\_split-einsum.zip 文件放在 module 文件夹中，供软件直接调用：

<pre><code class="language-bash">unzip coreml-ChilloutMix/split_einsum/chilloutmix-ni_split-einsum.zip
</code></pre>

之后回到软件中就可以看到刚刚下载下来的模型了：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/20230409144328cf639d231b5754c7.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

## 快速使用  {#pk-menu-1}

如果是刚刚接触 AI 生成图像，可以在 <a href="https://stablediffusion.fr/prompts" target="_blank"  rel="nofollow">Prompt examples - Stable Diffusion</a> 找到一些示例的提示词参数。

比如我们使用这组参数：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/202304091445490115d54884582f3a.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

在我们自己的电脑上运行即可：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/202304091450471b374b78d6e33cd0.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

运行效果为：

<img title="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion"
             alt="使用 Mac 快速上手 Stable Diffusion —— Mochi Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/09/20230409145103175f7e62ed19846d.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

大家自己试试吧。

## References {#pk-menu-2}

  * <a href="https://twitter.com/dotey/status/1642302889749106690" target="_blank"  rel="nofollow">https://twitter.com/dotey/status/1642302889749106690</a>
  * <a href="https://web.okjike.com/originalPost/64293a56a2e1cca6b23b80c6" target="_blank"  rel="nofollow">https://web.okjike.com/originalPost/64293a56a2e1cca6b23b80c6</a>
  * <a href="https://web.okjike.com/originalPost/642a47e489fab02613efeacc" target="_blank"  rel="nofollow">https://web.okjike.com/originalPost/642a47e489fab02613efeacc</a>

 [1]: https://skybyte.me/65.html