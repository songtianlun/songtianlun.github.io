---
title: 在浏览器里运行 ChatGPT 和 Stable Diffusion
author: songtianlun
type: post
date: 2023-04-20T13:56:04+00:00
url: /79.html
baidu_submit_url_status:
  - 1
views:
  - 164
categories:
  - AI 技巧
tags:
  - LLM

---
直接在浏览器里面运行的大语言模型，不需要部署直接调用 webGPU 进行运算，已经把模型部署成本拉到最低了。

目前只有 M1 或者 M2 芯片的 Mac 可以运行，需要下载谷歌开发版本。  
这里下载谷歌浏览器开发者版本：<a href="https://google.com/chrome/canary/" target="_blank"  rel="nofollow">https://google.com/chrome/canary/</a>

## WebLLM {#pk-menu-0}

用开发者版本的谷歌打开这个页面即可体验：<a href="https://mlc.ai/web-llm/#chat-demo" target="_blank"  rel="nofollow">https://mlc.ai/web-llm/#chat-demo</a>

<img title="在浏览器里运行 ChatGPT 和 Stable Diffusion"
             alt="在浏览器里运行 ChatGPT 和 Stable Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/20/20230420091040d5eaae38349d4f33.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

运行速度很慢，毕竟是运行在浏览器中的，有一种树懒的即视感。

## WebSD {#pk-menu-1}

他们还开发了在浏览器上运行的 Stable Diffusion，也是类似的原理调用 WebGPU 运算，限制同上面一样。

这里体验：<a href="https://mlc.ai/web-stable-diffusion/#text-to-image-generation-demo" target="_blank"  rel="nofollow">https://mlc.ai/web-stable-diffusion/#text-to-image-generation-demo</a>

打开速度非常的慢。

<img title="在浏览器里运行 ChatGPT 和 Stable Diffusion"
             alt="在浏览器里运行 ChatGPT 和 Stable Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/20/20230420214740956375e9a3012e8b.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

因为是运行在浏览器中的，对速度不能期待太多。

耗时数分钟，终于成功：

<img title="在浏览器里运行 ChatGPT 和 Stable Diffusion"
             alt="在浏览器里运行 ChatGPT 和 Stable Diffusion" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/20/20230420215519e9a07832414a869c.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

## References {#pk-menu-2}

  * <a href="https://twitter.com/HongyiJin258/status/1647062309960028160" target="_blank"  rel="nofollow">https://twitter.com/HongyiJin258/status/1647062309960028160</a>
  * <a href="https://web.okjike.com/originalPost/643acfd5205bd8b62e4999e6" target="_blank"  rel="nofollow">https://web.okjike.com/originalPost/643acfd5205bd8b62e4999e6</a>