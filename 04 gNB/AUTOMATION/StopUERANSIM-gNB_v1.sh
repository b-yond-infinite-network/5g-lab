#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/gnb.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep nr-gnb | wc -l)
if [ $proc -ne 0 ]; then
        echo "$TIMESTAMP Stopping all gNBs" >> $LOGFILE
        killall nr-gnb & >> $LOGFILE 2>&1
else
        echo "There are no running gNBs"
fi
