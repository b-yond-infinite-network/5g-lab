/*
 * Generated by asn1c-0.9.29 (http://lionet.info/asn1c)
 * From ASN.1 module "NR-RRC-Definitions"
 * 	found in "asn/nr-rrc-15.6.0.asn1"
 * 	`asn1c -fcompound-names -pdu=all -findirect-choice -fno-include-deps -gen-PER -no-gen-OER -no-gen-example -D rrc`
 */

#include "ASN_RRC_MeasResult2EUTRA.h"

#include "ASN_RRC_MeasResultEUTRA.h"
asn_TYPE_member_t asn_MBR_ASN_RRC_MeasResult2EUTRA_1[] = {
	{ ATF_NOFLAGS, 0, offsetof(struct ASN_RRC_MeasResult2EUTRA, carrierFreq),
		(ASN_TAG_CLASS_CONTEXT | (0 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_ASN_RRC_ARFCN_ValueEUTRA,
		0,
		{ 0, 0, 0 },
		0, 0, /* No default value */
		"carrierFreq"
		},
	{ ATF_POINTER, 2, offsetof(struct ASN_RRC_MeasResult2EUTRA, measResultServingCell),
		(ASN_TAG_CLASS_CONTEXT | (1 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_ASN_RRC_MeasResultEUTRA,
		0,
		{ 0, 0, 0 },
		0, 0, /* No default value */
		"measResultServingCell"
		},
	{ ATF_POINTER, 1, offsetof(struct ASN_RRC_MeasResult2EUTRA, measResultBestNeighCell),
		(ASN_TAG_CLASS_CONTEXT | (2 << 2)),
		-1,	/* IMPLICIT tag at current level */
		&asn_DEF_ASN_RRC_MeasResultEUTRA,
		0,
		{ 0, 0, 0 },
		0, 0, /* No default value */
		"measResultBestNeighCell"
		},
};
static const int asn_MAP_ASN_RRC_MeasResult2EUTRA_oms_1[] = { 1, 2 };
static const ber_tlv_tag_t asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1[] = {
	(ASN_TAG_CLASS_UNIVERSAL | (16 << 2))
};
static const asn_TYPE_tag2member_t asn_MAP_ASN_RRC_MeasResult2EUTRA_tag2el_1[] = {
    { (ASN_TAG_CLASS_CONTEXT | (0 << 2)), 0, 0, 0 }, /* carrierFreq */
    { (ASN_TAG_CLASS_CONTEXT | (1 << 2)), 1, 0, 0 }, /* measResultServingCell */
    { (ASN_TAG_CLASS_CONTEXT | (2 << 2)), 2, 0, 0 } /* measResultBestNeighCell */
};
asn_SEQUENCE_specifics_t asn_SPC_ASN_RRC_MeasResult2EUTRA_specs_1 = {
	sizeof(struct ASN_RRC_MeasResult2EUTRA),
	offsetof(struct ASN_RRC_MeasResult2EUTRA, _asn_ctx),
	asn_MAP_ASN_RRC_MeasResult2EUTRA_tag2el_1,
	3,	/* Count of tags in the map */
	asn_MAP_ASN_RRC_MeasResult2EUTRA_oms_1,	/* Optional members */
	2, 0,	/* Root/Additions */
	3,	/* First extension addition */
};
asn_TYPE_descriptor_t asn_DEF_ASN_RRC_MeasResult2EUTRA = {
	"MeasResult2EUTRA",
	"MeasResult2EUTRA",
	&asn_OP_SEQUENCE,
	asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1,
	sizeof(asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1)
		/sizeof(asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1[0]), /* 1 */
	asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1,	/* Same as above */
	sizeof(asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1)
		/sizeof(asn_DEF_ASN_RRC_MeasResult2EUTRA_tags_1[0]), /* 1 */
	{ 0, 0, SEQUENCE_constraint },
	asn_MBR_ASN_RRC_MeasResult2EUTRA_1,
	3,	/* Elements count */
	&asn_SPC_ASN_RRC_MeasResult2EUTRA_specs_1	/* Additional specs */
};

