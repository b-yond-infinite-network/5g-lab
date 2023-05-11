/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NGAP-IEs"
 * 	found in "asn/ngap-15.8.0.asn1"
 * 	`asn1c -fcompound-names -pdu=all -findirect-choice -fno-include-deps -gen-PER -no-gen-OER -no-gen-example -D ngap`
 */

#ifndef	_ASN_NGAP_GlobalRANNodeID_H_
#define	_ASN_NGAP_GlobalRANNodeID_H_


#include <asn_application.h>

/* Including external dependencies */
#include <constr_CHOICE.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Dependencies */
typedef enum ASN_NGAP_GlobalRANNodeID_PR {
	ASN_NGAP_GlobalRANNodeID_PR_NOTHING,	/* No components present */
	ASN_NGAP_GlobalRANNodeID_PR_globalGNB_ID,
	ASN_NGAP_GlobalRANNodeID_PR_globalNgENB_ID,
	ASN_NGAP_GlobalRANNodeID_PR_globalN3IWF_ID,
	ASN_NGAP_GlobalRANNodeID_PR_choice_Extensions
} ASN_NGAP_GlobalRANNodeID_PR;

/* Forward declarations */
struct ASN_NGAP_GlobalGNB_ID;
struct ASN_NGAP_GlobalNgENB_ID;
struct ASN_NGAP_GlobalN3IWF_ID;
struct ASN_NGAP_ProtocolIE_SingleContainer;

/* ASN_NGAP_GlobalRANNodeID */
typedef struct ASN_NGAP_GlobalRANNodeID {
	ASN_NGAP_GlobalRANNodeID_PR present;
	union ASN_NGAP_GlobalRANNodeID_u {
		struct ASN_NGAP_GlobalGNB_ID	*globalGNB_ID;
		struct ASN_NGAP_GlobalNgENB_ID	*globalNgENB_ID;
		struct ASN_NGAP_GlobalN3IWF_ID	*globalN3IWF_ID;
		struct ASN_NGAP_ProtocolIE_SingleContainer	*choice_Extensions;
	} choice;
	
	/* Context for parsing across buffer boundaries */
	asn_struct_ctx_t _asn_ctx;
} ASN_NGAP_GlobalRANNodeID_t;

/* Implementation */
extern asn_TYPE_descriptor_t asn_DEF_ASN_NGAP_GlobalRANNodeID;
extern asn_CHOICE_specifics_t asn_SPC_ASN_NGAP_GlobalRANNodeID_specs_1;
extern asn_TYPE_member_t asn_MBR_ASN_NGAP_GlobalRANNodeID_1[4];
extern asn_per_constraints_t asn_PER_type_ASN_NGAP_GlobalRANNodeID_constr_1;

#ifdef __cplusplus
}
#endif

#endif	/* _ASN_NGAP_GlobalRANNodeID_H_ */
#include <asn_internal.h>
