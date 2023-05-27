---
title: "服务器使用 systemd 自动启动 wireguard"
categories: [ "技术" ]
tags: [  ]
draft: false
slug: "761"
date: "2023-03-27 23:34:04"
---

1. Generate a valid and working WireGuard configuration file /etc/wireguard/wg0.conf. Our setup guide offers details.    Note: You may have to replace the Endpoint hostname with the WireGuard server IP address in the WireGuard configuration file. DNS may or may not be applied when systemd brings the wg0 interface up.
2. Add the WireGuard service to systemd     
```
   sudo systemctl enable wg-quick@wg0.service
   sudo systemctl daemon-reload
```
3. Start the new service immediately:     
```
sudo systemctl start wg-quick@wg0
```
4. Reboot your computer system to verify the automatic connection on startup works as expected.
5. Check the service status:    
```
   systemctl status wg-quick@wg0
```
6. To remove the service and clean up the system:    
```
sudo systemctl stop wg-quick@wg0
sudo systemctl disable wg-quick@wg0.service
sudo rm -i /etc/systemd/system/wg-quick@wg0*
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

## References

* [Autostart WireGuard in systemd](https://www.ivpn.net/knowledgebase/linux/linux-autostart-wireguard-in-systemd/)

