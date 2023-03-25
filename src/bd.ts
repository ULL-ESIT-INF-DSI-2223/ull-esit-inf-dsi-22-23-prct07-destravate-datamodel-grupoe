// lowdb
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { schemaType } from "./types";

export let database: lowdb.LowdbSync<schemaType>;
// eslint-disable-next-line prefer-const
database = lowdb(new FileSync("database.json"));
database.defaults({ rutas: [] }, {usuarios: [] }).write();