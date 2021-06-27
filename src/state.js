import action from "./routes/http/action.js";
import state from "./routes/http/state.js";
import { wsRouteTypes } from "./routes/ws.js";
import { write } from "./db/local.js";
import * as _ from "lodash";
import { cloneDeep } from "lodash";

let emitHistory = {};

export const addToHistory = (historyItem) => {
    const timestamp = historyItem.timestamp;
    delete historyItem.timestamp;
    emitHistory[timestamp] = historyItem;
    write(timestamp, historyItem);
}

export const setHistory = (history) => {
    emitHistory = cloneDeep(history);
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
        //Deep clone as it is possible to clear an old item from history while we are sending it
        const historyMessage = cloneDeep(emitHistory[key]);
        const currentTime = new Date().getTime();
        const delayTime = Math.abs(Number(key) - currentTime);
        setTimeout(() => {
            if(getReqType(historyMessage) === wsRouteTypes.Action){
                action(historyMessage.params);
                write(key, historyMessage);
            } else if (getReqType(historyMessage) === wsRouteTypes.StateChange){
                state(historyMessage.params);
                write(key, historyMessage);
            }
        }, delayTime);
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