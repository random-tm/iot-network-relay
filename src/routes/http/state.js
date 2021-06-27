import axios from "axios";
import localHost from "../../net/host.js"
import { wsRouteTypes } from "../ws.js";

export default (query, emitter) => {
    const stateServer = localHost.stateServer;
    const stateServerUrl = `http://${stateServer.address}:${stateServer.port}/state`;
    axios.post(stateServerUrl, query).then(() => {
        if(emitter){
            emitter.emit("sendWS", {
                url: stateServerUrl,
                params: query
            }, wsRouteTypes.StateChange);
            emitter.emit("sendWS", {
                url: stateServerUrl,
                params: query
            }, wsRouteTypes.HistoryUpdate);
        }
    }).catch(() => {
        console.warn("Failed to connect to state server");
    })
}