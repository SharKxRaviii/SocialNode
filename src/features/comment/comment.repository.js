import CommentModel from './comment.model.js';
import getDB from '../../db_config/mongodb.js';
import { ObjectId } from 'mongodb';

export default class CommentRepository {
    constructor() {
        this.collectionName = 'comments';
    }

    async getCommentById(_id, userId, postId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const comment = await collection.findOne({
                _id: new ObjectId(_id),
                userId: new ObjectId(userId),
                postId: new ObjectId(postId)
            });

            if(!comment) {
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg: "Comment not found"
                    }
                }
            }

            return {
                success: true,
                res: comment
            }
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