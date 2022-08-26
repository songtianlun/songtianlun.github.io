---
title: "Libpcap 落地包转发及性能调优"
categories: [ "编程开发" ]
tags: [ "libpcap" ]
draft: false
slug: "570"
date: "2021-09-07 15:34:30"
---

近期接到一个需求，需要使用 libpcap 从某网卡抓包发送到另一张网卡，关于 libpcap 的使用方法在这里不再赘述，网上有很多教程，本文最后会给出一个示例程序。这里记录一个转发效率性能调优的方法。

在写好程序后，发现 Ping 的延时很高，优化了一个参数后得到了极大的改善了。

![https://imagehost-cdn.frytea.com/images/2021/03/17/_16159857327845a539b65d50119ba.png](https://imagehost-cdn.frytea.com/images/2021/03/17/_16159857327845a539b65d50119ba.png)

发现是自己在使用这个函数打开网络设备时的超时时间设定不合理导致的：

```
函数名称： pcap_t *pcap_open_live(char *device, int snaplen, int promisc, int to_ms, char *ebuf)
函数功能：获得用于捕获网络数据包的数据包捕获描述字。
参数说明：device参数为指定打开的网络设备名。snaplen参数定义捕获数据的最大字节数。promisc指定是否将网络接口置于混杂模式。toms参数指*定超时时间（毫秒）。ebuf参数则仅在pcapopen_live()函数出错返回NULL时用于传递错误消息。
```

我将其中的第四个参数，由之前的 `1000` 改为 `1` ，性能得到极大改善。下面给出示例程序：

```python
/*************************************************************************
        > File Name : pcap_example.c
        > Author : TL Song
        > EMail : songtianlun@frytea.com
        > Created Time : Thu Feb 18 18:57:20 2021
     ************************************************************************/
    #include <stdio.h>
    #include <string.h>
    #include <pthread.h>
    #include <pcap.h>
     
    #define RECV_DEVICE      "ens3"
    #define RECV_DEVICE_SEND "docker0"
    #define RECV_FILTER      "arp or icmp"
     
    #define dPrint(fmt, ...) do{fprintf(stderr, "[%s:%d] " fmt "\r\n", __FUNCTION__, __LINE__, ##__VA_ARGS__);}while(0)
     
    int main()
    {
        char err_buf[PCAP_ERRBUF_SIZE];
        struct bpf_program fp_recv;      /* The compiled filter expression */
        char filter_recv[] = RECV_FILTER;  /* The filter expression (filter 53 port)*/
        pcap_t *handle_recv;
        pcap_t *handle_recv_send;
        bpf_u_int32 mask_recv;       /* The netmask of our sniffing device */
        bpf_u_int32 net_recv;        /* The IP of our sniffing device */
        u_char *pkt_data = NULL;
        int rst;
        struct pcap_pkthdr header;
        struct pcap_pkthdr *p_header = &header;
     
        printf("Recv Device: %s\n", RECV_DEVICE);
     
        /*Step1, Open the session in promiscuous mode*/
        handle_recv = pcap_open_live(RECV_DEVICE, BUFSIZ, 1, 1, err_buf);
        if (handle_recv == NULL) {
            fprintf(stderr, "Couldn't open device %s: %s\n", RECV_DEVICE, err_buf);
            return 0;
        }
     
        handle_recv_send = pcap_open_live(RECV_DEVICE_SEND, BUFSIZ, 1, 1, err_buf);
        if (handle_recv_send == NULL) {
            printf("Couldn't open device %s: %s\n", RECV_DEVICE_SEND, err_buf);
            return 0;
        }
     
        /*Step2, get network mask*/
        if (pcap_lookupnet(RECV_DEVICE, &net_recv, &mask_recv, err_buf) == -1) {
            fprintf(stderr, "Can't get netmask for device %s\n", RECV_DEVICE);
            net_recv = 0;
            mask_recv = 0;
        }
     
        /* Step3, Compile and apply the filter */
        if (pcap_compile(handle_recv, &fp_recv, filter_recv, 0, net_recv) == -1) {
            fprintf(stderr, "Couldn't parse filter %s: %s\n", filter_recv, pcap_geterr(handle_recv));
            return 0;
        }
        if (pcap_setfilter(handle_recv, &fp_recv) == -1) {
            fprintf(stderr, "Couldn't install filter %s: %s\n", filter_recv, pcap_geterr(handle_recv));
            return 0;
        }
     
        /* Step4, get frame. */
        while(1){
            pkt_data = (unsigned char * )pcap_next(handle_recv, p_header);
            rst = pcap_sendpacket(handle_recv_send, pkt_data, p_header->caplen);
            printf("Send to %s ret : %d\n", RECV_DEVICE_SEND, rst);
        }
     
        /* Step5, cleanup */
        pcap_freecode(&fp_recv);
        pcap_close(handle_recv);
        pcap_close(handle_recv_send);
        dPrint("Capture complete.");
        return 0;
    }
```

## 参考文献

- [libpcap应用实例](https://blog.csdn.net/Leeboy_Wang/article/details/50582561)