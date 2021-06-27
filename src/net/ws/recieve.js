import wsRoutes from "../../routes/ws.js";
import { decodeMessage, validateMessage } from "../sec/ws.js";

export default (rawMessage, ws) => {
    if(validateMessage(rawMessage)){
        const message = decodeMessage(rawMessage);
        wsRoutes(message, ws);
    }
}