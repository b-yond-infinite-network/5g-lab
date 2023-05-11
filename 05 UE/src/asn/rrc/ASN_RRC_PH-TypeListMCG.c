/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NR-InterNodeDefinitions"
 * 	found in "asn/nr-rrc-15.6.0.asn1"
 * 	`asn1c -fcompound-names -pdu=all -findirect-choice -fno-include-deps -gen-PER -no-gen-OER -no-gen-example -D rrc`
 */

#include "ASN_RRC_PH-TypeListMCG.h"

#include "ASN_RRC_PH-InfoMCG.h"
asn_per_constraints_t asn_PER_type_ASN_RRC_PH_TypeListMCG_constr_1 CC_NOTUSED = {
	{ APC_UNCONSTRAINED,	-1, -1,  0,  0 },
	{ APC_CONSTRAINED,	 5,  5,  1,  32 }	/* (SIZE(1..32)) */,
	0, 0	/* No PER value map */
};
asn_TYPE_member_t asn_MBR_ASN_RRC_PH_TypeListMCG_1[] = {
	{ ATF_POINTER, 0, 0,
		(ASN_TAG_CLASS_UNIVERSAL | (16 << 2)),
		0,
		&asn_DEF_ASN_RRC_PH_InfoMCG,
		0,
		{ 0, 0, 0 },
		0, 0, /* No default value */
		""
		},
};
static const ber_tlv_tag_t asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1[] = {
	(ASN_TAG_CLASS_UNIVERSAL | (16 << 2))
};
asn_SET_OF_specifics_t asn_SPC_ASN_RRC_PH_TypeListMCG_specs_1 = {
	sizeof(struct ASN_RRC_PH_TypeListMCG),
	offsetof(struct ASN_RRC_PH_TypeListMCG, _asn_ctx),
	0,	/* XER encoding is XMLDelimitedItemList */
};
asn_TYPE_descriptor_t asn_DEF_ASN_RRC_PH_TypeListMCG = {
	"PH-TypeListMCG",
	"PH-TypeListMCG",
	&asn_OP_SEQUENCE_OF,
	asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1,
	sizeof(asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1)
		/sizeof(asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1[0]), /* 1 */
	asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1,	/* Same as above */
	sizeof(asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1)
		/sizeof(asn_DEF_ASN_RRC_PH_TypeListMCG_tags_1[0]), /* 1 */
	{ 0, &asn_PER_type_ASN_RRC_PH_TypeListMCG_constr_1, SEQUENCE_OF_constraint },
	asn_MBR_ASN_RRC_PH_TypeListMCG_1,
	1,	/* Single element */
	&asn_SPC_ASN_RRC_PH_TypeListMCG_specs_1	/* Additional specs */
};

