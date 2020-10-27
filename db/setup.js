/**
*Set up database.
*/
"use strict";

const MongoClient = require("mongodb").MongoClient;
const dsn =  "mongodb://localhost:27017/bulbs";

resetCol(dsn, "prices");

async function resetCol(dsn, colName) {
    const mongo = await new MongoClient(dsn, { useUnifiedTopology: true });
    const client = await mongo.connect();
    const db = await client.db();
    const col = await db.collection(colName);

    await col.deleteMany();

    await client.close();
}
