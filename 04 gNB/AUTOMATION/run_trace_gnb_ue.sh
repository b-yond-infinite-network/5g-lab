#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/gnb.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Starting trace on UE and gNB" >> $LOGFILE 
sudo tcpdump -nni any -U -w /home/ueransim/IBTF_attach_ue_gnb.pcap >> $LOGFILE 2>&1 &
