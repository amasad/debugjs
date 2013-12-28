"use strict";

var fs = require("fs");
var fmt = require("simple-fmt");
var tryor = require("tryor");
var defs = require("./defs-main");

if (process.argv.length <= 2) {
    console.log("USAGE: defs file.js");
    process.exit(-1);
}
var filename = process.argv[2];

if (!fs.existsSync(filename)) {
    console.log(fmt("error: file not found <{0}>", filename));
    process.exit(-1);
}

var src = String(fs.readFileSync(filename));

var config = findAndReadConfig();

var ret = defs(src, config);
if (ret.errors) {
    process.stderr.write(ret.errors.join("\n"));
    process.stderr.write("\n");
    process.exit(-1);
}

if (config.stats) {
    process.stdout.write(ret.stats.toString());
    process.exit(0);
}
if (ret.ast) {
    process.stdout.write(JSON.stringify(ret.ast, null, 4));
}
if (ret.src) {
    process.stdout.write(ret.src);
}

function findAndReadConfig() {
    var path = "";
    var filename = "defs-config.json";
    var filenamePath = null;

    while (fs.existsSync(path || ".")) {
        filenamePath = path + filename;
        if (fs.existsSync(filenamePath)) {
            var config = tryor(function() {
                return JSON.parse(String(fs.readFileSync(filenamePath)));
            }, null);
            if (config === null) {
                console.error("error: bad JSON in %s", filenamePath);
                process.exit(-1);
            }
            return config;
        }

        path = "../" + path;
    }

    return {};
}