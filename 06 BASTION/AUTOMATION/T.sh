#!/bin/bash
#Variables
OSS_USER=grafana
CP_USER=demo
UP1_USER=up
UP2_USER=up
gNB_USER=ueransim
UE_USER=ueransim

CP_HOST=LAAS-GENESIS-CP-1
UP1_HOST=LAAS-GENESIS-UP-1
UP2_HOST=LAAS-GENESIS-UP-2
gNB_HOST=LAAS-GENESIS-gNB-1
UE_HOST=LAAS-GENESIS-gNB-1


#Initializing
echo "\n-------------------------------------------------------------"
echo "Initializing"
echo "-------------------------------------------------------------"
ssh $UE_HOST sudo sh /home/"$UE_USER"/UERANSIM/StopUERANSIM-UE.sh &
sleep 1
ssh $gNB_HOST sudo sh /home/"$gNB_USER"/UERANSIM/StopUERANSIM-gNB.sh &
sleep 1
ssh $UP2_HOST sudo sh /home/"$UP2_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sleep 1
ssh $UP1_HOST sudo sh /home/"$UP1_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sleep 1
ssh $CP_HOST sudo sh /home/"$CP_USER"/open5gs/StopOpen5GS.sh &
sleep 1
#Cleanup
ssh $CP_HOST sudo -S rm open5gs/install/var/log/open5gs/*.log
ssh $UP1_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
ssh $UP2_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
sleep 2



####################################################

clear
echo "\n********************************************************"
echo "********************(LaaS) Remote testing v1.1********************"
echo "********************************************************"



#User input
echo "\n-------------------------------------------------------------"
echo "$(date -u) Enter filename for the test:"
echo "-------------------------------------------------------------"
read FILENAME



#Capture
echo "\n\n-------------------------------------------------------------"
echo "Capturing"
echo "-------------------------------------------------------------"
echo "\n----------CP VM----------"
ssh $CP_HOST sudo -S timeout 55 tcpdump -nni any -U -w LAAS-GENESIS-CP-1-$FILENAME.pcap 'not port 22' &
sleep 1
echo "\n----------UP VM----------"
ssh $UP1_HOST sudo -S timeout 54 tcpdump -nni any -U -w LAAS-GENESIS-UP-1-$FILENAME.pcap 'not port 22' &
ssh $UP2_HOST sudo -S timeout 54 tcpdump -nni any -U -w LAAS-GENESIS-UP-2-$FILENAME.pcap 'not port 22' &
sleep 1



#Launching 5G Core
echo "\n\n-------------------------------------------------------------"
echo "Launching 5G Core - Control Plane"
echo "-------------------------------------------------------------"
ssh $CP_HOST sudo sh /home/"$CP_USER"/open5gs/LaunchOpen5GS.sh &
sleep 5
echo "\n\n-------------------------------------------------------------"
echo "Launching 5G Core - User Plane"
echo "-------------------------------------------------------------"
ssh $UP1_HOST sudo -S sh /home/"$UP1_USER"/Desktop/open5gs/LaunchOpen5GS-UP.sh &
echo "\n"
sleep 2
ssh $UP2_HOST sudo -S sh /home/"$UP2_USER"/Desktop/open5gs/LaunchOpen5GS-UP.sh &
sleep 5



#Launching RAN
echo "\n\n-------------------------------------------------------------"
echo "Launching RAN - gNB"
echo "-------------------------------------------------------------"
ssh $UE_HOST sudo sh /home/"$gNB_USER"/UERANSIM/LaunchUERANSIM-gNB.sh &
sleep 3
echo "\n\n-------------------------------------------------------------"
echo "Launching RAN - UE"
echo "-------------------------------------------------------------"
ssh $UE_HOST sudo sh /home/"$UE_USER"/UERANSIM/LaunchUERANSIM-UE.sh &
sleep 3



echo "\n\n-------------------------------------------------------------"
echo "Ping test"
echo "-------------------------------------------------------------"
echo "\n-----Google-----"
ssh $UE_HOST sudo ping google.com -I uesimtun0 -c 3
ssh $UE_HOST sudo ping google.com -I uesimtun1 -c 3
ssh $UE_HOST sudo ping google.com -I uesimtun2 -c 3
ssh $UE_HOST sudo ping google.com -I uesimtun3 -c 3
sleep 1
echo "\n-----Youtube-----"
ssh $UE_HOST sudo ping youtube.com -I uesimtun0 -c 3
ssh $UE_HOST sudo ping youtube.com -I uesimtun1 -c 3
ssh $UE_HOST sudo ping youtube.com -I uesimtun2 -c 3
ssh $UE_HOST sudo ping youtube.com -I uesimtun3 -c 3
sleep 4



echo "\n\n-------------------------------------------------------------"
echo "Browse test"
echo "-------------------------------------------------------------"
echo "\n----------Google----------"
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun0 google.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun1 google.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun2 google.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun3 google.com
echo "\n"
sleep 1
echo "\n----------Others----------"
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun0 att.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun1 apple.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun2 aws.com
echo "\n"
ssh $UE_HOST timeout 5 sudo curl --interface uesimtun3 azure.microsoft.com
echo "\n"
#sudo sh nr-binder 10.45.0.2 curl google.com
sleep 4



#Stopping RAN
echo "\n\n-------------------------------------------------------------"
echo "Stopping RAN - UE"
echo "-------------------------------------------------------------"
ssh $UE_HOST sudo sh /home/"$UE_USER"/UERANSIM/StopUERANSIM-UE.sh &
sleep 3
echo "\n\n-------------------------------------------------------------"
echo "Stopping RAN - gNB"
echo "-------------------------------------------------------------"
ssh $gNB_HOST sudo sh /home/"$gNB_USER"/UERANSIM/StopUERANSIM-gNB.sh &
sleep 3



#Stopping 5G Core
echo "\n\n-------------------------------------------------------------"
echo "Stopping 5G Core - User Plane"
echo "-------------------------------------------------------------"
ssh $UP1_HOST sudo sh /home/"$UP1_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sleep 3
ssh $UP2_HOST sudo sh /home/"$UP2_USER"/Desktop/open5gs/StopOpen5GS-UP.sh &
sleep 5
echo "\n\n-------------------------------------------------------------"
echo "Stopping 5G Core - Control Plane"
echo "-------------------------------------------------------------"
ssh $CP_HOST sudo sh /home/"$CP_USER"/open5gs/StopOpen5GS.sh &
sleep 5



#Getting traces and logs
echo "\n\n-------------------------------------------------------------"
echo "Collecting info"
echo "-------------------------------------------------------------"
mkdir $FILENAME
mkdir $FILENAME/LAAS-GENESIS-CP-1-"$FILENAME"-Logs
mkdir $FILENAME/LAAS-GENESIS-UP-1-"$FILENAME"-Logs
mkdir $FILENAME/LAAS-GENESIS-UP-2-"$FILENAME"-Logs
scp $CP_HOST:/home/"$CP_USER"/LAAS-GENESIS-CP-1-"$FILENAME".pcap /home/ubuntu/"$FILENAME"/LAAS-GENESIS-CP-1-"$FILENAME".pcap
scp $CP_HOST:/home/"$CP_USER"/open5gs/install/var/log/open5gs/*.log /home/ubuntu/"$FILENAME"/LAAS-GENESIS-CP-1-"$FILENAME"-Logs/
scp $UP1_HOST:/home/"$UP1_USER"/LAAS-GENESIS-UP-1-"$FILENAME".pcap /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-1-"$FILENAME".pcap
scp $UP1_HOST:/home/"$UP1_USER"/Desktop/open5gs/install/var/log/open5gs/*.log /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-1-"$FILENAME"-Logs/
scp $UP2_HOST:/home/"$UP2_USER"/LAAS-GENESIS-UP-2-"$FILENAME".pcap /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-2-"$FILENAME".pcap
scp $UP2_HOST:/home/"$UP2_USER"/Desktop/open5gs/install/var/log/open5gs/*.log /home/ubuntu/"$FILENAME"/LAAS-GENESIS-UP-2-"$FILENAME"-Logs/
sleep 2



#Cleanup
echo "\n\n-------------------------------------------------------------"
echo "Cleanup"
echo "-------------------------------------------------------------"
ssh $CP_HOST sudo -S rm *.pcap
ssh $CP_HOST sudo -S rm open5gs/install/var/log/open5gs/*.log
ssh $UP1_HOST sudo -S rm *.pcap
ssh $UP1_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
ssh $UP2_HOST sudo -S rm *.pcap
ssh $UP2_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
sleep 2



echo "\n\n**********************************************"
echo "$(date -u) Test finished"
echo "**********************************************"

