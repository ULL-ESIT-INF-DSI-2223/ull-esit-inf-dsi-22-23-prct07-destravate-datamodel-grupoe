"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
// lowdb
var lowdb = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
// eslint-disable-next-line prefer-const
exports.database = lowdb(new FileSync("database.json"));
exports.database.defaults({ rutas: [] }, { usuarios: [] }, { grupos: [] }, { retos: [] }).write();
