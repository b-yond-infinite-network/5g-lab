/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NGAP-IEs"
 * 	found in "../support/ngap-r16.7.0/38413-g70.asn"
 * 	`asn1c -pdu=all -fcompound-names -findirect-choice -fno-include-deps -no-gen-BER -no-gen-XER -no-gen-OER -no-gen-UPER`
 */

#ifndef	_NGAP_HandoverResourceAllocationUnsuccessfulTransfer_H_
#define	_NGAP_HandoverResourceAllocationUnsuccessfulTransfer_H_


#include <asn_application.h>

/* Including external dependencies */
#include "NGAP_Cause.h"
#include <constr_SEQUENCE.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Forward declarations */
struct NGAP_CriticalityDiagnostics;
struct NGAP_ProtocolExtensionContainer;

/* NGAP_HandoverResourceAllocationUnsuccessfulTransfer */
typedef struct NGAP_HandoverResourceAllocationUnsuccessfulTransfer {
	NGAP_Cause_t	 cause;
	struct NGAP_CriticalityDiagnostics	*criticalityDiagnostics;	/* OPTIONAL */
	struct NGAP_ProtocolExtensionContainer	*iE_Extensions;	/* OPTIONAL */
	/*
	 * This type is extensible,
	 * possible extensions are below.
	 */
	
	/* Context for parsing across buffer boundaries */
	asn_struct_ctx_t _asn_ctx;
} NGAP_HandoverResourceAllocationUnsuccessfulTransfer_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_NGAP_HandoverResourceAllocationUnsuccessfulTransfer;

#ifdef __cplusplus
}
#endif

#endif	/* _NGAP_HandoverResourceAllocationUnsuccessfulTransfer_H_ */
#include <asn_internal.h>
