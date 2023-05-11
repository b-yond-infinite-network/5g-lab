



#!/bin/bash
LOGFILE="/home/demo/open5gs/cp.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Starting up trace" >> $LOGFILE 
sudo tcpdump -nni any -U -w /home/demo/IBTF_attach_cp.pcap >> $LOGFILE 2>&1 &
