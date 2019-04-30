/* eslint-disable */
const fs = require("fs");
const path = require("path");
const entry = "./examples";
const dirTree = require("directory-tree");
const filteredTree = dirTree("./examples", { extensions: /\.dsp/, normalizePath: true });
fs.writeFileSync("./dist/examples.json", JSON.stringify(filteredTree));
