import action from "./routes/http/action.js";
import state from "./routes/http/state.js";
import { wsRouteTypes } from "./routes/ws.js";
import * as _ from "lodash";

let emitHistory = {};

export const addToHistory = (historyItem) => {
    const timestamp = historyItem.timestamp;
    delete historyItem.timestamp;
    emitHistory[timestamp] = historyItem;
}

export const getHistory = () => {
    return emitHistory;
}

export const combineHistory = (newHistory) => {
    const emitHistoryKeys = Object.keys(emitHistory);
    const newHistoryKeys = Object.keys(newHistory);
    const newKeys = _.difference(newHistoryKeys, emitHistoryKeys);
    emitHistory = {...emitHistory, ...newHistory};
    replayHistory(newKeys);
}

const replayHistory = (newKeys) => {
    for(const key of newKeys){
        const historyMessage = emitHistory[key];
        if(getReqType(historyMessage) === wsRouteTypes.Action){
            action(historyMessage.params);
        } else if (getReqType(historyMessage) === wsRouteTypes.StateChange){
            state(historyMessage.params);
        }
    }
}

const hoursToClearHistory = 24;
const clearBy = hoursToClearHistory * 60 * 60 * 1000;
setInterval(() => {
    const currentTime = new Date().getTime();
    for(const entry in emitHistory){
        if(entry + clearBy < currentTime){
            delete emitHistory[entry];
        }
    }
}, 1000);