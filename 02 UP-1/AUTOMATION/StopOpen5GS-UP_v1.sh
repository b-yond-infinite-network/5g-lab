#!/bin/bash
LOGFILE="/home/up/Desktop/open5gs/up.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep open5gs | wc -l)
if [ $proc -ne 0 ]; then
        echo "$TIMESTAMP Stopping Open5GS UPFs" >> $LOGFILE
	killall open5gs-upfd >> $LOGFILE 2>&1
else
        echo "There are no running UPFs"
fi
