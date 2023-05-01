---
title: 运行开源版 ChatGPT —— gpt4all
author: songtianlun
type: post
date: 2023-04-02T07:17:50+00:00
url: /55.html
baidu_submit_url_status:
  - 1
views:
  - 4024
puock_like:
  - 1
categories:
  - AI 技巧
tags:
  - gpt4all

---
GPT4All 是基于大量干净的助手数据（包括代码、故事和对话）训练而成的聊天机器人，数据包括～800k 条 GPT-3.5-Turbo 生成数据，基于 LLaMa 完成，M1 Mac、Windows 等环境都能运行。或许就像它的名字所暗示的那样，人人都能用上个人 GPT 的时代已经来了。

<img title="运行开源版 ChatGPT —— gpt4all"
             alt="运行开源版 ChatGPT —— gpt4all" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/02/20230402150818338a93b0e120c754.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

使用 gpt4all 可以是现在自己的笔记本上运行大型语言模型，使用 cpu 运行非常简单：

  1. 从 <a href="https://the-eye.eu/public/AI/models/nomic-ai/gpt4all/gpt4all-lora-quantized.bin" target="_blank"  rel="nofollow">直接链接 </a> 或 <a href="https://tinyurl.com/gpt4all-lora-quantized" target="_blank"  rel="nofollow">Torrent-Magnet</a> 下载 `gpt4all-lora-quantized.bin` 文件。如果下载有问题试一下  <a href="https://res.frytea.com/Dev/gpt4all" target="_blank"  rel="nofollow">这里</a> 
  2. 克隆  <a href="https://github.com/nomic-ai/gpt4all" target="_blank"  rel="nofollow">此仓库 </a>，导航至 chat 文件夹，并将下载的文件放在那里。如果下载有问题也可以试一下  <a href="https://res.frytea.com/Dev/gpt4all" target="_blank"  rel="nofollow">这里</a>  
    `git clone https://github.com/nomic-ai/gpt4all.git`
  3. 根据您的操作系统运行相应的命令：
      * M1 M- ac/OSX：cd chat;./gpt4all-lora-quantized-OSX-m1
      * Linux：`cd chat;./gpt4all-lora-quantized-linux-x86`
      * Windows（PowerShell）：`cd chat;./gpt4all-lora-quantized-win64.exe`
      * Intel Mac/OSX：`cd chat;./gpt4all-lora-quantized-OSX-intel`

<img title="运行开源版 ChatGPT —— gpt4all"
             alt="运行开源版 ChatGPT —— gpt4all" decoding="async" data-src="https://imagehost-cdn.frytea.com/images/2023/04/02/20230402151638a7d9fb710a85013b.png" data-lazy="true" src="https://skybyte.me/wp-content/themes/wordpress-theme-puock-2.7.6/assets/img/z/load.svg" alt="" /> 

在我的 m1 MacBook 上运行有点卡顿，有些问题的答案有些无厘头，好在支持中文，对于 AI 开源来说是一个很好的开始。

大家自己试试吧！

## References {#pk-menu-0}

  * <a href="https://mp.weixin.qq.com/s/crpG4dtfQFe3Q7hR3oeyxQ" target="_blank"  rel="nofollow">笔记本就能运行的 ChatGPT 平替来了，附完整版技术报告</a>
  * <a href="https://github.com/nomic-ai/gpt4all" target="_blank"  rel="nofollow">nomic-ai/gpt4all</a>
  * <a href="https://web.okjike.com/originalPost/64241dab005a6157f6d05bcf" target="_blank"  rel="nofollow">https://web.okjike.com/originalPost/64241dab005a6157f6d05bcf</a>