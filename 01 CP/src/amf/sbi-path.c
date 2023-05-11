/*
 * Copyright (C) 2019-2022 by Sukchan Lee <acetcom@gmail.com>
 *
 * This file is part of Open5GS.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

#include "sbi-path.h"
#include "nas-path.h"
#include "ngap-path.h"
#include "nnrf-handler.h"

static int server_cb(ogs_sbi_request_t *request, void *data)
{
    amf_event_t *e = NULL;
    int rv;

    ogs_assert(request);
    ogs_assert(data);

    e = amf_event_new(OGS_EVENT_SBI_SERVER);
    ogs_assert(e);

    e->h.sbi.request = request;
    e->h.sbi.data = data;

    rv = ogs_queue_push(ogs_app()->queue, e);
    if (rv != OGS_OK) {
        ogs_error("ogs_queue_push() failed:%d", (int)rv);
        ogs_sbi_request_free(request);
        ogs_event_free(e);
        return OGS_ERROR;
    }

    return OGS_OK;
}

static int client_cb(int status, ogs_sbi_response_t *response, void *data)
{
    amf_event_t *e = NULL;
    int rv;

    if (status != OGS_OK) {
        ogs_log_message(
                status == OGS_DONE ? OGS_LOG_DEBUG : OGS_LOG_WARN, 0,
                "client_cb() failed [%d]", status);
        return OGS_ERROR;
    }

    ogs_assert(response);

    e = amf_event_new(OGS_EVENT_SBI_CLIENT);
    ogs_assert(e);
    e->h.sbi.response = response;
    e->h.sbi.data = data;

    rv = ogs_queue_push(ogs_app()->queue, e);
    if (rv != OGS_OK) {
        ogs_error("ogs_queue_push() failed:%d", (int)rv);
        ogs_sbi_response_free(response);
        ogs_event_free(e);
        return OGS_ERROR;
    }

    return OGS_OK;
}

int amf_sbi_open(void)
{
    ogs_sbi_nf_instance_t *nf_instance = NULL;
    ogs_sbi_nf_service_t *service = NULL;

    /* Add SELF NF instance */
    nf_instance = ogs_sbi_self()->nf_instance;
    ogs_assert(nf_instance);
    ogs_sbi_nf_fsm_init(nf_instance);

    /* Build NF instance information. It will be transmitted to NRF. */
    ogs_sbi_nf_instance_build_default(nf_instance, OpenAPI_nf_type_AMF);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_SMF);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_SCP);

    /* Build NF service information. It will be transmitted to NRF. */
    if (ogs_sbi_nf_service_is_available(OGS_SBI_SERVICE_NAME_NAMF_COMM)) {
        service = ogs_sbi_nf_service_build_default(
                    nf_instance, OGS_SBI_SERVICE_NAME_NAMF_COMM);
        ogs_assert(service);
        ogs_sbi_nf_service_add_version(
                    service, OGS_SBI_API_V1, OGS_SBI_API_V1_0_0, NULL);
        ogs_sbi_nf_service_add_allowed_nf_type(service, OpenAPI_nf_type_SMF);
    }

    /* Initialize NRF NF Instance */
    nf_instance = ogs_sbi_self()->nrf_instance;
    if (nf_instance) {
        ogs_sbi_client_t *client = NULL;

        /* Client callback is only used when NF sends to NRF */
        client = nf_instance->client;
        ogs_assert(client);
        client->cb = client_cb;

        /* NFRegister is sent and the response is received
         * by the above client callback. */
        ogs_sbi_nf_fsm_init(nf_instance);
    }

    /* Build Subscription-Data */
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_AUSF, OGS_SBI_SERVICE_NAME_NAUSF_AUTH);
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_UDM, OGS_SBI_SERVICE_NAME_NUDM_UECM);
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_UDM, OGS_SBI_SERVICE_NAME_NUDM_SDM);
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_PCF, OGS_SBI_SERVICE_NAME_NPCF_AM_POLICY_CONTROL);
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_SMF, OGS_SBI_SERVICE_NAME_NSMF_PDUSESSION);
    ogs_sbi_subscription_data_build_default(
            OpenAPI_nf_type_NSSF, OGS_SBI_SERVICE_NAME_NNSSF_NSSELECTION);

    if (ogs_sbi_server_start_all(server_cb) != OGS_OK)
        return OGS_ERROR;

    return OGS_OK;
}

void amf_sbi_close(void)
{
    ogs_sbi_client_stop_all();
    ogs_sbi_server_stop_all();
}

