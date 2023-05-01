---
title: "NMAP 基础扫描"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "507"
date: "2021-01-26 17:18:25"
---



以下几个示例带领你快速了解nmap的基本扫描方法，更多详情请查阅nmap手册。

### 1、Nmap 简单扫描
```bash
$ nmap <target ip address>
$ nmap 192.168.41.41
```
直接指定需要扫描的主机IP开始扫描，返回详细描述。

### 2、Nmap 扫描并输出详细信息
```bash
$ nmap <target ip address> -vv
$ nmap 192.168.41.41 -vv
```

### 3、Nmap 指定端口范围扫描
```
$ nmap -p(range) <target IP>
# （rangge）为要扫描的端口（范围），端口大小不能超过65535

# nmap 192.168.41.41 -p1-50
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:37 CST
Nmap scan report for bogon (192.168.41.41)
Host is up (0.0038s latency).
Not shown: 46 closed ports
PORT   STATE    SERVICE
5/tcp  filtered rje
21/tcp filtered ftp
23/tcp open     telnet
27/tcp filtered nsw-fe
MAC Address: 00:11:22:33:44:41 (Cimsys)

Nmap done: 1 IP address (1 host up) scanned in 7.99 seconds
```

### 4、Nmap 指定端口扫描
```bash
$ nmap -p(port1,port2,port3,...) <target ip> 

$ nmap -p23 192.168.41.41
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:44 CST
Nmap scan report for bogon (192.168.41.41)
Host is up (0.0083s latency).

PORT   STATE SERVICE
23/tcp open  telnet
MAC Address: 00:11:22:33:44:41 (Cimsys)

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
```
### 5、Nmap Ping 扫描
```
$ nmap -sP <target ip> 
$ nmap -sP 192.168.41.41
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:45 CST
Nmap scan report for bogon (192.168.41.41)
Host is up (0.0064s latency).
MAC Address: 00:11:22:33:44:41 (Cimsys)
Nmap done: 1 IP address (1 host up) scanned in 0.02 seconds
```
### 6、Nmap路由跟踪
```
$ nmap --traceroute <target ip> 
$  nmap --traceroute 119.29.29.29
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:50 CST
Nmap scan report for pdns.dnspod.cn (119.29.29.29)
Host is up (0.019s latency).
Not shown: 998 filtered ports
PORT   STATE SERVICE
53/tcp open  domain
80/tcp open  http

TRACEROUTE (using port 80/tcp)
HOP RTT      ADDRESS
1   1.99 ms  bogon (192.168.6.1)
2   2.71 ms  bogon (192.168.169.9)
3   2.71 ms  bogon (192.168.169.1)
4   19.82 ms hn.kd.ny.adsl (123.14.80.1)
5   4.74 ms  hn.kd.ny.adsl (125.40.240.77)
6   6.17 ms  pc93.zz.ha.cn (61.168.37.93)
7   ... 8
9   44.19 ms no-data (125.39.198.178)
10  ... 19
20  19.46 ms pdns.dnspod.cn (119.29.29.29)

Nmap done: 1 IP address (1 host up) scanned in 10.55 seconds
```
### 7 Nmap 扫描某网段IP
```
$ nmap -sP <network address > </CIDR >
$ nmap -sP 192.168.8.0/24
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:53 CST
Nmap scan report for bogon (192.168.8.129)
Host is up (0.00084s latency).
Nmap done: 256 IP addresses (1 host up) scanned in 19.87 seconds
```
### 8、Nmap 探测操作系统类别
```
$ nmap -O <target ip> 
$  nmap -O 119.29.29.29
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 16:59 CST
Nmap scan report for pdns.dnspod.cn (119.29.29.29)
Host is up (0.021s latency).
Not shown: 998 filtered ports
PORT   STATE SERVICE
53/tcp open  domain
80/tcp open  http
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: specialized|media device|WAP
Running (JUST GUESSING): Linux 2.6.X|3.X (88%), Hikvision embedded (88%)
OS CPE: cpe:/o:linux:linux_kernel:2.6.10 cpe:/h:hikvision:ds-7600 cpe:/o:linux:linux_kernel:3.0 cpe:/o:linux:linux_kernel:3.10
Aggressive OS guesses: HIKVISION DS-7600 Linux Embedded NVR (Linux 2.6.10) (88%), Linux 3.0 (88%), DD-WRT v24-sp2 (Linux 3.10) (87%)
No exact OS matches for host (test conditions non-ideal).

OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.49 seconds
```
### 9、Nmap 万能扫描
此选项设置包含了1-10000的端口ping扫描，操作系统扫描，脚本扫描，路由跟踪，服务探测。
命令语法：
```
$ nmap -A <target ip>
$ nmap -A 119.29.29.29
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 17:08 CST
Nmap scan report for pdns.dnspod.cn (119.29.29.29)
Host is up (0.020s latency).
Not shown: 998 filtered ports
PORT   STATE SERVICE VERSION
53/tcp open  domain  ISC BIND 9.11.3
| dns-nsid:
|_  bind.version: 9.11.3
80/tcp open  http    Http Server
| fingerprint-strings:
|   FourOhFourRequest, GetRequest:
|     HTTP/1.0 404 Not Found
|     Connection: close
|     Server: Http Server
|     Content-Type: text/html
|     Content-Length: 174
|     <html>
|     <head><title>Server error message</title></head>
|     <body>
|     <h1>Error 404: Not Found</h1>
|     request could not be completed because:
|     Document not found!
|     </body>
|_    </html>
|_http-server-header: Http Server
|_http-title: Server error message
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port80-TCP:V=7.80%I=7%D=1/26%Time=600FDC05%P=x86_64-redhat-linux-gnu%r(
SF:GetRequest,11E,"HTTP/1\.0\x20404\x20Not\x20Found\r\nConnection:\x20clos
SF:e\r\nServer:\x20Http\x20Server\r\nContent-Type:\x20text/html\r\nContent
SF:-Length:\x20174\r\n\r\n<html>\n<head><title>Server\x20error\x20message<
SF:/title></head>\n<body>\n<h1>Error\x20404:\x20Not\x20Found</h1>\nThe\x20
SF:request\x20could\x20not\x20be\x20completed\x20because:\n\x20Document\x2
SF:0not\x20found!\n</body>\n</html>\n")%r(FourOhFourRequest,11E,"HTTP/1\.0
SF:\x20404\x20Not\x20Found\r\nConnection:\x20close\r\nServer:\x20Http\x20S
SF:erver\r\nContent-Type:\x20text/html\r\nContent-Length:\x20174\r\n\r\n<h
SF:tml>\n<head><title>Server\x20error\x20message</title></head>\n<body>\n<
SF:h1>Error\x20404:\x20Not\x20Found</h1>\nThe\x20request\x20could\x20not\x
SF:20be\x20completed\x20because:\n\x20Document\x20not\x20found!\n</body>\n
SF:</html>\n");
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: media device|specialized|WAP|security-misc
Running (JUST GUESSING): Linux 3.X|2.6.X (88%), Hikvision embedded (87%), Imperva SecureSphere (86%)
OS CPE: cpe:/o:linux:linux_kernel:3.0 cpe:/o:linux:linux_kernel:2.6.10 cpe:/h:hikvision:ds-7600 cpe:/o:linux:linux_kernel:3.10 cpe:/o:imperva:securesphere
Aggressive OS guesses: Linux 3.0 (88%), HIKVISION DS-7600 Linux Embedded NVR (Linux 2.6.10) (87%), DD-WRT v24-sp2 (Linux 3.10) (87%), Linux 2.6.32 (86%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 20 hops

TRACEROUTE (using port 53/tcp)
HOP RTT      ADDRESS
1   1.83 ms  bogon (192.168.6.1)
2   2.69 ms  bogon (192.168.169.9)
3   2.12 ms  bogon (192.168.169.1)
4   4.01 ms  hn.kd.ny.adsl (123.14.80.1)
5   3.74 ms  hn.kd.ny.adsl (125.40.240.77)
6   5.07 ms  pc73.zz.ha.cn (61.168.37.73)
7   ...
8   17.91 ms dns2.online.tj.cn (117.8.222.2)
9   30.42 ms no-data (125.39.198.178)
10  ... 19
20  20.12 ms pdns.dnspod.cn (119.29.29.29)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 164.97 seconds
```

