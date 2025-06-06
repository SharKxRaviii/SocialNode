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
                success: false,
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
                        msg: "Post not found"
                    }
                }
            }
            return {success: true, res: userId};
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

    async getProfilePost(userId) {
    try {
        const db = getDB();
        const collection = db.collection(this.collectionName);
        const posts = await collection.find({ userId }).toArray();
        return {
            success: true,
            res: posts
        };
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


    async createNewPost(userId, imageUrl, caption) {
        try {
            const db = getDB();
            const postModel = new PostModel(userId, imageUrl, caption);
            const collection = db.collection(this.collectionName);
            const post = await collection.insertOne(postModel);
            const insertedPost = await collection.findOne({_id: new ObjectId(post.insertedId)});
            return {success: true, res: insertedPost};
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

    async updatePostById(_id, userId, postData) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const updatedPost = await collection.updateOne({_id: new ObjectId(_id), userId}, {$set: postData});

            if(updatedPost.matchedCount === 0) {
                return {success: false, error: {statusCode: 404, msg: 'Post not found or not authorized'}};
            }
            return {
                success: true,
                msg: 'Post Updated Successfully',
                res: updatedPost
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

    async deletePostById(_id, userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const result = await collection.deleteOne({_id: new ObjectId(_id), userId});
            if(result.deletedCount  === 0) {
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg: 'Post not found or user unauthorized'
                    }
                }
            }
            return {
                success: true,
                msg: "Post deleted successfully"
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