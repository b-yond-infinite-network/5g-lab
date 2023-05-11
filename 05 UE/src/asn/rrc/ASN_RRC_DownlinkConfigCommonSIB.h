/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NR-RRC-Definitions"
 * 	found in "asn/nr-rrc-15.6.0.asn1"
 * 	`asn1c -fcompound-names -pdu=all -findirect-choice -fno-include-deps -gen-PER -no-gen-OER -no-gen-example -D rrc`
 */

#ifndef	_ASN_RRC_DownlinkConfigCommonSIB_H_
#define	_ASN_RRC_DownlinkConfigCommonSIB_H_


#include <asn_application.h>

/* Including external dependencies */
#include "ASN_RRC_FrequencyInfoDL-SIB.h"
#include "ASN_RRC_BWP-DownlinkCommon.h"
#include "ASN_RRC_BCCH-Config.h"
#include "ASN_RRC_PCCH-Config.h"
#include <constr_SEQUENCE.h>

#ifdef __cplusplus
extern "C" {
#endif

/* ASN_RRC_DownlinkConfigCommonSIB */
typedef struct ASN_RRC_DownlinkConfigCommonSIB {
	ASN_RRC_FrequencyInfoDL_SIB_t	 frequencyInfoDL;
	ASN_RRC_BWP_DownlinkCommon_t	 initialDownlinkBWP;
	ASN_RRC_BCCH_Config_t	 bcch_Config;
	ASN_RRC_PCCH_Config_t	 pcch_Config;
	/*
	 * This type is extensible,
	 * possible extensions are below.
	 */
	
	/* Context for parsing across buffer boundaries */
	asn_struct_ctx_t _asn_ctx;
} ASN_RRC_DownlinkConfigCommonSIB_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_ASN_RRC_DownlinkConfigCommonSIB;
extern asn_SEQUENCE_specifics_t asn_SPC_ASN_RRC_DownlinkConfigCommonSIB_specs_1;
extern asn_TYPE_member_t asn_MBR_ASN_RRC_DownlinkConfigCommonSIB_1[4];

#ifdef __cplusplus
}
#endif

#endif	/* _ASN_RRC_DownlinkConfigCommonSIB_H_ */
#include <asn_internal.h>