bool amf_sbi_send_request(ogs_sbi_nf_instance_t *nf_instance, void *data)
{
    ogs_assert(nf_instance);
    ogs_assert(data);

    return ogs_sbi_send_request(nf_instance, client_cb, data);
}

bool amf_ue_sbi_discover_and_send(
        ogs_sbi_service_type_e service_type,
        ogs_sbi_discovery_option_t *discovery_option,
        ogs_sbi_request_t *(*build)(amf_ue_t *amf_ue, void *data),
        amf_ue_t *amf_ue, void *data)
{
    ogs_sbi_xact_t *xact = NULL;

    ogs_assert(service_type);
    ogs_assert(amf_ue);
    ogs_assert(build);

    xact = ogs_sbi_xact_add(
            &amf_ue->sbi, service_type, discovery_option,
            (ogs_sbi_build_f)build, amf_ue, data);
    if (!xact) {
        ogs_error("amf_ue_sbi_discover_and_send() failed");
        ogs_assert(OGS_OK ==
            nas_5gs_send_gmm_reject_from_sbi(
                amf_ue, OGS_SBI_HTTP_STATUS_GATEWAY_TIMEOUT));
        return false;
    }

    if (ogs_sbi_discover_and_send(xact, client_cb) != true) {
        ogs_error("amf_ue_sbi_discover_and_send() failed");
        ogs_sbi_xact_remove(xact);
        ogs_assert(OGS_OK ==
            nas_5gs_send_gmm_reject_from_sbi(
                amf_ue, OGS_SBI_HTTP_STATUS_GATEWAY_TIMEOUT));
        return false;
    }

    return true;
}

bool amf_sess_sbi_discover_and_send(
        ogs_sbi_service_type_e service_type,
        ogs_sbi_discovery_option_t *discovery_option,
        ogs_sbi_request_t *(*build)(amf_sess_t *sess, void *data),
        amf_sess_t *sess, int state, void *data)
{
    ogs_sbi_xact_t *xact = NULL;

    ogs_assert(service_type);
    ogs_assert(sess);
    ogs_assert(build);

    xact = ogs_sbi_xact_add(
            &sess->sbi, service_type, discovery_option,
            (ogs_sbi_build_f)build, sess, data);
    if (!xact) {
        ogs_error("amf_sess_sbi_discover_and_send() failed");
        ogs_assert(OGS_OK == nas_5gs_send_back_gsm_message(sess,
            OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED, AMF_NAS_BACKOFF_TIME));
        return false;
    }

    xact->state = state;

    if (ogs_sbi_discover_and_send(xact, client_cb) != true) {
        ogs_error("amf_sess_sbi_discover_and_send() failed");
        ogs_sbi_xact_remove(xact);
        ogs_assert(OGS_OK == nas_5gs_send_back_gsm_message(sess,
            OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED, AMF_NAS_BACKOFF_TIME));
        return false;
    }

    return true;
}
static int client_discover_cb(
        int status, ogs_sbi_response_t *response, void *data)
{
    int rv;
    ogs_sbi_message_t message;

    ogs_sbi_xact_t *xact = NULL;
    ogs_sbi_service_type_e service_type = OGS_SBI_SERVICE_TYPE_NULL;
    ogs_sbi_discovery_option_t *discovery_option = NULL;
    amf_ue_t *amf_ue = NULL;
    amf_sess_t *sess = NULL;

    ogs_assert(response);

    xact = data;
    ogs_assert(xact);

    xact = ogs_sbi_xact_cycle(xact);
    if (!xact) {
        ogs_error("SBI transaction has already been removed");
        return OGS_ERROR;
    }

    sess = (amf_sess_t *)xact->sbi_object;
    ogs_assert(sess);

    service_type = xact->service_type;
    discovery_option = xact->discovery_option;

    sess = amf_sess_cycle(sess);
    if (!sess) {
        ogs_error("Session has already been removed");
        ogs_sbi_xact_remove(xact);
        return OGS_ERROR;
    }

    ogs_assert(sess->sbi.type == OGS_SBI_OBJ_SESS_TYPE);
    amf_ue = sess->amf_ue;
    ogs_assert(amf_ue);

    if (status != OGS_OK) {
        ogs_log_message(
                status == OGS_DONE ? OGS_LOG_DEBUG : OGS_LOG_WARN, 0,
                "client_discover_cb() failed [%d]", status);
        ogs_sbi_xact_remove(xact);
        return OGS_ERROR;
    }

    rv = ogs_sbi_parse_response(&message, response);
    if (rv != OGS_OK) {
        ogs_error("cannot parse HTTP response");
        ogs_assert(OGS_OK == nas_5gs_send_back_gsm_message(sess,
            OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED, AMF_NAS_BACKOFF_TIME));

        goto cleanup;
    }

    if (message.res_status != OGS_SBI_HTTP_STATUS_OK) {
        ogs_error("NF-Discover failed [%d]", message.res_status);
        ogs_assert(OGS_OK == nas_5gs_send_back_gsm_message(sess,
            OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED, AMF_NAS_BACKOFF_TIME));

        goto cleanup;
    }

    if (!message.SearchResult) {
        ogs_error("No SearchResult");
        ogs_assert(OGS_OK == nas_5gs_send_back_gsm_message(sess,
            OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED, AMF_NAS_BACKOFF_TIME));

        goto cleanup;
    }

    ogs_nnrf_handle_nf_discover_search_result(message.SearchResult);

    amf_sbi_select_nf(&sess->sbi, service_type, discovery_option);

    if (!sess->sbi.service_type_array[service_type].nf_instance) {
        ogs_error("[%s:%d] (NF discover) No [%s]",
                    amf_ue->supi, sess->psi,
                    ogs_sbi_service_type_to_name(service_type));
        ogs_assert(OGS_OK ==
            nas_5gs_send_back_gsm_message(sess,
                OGS_5GMM_CAUSE_PAYLOAD_WAS_NOT_FORWARDED,
                AMF_NAS_BACKOFF_TIME));

        goto cleanup;
    }

    amf_sess_sbi_discover_and_send(
            service_type, NULL,
            amf_nsmf_pdusession_build_create_sm_context,
            sess, AMF_CREATE_SM_CONTEXT_NO_STATE, NULL);

cleanup:
    ogs_sbi_xact_remove(xact);

    ogs_sbi_message_free(&message);
    ogs_sbi_response_free(response);

    return OGS_ERROR;
}

