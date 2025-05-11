import PostModel from './post.model.js';
import { getDB } from '../../db_config/mongodb.js';

export default class PostRepository {
    constructor() {
        this.collectionName = 'posts';
    }

    async getAllUsersPost() {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const allPost = await collection.find().toArray();
            return {
                success: true,
                res: allPost
            }
        } catch (error) {
            return {
                succes: false,
                error: {
                    statusCode: 500,
                    msg: error.message
                }
            }
        }
    }
}