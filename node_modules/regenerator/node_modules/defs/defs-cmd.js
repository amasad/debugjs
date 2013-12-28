"use strict";

const fs = require("fs");
const fmt = require("simple-fmt");
const tryor = require("tryor");
const defs = require("./defs-main");

if (process.argv.length <= 2) {
    console.log("USAGE: defs file.js");
    process.exit(-1);
}
const filename = process.argv[2];

if (!fs.existsSync(filename)) {
    console.log(fmt("error: file not found <{0}>", filename));
    process.exit(-1);
}

const src = String(fs.readFileSync(filename));

const config = findAndReadConfig();

const ret = defs(src, config);
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
    let path = "";
    let filename = "defs-config.json";
    let filenamePath = null;

    while (fs.existsSync(path || ".")) {
        filenamePath = path + filename;
        if (fs.existsSync(filenamePath)) {
            const config = tryor(function() {
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