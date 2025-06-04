import FriendShipModel from "./friendship.model.js";
import {getDB} from '../../db_config/mongodb.js';
import { ObjectId } from "mongodb";

export default class FriendShipRepository {
    constructor() {
        this.collectionName = "friendships"
    }

    async getFriends(userId) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        const friends = await collection.find({
            $or: [
                { userId: new ObjectId(userId), status: 'accepted' },
                { friendId: new ObjectId(userId), status: 'accepted' }
            ]
        }).toArray();

        return friends;
    }

    async getPendingRequests(userId) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        const requests = await collection.find({
            friendId: new ObjectId(userId),
            status: 'pending'
        }).toArray();

        return requests;
    }

    async toggleFriendship(userId, friendId) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        const existingRequest = await collection.findOne({
            $or: [
                { userId: new ObjectId(userId), friendId: new ObjectId(friendId) },
                { userId: new ObjectId(friendId), friendId: new ObjectId(userId) }
            ]
        });

        if (existingRequest) {
            await collection.deleteOne({ _id: existingRequest._id });
            return { msg: 'Friendship removed or request canceled' };
        }

        const newRequest = new FriendShipModel(
            new ObjectId(userId),
            new ObjectId(friendId),
            'pending'
        );

        const result = await collection.insertOne(newRequest);
        return { msg: 'Friend request sent', insertedId: result.insertedId };
    }

    async respondToRequest(userId, friendId, action) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        const result = await collection.updateOne(
            {
                userId: new ObjectId(friendId), // sender
                friendId: new ObjectId(userId), // receiver
                status: 'pending'
            },
            {
                $set: {
                    status: action === 'accept' ? 'accepted' : 'rejected',
                    respondedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return { success: false, msg: 'No pending request found' };
        }

        return { success: true, msg: `Friend request ${action}ed` };
    }
}