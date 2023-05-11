#!/bin/bash 
LOGFILE="/home/demo/open5gs/cp.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Stopping the CP NEs processes" >> $LOGFILE
killall open5gs-amfd
killall open5gs-smfd
killall open5gs-nrfd
killall open5gs-ausfd
killall open5gs-udmd
killall open5gs-pcfd
killall open5gs-nssfd
killall open5gs-bsfd
killall open5gs-udrd
sudo rm -f /var/tmp/logfile

