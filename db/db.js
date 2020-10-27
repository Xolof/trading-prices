const MongoClient = require("mongodb").MongoClient;
const dsn =  "mongodb://localhost:27017/bulbs";

async function saveItem(data) {
    const mongo = await new MongoClient(dsn, { useUnifiedTopology: true });
    const client = await mongo.connect();
    const db = await client.db();
    const col = await db.collection("prices");

    await col.insertOne(data);

    await client.close();
    console.log("Save done");
}

async function getItems() {
    const mongo = await new MongoClient(dsn, { useUnifiedTopology: true });
    const client = await mongo.connect();
    const db = await client.db();
    const col = await db.collection("prices");

    const res = await col.find().project({ _id: 0 }).toArray();

    await client.close()

    return res;
}

module.exports = {
    saveItem,
    getItems
}
