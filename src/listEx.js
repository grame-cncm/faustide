/* eslint-disable */
const fs = require("fs");
const dirTree = require("directory-tree");
const filteredTree = dirTree("./dist/examples", { extensions: /\.dsp/, normalizePath: true });
fs.writeFileSync("./dist/examples.json", JSON.stringify(filteredTree));
