import config from "../../config/index.js";

export const auth = (params) => {
    if(params.auth === config.publishKey){
        return true;
    } else {
        return false;
    }
}