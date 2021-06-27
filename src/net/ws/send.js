import { encodeMessage } from "../sec/ws.js";
import { setReqType } from "./api.js";

export default (ws, message, reqType) => {
    const reqMessage = setReqType(message, reqType);
    reqMessage.timestamp = new Date().getTime();
    const secureMessage = encodeMessage(reqMessage);
    ws.send(secureMessage);
}