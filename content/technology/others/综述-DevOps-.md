---
title: "综述 DevOps "
categories: [ "技术价值" ]
tags: [  ]
draft: false
slug: "268"
date: "2019-11-28 20:53:00"
---

`DevOps` 常见于各大云计算提供商。`DevOpe`被用于打破开发者和运维者之间的壁垒，目的是缩短软件开发周期并提供高质量的持续集成。

[tip type="info" title="DevOps"]

DevOps is a set of practices that combines software development (Dev) and information-technology operations (Ops) which aims to shorten the systems development life cycle and provide continuous delivery with high software quality. (WikiPedia)

[/tip]

这样的说法很抽象，来看看各个服务商都是怎么描述自家的 DevOps 的吧。

 - CODING DevOps 包括代码托管、项目管理、测试管理、持续集成、制品库等多款产品和服务，涵盖软件开发从构想到交付的一切所需，使研发团队在云端高效协同，实践敏捷开发与 DevOps，提升软件交付质量与速度。 (Tencent Cloud)
 - DevCloud是集华为研发实践、前沿研发理念、先进研发工具为一体的研发云平台; 面向开发者提供研发工具服务，让软件开发简单高效。(HuaWei Cloud)
 - 利用 DevOps 缩短版本发布间隔时间，提高可靠性，在竞争中保持领先地位; DevOps 是一种日益常见的软件交付方法，开发和运营团队以速度、质量和控制协作构建、测试、部署和监控应用程序。 DevOps 与任何类型的软件项目都相关，无论架构、平台或用途如何。常见用例包括：云原生和移动应用、应用集成以及现代化和多云管理。 成功的 DevOps 实施通常依赖于一组集成的解决方案或“工具链”，用于消除手动步骤，减少错误，并超越小型孤立团队实现扩展。 (IBM DevOps)
 - 无论是才刚开始执行 DevOps 实现，还是期望与现有工具链和流程集成，都可以采用 Azure DevOps 技术更加快速、安全地构建端到端的持续交付管道。减少工具集维护耗费的时间，更加专注于客户价值。通过 DevOps 技术生成、发布、测试并监视云和移动应用程序非常简单可靠，可让用户使用任意工具链持续实现创新。(Azure DevOps)
 - DevOps 是一项组织和文化运动，旨在加快软件交付速度，提高服务可靠性，并在软件利益相关方之间建立共享所有权。了解如何提高软件交付的速度、稳定性、可用性和安全性。(Google Cloud)
 - AWS 可以提供一套灵活的服务，让各家公司利用 AWS 和 DevOps 实践经验来更加快速、可靠地构建和交付产品。这些服务可以简化基础设施的预置和管理、应用程序代码的部署、软件发布流程的自动化以及应用程序和基础设施性能的监控。DevOps 集文化理念、实践和工具于一身，可以提高组织高速交付应用程序和服务的能力，与使用传统软件开发和基础设施管理流程相比，能够帮助组织更快地发展和改进产品。这种速度使组织能够更好地服务其客户，并在市场上更高效地参与竞争。(AWS DevOps)

从上面多家云服务商的描述大概可以窥探 DevOps 一二了吧。目前来说，DevOps更多的还停留在理念层面，它使用容器、Kubernetes 和微服务等服务，多提供代码托管、工作流、软件测试、持续交付等功能。越是大型的企业，提供的服务更全面、高级、层次更高。反观国内的提供商还是有一些差距的。

