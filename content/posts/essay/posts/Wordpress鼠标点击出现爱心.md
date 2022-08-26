---
title: "Wordpress鼠标点击出现爱心"
categories: [ "编程开发" ]
tags: [ "wordpress" ]
draft: false
slug: "60"
date: "2019-01-12 00:37:00"
---



同上文，眼馋各大博主博客令人眼前一亮的设计，想要给自己博客也打扮打扮，今天就来弄弄鼠标点击出现爱心的效果吧！

采用了代码方式实现，很简单：

第一步：在主题根目录创建js文件，写入如下代码：

    (function(window,document,undefined){
    var hearts = [];
    window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback){
    setTimeout(callback,1000/60);
    }
    })();
    init();
    function init(){
    css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
    attachEvent();
    gameloop();
    }
    function gameloop(){
    for(var i=0;i<hearts.length;i++){
    if(hearts[i].alpha <=0){
    document.body.removeChild(hearts[i].el);
    hearts.splice(i,1);
    continue;
    }
    hearts[i].y--;
    hearts[i].scale += 0.004;
    hearts[i].alpha -= 0.013;
    hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
    }
    requestAnimationFrame(gameloop);
    }
    function attachEvent(){
    var old = typeof window.onclick==="function" && window.onclick;
    window.onclick = function(event){
    old && old();
    createHeart(event);
    }
    }
    function createHeart(event){
    var d = document.createElement("div");
    d.className = "heart";
    hearts.push({
    el : d,
    x : event.clientX - 5,
    y : event.clientY - 5,
    scale : 1,
    alpha : 1,
    color : randomColor()
    });
    document.body.appendChild(d);
    }
    function css(css){
    var style = document.createElement("style");
    style.type="text/css";
    try{
    style.appendChild(document.createTextNode(css));
    }catch(ex){
    style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    }
    function randomColor(){
    return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
    }
    })(window,document);

第二步：修改主题目录下footer.php文件，引入代码

    <script type="text/javascript" src="https://***/wp-content/themes/hestia/mouseclink/clink.js"></script>

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-5.png)

第三步：清缓存，刷新！

![](https://blog.songtianlun.cn/wp-content/uploads/2019/01/image-6.png)

  

本文参考了下列博文内容：

[鼠标点击出现爱心js特效代码分享](https://www.kuacg.com/21517.html)