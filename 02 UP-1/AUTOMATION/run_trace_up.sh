#!/bin/bash
LOGFILE="/home/up/Desktop/open5gs/up.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Starting up trace" >> $LOGFILE 
sudo tcpdump -nni any -U -w /home/up/IBTF_attach_up.pcap >> $LOGFILE 2>&1 &
