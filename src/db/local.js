//A lightweight local filesystem based DB
import fs from "fs";

const dbPath = "./database";

export const write = (id, data) => {
    fs.writeFile(`${dbPath}/${id}`, JSON.stringify(data));
}

export const readAll = () => {
    const db = {};
    return new Promise((resolve, reject) => {
        fs.readdir("./database", (err, files) => {
            if(err){
                reject(err);
            }
            const fileCount = files.length;
            for(const file of files){
                fs.readFile(`${dbPath}/${file}`, (data) => {
                    const parsedData = JSON.parse(data);
                    db[file] = parsedData;
                    if(Object.keys(db).length === fileCount){
                        resolve(db);
                    }
                })
            }
        });
    })
}
