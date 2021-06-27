import EventEmitter from "events";
import http from "./net/init/http.js";
import ws from "./net/init/ws.js";

const emitter = new EventEmitter();
ws(emitter);
http(emitter);
