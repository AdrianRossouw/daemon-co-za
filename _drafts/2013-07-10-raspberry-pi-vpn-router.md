---
title: "Building a Rapberry Pi VPN and Personal Router"
published: true
---

## basic networking

1. resize partition
1. set up ssh access for remote login
1. reboot
1. set up a primary ip address (eth0)
    1. /etc/network/interfaces
1. reboot to make sure it sticks
1. set up ssh keys
1. set up secondary ip address (eth0:1)
1. reboot to make sure it sticks
1. get rid of screen.

## Router / Gateway

1. echo 1 > /proc/sys/net/ipv4/ip_forward
1. echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.d/default
1. /sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
1. /sbin/iptables -A FORWARD -i eth0 -o eth0:1 -m state --state RELATED,ESTABLISHED -j ACCEPT
1. /sbin/iptables -A FORWARD -i eth0:1 -o eth0 -j ACCEPT
1. apt-get install iptables-persistent

## DNS and DHCP

1.apt-get install dnsmasq
1. edit /etc/resolv.conf (lookup servers)
1. edit /etc/hosts  (local machines)
1. edit /etc/dnsmasq.d/default  (static ips)
1. turn off router's dhcp server
1. test with devices to see if they get the correct lease

# OpenVPN

1. apt-get install openvpn
1. Configure OpenVPN server (other tutorial)
1. Download settings tarball
1. mv files to /etc/openvpn
1. /etc/init.d/openvpn restart
1. /sbin/iptables -A FORWARD -i eth0:1  -o tun0 -j ACCEPT
1. iptables-save > /etc/iptables.d/rules.v4

# UPNP

1. apt-get install linux-igd
1. edit /etc/upnp.conf
1. edit /etc/defaults/linux-igd
1. /etc/init.d/linux-igd restart
1. (server side)iptables -t nat -A PREROUTING -d $external/32 -p tcp -m tcp --dport $low:$high
    -j DNAT --to-destination $internalTunnel:$low-$high
