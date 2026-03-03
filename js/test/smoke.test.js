const assert = require("assert");
const pkg = require("../package.json");

assert.ok(pkg.name);
assert.ok(pkg.dependencies && pkg.dependencies.express);

console.log("smoke ok");
