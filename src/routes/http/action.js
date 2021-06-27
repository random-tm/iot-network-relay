import send from "../../net/http/send.js";

export default (query, emitter) => {
    const sender = send(query, emitter);
    sender("post", "action");
}