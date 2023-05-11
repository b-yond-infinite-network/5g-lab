#!/bin/bash
LOGFILE="/home/up/Desktop/open5gs/up.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Stopping the up trace" >> $LOGFILE
sudo killall tcpdump >> $LOGFILE 2>&1


