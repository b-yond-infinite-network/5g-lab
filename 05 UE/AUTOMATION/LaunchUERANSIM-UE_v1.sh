#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/ue.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep ue | wc -l)
echo "$TIMESTAMP already have $proc UEs running, now launching one more" >> $LOGFILE
/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-31.yaml >> $LOGFILE 2>&1 &
