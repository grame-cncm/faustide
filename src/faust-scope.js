/* eslint-disable */
const fs = require("fs");

const map = { "index.js": "scope.js", "index.js.map": "scope.js.map" };
for (const key in map) {
    fs.copyFileSync("./node_modules/webaudio-scope/dist/" + key, "./dist/" + map[key]);
}
