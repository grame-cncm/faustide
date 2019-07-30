/* eslint-disable */
const fs = require("fs");

const map = { "index.html": "faust-ui.html", "faust-ui.js": "faust-ui.js", "faust-ui.js.map": "faust-ui.js.map" };
for (const key in map) {
    fs.copyFileSync("./node_modules/faust-ui/dist/" + key, "./dist/" + map[key]);
}
