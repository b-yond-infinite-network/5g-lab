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
ls -lh open5gs/
echo ""
echo "##### configuration #####"
echo ""
ls -lh open5gs/install/etc/open5gs/
echo ""
echo "##### executables #####"
echo ""
#cksum after to check (use for)
ls -lh open5gs/install/bin/

echo "------------------------------------------------------------------"
echo "Application service"
echo "------------------------------------------------------------------"
echo ""
echo "##### NRF #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X GET -H "user-agent: AMF"  "http://127.0.0.10:7777/nnrf-disc/v1/nf-instances?requester-nf-type=SMF&target-nf-type=PCF"
echo ""
echo "##### UDM #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X PUT -H "user-agent: AMF" -H "content-type: application/json" "http://127.0.0.12:7777/nudm-uecm/v1/imsi-001011234567895/registrations/amf-3gpp-access" --data @udm1.json
echo ""
echo "##### PCF #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X POST -H "content-type: application/json" -H "user-agent: SMF" "http://127.0.0.13:7777/npcf-smpolicycontrol/v1/sm-policies"  --data @data.json
echo ""
echo "##### NSSF #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X GET -H "user-agent: AMF" -H "application/json,application/problem+json" -H "path: /nnssf-nsselection/v2/network-slice-information?nf-type=AMF&slice-info-request-for-pdu-session=%7B%0A%09%22sNssai%22%3A%09%7B%0A%09%09%22sst%22%3A%091%0A%09%7D%2C%0A%09%22roamingIndication%22%3A%09%22NON_ROAMING%22%0A%7D&nf-" "http://127.0.0.14:7777/nnssf-nsselection/v2/network-slice-information?nf-type=AMF&slice-info-request-for-pdu-session=%7B%0A%09%22sNssai%22%3A%09%7B%0A%09%09%22sst%22%3A%091%0A%09%7D%2C%0A%09%22roamingIndication%22%"
echo ""
echo "##### BSF #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X POST -H "user-agent: PCF" -H "content-type: application/json" "http://127.0.0.15:7777/nbsf-management/v1/pcfBindings" --data @bsf.json
echo ""
echo "##### UDR #####"
echo ""
curl -v --http2 --http2-prior-knowledge -X GET -H "user-agent: SMF"  "http://127.0.0.20:7777/nudr-dr/v1/subscription-data/imsi-001011234567895/00101/provisioned-data/smf-selection-subscription-data"
curl -v --http2 --http2-prior-knowledge -X UT -H "user-agent: AMF" -H "content-type: application/json" "http://127.0.0.20:7777/nudr-dr/v1/subscription-data/imsi-001011234567895/context-data/amf-3gpp-access" --data @udr.json

