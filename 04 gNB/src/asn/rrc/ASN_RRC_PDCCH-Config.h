/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NR-RRC-Definitions"
 * 	found in "asn/nr-rrc-15.6.0.asn1"
 * 	`asn1c -fcompound-names -pdu=all -findirect-choice -fno-include-deps -gen-PER -no-gen-OER -no-gen-example -D rrc`
 */

#ifndef	_ASN_RRC_PDCCH_Config_H_
#define	_ASN_RRC_PDCCH_Config_H_


#include <asn_application.h>

/* Including external dependencies */
#include <asn_SEQUENCE_OF.h>
#include <constr_SEQUENCE_OF.h>
#include "ASN_RRC_ControlResourceSetId.h"
#include "ASN_RRC_SearchSpaceId.h"
#include <constr_SEQUENCE.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Forward declarations */
struct ASN_RRC_SetupRelease_DownlinkPreemption;
struct ASN_RRC_SetupRelease_PUSCH_TPC_CommandConfig;
struct ASN_RRC_SetupRelease_PUCCH_TPC_CommandConfig;
struct ASN_RRC_SetupRelease_SRS_TPC_CommandConfig;
struct ASN_RRC_ControlResourceSet;
struct ASN_RRC_SearchSpace;

/* ASN_RRC_PDCCH-Config */
typedef struct ASN_RRC_PDCCH_Config {
	struct ASN_RRC_PDCCH_Config__controlResourceSetToAddModList {
		A_SEQUENCE_OF(struct ASN_RRC_ControlResourceSet) list;
		
		/* Context for parsing across buffer boundaries */
		asn_struct_ctx_t _asn_ctx;
	} *controlResourceSetToAddModList;
	struct ASN_RRC_PDCCH_Config__controlResourceSetToReleaseList {
		A_SEQUENCE_OF(ASN_RRC_ControlResourceSetId_t) list;
		
		/* Context for parsing across buffer boundaries */
		asn_struct_ctx_t _asn_ctx;
	} *controlResourceSetToReleaseList;
	struct ASN_RRC_PDCCH_Config__searchSpacesToAddModList {
		A_SEQUENCE_OF(struct ASN_RRC_SearchSpace) list;
		
		/* Context for parsing across buffer boundaries */
		asn_struct_ctx_t _asn_ctx;
	} *searchSpacesToAddModList;
	struct ASN_RRC_PDCCH_Config__searchSpacesToReleaseList {
		A_SEQUENCE_OF(ASN_RRC_SearchSpaceId_t) list;
		
		/* Context for parsing across buffer boundaries */
		asn_struct_ctx_t _asn_ctx;
	} *searchSpacesToReleaseList;
	struct ASN_RRC_SetupRelease_DownlinkPreemption	*downlinkPreemption;	/* OPTIONAL */
	struct ASN_RRC_SetupRelease_PUSCH_TPC_CommandConfig	*tpc_PUSCH;	/* OPTIONAL */
	struct ASN_RRC_SetupRelease_PUCCH_TPC_CommandConfig	*tpc_PUCCH;	/* OPTIONAL */
	struct ASN_RRC_SetupRelease_SRS_TPC_CommandConfig	*tpc_SRS;	/* OPTIONAL */
	/*
	 * This type is extensible,
	 * possible extensions are below.
	 */
	
	/* Context for parsing across buffer boundaries */
	asn_struct_ctx_t _asn_ctx;
} ASN_RRC_PDCCH_Config_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_ASN_RRC_PDCCH_Config;
extern asn_SEQUENCE_specifics_t asn_SPC_ASN_RRC_PDCCH_Config_specs_1;
extern asn_TYPE_member_t asn_MBR_ASN_RRC_PDCCH_Config_1[8];

#ifdef __cplusplus
}
#endif

#endif	/* _ASN_RRC_PDCCH_Config_H_ */
#include <asn_internal.h>
