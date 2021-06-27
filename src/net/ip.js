import os from "os";
import config from "../config/index.js"

const localNetworkConfig = os.networkInterfaces();
const devicesInNet = config.devices;

const filterIpv4 = (localNetworkInterface) => {
    return localNetworkInterface.filter((netInterface) => {
        return netInterface.family === "IPv4";
    })
}

const hostMatchesConfig = (hostInterface, configInterface) => {
    if(hostInterface.internal === false){
        if((hostInterface.mac === configInterface.mac) || (configInterface.mac === "dynamic")){
            if(hostInterface.address === configInterface.address){
                return hostInterface.address;
            }
        }
    }
}

const getIpOfDevice = () => {
    for(const device of devicesInNet){
        const localNetworkInterface = localNetworkConfig[device.adapter];
        if(localNetworkInterface){
            const ipv4Interfaces = filterIpv4(localNetworkInterface);
            for(const ipv4Interface of ipv4Interfaces){
                return hostMatchesConfig(ipv4Interface, device);
            }
        }
    }
}

const deviceIp = getIpOfDevice();
export default deviceIp;