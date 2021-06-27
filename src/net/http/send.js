import axios from "axios"
import localHost from "../host.js";
import config from "../../config/index.js";

export default (query, emitter) => {
    return (type, path) => {
        const stateServer = localHost.stateServer;
        const stateServerUrl = `http://${stateServer.address}:${stateServer.port}/${path}`;
        const alteredQuery = {...query, ...{auth: config.publishKey}};
        axios[type](stateServerUrl, alteredQuery).then(() => {
            if(emitter){
                emitter.emit("sendWS", {
                    url: stateServerUrl,
                    params: alteredQuery
                }, wsRouteTypes.StateChange);
                emitter.emit("sendWS", {
                    url: stateServerUrl,
                    params: alteredQuery
                }, getType(path));
            }
        }).catch(() => {
            console.warn("Failed to connect to state server");
        })
    }
}

const getType = (path) => {
    const urlMap = {
        "state": [wsRouteTypes.StateChange],
        "action": [wsRouteTypes.Action]
    };
    return urlMap[path];
}