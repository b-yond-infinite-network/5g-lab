#!/bin/bash
LOGFILE="/home/ueransim/UERANSIM/ue.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep nr-ue | wc -l)
if [ $proc -ne 0 ]; then
        echo "$TIMESTAMP Stopping all UEss" >> $LOGFILE
        killall nr-ue & >> $LOGFILE 2>&1
else
        echo "There are no running UEs"
fi
