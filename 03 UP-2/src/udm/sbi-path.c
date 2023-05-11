/*
 * Copyright (C) 2019,2020 by Sukchan Lee <acetcom@gmail.com>
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

static int server_cb(ogs_sbi_request_t *request, void *data)
{
    udm_event_t *e = NULL;
    int rv;

    ogs_assert(request);
    ogs_assert(data);

    e = udm_event_new(OGS_EVENT_SBI_SERVER);
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
    udm_event_t *e = NULL;
    int rv;

    if (status != OGS_OK) {
        ogs_log_message(
                status == OGS_DONE ? OGS_LOG_DEBUG : OGS_LOG_WARN, 0,
                "client_cb() failed [%d]", status);
        return OGS_ERROR;
    }

    ogs_assert(response);

    e = udm_event_new(OGS_EVENT_SBI_CLIENT);
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

int udm_sbi_open(void)
{
    ogs_sbi_nf_instance_t *nf_instance = NULL;
    ogs_sbi_nf_service_t *service = NULL;

    /* Add SELF NF instance */
    nf_instance = ogs_sbi_self()->nf_instance;
    ogs_assert(nf_instance);
    ogs_sbi_nf_fsm_init(nf_instance);

    /* Build NF instance information. It will be transmitted to NRF. */
    ogs_sbi_nf_instance_build_default(nf_instance, OpenAPI_nf_type_UDM);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_AMF);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_SMF);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_AUSF);
    ogs_sbi_nf_instance_add_allowed_nf_type(nf_instance, OpenAPI_nf_type_SCP);

    /* Build NF service information. It will be transmitted to NRF. */
    if (ogs_sbi_nf_service_is_available(OGS_SBI_SERVICE_NAME_NUDM_UEAU)) {
        service = ogs_sbi_nf_service_build_default(
                    nf_instance, OGS_SBI_SERVICE_NAME_NUDM_UEAU);
        ogs_assert(service);
        ogs_sbi_nf_service_add_version(
                    service, OGS_SBI_API_V1, OGS_SBI_API_V1_0_0, NULL);
        ogs_sbi_nf_service_add_allowed_nf_type(service, OpenAPI_nf_type_AUSF);
    }

    if (ogs_sbi_nf_service_is_available(OGS_SBI_SERVICE_NAME_NUDM_UECM)) {
        service = ogs_sbi_nf_service_build_default(
                    nf_instance, OGS_SBI_SERVICE_NAME_NUDM_UECM);
        ogs_assert(service);
        ogs_sbi_nf_service_add_version(
                    service, OGS_SBI_API_V1, OGS_SBI_API_V1_0_0, NULL);
        ogs_sbi_nf_service_add_allowed_nf_type(service, OpenAPI_nf_type_AMF);
    }

    if (ogs_sbi_nf_service_is_available(OGS_SBI_SERVICE_NAME_NUDM_SDM)) {
        service = ogs_sbi_nf_service_build_default(
                    nf_instance, OGS_SBI_SERVICE_NAME_NUDM_SDM);
        ogs_assert(service);
        ogs_sbi_nf_service_add_version(
                    service, OGS_SBI_API_V2, OGS_SBI_API_V2_0_0, NULL);
        ogs_sbi_nf_service_add_allowed_nf_type(service, OpenAPI_nf_type_AMF);
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
    ogs_sbi_subscription_data_build_default(OpenAPI_nf_type_UDR, NULL);

    if (ogs_sbi_server_start_all(server_cb) != OGS_OK)
        return OGS_ERROR;

    return OGS_OK;
}

void udm_sbi_close(void)
{
    ogs_sbi_client_stop_all();
    ogs_sbi_server_stop_all();
}

bool udm_sbi_send_request(ogs_sbi_nf_instance_t *nf_instance, void *data)
{
    ogs_assert(nf_instance);

    return ogs_sbi_send_request(nf_instance, client_cb, data);
}

bool udm_sbi_discover_and_send(
        ogs_sbi_service_type_e service_type,
        ogs_sbi_discovery_option_t *discovery_option,
        ogs_sbi_request_t *(*build)(udm_ue_t *udm_ue, void *data),
        udm_ue_t *udm_ue, ogs_sbi_stream_t *stream, void *data)
{
    ogs_sbi_xact_t *xact = NULL;

    ogs_assert(service_type);
    ogs_assert(udm_ue);
    ogs_assert(stream);
    ogs_assert(build);

    xact = ogs_sbi_xact_add(
            &udm_ue->sbi, service_type, discovery_option,
            (ogs_sbi_build_f)build, udm_ue, data);
    if (!xact) {
        ogs_error("udm_sbi_discover_and_send() failed");
        ogs_assert(true ==
            ogs_sbi_server_send_error(stream,
                OGS_SBI_HTTP_STATUS_GATEWAY_TIMEOUT, NULL,
                "Cannot discover", udm_ue->suci));
        return false;
    }

    xact->assoc_stream = stream;

    if (ogs_sbi_discover_and_send(xact, client_cb) != true) {
        ogs_error("udm_sbi_discover_and_send() failed");
        ogs_sbi_xact_remove(xact);
        ogs_assert(true ==
            ogs_sbi_server_send_error(stream,
                OGS_SBI_HTTP_STATUS_GATEWAY_TIMEOUT, NULL,
                "Cannot discover", udm_ue->suci));
        return false;
    }

    return true;
}
