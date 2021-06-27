export const setReqType = (payload, type) => {
    payload.req_type = type;
    return payload;
}

export const getReqType = (payload) => {
    return payload.req_type;
}

export const cleanReqType = (payload) => {
    delete payload["req_type"];
}