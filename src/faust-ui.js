/* eslint-disable */
const fs = require("fs");

["faust_ui.html", "faust_ui.js", "faust_ui.js.map"].forEach((f) => {
    fs.copyFileSync("./node_modules/faust-ui/dist/" + f, "./dist/" + f);
});
