---
title: "Wordpress邮件通知插件Notification使用小记"
categories: [ "编程开发" ]
tags: [ "wordpress" ]
draft: false
slug: "55"
date: "2019-01-17 15:39:00"
---


Notification是wordpress上一款功能强劲的插件，可以实现wordpress各种事件的邮件通知功能，更可以根据自己的实际需求定制自己的邮件通知内容，插件提供了很多的短代码，能够很方便的协助用户完成邮件的模板创建。

在这里，简单记下几种常见通知中可以使用的段代码，方便以后使用。

【发布新文章通知（New Post Published）】

网站简码  
这些短代码可用于任何通知。

网站标题：\[global\_site\_title\]  
网站标语：\[global\_site\_tagline\]  
网站网址：\[global\_site\_url\]  
网站管理员电子邮件：\[admin_email\]  
当前日期：\[current_date\]  
当前时间：\[current_time\]

收件人用户密码  
这些短代码只能用于具有“发送至”字段的通知以及在您的网站上拥有WordPress帐户的用户，即它们不适用于使用“ 发送到任意电子邮件”手动添加的电子邮件地址 - 在。

收件人用户ID：\[email\_user\_id\]  
收件人用户登录：\[email\_user\_login\]  
收件人用户Nicename：\[email\_user\_nicename\]  
收件人用户电子邮件：\[email\_user\_email\]  
收件人用户URL：\[email\_user\_url\]  
收件人用户注册：\[email\_user\_registered\]  
收件人显示名称：\[email\_user\_display_name\]  
收件人用户名：\[email\_user\_firstname\]  
收件人用户姓氏：\[email\_user\_lastname\] 收件人  
昵称：\[email\_user\_nickname\]  
收件人用户说明：\[email\_user\_description\]  
收件人功能：\[email\_user\_wp_capabilities\]  
收件人用户头像：\[email\_user\_avatar\]  
收件人用户配置文件自定义字段：\[email\_user\_custom_field field =“ X“\] （仅限自定义字段附加组件  
管理WP管理员配置文件中的BNFW通知订阅：\[user\_subscription\_page\]（仅限订阅附加组件）

发布/页面/自定义发布类型短代码  
永久链接：\[ permalink \]  
帖子ID：\[ID\]  
原帖帖子作者：\[post_author\]  
发布日期：\[post_date\]  
发布日期（GMT）：\[post\_date\_gmt\]  
帖子内容：\[post_content\]  
帖子标题：\[post_title\]  
帖子分类：\[post_category \]  
帖子的第一类分类：\[post\_category\_slug\]  
帖子术语：\[post\_term taxonomy =“TAXONOMY\_NAME”\]  
帖子标签：\[post_tag\]  
帖子摘录：\[post_excerpt\]  
帖子状态：\[post_status\]  
评论状态：\[comment_status \]  
Ping状态：\[ping_status\]  
发布密码：\[post_password\]  
帖子名称：\[post_name\]  
要Ping：\[to_ping\] Pinged  
：\[pinged\]  
Post Modified：\[post_modified\]  
修改后的（GMT）：\[post\_modified\_gmt\]  
过滤后的内容：\[post\_content\_filtered\]  
后期父母：\[post_parent\]  
GUID：\[guid\]  
菜单顺序：\[menu_order\]  
帖子类型：\[post_type\]  
发布MIME类型：\[post\_mime\_type\]  
评论数：\[ comment_count\]  
编辑帖子链接：\[edit_post\]  
Post Slug：\[post_slug\]  
永久链接到帖子后：\[post\_parent\_permalink\] 链接到帖子  
作者档案：\[author_link\]  
链接到帖子类型档案：\[post\_type\_archive\]  
特色图片：\[featured_image\]  
第一张图片发布：\[first_image\]  
自定义字段：\[custom_field field =“X”\] （仅限自定义字段附加组件）

用户简码  
这些多用途短代码涉及触发通知的人。这很可能是帖子的作者或正在注册的用户。

用户ID：\[user_id\]  
用户登录：\[user_login\]  
用户角色：\[user_role\]  
用户Nicename：\[user_nicename\]  
用户电子邮件：\[user_email\]  
用户URL：\[user_url\]  
用户注册：\[user_registered\]  
显示名称：\[display_name\]  
用户名：\[user_firstname\]  
用户姓氏：\[user_lastname\]  
昵称：\[昵称\]  
用户说明：\[user_description\]  
功能：\[wp_capabilities\]  
用户头像：\[user_avatar\]  
用户配置文件自定义字段：\[user\_custom\_field field =“X”\] （自定义字段添加 -上唯一）

更多内容见Notification帮助文档：[Shortcodes](https://betternotificationsforwp.com/documentation/notifications/shortcodes/?notification=new-post)