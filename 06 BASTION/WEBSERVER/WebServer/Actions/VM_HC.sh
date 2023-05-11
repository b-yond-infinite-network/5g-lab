#!/bin/bash

echo "------------------------------------------------------------------"
echo "CPU"
echo "------------------------------------------------------------------"
echo "Physical CPUs"
grep physical.id /proc/cpuinfo | sort -u | wc -l
echo "Cores per CPU"
grep cpu.cores /proc/cpuinfo | sort -u
echo "Logical processors"
grep processor /proc/cpuinfo | wc -l

echo "------------------------------------------------------------------"
echo "Memory"
echo "------------------------------------------------------------------"
free -g

echo "------------------------------------------------------------------"
echo "Storage"
echo "------------------------------------------------------------------"
df -H

echo "------------------------------------------------------------------"
echo "NICs"
echo "------------------------------------------------------------------"
ip addr sh

echo "------------------------------------------------------------------"
echo "Processes"
echo "------------------------------------------------------------------"
export TERM=xterm
top -n 1 -b

echo "------------------------------------------------------------------"
echo "SNMP counters"
echo "------------------------------------------------------------------"

echo ""
echo "##### SYSTEM #####"
echo ""
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.1.3.0

echo ""
echo "##### NETWORK #####"
echo ""
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.2.2.1.2
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.2.2.1.10
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.2.2.1.10.4
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.2.2.1.16
snmpwalk -v2c -c public localhost .1.3.6.1.2.1.2.2.1.16.4

echo ""
echo "##### CPU #####"
echo ""
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.10.1.3.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.10.1.3.2
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.10.1.3.3
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.9.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.50.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.10.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.52.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.11.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.53.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.11.51.0

echo ""
echo "##### MEMORY #####"
echo ""
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.3.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.4.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.5.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.6.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.11.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.13.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.14.0
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.4.15.0

echo ""
echo "##### DISK #####"
echo ""
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.2.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.3.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.6.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.7.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.8.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.9.1
snmpwalk -v2c -c public localhost .1.3.6.1.4.1.2021.9.1.10.1

