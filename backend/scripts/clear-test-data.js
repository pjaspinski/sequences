const fs = require("fs");

fs.rmdirSync("test-data/plugins", { recursive: true, force: true });
console.log("CLEAR-TEST-DATA: Successfully cleared saved plugins configurations");