根据文章 [《DevOps漫谈之一：DevOps、CI、CD都是什么鬼？》](https://blog.jjonline.cn/linux/238.html)的说法，DevOps是 `Development` 和 `Operations` 的组合，是一种方法论，是一组过程、方法与系统的统称，用于促进应用开发、应用运维和质量保障（QA）部门之间的沟通、协作与整合。以期打破传统开发和运营之间的壁垒和鸿沟。

![](https://imagehost-cdn.frytea.com/images/2019/11/28/ED8242FA-7556-4C45-8281-701224CAC38F.png)

根据另一篇文章[《DevOps简介》](https://www.cnblogs.com/liufei1983/p/7152013.html)的说法：

DevOps的一个巨大好处就是可以高效交付，这也正好是它的初衷。Puppet和DevOps Research and Assessment (DORA) 主办了2016年DevOps调查报告，根据全球4600位各IT公司的技术工作者的提交数据统计，得出高效公司平均每年可以完成1460次部署。

与低效组织相比，高效组织的部署频繁200倍，产品投入使用速度快2555倍，服务恢复速度快24倍。在工作内容的时间分配上，低效者要多花22%的时间用在为规划好或者重复工作上，而高效者却可以多花29%的时间用在新的工作上。所以这里的高效不仅仅指公司产出的效率提高，还指员工的工作质量得到提升。

DevOps另外一个好处就是会改善公司组织文化、提高员工的参与感。员工们变得更高效，也更有满足和成就感；调查显示高效员工的雇员净推荐值（eNPS:employee Net Promoter Score）更高，即对公司更加认同。

综上，DevOps 致力于促进开发人员和运维人员的沟通，及时递交需求、完成软件测试、反馈问题、自动化交付。可以免去很多机械化的操作。这么说，作者认为这和 `工作流` 的理念也有一些像。

工作流（Work Flow）就是工作流程的计算模型，即将工作流程中的工作如何前后组织在一起的逻辑和规则在计算机中以恰当的模型进行表示并对其实施计算。工作流要解决的主要问题是：为实现某个业务目标，在多个参与者之间，利用计算机，按某种预定规则自动传递文档、信息或者任务。简单地说，工作流就是一系列相互衔接、自动进行的业务活动或任务。我们可以将整个业务过程看作是一条河，其中流过的就是工作流。（MBA 智库）

将一切可流程化的工作流程化，搭建一个高灵活性的工作流平台，将这一平台应用于各个领域，这已成为大势所趋。微软的 [Folw](https://flow.microsoft.com/zh-cn/)，跨平台的 [IFTTT](https://ifttt.com/)，苹果的 `捷径`，开源的 [N8n](https://n8n.io/) 等等工具都在致力于将机械化的工作流水线化，从而提高工作效率。`Gis` 专业的博主最近也在想，能不能将地信的种种应用做成模版，从而将分析过程简化，降低 `Gis` 的使用门槛，让更多的人可以使用到。

使用广泛的 git hosting 平台 gitlab 也因其强大的 CI/CD 功能而闻名，实际上在使用 GitLab 时是需要绑定 Google Cloud Platform(GCP) 的 Google Kubernetes Engine 服务进行使用的。其实还有开源可用的 Jenkins 可以作为 CI/CD 的有力工具。

工具众多，开源可用，工作流和持续集成有着众多类似之处，但究竟会怎样还是要实践后才知道。

## 参考文献

 - [WikiPedia/DevOps](https://en.wikipedia.org/wiki/DevOps)
 - [CODING DevOps](https://cloud.tencent.com/product/coding)
 - [DevCloud](https://www.huaweicloud.com/devcloud/)
 - [IBM DevOps](https://www.ibm.com/cn-zh/cloud/devops)
 - [Azure DevOps](https://azure.microsoft.com/zh-cn/product-categories/devops/)
 - [Google Cloud DevOps](https://cloud.google.com/devops/)
 - [Aws DevOps](https://aws.amazon.com/cn/devops/)
 - [Introduction to CI/CD with GitLab](https://docs.gitlab.com/ee/ci/introduction/)
 - [DevOps简介](https://www.cnblogs.com/liufei1983/p/7152013.html)
 - [DevOps漫谈之一：DevOps、CI、CD都是什么鬼？](https://blog.jjonline.cn/linux/238.html)
 - [BaiDu/BaiKe/devops](https://baike.baidu.com/item/devops/2613029)

