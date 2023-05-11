#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/gnb.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep gnb | wc -l)
echo "$TIMESTAMP already have $proc gNB instances running, starting one more instance" >> $LOGFILE
/home/ueransim/UERANSIM/build/nr-gnb -c /home/ueransim/UERANSIM/config/open5gs-gnb.yaml >> $LOGFILE 2>&1 &
#/home/ueransim/UERANSIM/build/nr-gnb -c /home/ueransim/UERANSIM/config/open5gs-gnb1.yaml >> $LOGFILE 2>&1 &
