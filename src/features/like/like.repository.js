import LikeModel from "./like.model.js";
import { getDB } from "../../db_config/mongodb.js";
import { ObjectId } from "mongodb";

export default class LikeRepository {
    constructor() {
        this.collectionName = "likes";
    }

    async getPostLikeById(userId, postId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const like = await collection.findOne({userId: new ObjectId(userId), postId: new ObjectId(postId)});
            return {success: true, res: like};
        } catch (error) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: error.message
                }
            }
        }
    }
}