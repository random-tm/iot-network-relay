import WebSocket from "ws";

import host from "../host.js";
import initSyncConnections from "../ws/sync.js";
import { getHistory } from "../../state.js";
import { wsRouteTypes } from "../../routes/ws.js";
import send from "../ws/send.js";
import recieve from "../ws/recieve.js";

export default (emitter) => {

    const wss = new WebSocket.Server({ port: host.port });
    wss.on('connection', (ws) => {
    
        emitter.on("sendWS", (message, type) => {
            send(ws, message, type);
        })
    
        const history = getHistory();
        send(ws, history, wsRouteTypes.HistoryAll);
    
        ws.on('message', (rawMessage) => {
            recieve(rawMessage, ws);
        });
    });
    
    initSyncConnections(host, (rawMessage, ws) => {
        recieve(rawMessage, ws);
    });    

}
