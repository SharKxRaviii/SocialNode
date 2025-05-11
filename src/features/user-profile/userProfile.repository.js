import { getDB } from "../../db_config/mongodb.js"
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

export default class UserProfileRepository {
    constructor() {
        this.collectionName = 'users'
    }

    async getUserDetailsById(_id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);

            const userId = await collection.findOne({_id: new ObjectId(_id)}, {projection: {password: 0}});
            if(!userId){
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg: "User Id not found"
                    }
                }
            }else {
                return {
                    success: true,
                    res: oneUser
                }
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

    async allUserDetails () {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const allDetails = await collection.find({}, {projection: {password: 0}}).toArray();
            return {
                success: true,
                res: allDetails
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

    async updateDetailsById(_id, updateData) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            
            // hash the updated password securely
            if(updateData.password) {
                const updatedPassword = await bcrypt.hash(updateData.password, 12);
                updateData.password = updatedPassword;
            }

            // update the user data
            const result = await collection.updateOne(
                {_id: new ObjectId(_id)},
                {$set: updateData}
            );

            return {
                success: true,
                msg: "User details updated successfully",
                modifiedCount: result.modifiedCount
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