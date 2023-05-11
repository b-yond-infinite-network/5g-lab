#!/bin/bash 
LOGFILE="/home/demo/open5gs/cp.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
echo "$TIMESTAMP Launching the CP NFs" >> $LOGFILE
/home/demo/open5gs/install/bin/open5gs-amfd >> $LOGFILE 2>&1 & 
/home/demo/open5gs/install/bin/open5gs-smfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-nrfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-ausfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-udmd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-pcfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-nssfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-bsfd >> $LOGFILE 2>&1 &
/home/demo/open5gs/install/bin/open5gs-udrd >> $LOGFILE 2>&1 &

