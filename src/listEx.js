/* eslint-disable */
const fs = require("fs");
const dirTree = require("directory-tree");
const filteredTree = dirTree("dist/examples", { extensions: /\.dsp/, normalizePath: true }, (item) => item.path = item.path.replace(/^dist\//, ""), (dir) => dir.path = dir.path.replace(/^dist\//, ""));
fs.writeFileSync("./dist/examples.json", JSON.stringify(filteredTree));
