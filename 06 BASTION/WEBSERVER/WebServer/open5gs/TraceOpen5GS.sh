#!/bin/bash
echo "Content-type: text/html"
echo ""
#Variables
#LAAS-GENESIS-OSS-1		grafana		10.0.0.10
#LAAS-GENESIS-CP-1		demo		10.0.0.6
#LAAS-GENESIS-UP-1		up			10.0.0.7
#LAAS-GENESIS-gNB-1		ueransim	10.0.0.2
#LAAS-GENESIS-UE-1		ueransim	10.0.0.12
OSS_IP=10.0.0.10
OSS_USER=grafana
OSS_PASS=grafana
CP_IP=10.0.0.6
CP_USER=demo
CP_PASS=demo
UP_IP=10.0.0.7
UP_USER=up
UP_PASS=up
gNB_IP=10.0.0.2
gNB_USER=ueransim
gNB_PASS=ueransim
UE_IP=10.0.0.2
UE_USER=ueransim
UE_PASS=ueransim
#Initializing

sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo sh /home/"$UP_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo sh /home/"$CP_USER"/open5gs/StopOpen5GS.sh &
sshpass -p $UE_PASS ssh $UE_USER@$UE_IP sudo sh /home/"$UE_USER"/UERANSIM/StopUERANSIM-UE.sh &
sshpass -p $gNB_PASS ssh $gNB_USER@$gNB_IP sudo sh /home/"$gNB_USER"/UERANSIM/StopUERANSIM-gNB.sh &
sleep 1



####################################################

clear
echo "**********************************************\n"
echo "**********(LaaS) Remote testing v1.0**********\n"
echo "**********************************************"



#User input
echo "\n----------------------------------------------"
echo "$(date -u) Enter filename for the test:"
echo "----------------------------------------------"
read FILENAME



#Capture
echo "\n\n----------------------------------------------"
echo "Capturing"
echo "----------------------------------------------"
echo "\n-----CP VM-----"
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo -S timeout 40 tcpdump -nni any -U -w LAAS-GENESIS-CP-1-$FILENAME.pcap 'not port 22' &
sleep 1
echo "\n-----UP VM-----"
sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo -S timeout 39 tcpdump -nni any -U -w LAAS-GENESIS-UP-1-$FILENAME.pcap 'not port 22' &
sleep 1



#Launching 5G Core
echo "\n\n----------------------------------------------"
echo "Launching 5G Core - Control Plane"
echo "----------------------------------------------"
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo sh /home/"$CP_USER"/open5gs/LaunchOpen5GS.sh &
sleep 4
echo "\n\n----------------------------------------------"
echo "Launching 5G Core - User Plane"
echo "----------------------------------------------"
sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo -S sh /home/"$UP_USER"/Desktop/open5gs/LaunchOpen5GS-UP.sh &
sleep 3



#Launching RAN
echo "\n\n----------------------------------------------"
echo "Launching RAN - gNB"
echo "----------------------------------------------"
sshpass -p $gNB_PASS ssh $gNB_USER@$gNB_IP sudo sh /home/"$gNB_USER"/UERANSIM/LaunchUERANSIM-gNB.sh &
#sshpass -p ueransim ssh ueransim@10.0.0.2 sudo sh /home/ueransim/UERANSIM/LaunchUERANSIM-gNB.sh &
sleep 3
echo "\n\n----------------------------------------------"
echo "Launching RAN - UE"
echo "----------------------------------------------"
sshpass -p $UE_PASS ssh $UE_USER@$UE_IP sudo sh /home/"$UE_USER"/UERANSIM/LaunchUERANSIM-UE.sh &
sleep 3



echo "\n\n----------------------------------------------"
echo "Ping test"
echo "----------------------------------------------"
echo "\n-----Google-----"
sshpass -p ueransim ssh ueransim@10.0.0.2 sudo ping google.com -I uesimtun0 -c 3
sleep 2
echo "\n-----Yahoo-----"
sshpass -p ueransim ssh ueransim@10.0.0.2 sudo ping yahoo.com -I uesimtun0 -c 4
sleep 2



echo "\n\n----------------------------------------------"
echo "Browse test"
echo "----------------------------------------------"
echo "\n-----Google-----"
sshpass -p ueransim ssh ueransim@10.0.0.2 sudo sudo curl --interface uesimtun0 google.com
sleep 2
echo "\n-----Yahoo-----"
sshpass -p ueransim ssh ueransim@10.0.0.2 sudo sudo curl --interface uesimtun0 yahoo.com
#sudo sh nr-binder 10.45.0.2 curl google.com
sleep 5



#Stopping RAN
echo "\n\n----------------------------------------------"
echo "Stopping RAN - UE"
echo "----------------------------------------------"
sshpass -p $UE_PASS ssh $UE_USER@$UE_IP sudo sh /home/"$UE_USER"/UERANSIM/StopUERANSIM-UE.sh &
sleep 2
echo "\n\n----------------------------------------------"
echo "Stopping RAN - gNB"
echo "----------------------------------------------"
sshpass -p $gNB_PASS ssh $gNB_USER@$gNB_IP sudo sh /home/"$gNB_USER"/UERANSIM/StopUERANSIM-gNB.sh &
sleep 2



#Stopping 5G Core
echo "\n\n----------------------------------------------"
echo "Stopping 5G Core - User Plane"
echo "----------------------------------------------"
sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo sh /home/"$UP_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sleep 2
echo "\n\n----------------------------------------------"
echo "Stopping 5G Core - Control Plane"
echo "----------------------------------------------"
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo sh /home/"$CP_USER"/open5gs/StopOpen5GS.sh &
sleep 3



#Getting traces and logs
echo "\n\n----------------------------------------------"
echo "Collecting info"
echo "----------------------------------------------"
mkdir $FILENAME
mkdir $FILENAME/LAAS-GENESIS-CP-1-"$FILENAME"-Logs
mkdir $FILENAME/LAAS-GENESIS-UP-1-"$FILENAME"-Logs
sshpass -p $CP_PASS scp $CP_USER@$CP_IP:/home/"$CP_USER"/LAAS-GENESIS-CP-1-"$FILENAME".pcap /home/ubuntu/"$FILENAME"/LAAS-GENESIS-CP-1-"$FILENAME".pcap
sshpass -p $CP_PASS scp $CP_USER@$CP_IP:/home/"$CP_USER"/open5gs/install/var/log/open5gs/*.log /home/ubuntu/"$FILENAME"/LAAS-GENESIS-CP-1-"$FILENAME"-Logs/
sshpass -p $UP_PASS scp $UP_USER@$UP_IP:/home/"$UP_USER"/LAAS-GENESIS-UP-1-"$FILENAME".pcap /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-1-"$FILENAME".pcap
sshpass -p $UP_PASS scp $UP_USER@$UP_IP:/home/"$UP_USER"/Desktop/open5gs/install/var/log/open5gs/*.log /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-1-"$FILENAME"-Logs/
sleep 2



#Cleanup
echo "\n\n----------------------------------------------"
echo "Cleanup"
echo "----------------------------------------------"
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo -S rm *.pcap
sshpass -p $CP_PASS ssh $CP_USER@$CP_IP sudo -S rm open5gs/install/var/log/open5gs/*.log
sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo -S rm *.pcap
sshpass -p $UP_PASS ssh $UP_USER@$UP_IP sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
sleep 2



echo "\n\n**********************************************"
echo "$(date -u) Test finished"
echo "**********************************************"
output.tmp > "$FILENAME"/"$FILENAME".log
rm output.tmp

