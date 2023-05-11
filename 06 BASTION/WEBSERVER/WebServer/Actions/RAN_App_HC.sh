#!/bin/bash

echo "------------------------------------------------------------------"
echo "Application status"
echo "------------------------------------------------------------------"
echo ""
echo "##### UERANSIM #####"
echo ""
sudo ps | grep nr

echo "------------------------------------------------------------------"
echo "Config files"
echo "------------------------------------------------------------------"
echo ""
echo "##### main folder #####"
echo ""
ls -lh UERANSIM/
echo ""
echo "##### configuration #####"
echo ""
ls -lh UERANSIM/config
echo ""
echo "##### executables #####"
echo ""
#cksum after to check (use for)
ls -lh UERANSIM/build

echo "------------------------------------------------------------------"
echo "Application service"
echo "------------------------------------------------------------------"
echo ""
echo "##### NRF #####"
echo ""
sudo ./UERANSIM/build/nr-cli --dump


