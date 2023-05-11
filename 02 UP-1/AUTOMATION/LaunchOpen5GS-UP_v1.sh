#!/bin/bash
LOGFILE="/home/up/Desktop/open5gs/up.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep open5gs | wc -l)
if [ $proc -ne 0 ]; then
        echo "UP already launched"
else
        echo "$TIMESTAMP Starting Open5GS UP" >> $LOGFILE
	/home/up/Desktop/open5gs/install/bin/open5gs-upfd >> $LOGFILE 2>&1 &
fi
