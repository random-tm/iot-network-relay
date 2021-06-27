import WebSocket from "ws";
import devices from "../devices.js";

const websockets = {};

const initConnection = (device, receivedHandler) => {
    console.log(`Connecting on: ws://${device.address}:${device.port}`);
    return new Promise((resolve, reject) => {
        try {
            websockets[device.name] = new WebSocket(`ws://${device.address}:${device.port}`);
            websockets[device.name].on('connection', (ws) => {
                websockets[device.name].on('open', () => {
                    resolve();
                });

                websockets[device.name].on('error', () => {
                    reject();
                });

                websockets[device.name].on('message', (data) => {
                    console.log(data);
                    receivedHandler(data, ws);
                });
            });
            websockets[device.name].on('error', () => {
                reject();
            });

        } catch {
            reject();
        }
    })
}

export default () => {
    for (const device of devices) {
        console.log("Creating connection");
        initConnection(device).catch(() => {
            if (device.recover) {
                const retry = setInterval(() => {
                    initConnection(device).then(() => {
                        clearInterval(retry);
                    });
                }, 5000);
            } else {
                delete websockets[device.name];
            }
        });
    }
}