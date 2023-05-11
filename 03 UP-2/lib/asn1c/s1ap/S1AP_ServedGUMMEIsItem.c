/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "S1AP-IEs"
 * 	found in "../support/s1ap-r16.7.0/36413-g70.asn"
 * 	`asn1c -pdu=all -fcompound-names -findirect-choice -fno-include-deps -no-gen-BER -no-gen-XER -no-gen-OER -no-gen-UPER`
 */

#include "S1AP_ServedGUMMEIsItem.h"

#include "S1AP_ProtocolExtensionContainer.h"
asn_TYPE_member_t asn_MBR_S1AP_ServedGUMMEIsItem_1[] = {
	{ ATF_NOFLAGS, 0, offsetof(struct S1AP_ServedGUMMEIsItem, servedPLMNs),
		(ASN_TAG_CLASS_CONTEXT | (0 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_S1AP_ServedPLMNs,
		0,
		{
#if !defined(ASN_DISABLE_OER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_OER_SUPPORT) */
#if !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT) */
			0
		},
		0, 0, /* No default value */
		"servedPLMNs"
		},
	{ ATF_NOFLAGS, 0, offsetof(struct S1AP_ServedGUMMEIsItem, servedGroupIDs),
		(ASN_TAG_CLASS_CONTEXT | (1 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_S1AP_ServedGroupIDs,
		0,
		{
#if !defined(ASN_DISABLE_OER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_OER_SUPPORT) */
#if !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT) */
			0
		},
		0, 0, /* No default value */
		"servedGroupIDs"
		},
	{ ATF_NOFLAGS, 0, offsetof(struct S1AP_ServedGUMMEIsItem, servedMMECs),
		(ASN_TAG_CLASS_CONTEXT | (2 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_S1AP_ServedMMECs,
		0,
		{
#if !defined(ASN_DISABLE_OER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_OER_SUPPORT) */
#if !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT) */
			0
		},
		0, 0, /* No default value */
		"servedMMECs"
		},
	{ ATF_POINTER, 1, offsetof(struct S1AP_ServedGUMMEIsItem, iE_Extensions),
		(ASN_TAG_CLASS_CONTEXT | (3 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_S1AP_ProtocolExtensionContainer_7898P125,
		0,
		{
#if !defined(ASN_DISABLE_OER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_OER_SUPPORT) */
#if !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT)
			0,
#endif  /* !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT) */
			0
		},
		0, 0, /* No default value */
		"iE-Extensions"
		},
};
static const int asn_MAP_S1AP_ServedGUMMEIsItem_oms_1[] = { 3 };
static const ber_tlv_tag_t asn_DEF_S1AP_ServedGUMMEIsItem_tags_1[] = {
	(ASN_TAG_CLASS_UNIVERSAL | (16 << 2))
};
static const asn_TYPE_tag2member_t asn_MAP_S1AP_ServedGUMMEIsItem_tag2el_1[] = {
    { (ASN_TAG_CLASS_CONTEXT | (0 << 2)), 0, 0, 0 }, /* servedPLMNs */
    { (ASN_TAG_CLASS_CONTEXT | (1 << 2)), 1, 0, 0 }, /* servedGroupIDs */
    { (ASN_TAG_CLASS_CONTEXT | (2 << 2)), 2, 0, 0 }, /* servedMMECs */
    { (ASN_TAG_CLASS_CONTEXT | (3 << 2)), 3, 0, 0 } /* iE-Extensions */
};
asn_SEQUENCE_specifics_t asn_SPC_S1AP_ServedGUMMEIsItem_specs_1 = {
	sizeof(struct S1AP_ServedGUMMEIsItem),
	offsetof(struct S1AP_ServedGUMMEIsItem, _asn_ctx),
	asn_MAP_S1AP_ServedGUMMEIsItem_tag2el_1,
	4,	/* Count of tags in the map */
	asn_MAP_S1AP_ServedGUMMEIsItem_oms_1,	/* Optional members */
	1, 0,	/* Root/Additions */
	4,	/* First extension addition */
};
asn_TYPE_descriptor_t asn_DEF_S1AP_ServedGUMMEIsItem = {
	"ServedGUMMEIsItem",
	"ServedGUMMEIsItem",
	&asn_OP_SEQUENCE,
	asn_DEF_S1AP_ServedGUMMEIsItem_tags_1,
	sizeof(asn_DEF_S1AP_ServedGUMMEIsItem_tags_1)
		/sizeof(asn_DEF_S1AP_ServedGUMMEIsItem_tags_1[0]), /* 1 */
	asn_DEF_S1AP_ServedGUMMEIsItem_tags_1,	/* Same as above */
	sizeof(asn_DEF_S1AP_ServedGUMMEIsItem_tags_1)
		/sizeof(asn_DEF_S1AP_ServedGUMMEIsItem_tags_1[0]), /* 1 */
	{
#if !defined(ASN_DISABLE_OER_SUPPORT)
		0,
#endif  /* !defined(ASN_DISABLE_OER_SUPPORT) */
#if !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT)
		0,
#endif  /* !defined(ASN_DISABLE_UPER_SUPPORT) || !defined(ASN_DISABLE_APER_SUPPORT) */
		SEQUENCE_constraint
	},
	asn_MBR_S1AP_ServedGUMMEIsItem_1,
	4,	/* Elements count */
	&asn_SPC_S1AP_ServedGUMMEIsItem_specs_1	/* Additional specs */
};

