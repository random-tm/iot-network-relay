import Cryptr from "cryptr";
import config from "../../config/index.js";

const cryptr = new Cryptr(config.encryptKey);

export const validateMessage = (message) => {
    try {
        const decryptedMessage = cryptr.decrypt(message);
        const messageObj = JSON.parse(decryptedMessage);
        if(messageObj.sec_key){
            if(messageObj.sec_key == config.publishKey){
                return true;
            }
        }
    } catch {
        return false;
    }
    return false;
}

export const decodeMessage = (message) => {
    const decoded = cryptr.decrypt(message);
    const messageObj = JSON.parse(decoded);
    delete messageObj["sec_key"];
    return messageObj;
}

export const encodeMessage = (message) => {
    const messageBody = {...{sec_key: config.publishKey}, ...message};
    const jsonBody = JSON.stringify(messageBody);
    const encryptedMessage = cryptr.encrypt(jsonBody);
    return encryptedMessage
}