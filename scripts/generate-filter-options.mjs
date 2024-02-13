import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getFiles(directory, fileList) {
    fileList = fileList || [];
    let files = fs.readdirSync(directory);
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    for (let i in files) {
        const name = `${directory}/${files[i]}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, fileList);
        } else {
            fileList.push(name);
        }
    }
    return fileList;
}

const bicinia = getFiles(`${__dirname}/../content/bicinia`).map(file => {
    return yaml.load(fs.readFileSync(file, 'utf8'));
});

const modes = [...new Set(bicinia.map(bicinium => bicinium.mode).filter(n => n))];
const finalis = [...new Set(bicinia.map(bicinium => bicinium.finalis).filter(n => n))];

const json = {
    modes,
    finalis,
};

console.log(json);

fs.writeFileSync(`${__dirname}/../src/utils/bicinium-filter-options.json`, JSON.stringify(json, null, '\t'), 'utf8');