bool amf_sess_sbi_discover_by_nsi(
        amf_sess_t *sess,
        ogs_sbi_service_type_e service_type,
        ogs_sbi_discovery_option_t *discovery_option)
{
    ogs_sbi_xact_t *xact = NULL;
    ogs_sbi_client_t *client = NULL;

    ogs_assert(sess);
    client = sess->nssf.nrf.client;
    ogs_assert(client);
    ogs_assert(service_type);

    ogs_warn("Try to discover [%s]",
                ogs_sbi_service_type_to_name(service_type));

    xact = ogs_sbi_xact_add(
            &sess->sbi, service_type, discovery_option, NULL, NULL, NULL);
    ogs_expect_or_return_val(xact, false);

    xact->request = amf_nnrf_disc_build_discover(
                sess->nssf.nrf.id, xact->service_type, xact->discovery_option);
    ogs_expect_or_return_val(xact->request, false);

    return ogs_sbi_client_send_reqmem_persistent(
            client, client_discover_cb, xact->request, xact);
}

void amf_sbi_send_activating_session(amf_sess_t *sess, int state)
{
    amf_nsmf_pdusession_sm_context_param_t param;

    ogs_assert(sess);

    memset(&param, 0, sizeof(param));
    param.upCnxState = OpenAPI_up_cnx_state_ACTIVATING;

    amf_sess_sbi_discover_and_send(
            OGS_SBI_SERVICE_TYPE_NSMF_PDUSESSION, NULL,
            amf_nsmf_pdusession_build_update_sm_context, sess, state, &param);
}

void amf_sbi_send_deactivate_session(
        amf_sess_t *sess, int state, int group, int cause)
{
    amf_nsmf_pdusession_sm_context_param_t param;

    ogs_assert(sess);

    memset(&param, 0, sizeof(param));
    param.upCnxState = OpenAPI_up_cnx_state_DEACTIVATED;
    param.ngApCause.group = group;
    param.ngApCause.value = cause;
    param.ue_location = true;
    param.ue_timezone = true;

    amf_sess_sbi_discover_and_send(
            OGS_SBI_SERVICE_TYPE_NSMF_PDUSESSION, NULL,
            amf_nsmf_pdusession_build_update_sm_context, sess, state, &param);
}

