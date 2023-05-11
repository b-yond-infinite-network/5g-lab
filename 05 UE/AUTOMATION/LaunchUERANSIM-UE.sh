#!/bin/bash

#Single UE
#/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-002.yaml &

#Slice test
/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-021.yaml &
sleep 1
/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-022.yaml &
sleep 1
/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-023.yaml &
sleep 1
/home/ueransim/UERANSIM/build/nr-ue -c /home/ueransim/UERANSIM/config/open5gs-ue-024.yaml &
sleep 1

