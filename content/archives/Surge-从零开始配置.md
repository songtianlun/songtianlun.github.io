---
title: "Surge 从零开始配置"
categories: [ "技术" ]
tags: [ "macOS","Surge" ]
draft: false
slug: "782"
date: "2023-05-01 00:06:42"
---

Surge for macOS 基于 [这份](https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/LAZY_RULES/Surge.conf) 修改。

```
# Surge 的规则配置手册: https://manual.nssurge.com/

[General]
loglevel = notify
# 从 Surge iOS 4 / Surge Mac 3.3.0 起，工具开始支持 DoH
doh-server = https://doh.pub/dns-query, https://dns.alidns.com/dns-query
# https://dns.alidns.com/dns-query, https://13800000000.rubyfish.cn/, https://doh.360.cn/dns-query, https://dns.google/dns-query
dns-server = 223.5.5.5, 114.114.114.114
tun-excluded-routes = 0.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 192.88.99.0/24, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 255.255.255.255/32
skip-proxy = localhost, *.local, injections.adguard.org, local.adguard.org, captive.apple.com, guzzoni.apple.com, 0.0.0.0/8, 10.0.0.0/8, 17.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 192.88.99.0/24, 198.18.0.0/15, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 240.0.0.0/4, 255.255.255.255/32

wifi-assist = true
allow-wifi-access = true
wifi-access-http-port = 6152
wifi-access-socks5-port = 6153
http-listen = 0.0.0.0:6152
socks5-listen = 0.0.0.0:6153

external-controller-access = 请指定密码@0.0.0.0:6170
replica = false

tls-provider = openssl
network-framework = false
exclude-simple-hostnames = true
ipv6 = true

test-timeout = 4
proxy-test-url = http://www.gstatic.com/generate_204
geoip-maxmind-url = https://cdn.jsdelivr.net/gh/Hackl0us/GeoIP2-CN@release/Country.mmdb

[Replica]
hide-apple-request = true
hide-crashlytics-request = true
use-keyword-filter = false
hide-udp = false

# -----------------------------
# Surge 的几种策略配置规范，请参考 https://manual.nssurge.com/policy/proxy.html
# 不同的代理策略有*很多*可选参数，请参考上方连接的 Parameters 一段，根据需求自行添加参数。
#
# Surge 现已支持 UDP 转发功能，请参考: https://trello.com/c/ugOMxD3u/53-udp-%E8%BD%AC%E5%8F%91
# Surge 现已支持 TCP-Fast-Open 技术，请参考: https://trello.com/c/ij65BU6Q/48-tcp-fast-open-troubleshooting-guide
# Surge 现已支持 ss-libev 的全部加密方式和混淆，请参考: https://trello.com/c/BTr0vG1O/47-ss-libev-%E7%9A%84%E6%94%AF%E6%8C%81%E6%83%85%E5%86%B5
# -----------------------------

[Proxy]
ProxyHTTP = http, 1.2.3.4, 443, username, password
ProxyHTTPS = https, 1.2.3.4, 443, username, password
ProxySOCKS5 = socks5, 1.2.3.4, 443, username, password
ProxySOCKS5TLS = socks5-tls, 1.2.3.4, 443, username, password
ProxySS = ss, 1.2.3.4, 8000, encrypt-method=chacha20-ietf-poly1305, password=abcd1234
ProxyTrojan = trojan, 192.168.20.6, 443, password=password1
ProxySnell = snell, 1.2.3.4, 8000, psk=password

[Proxy Group]
Proxy = select, ProxyHTTP, ProxyHTTPS, ProxySOCKS5, ProxySOCKS5TLS, ProxySS, ProxyTrojan, ProxySnell

[Rule]
# 自定义规则
## 您可以在此处插入自定义规则

# 实用规则片段集
# RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/Apple-News.list,Proxy
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/Apple-proxy.list,Proxy
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/Apple-direct.list,DIRECT
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/CN.list,DIRECT
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/common-ad-keyword.list,REJECT-TINYGIF
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/Basic/foreign.list,Proxy
RULE-SET,https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Surge/App/social/Telegram.list,Proxy
RULE-SET,LAN,DIRECT

# 最终规则
GEOIP,CN,DIRECT
FINAL,Proxy,dns-failed

[URL Rewrite]
# 请开启 MITM 并在域名中加入 www.google.cn
^https?://(www.)?(g|google).cn https://www.google.com 302
```

## References

* [Surge 官方手册的汉化](https://surge.mitsea.com/)
* [SS Rule Snippet ](https://github.com/Hackl0us/SS-Rule-Snippet): 搜集、整理、维护 Surge / Quantumult (X) / Shadowrocket / Surfboard / clash (Premium) 实用规则

