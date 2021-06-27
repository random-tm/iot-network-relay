import axios from "axios";
import localHost from "../../net/host.js"
import { wsRouteTypes } from "../ws.js";

export default (query, emitter) => {
    const stateServerUrl = `http://${localHost.stateServer.address}:${localHost.stateServer.port}/action`;
    axios.post(stateServerUrl, query).then(() => {
        if(emitter){
            emitter.emit("sendWS", {
                url: stateServerUrl,
                params: query
            }, wsRouteTypes.Action);
            emitter.emit("sendWS", {
                url: stateServerUrl,
                params: query
            }, wsRouteTypes.HistoryUpdate);
        }
    }).catch(() => {
        console.warn("Failed to connect to state server");
    })
}