### 10、Nmap 命令混合式扫描

```
$ nmap -vv -p1-1000 -O <target ip>
$ nmap -vv -p1-50 -O 192.168.41.41
Starting Nmap 7.80 ( https://nmap.org ) at 2021-01-26 17:12 CST
Initiating ARP Ping Scan at 17:12
Scanning 192.168.41.41 [1 port]
Completed ARP Ping Scan at 17:12, 0.01s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 17:12
Completed Parallel DNS resolution of 1 host. at 17:12, 0.00s elapsed
Initiating SYN Stealth Scan at 17:12
Scanning bogon (192.168.41.41) [50 ports]
Discovered open port 23/tcp on 192.168.41.41
Increasing send delay for 192.168.41.41 from 0 to 5 due to 13 out of 43 dropped probes since last increase.
Completed SYN Stealth Scan at 17:12, 4.52s elapsed (50 total ports)
Initiating OS detection (try #1) against bogon (192.168.41.41)
Retrying OS detection (try #2) against bogon (192.168.41.41)
Retrying OS detection (try #3) against bogon (192.168.41.41)
Retrying OS detection (try #4) against bogon (192.168.41.41)
Retrying OS detection (try #5) against bogon (192.168.41.41)
Nmap scan report for bogon (192.168.41.41)
Host is up, received arp-response (0.0030s latency).
Scanned at 2021-01-26 17:12:37 CST for 16s

PORT   STATE    SERVICE     REASON
1/tcp  closed   tcpmux      reset ttl 64
2/tcp  filtered compressnet no-response
3/tcp  closed   compressnet reset ttl 64
4/tcp  closed   unknown     reset ttl 64
5/tcp  closed   rje         reset ttl 64
6/tcp  closed   unknown     reset ttl 64
7/tcp  closed   echo        reset ttl 64
8/tcp  closed   unknown     reset ttl 64
9/tcp  closed   discard     reset ttl 64
10/tcp closed   unknown     reset ttl 64
11/tcp closed   systat      reset ttl 64
12/tcp closed   unknown     reset ttl 64
13/tcp closed   daytime     reset ttl 64
14/tcp closed   unknown     reset ttl 64
15/tcp closed   netstat     reset ttl 64
16/tcp closed   unknown     reset ttl 64
17/tcp closed   qotd        reset ttl 64
18/tcp closed   msp         reset ttl 64
19/tcp closed   chargen     reset ttl 64
20/tcp closed   ftp-data    reset ttl 64
21/tcp closed   ftp         reset ttl 64
22/tcp closed   ssh         reset ttl 64
23/tcp open     telnet      syn-ack ttl 64
24/tcp closed   priv-mail   reset ttl 64
25/tcp closed   smtp        reset ttl 64
26/tcp closed   rsftp       reset ttl 64
27/tcp closed   nsw-fe      reset ttl 64
28/tcp closed   unknown     reset ttl 64
29/tcp closed   msg-icp     reset ttl 64
30/tcp closed   unknown     reset ttl 64
31/tcp closed   msg-auth    reset ttl 64
32/tcp closed   unknown     reset ttl 64
33/tcp closed   dsp         reset ttl 64
34/tcp closed   unknown     reset ttl 64
35/tcp closed   priv-print  reset ttl 64
36/tcp closed   unknown     reset ttl 64
37/tcp closed   time        reset ttl 64
38/tcp closed   rap         reset ttl 64
39/tcp closed   rlp         reset ttl 64
40/tcp closed   unknown     reset ttl 64
41/tcp closed   graphics    reset ttl 64
42/tcp closed   nameserver  reset ttl 64
43/tcp closed   whois       reset ttl 64
44/tcp closed   mpm-flags   reset ttl 64
45/tcp closed   mpm         reset ttl 64
46/tcp closed   mpm-snd     reset ttl 64
47/tcp closed   ni-ftp      reset ttl 64
48/tcp filtered auditd      no-response
49/tcp closed   tacacs      reset ttl 64
50/tcp closed   re-mail-ck  reset ttl 64
MAC Address: 00:11:22:33:44:41 (Cimsys)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.80%E=4%D=1/26%OT=23%CT=1%CU=37223%PV=Y%DS=1%DC=D%G=Y%M=001122%T
OS:M=600FDD15%P=x86_64-redhat-linux-gnu)SEQ(SP=105%GCD=1%ISR=10C%TI=Z%CI=RD
OS:%TS=A)SEQ(SP=104%GCD=1%ISR=10C%TI=Z%CI=RI%II=I%TS=A)OPS(O1=M5A0ST11NW7%O
OS:2=M5A0ST11NW7%O3=M5A0NNT11NW7%O4=M5A0ST11NW7%O5=M5A0ST11NW7%O6=M5A0ST11)
OS:WIN(W1=6F90%W2=6F90%W3=6F90%W4=6F90%W5=6F90%W6=6F90)ECN(R=Y%DF=Y%T=40%W=
OS:7080%O=M5A0NNSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=Y%
OS:DF=Y%T=2B%W=80%S=A%A=Z%F=R%O=WANM109T10S%RD=0%Q=)T3(R=N)T4(R=Y%DF=Y%T=38
OS:%W=400%S=A%A=Z%F=R%O=WANM109T10S%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0%S=A%A=S+%F
OS:=AR%O=%RD=0%Q=)T5(R=N)T6(R=Y%DF=Y%T=34%W=8000%S=A%A=Z%F=R%O=WANM109T10S%
OS:RD=0%Q=)T7(R=Y%DF=N%T=26%W=FFFF%S=A%A=Z%F=R%O=WFNM109T10S%RD=0%Q=)U1(R=Y
OS:%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T
OS:=40%CD=S)

Uptime guess: 34.815 days (since Tue Dec 22 21:38:45 2020)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=261 (Good luck!)
IP ID Sequence Generation: All zeros

Read data files from: /usr/bin/../share/nmap
OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.95 seconds
           Raw packets sent: 187 (12.130KB) | Rcvd: 159 (10.202KB)
```

## 参考文献
- Nmap基础教程：https://wooyun.js.org/drops/NMAP%20%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B.html
- 利用 Nmap 实现快速的网络发现与管理：https://developer.ibm.com/zh/articles/os-cn-nmap/
- Nmap 中文手册 - Nmap 中文网：http://www.nmap.com.cn/doc/manual.shtm#4