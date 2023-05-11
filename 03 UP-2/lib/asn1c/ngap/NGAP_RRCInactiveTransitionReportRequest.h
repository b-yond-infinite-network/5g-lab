/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NGAP-IEs"
 * 	found in "../support/ngap-r16.7.0/38413-g70.asn"
 * 	`asn1c -pdu=all -fcompound-names -findirect-choice -fno-include-deps -no-gen-BER -no-gen-XER -no-gen-OER -no-gen-UPER`
 */

#ifndef	_NGAP_RRCInactiveTransitionReportRequest_H_
#define	_NGAP_RRCInactiveTransitionReportRequest_H_


#include <asn_application.h>

/* Including external dependencies */
#include <NativeEnumerated.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Dependencies */
typedef enum NGAP_RRCInactiveTransitionReportRequest {
	NGAP_RRCInactiveTransitionReportRequest_subsequent_state_transition_report	= 0,
	NGAP_RRCInactiveTransitionReportRequest_single_rrc_connected_state_report	= 1,
	NGAP_RRCInactiveTransitionReportRequest_cancel_report	= 2
	/*
	 * Enumeration is extensible
	 */
} e_NGAP_RRCInactiveTransitionReportRequest;

/* NGAP_RRCInactiveTransitionReportRequest */
typedef long	 NGAP_RRCInactiveTransitionReportRequest_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_NGAP_RRCInactiveTransitionReportRequest;
asn_struct_free_f NGAP_RRCInactiveTransitionReportRequest_free;
asn_struct_print_f NGAP_RRCInactiveTransitionReportRequest_print;
asn_constr_check_f NGAP_RRCInactiveTransitionReportRequest_constraint;
jer_type_encoder_f NGAP_RRCInactiveTransitionReportRequest_encode_jer;
per_type_decoder_f NGAP_RRCInactiveTransitionReportRequest_decode_aper;
per_type_encoder_f NGAP_RRCInactiveTransitionReportRequest_encode_aper;

#ifdef __cplusplus
}
#endif

#endif	/* _NGAP_RRCInactiveTransitionReportRequest_H_ */
#include <asn_internal.h>