void amf_sbi_send_deactivate_all_sessions(
        amf_ue_t *amf_ue, int state, int group, int cause)
{
    amf_sess_t *sess = NULL;

    ogs_assert(amf_ue);

    ogs_list_for_each(&amf_ue->sess_list, sess) {
        if (SESSION_CONTEXT_IN_SMF(sess))
            amf_sbi_send_deactivate_session(sess, state, group, cause);
    }
}

void amf_sbi_send_deactivate_all_ue_in_gnb(amf_gnb_t *gnb, int state)
{
    amf_ue_t *amf_ue = NULL;
    ran_ue_t *ran_ue = NULL, *ran_ue_next;

    ogs_list_for_each_safe(&gnb->ran_ue_list, ran_ue_next, ran_ue) {
        int old_xact_count = 0, new_xact_count = 0;

        amf_ue = ran_ue->amf_ue;

        if (amf_ue) {
            old_xact_count = amf_sess_xact_count(amf_ue);

            amf_sbi_send_deactivate_all_sessions(
                amf_ue, state, NGAP_Cause_PR_radioNetwork,
                NGAP_CauseRadioNetwork_failure_in_radio_interface_procedure);

            new_xact_count = amf_sess_xact_count(amf_ue);

            if (old_xact_count == new_xact_count) {
                ran_ue_remove(ran_ue);
                amf_ue_deassociate(amf_ue);
            }
        } else {
            ogs_warn("amf_sbi_send_deactivate_all_ue_in_gnb()");
            ogs_warn("    RAN_UE_NGAP_ID[%d] AMF_UE_NGAP_ID[%lld] State[%d]",
                ran_ue->ran_ue_ngap_id, (long long)ran_ue->amf_ue_ngap_id,
                state);

            if (state == AMF_REMOVE_S1_CONTEXT_BY_LO_CONNREFUSED ||
                state == AMF_REMOVE_S1_CONTEXT_BY_RESET_ALL) {
                ran_ue_remove(ran_ue);
            } else {
                /* At this point, it does not support other action */
                ogs_fatal("Invalid state [%d]", state);
                ogs_assert_if_reached();
            }
        }
    }
}

void amf_sbi_send_release_session(amf_sess_t *sess, int state)
{
    ogs_assert(sess);

    amf_sess_sbi_discover_and_send(
            OGS_SBI_SERVICE_TYPE_NSMF_PDUSESSION, NULL,
            amf_nsmf_pdusession_build_release_sm_context, sess, state, NULL);

    /* Prevent to invoke SMF for this session */
    CLEAR_SM_CONTEXT_REF(sess);
}

void amf_sbi_send_release_all_sessions(amf_ue_t *amf_ue, int state)
{
    amf_sess_t *sess = NULL;

    ogs_assert(amf_ue);

    ogs_list_for_each(&amf_ue->sess_list, sess) {
        if (SESSION_CONTEXT_IN_SMF(sess))
            amf_sbi_send_release_session(sess, state);
    }
}

static int client_notify_cb(
        int status, ogs_sbi_response_t *response, void *data)
{
    int rv;
    ogs_sbi_message_t message;

    if (status != OGS_OK) {
        ogs_log_message(
                status == OGS_DONE ? OGS_LOG_DEBUG : OGS_LOG_WARN, 0,
                "client_notify_cb() failed [%d]", status);
        return OGS_ERROR;
    }

    ogs_assert(response);

    rv = ogs_sbi_parse_response(&message, response);
    if (rv != OGS_OK) {
        ogs_error("cannot parse HTTP response");
        ogs_sbi_message_free(&message);
        ogs_sbi_response_free(response);
        return OGS_ERROR;
    }

    if (message.res_status != OGS_SBI_HTTP_STATUS_NO_CONTENT)
        ogs_error("N1-N2-Message Transfer Failure Notification failed [%d]",
                message.res_status);

    ogs_sbi_message_free(&message);
    ogs_sbi_response_free(response);
    return OGS_OK;
}

bool amf_sbi_send_n1_n2_failure_notify(
        amf_sess_t *sess, OpenAPI_n1_n2_message_transfer_cause_e cause)
{
    ogs_sbi_request_t *request = NULL;
    ogs_sbi_client_t *client = NULL;

    ogs_assert(cause);
    ogs_assert(sess);
    client = sess->paging.client;
    ogs_assert(client);

    request = amf_nsmf_callback_build_n1_n2_failure_notify(sess, cause);
    ogs_expect_or_return_val(request, false);

    return ogs_sbi_client_send_request(client, client_notify_cb, request, NULL);
}
