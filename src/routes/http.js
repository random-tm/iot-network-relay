import action from "./http/action.js";
import state from "./http/state.js";
import { auth } from "../net/sec/http.js";

const parseQueryString = (queryString) => {
    const params = queryString.split("&");
    const paramValues = {};
    for (const param of params) {
        const keyValuePair = param.split("=");
        const keyName = keyValuePair[0];
        const keyValue = keyValuePair[1];
        paramValues[keyName] = keyValue;
    }
};

export default (request, emitter) => {
    const pathName = request.path;
    const queryString = request.querystring;
    const params = parseQueryString(queryString);

    if (!auth) {
        return;
    }

    switch (pathName) {
        case "/state":
            state(params, emitter);
            break;
        case "/action":
            action(params, emitter);
            break;
        default:
            break;
    }
}