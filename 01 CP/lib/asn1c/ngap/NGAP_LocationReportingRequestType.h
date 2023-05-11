/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NGAP-IEs"
 * 	found in "../support/ngap-r16.7.0/38413-g70.asn"
 * 	`asn1c -pdu=all -fcompound-names -findirect-choice -fno-include-deps -no-gen-BER -no-gen-XER -no-gen-OER -no-gen-UPER`
 */

#ifndef	_NGAP_LocationReportingRequestType_H_
#define	_NGAP_LocationReportingRequestType_H_


#include <asn_application.h>

/* Including external dependencies */
#include "NGAP_EventType.h"
#include "NGAP_ReportArea.h"
#include "NGAP_LocationReportingReferenceID.h"
#include <constr_SEQUENCE.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Forward declarations */
struct NGAP_AreaOfInterestList;
struct NGAP_ProtocolExtensionContainer;

/* NGAP_LocationReportingRequestType */
typedef struct NGAP_LocationReportingRequestType {
	NGAP_EventType_t	 eventType;
	NGAP_ReportArea_t	 reportArea;
	struct NGAP_AreaOfInterestList	*areaOfInterestList;	/* OPTIONAL */
	NGAP_LocationReportingReferenceID_t	*locationReportingReferenceIDToBeCancelled;	/* OPTIONAL */
	struct NGAP_ProtocolExtensionContainer	*iE_Extensions;	/* OPTIONAL */
	/*
	 * This type is extensible,
	 * possible extensions are below.
	 */
	
	/* Context for parsing across buffer boundaries */
	asn_struct_ctx_t _asn_ctx;
} NGAP_LocationReportingRequestType_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_NGAP_LocationReportingRequestType;

#ifdef __cplusplus
}
#endif

#endif	/* _NGAP_LocationReportingRequestType_H_ */
#include <asn_internal.h>
