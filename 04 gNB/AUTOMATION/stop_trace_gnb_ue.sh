#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/gnb.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Stopping the trace on UE and gNB" >> $LOGFILE
sudo killall tcpdump >> $LOGFILE 2>&1


