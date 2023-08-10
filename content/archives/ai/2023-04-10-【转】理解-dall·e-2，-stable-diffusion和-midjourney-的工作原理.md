---
title: 【转】理解 DALL·E 2， Stable Diffusion和 Midjourney 的工作原理
author: songtianlun
type: post
date: 2023-04-09T16:48:29+00:00
url: /70.html
baidu_submit_url_status:
  - 1
views:
  - 72
origin_author:
  - 理解DALL·E 2， Stable Diffusion和 Midjourney的工作原理
origin_url:
  - https://zhuanlan.zhihu.com/p/589223078
categories:
  - AI 通识

---
> 【随着 AIGC 的兴起，各位小伙伴们对文生图工具 DALL-E 2、Stable Diffusion 和 Midjourney 一定并不陌生。本期 IDP Inspiration，小白将和大家一同走进这三者背后的技术原理，一探究竟。以下是译文，Enjoy!】

 **作者** | Arham Islam

 **编译** | 岳扬

在过去的几年里，人工智能（AI）取得了极大的进展，而 AI 的新产品中有 AI 图像生成器。这是一种能够将输入的语句转换为图像的工具。文本转图像的 AI 工具有许多，但最突出的就属 DALL-E 2、Stable Diffusion 和 Midjourney 了。

## 01 **DALL·E 2 及其背后的技术**  {#pk-menu-0}

DALL-E 2 由 OpenAI 开发，它通过一段文本描述生成图像。其使用超过 100 亿个参数训练的 GPT-3 转化器模型，能够解释自然语言输入并生成相应的图像。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/2023041000454946fc2054d8728d9f.png)

DALL-E 2 主要由两部分组成——将用户输入转换为图像的表示（称为 Prior），然后是将这种表示转换为实际的照片（称为 Decoder）。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/20230410004605d254508d16f5fd18.png)

其中使用到的文本和图像嵌入来自另一个叫做 CLIP（对比语言 - 图像预训练）的网络，这也是由 OpenAI 研发的。CLIP 是一种神经网络，为输入的图像返回最佳的标题。它所做的事情与 DALL-E 2 所做的相反——它是将图像转换为文本，而 DALL-E 2 是将文本转换为图像。引入 CLIP 的目的是为了学习物体的视觉和文字表示之间的联系。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100046199a814be1e4e2dc7d.png)

DALL-E 2 的工作是训练两个模型。第一个是 Prior，接受文本标签并创建 CLIP 图像嵌入。第二个是 Decoder，其接受 CLIP 图像嵌入并生成图像。模型训练完成之后，推理的流程如下：

  * 输入的文本被转化为使用神经网络的 CLIP 文本嵌入。
  * 使用主成分分析（Principal Component Analysis）降低文本嵌入的维度。
  * 使用文本嵌入创建图像嵌入。
  * 进入 Decoder 步骤后，扩散模型被用来将图像嵌入转化为图像。
  * 图像被从 64×64 放大到 256×256，最后使用卷积神经网络放大到 1024×1024。

<ol start="02">
  <li>
    <h2 id='pk-menu-1'>
      <strong>Stable Diffusion 及其技术 </strong>
    </h2>
  </li>
</ol>

Stable Diffusion 是一个文转图的模型，其使用了 CLIP ViT-L/14 文本编码器，能够通过文本提示调整模型。它在运行时将成像过程分离成“扩散（diffusion）”的过程——从有噪声的情况开始，逐渐改善图像，直到完全没有噪声，逐步接近所提供的文本描述。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/2023041000463085478e7fe1b9211f.png)

Stable Diffusion 是基于 Latent Diffusion Model（LDM）的，LDM 是一款顶尖的文转图合成技术。在了解 LDM 的工作原理之前，让我们先看看什么是扩散模型以及为什么我们需要 LDM。

扩散模型（Diffusion Models, DM）是基于 Transformer 的生成模型，它采样一段数据（例如图像）并随着时间的推移逐渐增加噪声，直到数据无法被识别。该模型尝试将图像回退到原始形式，在此过程中学习如何生成图片或其他数据。

DM 存在的问题是强大的 DM 往往要消耗大量 GPU 资源，而且由于序列化评估 (Sequential Evaluations)，推理的成本相当高。为了使 DM 在有限的计算资源上进行训练而不影响其质量以及灵活性，Stable Diffusion 将 DM 应用于强大的预训练自动编码器（Pre-trained Autoencoders）。

在这样的前提下训练扩散模型，使其有可能在降低复杂性和保留数据细节之间达到一个最佳平衡点，显著提高视觉真实程度。在模型结构中引入交叉注意力层（cross attention layer），使扩散模型成为一个强大而灵活的生成器，实现基于卷积的高分辨率图像生成。

## 03 **Midjourney 及其是如何工作的**  {#pk-menu-2}

Midjourney 也是一款由人工智能驱动的工具，其能够根据用户的提示生成图像。MidJourney 善于适应实际的艺术风格，创造出用户想要的任何效果组合的图像。它擅长环境效果，特别是幻想和科幻场景，看起来就像游戏的艺术效果。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100046434533a6a73ba51032.png)

Midjourney 也是一个人工智能图像生成工具，它通过输入文本和参数，并使用在大量图像数据上训练出的机器学习（ML）算法来生成独一无二的图像。

Midjourney 目前只能通过其官方 Discord 上的 Discord 机器人使用。用户使用“/imagine”命令生成图像，并像其他 AI 图像生成工具一样输入命令提示。然后机器人会返回一张图片。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100046522c30a809b14ec306.png)

