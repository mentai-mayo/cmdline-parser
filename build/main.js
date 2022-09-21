#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeta = void 0;
const node_process_1 = __importDefault(require("node:process"));
/**
 * メタデータの取得
 */
function getMeta() {
    const argv = node_process_1.default.argv;
    const opts = Object.create(null);
    const list = [];
    let before = null;
    for (const [idx, arg] of argv.entries()) {
        if (idx < 2)
            continue; // [ nodejs path, source path, ...arguments ]
        if (/^--/.test(arg) && arg != '--') {
            if (before)
                opts[before] = true;
            before = arg.substring(2);
            continue;
        }
        if (/^-[a-zA-Z_:]+/.test(arg)) {
            const list = arg.substring(1).split('');
            if (list.length == 1) {
                if (before)
                    opts[before] = true;
                before = list[0];
                continue;
            }
            for (const char of list)
                opts[char] = true;
            continue;
        }
        if (before) {
            opts[before] = arg;
            before = null;
            continue;
        }
        list.push(arg);
    }
    return {
        arguments: argv,
        list,
        options: opts,
        paths: {
            nodejs: argv[0],
            source: argv[1],
            current: node_process_1.default.cwd(),
        },
    };
}
exports.getMeta = getMeta;
