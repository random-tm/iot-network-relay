import { combineHistory } from "../../state.js"

export default (message) => {
    combineHistory(message);
}