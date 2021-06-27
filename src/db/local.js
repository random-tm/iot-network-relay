//A lightweight local filesystem based DB
import fs from "fs";

const dbPath = "./database";

export const write = (id, data) => {
    fs.writeFile(`${dbPath}/${id}`, JSON.stringify(data));
}

export const readAll = () => {
    const db = {};
    return new Promise((resolve, reject) => {
        fs.readdir(dbPath, (err, files) => {
            if (err) {
                reject(err);
            }
            const fileCount = files.length;
            for (const file of files) {
                fs.readFile(`${dbPath}/${file}`, (data) => {
                    const parsedData = JSON.parse(data);
                    db[file] = parsedData;
                    if (Object.keys(db).length === fileCount) {
                        resolve(db);
                    }
                })
            }
        });
    })
}

const msDay = 1000 * 60 * 60 * 24;
const msHour = 1000 * 60 * 60;
setInterval(() => {
    const time = new Date().getTime();
    fs.readdir(dbPath, (err, files) => {
        for (const file of files) {
            const fileName = Number(file);
            if (fileName + msDay < time) {
                fs.rm(`${dbPath}/${fileName}`, { recursive: true, force: true });
            }
        }
    })
}, msHour);