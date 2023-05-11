#!/bin/bash
LOGFILE="/home/demo/open5gs/cp.log"
TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
proc=$(sudo ps -A | grep open5gs | wc -l)
dbm=$(sudo ps -A | grep mongod | wc -l)
stopCP() {
		killall open5gs-amfd &
		killall open5gs-smfd & 
		killall open5gs-nrfd & 
		killall open5gs-ausfd &
		killall open5gs-udmd & 
		killall open5gs-pcfd & 
		killall open5gs-nssfd &
		killall open5gs-bsfd & 
		killall open5gs-udrd & 
}
if [ $proc -ne 0 ]; then
        echo "$TIMESTAMP Stopping the CP NEs processes" >> $LOGFILE
        stopCP >> $LOGFILE 2>&1
else
        echo "$TIMESTAMP The CP NEs are already down" >> $LOGFILE
fi
if [ $dbm -ne 0 ]; then
        echo "$TIMESTAMP Stopping mongo database process" >> $LOGFILE
        killall mongod >> $LOGFILE 2>&1
else
        echo "$TIMESTAMP The mongo db process is already down" >> $LOGFILE
fi