<ol start="04">
  <li>
    <h2 id='pk-menu-3'>
      <strong>DALL·E 2，Stable Diffusion 和 Midjourney 之间的比较 </strong>
    </h2>
  </li>
</ol>

DALL-E 2 使用数以百万计的图片数据进行训练，其输出结果更加成熟，非常适合企业使用。当有两个以上的人物出现时，DALL-E 2 产生的图像要比 Midjourney 或 Stable Diffusion 好得多。

而 Midjourney 则是一个以其艺术风格闻名的工具。Midjourney 使用其 Discord 机器人来发送以及接收对 AI 服务器的请求，几乎所有的事情都发生在 Discord 上。由此产生的图像很少看起来像照片，它似乎更像一幅画。

Stable Diffusion 是一个开源的模型，人人都可以使用。它对当代艺术图像有比较好的理解，可以产生充满细节的艺术作品。然而它需要对复杂的 prompt 进行解释。Stable Diffusion 比较适合生成复杂的、有创意的插图。但在创作一般的图像时就显得存在些许不足。

下面的 prompt 有助于了解每种模型的相似性和差异。

![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100047113add206c67001eb4.png)
![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100047285f8276f707d740e1.png)
![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100047427f16fd4d3c69dc3f.png)
![](https://imagehost-cdn.frytea.com/images/2023/04/10/20230410004751e74b1014fabea707.png)
![](https://imagehost-cdn.frytea.com/images/2023/04/10/202304100048018a6ba9e720678590.png)

**END**

 **参考资料**

  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/mlearning-ai/dall-e2-vs-stable-diffusion-same-prompt-different-results-e795c84adc56" target="_blank"  rel="nofollow">https://medium.com/mlearning-ai/dall-e2-vs-stable-diffusion-same-prompt-different-results-e795c84adc56</a>
  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/geekculture/what-is-dalle-2-what-to-know-before-trying-the-groundbreaking-ai-e7a585f2edf0" target="_blank"  rel="nofollow">https://medium.com/geekculture/what-is-dalle-2-what-to-know-before-trying-the-groundbreaking-ai-e7a585f2edf0</a>
  * <a href="https://link.zhihu.com/?target=https%3A//stability.ai/blog/stable-diffusion-public-release" target="_blank"  rel="nofollow">https://stability.ai/blog/stable-diffusion-public-release</a>
  * <a href="https://link.zhihu.com/?target=https%3A//www.dexerto.com/entertainment/what-is-midjourney-new-ai-image-generator-rivals-dall-e-1864522/" target="_blank"  rel="nofollow">https://www.dexerto.com/entertainment/what-is-midjourney-new-ai-image-generator-rivals-dall-e-1864522/</a>
  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/nightcafe-creator/stable-diffusion-tutorial-how-to-use-stable-diffusion-157785632eb3" target="_blank"  rel="nofollow">https://medium.com/nightcafe-creator/stable-diffusion-tutorial-how-to-use-stable-diffusion-157785632eb3</a>
  * <a href="https://link.zhihu.com/?target=https%3A//interestingengineering.com/innovation/stability-ai-uses-latent-diffusion-models-to-allow-users-to-create-art-in-stable-diffusion" target="_blank"  rel="nofollow">https://interestingengineering.com/innovation/stability-ai-uses-latent-diffusion-models-to-allow-users-to-create-art-in-stable-diffusion</a>
  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/augmented-startups/how-does-dall-e-2-work-e6d492a2667f" target="_blank"  rel="nofollow">https://medium.com/augmented-startups/how-does-dall-e-2-work-e6d492a2667f</a>
  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/codex/a-quick-look-under-the-hood-of-stable-diffusion-open-source-architecture-2f07fc1e729" target="_blank"  rel="nofollow">https://medium.com/codex/a-quick-look-under-the-hood-of-stable-diffusion-open-source-architecture-2f07fc1e729</a>
  * <a href="https://link.zhihu.com/?target=https%3A//stepico.com/blog/midjourney-as-an-artificial-intelligence-system/" target="_blank"  rel="nofollow">https://stepico.com/blog/midjourney-as-an-artificial-intelligence-system/</a>
  * <a href="https://link.zhihu.com/?target=https%3A//www.dexerto.com/entertainment/what-is-midjourney-new-ai-image-generator-rivals-dall-e-1864522/" target="_blank"  rel="nofollow">https://www.dexerto.com/entertainment/what-is-midjourney-new-ai-image-generator-rivals-dall-e-1864522/</a>
  * <a href="https://link.zhihu.com/?target=https%3A//petapixel.com/2022/08/22/ai-image-generators-compared-side-by-side-reveals-stark-differences/" target="_blank"  rel="nofollow">https://petapixel.com/2022/08/22/ai-image-generators-compared-side-by-side-reveals-stark-differences/</a>
  * <a href="https://link.zhihu.com/?target=https%3A//analyticsindiamag.com/stable-diffusion-vs-midjourney-vs-dall-e2/" target="_blank"  rel="nofollow">https://analyticsindiamag.com/stable-diffusion-vs-midjourney-vs-dall-e2/</a>
  * <a href="https://link.zhihu.com/?target=https%3A//medium.com/mlearning-ai/dall-e-2-vs-midjourney-vs-stable-diffusion-8eb9eb7d20be" target="_blank"  rel="nofollow">https://medium.com/mlearning-ai/dall-e-2-vs-midjourney-vs-stable-diffusion-8eb9eb7d20be</a>