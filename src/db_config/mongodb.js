import { MongoClient } from "mongodb";

let client;

export function connectToDB () {
    MongoClient.connect(process.env.URI)
    .then((clientInstance) => {
        client = clientInstance;
        console.log('mongoDB is connected');
        client.db();
    })
    .catch(err => {
        console.log(err);
    })
}

export function getClient() {
    return client;
}

export function getDB() {
    return client.db();
}
