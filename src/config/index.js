import fs from "fs";

const configRaw = fs.readFileSync(`./config.json`, {encoding: "utf-8"});
const config = JSON.parse(configRaw);
export default config;