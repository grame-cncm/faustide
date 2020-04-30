/* eslint-disable */
const fs = require("fs");
const dirTree = require("directory-tree");
const filteredTree = dirTree("./src/static/examples", { extensions: /\.dsp/, normalizePath: true }, (item) => item.path = item.path.replace(/^src\/static\//, ""), (dir) => dir.path = dir.path.replace(/^src\/static\//, ""));
fs.writeFileSync("./src/static/examples.json", JSON.stringify(filteredTree));
