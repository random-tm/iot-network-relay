import { getReqType } from "../net/ws/api.js";
import action from "./http/action.js";
import state from "./http/state.js";
import historyAll from "./ws/historyAll.js";
import historyUpdate from "./ws/historyUpdate.js";

export const wsRouteTypes = {
    HistoryUpdate: "history_update",
    HistoryAll: "history_all",
    StateChange: "state_change",
    Action: "action"
}

export default (message, ws) => {

    const type = getReqType(message);

    switch(type){
        case wsRouteTypes.HistoryUpdate:
            historyUpdate(message);
            break;
        case wsRouteTypes.HistoryAll:
            historyAll(message);
            break;
        case wsRouteTypes.StateChange:
            state(message.params);
            break;
        case wsRouteTypes.Action:
            action(message.params);
            break;
        default:
            break;
    }
}