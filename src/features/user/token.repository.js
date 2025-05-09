import { getDB } from "../../db_config/mongodb.js";

export default class TokenRepository {
    constructor() {
        this.tokenCollection = 'tokens';
    }

    async storeRefreshToken(token, userId) {
        const db = getDB();
        const collection = db.collection(this.tokenCollection);
        return await collection.insertOne({token, userId});
    }

    async deleteRefreshToken(token) {
        const db = getDB();
        const collection = db.collection(this.tokenCollection);
        return await collection.deleteOne({token});
    }

    async deleteAllTokenForUser (userId) {
        const db = getDB();
        const collection = db.collection(this.tokenCollection);
        return await collection.deleteMany({userId}); 
    }
}