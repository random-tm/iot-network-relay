import EventEmitter from "events";
import { readAll } from "./db/local.js";
import http from "./net/init/http.js";
import ws from "./net/init/ws.js";
import { setHistory } from "./state.js";

const emitter = new EventEmitter();

readAll().then((history) => {
    setHistory(history);
    ws(emitter);
    http(emitter);    
});