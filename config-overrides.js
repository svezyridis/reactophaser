
var path = require("path")
module.exports = function override(config, env) {
    config.resolve.modules.push(JSON.stringify({
        alias: {
            assets: path.join(__dirname, '../src/assets'),
        },
    }))
    config.output.globalObject = "this"
    return config;
}