import PostModel from './post.model.js';
import { getDB } from '../../db_config/mongodb.js';
import { ObjectId } from 'mongodb';

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

    async getPostById(_id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const userId = await collection.findOne({_id: new ObjectId(_id)});
            if(!userId) {
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg: error.message
                    }
                }
            }
            return {success: true, res: userId};
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

    async getAllPostById(userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            await collection.find({userId});
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