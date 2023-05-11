#!/bin/bash

echo "------------------------------------------------------------------"
echo "Application status"
echo "------------------------------------------------------------------"
echo ""
echo "##### Open5gs #####"
echo ""
sudo ps | grep open5gs

echo "------------------------------------------------------------------"
echo "Config files"
echo "------------------------------------------------------------------"
echo ""
echo "##### main folder #####"
echo ""
ls -lh Desktop/open5gs/
echo ""
echo "##### configuration #####"
echo ""
ls -lh Desktop/open5gs/install/etc/open5gs/
echo ""
echo "##### executables #####"
echo ""
#cksum after to check (use for)
ls -lh Desktop/open5gs/install/bin/

echo "------------------------------------------------------------------"
echo "Application service"
echo "------------------------------------------------------------------"

