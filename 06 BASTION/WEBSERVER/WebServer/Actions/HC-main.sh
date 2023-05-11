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
UE_HOST=LAAS-GENESIS-UE-1

# Define functions for each action

function info-collect {
	echo "-------------------------------------------------------------"
	echo "Collecting info"
	echo "-------------------------------------------------------------"
	mkdir $FOLDER/Service_HC/$CP_HOST-Logs
	mkdir $FOLDER/Service_HC/$UP1_HOST-Logs
	mkdir $FOLDER/Service_HC/$UP2_HOST-Logs
	scp $CP_HOST:/home/"$CP_USER"/$CP_HOST-$FOLDER.pcap ./$FOLDER/Service_HC/$CP_HOST-$FOLDER.pcap
	scp $CP_HOST:/home/"$CP_USER"/open5gs/install/var/log/open5gs/*.log ./$FOLDER/Service_HC/$CP_HOST-Logs/
	scp $UP1_HOST:/home/"$UP1_USER"/$UP1_HOST-$FOLDER.pcap ./$FOLDER/Service_HC/$UP1_HOST-$FOLDER.pcap
	scp $UP1_HOST:/home/"$UP1_USER"/Desktop/open5gs/install/var/log/open5gs/*.log ./$FOLDER/Service_HC/$UP1_HOST-Logs/
	scp $UP2_HOST:/home/"$UP2_USER"/$UP2_HOST-$FOLDER.pcap ./$FOLDER/Service_HC/$UP2_HOST-$FOLDER.pcap
	scp $UP2_HOST:/home/"$UP2_USER"/Desktop/open5gs/install/var/log/open5gs/*.log ./$FOLDER/Service_HC/$UP2_HOST-Logs/
	sleep 2
}

function cleanup {
	#Cleanup
	echo "-------------------------------------------------------------"
	echo "Clearing logs"
	echo "-------------------------------------------------------------"
	ssh $CP_HOST sudo -S rm open5gs/install/var/log/open5gs/*.log
	ssh $UP1_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
	ssh $UP2_HOST sudo -S rm Desktop/open5gs/install/var/log/open5gs/*.log
	ssh $CP_HOST sudo -S rm *.pcap
	ssh $UP1_HOST sudo -S rm *.pcap
	ssh $UP2_HOST sudo -S rm *.pcap
	sleep 1
}

function CP-launch {
	echo "-------------------------------------------------------------"
	echo "Launching 5G Core - Control Plane"
	echo "-------------------------------------------------------------"
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-nrfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-udrd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-udmd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-pcfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-nssfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-bsfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-ausfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-amfd &
	sleep 1
	ssh $CP_HOST sudo /home/$CP_USER/open5gs/install/bin/open5gs-smfd &
	sleep 1
#	ssh $CP_HOST 'sudo bash -s' < LaunchOpen5GS.sh &
	sleep 3
}

function CP-stop {
	#Stop NFs
	echo "-------------------------------------------------------------"
	echo "Stopping 5G Core - Control Plane"
	echo "-------------------------------------------------------------"
	ssh $CP_HOST sudo killall open5gs-amfd &
	ssh $CP_HOST sudo killall open5gs-smfd &
	ssh $CP_HOST sudo killall open5gs-ausfd &
	ssh $CP_HOST sudo killall open5gs-udmd &
	ssh $CP_HOST sudo killall open5gs-pcfd &
	ssh $CP_HOST sudo killall open5gs-nssfd &
	ssh $CP_HOST sudo killall open5gs-bsfd &
	ssh $CP_HOST sudo killall open5gs-udrd &
	ssh $CP_HOST sudo killall open5gs-nrfd &
	sleep 1
}

function UP-launch {
	echo "-------------------------------------------------------------"
	echo "Launching 5G Core - User Plane"
	echo "-------------------------------------------------------------"
	ssh $UP1_HOST sudo /home/$UP1_USER/Desktop/open5gs/install/bin/open5gs-upfd &
	sleep 1
	ssh $UP2_HOST sudo /home/$UP2_USER/Desktop/open5gs/install/bin/open5gs-upfd &
	sleep 3
}

function UP-stop {
	#Stop NFs
	echo "-------------------------------------------------------------"
	echo "Stopping 5G Core - User Plane"
	echo "-------------------------------------------------------------"
	ssh $UP1_HOST sudo killall open5gs-upfd &
	ssh $UP2_HOST sudo killall open5gs-upfd &
	sleep 1
}

function gNB-launch {
	echo "-------------------------------------------------------------"
	echo "Launching RAN - gNB"
	echo "-------------------------------------------------------------"
	ssh $gNB_HOST "sudo /home/$gNB_USER/UERANSIM/build/nr-gnb -c /home/ueransim/UERANSIM/config/open5gs-gnb.yaml" &
	sleep 3
}

function gNB-stop {
	#Stop NFs
	echo "-------------------------------------------------------------"
	echo "Stopping RAN - gNB"
	echo "-------------------------------------------------------------"
	ssh $gNB_HOST sudo sudo killall nr-gnb &
	sleep 1
}

function UEs-launch {
	echo "-------------------------------------------------------------"
	echo "Launching RAN - UEs"
	echo "-------------------------------------------------------------"
	ssh $gNB_HOST "sudo /home/$UE_USER/UERANSIM/build/nr-ue -c /home/$UE_USER/UERANSIM/config/open5gs-ue-021.yaml &" &
	sleep 1
	ssh $gNB_HOST "sudo /home/$UE_USER/UERANSIM/build/nr-ue -c /home/$UE_USER/UERANSIM/config/open5gs-ue-022.yaml &" &
	sleep 1
	ssh $gNB_HOST "sudo /home/$UE_USER/UERANSIM/build/nr-ue -c /home/$UE_USER/UERANSIM/config/open5gs-ue-023.yaml &" &
	sleep 1
	ssh $gNB_HOST "sudo /home/$UE_USER/UERANSIM/build/nr-ue -c /home/$UE_USER/UERANSIM/config/open5gs-ue-024.yaml &" &
	sleep 3
}

function UEs-stop {
	#Stop NFs
	echo "-------------------------------------------------------------"
	echo "Stopping RAN - UE(s)"
	echo "-------------------------------------------------------------"
	ssh $gNB_HOST sudo killall nr-ue &
	ssh $gNB_HOST sudo killall nr-ue &
	ssh $gNB_HOST sudo killall nr-ue &
	ssh $gNB_HOST sudo killall nr-ue &
	sleep 1
}

function VM_HC {
	VM_LOG=$FOLDER/VM_HC/VM_HC-$FOLDER.log

    echo ""
	echo "-----------------------------------------------------------------------"
	echo "Executing VM HC"
	echo "-----------------------------------------------------------------------"

	(
	echo "-------------------------------------------------------------"
	echo "Executing tests"
	echo "-------------------------------------------------------------"
	echo "##### $CP_HOST #####"
	ssh $CP_HOST 'bash -s' < VM_HC.sh &>> $FOLDER/VM_HC/"$CP_HOST"-VM_HC.log
	) &>> $VM_LOG
	echo ".........."
	(
	echo "##### $UP1_HOST #####"
	ssh $UP1_HOST 'bash -s' < VM_HC.sh &>> $FOLDER/VM_HC/"$UP1_HOST"-VM_HC.log
	) &>> $VM_LOG
	echo "...................."
	(
	echo "##### $UP2_HOST #####"
	ssh $UP2_HOST 'bash -s' < VM_HC.sh &>> $FOLDER/VM_HC/"$UP2_HOST"-VM_HC.log
	) &>> $VM_LOG
    echo ".............................."
	(
	echo "##### $gNB_HOST #####"
	ssh $gNB_HOST 'bash -s' < VM_HC.sh &>> $FOLDER/VM_HC/"$gNB_HOST"-VM_HC.log
	) &>> $VM_LOG
    echo "........................................"
	(
	echo "##### $UE_HOST #####"
	ssh $UE_HOST 'bash -s' < VM_HC.sh &>> $FOLDER/VM_HC/"$UE_HOST"-VM_HC.log
	) &>> $VM_LOG
    echo ".................................................."
	echo "Finished VM HC"
}

function App_HC {
	APP_LOG=$FOLDER/App_HC/App_HC-$FOLDER.log

	echo ""
    echo "-----------------------------------------------------------------------"
    echo "Executing App HC"
    echo "-----------------------------------------------------------------------"

	(
	#Initializing
	gNB-stop
	UP-stop
	CP-stop
	cleanup
	) &>> $APP_LOG
	echo ".........."

	(
	#Starting NFs
	CP-launch
	UP-launch
	gNB-launch
	) &>> $APP_LOG
	echo "...................."

	(
	#HC execution
	echo "-------------------------------------------------------------"
	echo "Executing tests"
	echo "-------------------------------------------------------------"
	echo "##### $CP_HOST #####"
	ssh $CP_HOST 'bash -s' < App_HC.sh &>> $FOLDER/App_HC/$CP_HOST-App_HC.log
	sleep 1
	echo "##### $UP1_HOST #####"
	ssh $UP1_HOST 'bash -s' < UP_App_HC.sh &>> $FOLDER/App_HC/$UP1_HOST-App_HC.log
	sleep 1
	echo "##### $UP2_HOST #####"
	ssh $UP2_HOST 'bash -s' < UP_App_HC.sh &>> $FOLDER/App_HC/$UP2_HOST-App_HC.log
	sleep 1
	echo "##### $gNB_HOST #####"
	ssh $gNB_HOST 'bash -s' < RAN_App_HC.sh &>> $FOLDER/App_HC/$gNB_HOST-App_HC.log
	sleep 1
	echo "##### $UE_HOST #####"
	ssh $UE_HOST 'bash -s' < RAN_App_HC.sh &>> $FOLDER/App_HC/$UE_HOST-App_HC.log
	sleep 1
	) &>> $APP_LOG
    echo ".............................."

	(
	#Stopping NFs
	gNB-stop
	UP-stop
	CP-stop
	cleanup
	) &>> $APP_LOG
    echo "........................................"

    echo ".................................................."

	echo "Finished App HC"
}

function Service_HC {
	SERVICE_LOG=$FOLDER/Service_HC/Service_HC-$FOLDER.log
	
    echo ""
	echo "-----------------------------------------------------------------------"
    echo "Executing E2E Service HC"
    echo "-----------------------------------------------------------------------"
	
	(
	#Initializing
	gNB-stop
	CP-stop
	UP-stop
	cleanup
	
	#Capture
	echo "-------------------------------------------------------------"
	echo "Capturing"
	echo "-------------------------------------------------------------"
	echo "----------CP VM----------"
	ssh $CP_HOST sudo -S timeout 55 tcpdump -nni any -U -w $CP_HOST-$FOLDER.pcap 'not port 22' &
	sleep 1
	echo "----------UP VM----------"
	ssh $UP1_HOST sudo -S timeout 54 tcpdump -nni any -U -w $UP1_HOST-$FOLDER.pcap 'not port 22' &
	ssh $UP2_HOST sudo -S timeout 54 tcpdump -nni any -U -w $UP2_HOST-$FOLDER.pcap 'not port 22' &
	sleep 1
	) &>> $SERVICE_LOG
	echo ".........."

	(
	#Starting NFs
	CP-launch
	UP-launch
	gNB-launch
	UEs-launch

	#Traffic
	echo "-------------------------------------------------------------"
	echo "Ping test"
	echo "-------------------------------------------------------------"
	echo "-----Google-----"
	ssh $gNB_HOST sudo ping google.com -I uesimtun0 -c 3
	ssh $gNB_HOST sudo ping google.com -I uesimtun1 -c 3
	ssh $gNB_HOST sudo ping google.com -I uesimtun2 -c 3
	ssh $gNB_HOST sudo ping google.com -I uesimtun3 -c 3
	sleep 1
	echo "-----Youtube-----"
	ssh $gNB_HOST sudo ping youtube.com -I uesimtun0 -c 3
	ssh $gNB_HOST sudo ping youtube.com -I uesimtun1 -c 3
	ssh $gNB_HOST sudo ping youtube.com -I uesimtun2 -c 3
	ssh $gNB_HOST sudo ping youtube.com -I uesimtun3 -c 3
	sleep 3
	echo "-------------------------------------------------------------"
	echo "Browse test"
	echo "-------------------------------------------------------------"
	echo "----------Google----------"
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun0 google.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun1 google.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun2 google.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun3 google.com
	echo ""
	sleep 1
	echo "----------Others----------"
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun0 att.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun1 apple.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun2 aws.com
	echo ""
	ssh $gNB_HOST timeout 2 sudo curl --interface uesimtun3 azure.microsoft.com
	echo ""
	#sudo sh nr-binder 10.45.0.2 curl google.com
	sleep 3

	#Initializing
	UEs-stop
	gNB-stop
	CP-stop
	UP-stop
	cleanup
	) &>> $SERVICE_LOG
	echo "...................."

	#Sync pcaps and execution
	sleep 5

	(
	#Getting traces and logs
	info-collect
	sleep 2
	) &>> $SERVICE_LOG
    echo ".............................."

	(
	#Cleanup
	cleanup
	sleep 2
	) &>> $SERVICE_LOG
    echo "........................................"
    echo ".................................................."

	echo "Finished Service HC"
}

#Initializing
echo "------------------------------------------------------------------"
echo "Initializing"
echo "------------------------------------------------------------------"
EXECUTION="$(date '+%Y%m%d-%H%M%S')"
FOLDER="LAAS-GENESIS-HC_$EXECUTION"
mkdir $FOLDER
mkdir $FOLDER/VM_HC
mkdir $FOLDER/App_HC
mkdir $FOLDER/Service_HC
rm -rf *.log
clear
LOG="$FOLDER/"$FOLDER".log"
(

echo ""
echo "*************************************************************************"
echo "*********		(LaaS) Health Check v23Q2.1		*********"
echo "*************************************************************************"

# Perform action(s) based on user input
while true; do
# Display menu and read user input
  echo "-----------------------------------------------------------------------"
  echo "$EXECUTION Specify Health Check (HC) scenario number:"
  echo "-----------------------------------------------------------------------"
  echo -e "1) VM HC\n2) Application HC\n3) Service HC\n4) All HCs\n"
  read -p "Enter your choice (1-4): " choice
  case $choice in
  	1)
  		VM_HC
  		break
		;;
  	2)
  		App_HC
  		break
  		;;
  	3)
  		Service_HC
  		break
  		;;
  	4)
  		VM_HC
  		App_HC
  		Service_HC
  		break
  		;;
  	*)
  		echo "Invalid choice. Please enter a number between 1 and 4."
  		;;
  esac
done
sudo tar czf "$FOLDER".tar.gz $FOLDER
rm -rf $FOLDER
echo ""
echo "-----------------------------------------------------------------------"
echo "Task(s) completed successfully. Please download file $FOLDER.tar.gz to check results"
echo "-----------------------------------------------------------------------"

) |& tee $LOG



