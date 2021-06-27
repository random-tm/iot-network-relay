import hostIp from "./ip.js";
import config from "../config/index.js";

const localHost = config.devices.find((device) => {
    return device.address === hostIp;
})

export default localHost;