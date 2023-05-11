#!/bin/bash
LOGFILE="/home/demo/open5gs/cp.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Stopping the cp trace" >> $LOGFILE
sudo killall tcpdump >> $LOGFILE 2>&1


