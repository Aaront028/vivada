// start-with-env.js
require("dotenv").config();
const execSync = require("child_process").execSync;

execSync("ng serve", { stdio: "inherit" });
