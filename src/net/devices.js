import config from "../config/index.js";
import hostIp from "./ip.js";

const networkedDevices = [];

for (const device of config.devices) {
    if (device.address !== hostIp) {
        if(device.dynamic){
            device.address = device.dynamic;
        }
        networkedDevices.push(device);
    }
}

export default networkedDevices;