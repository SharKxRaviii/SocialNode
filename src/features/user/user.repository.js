import UserModel from "./user.model.js";
import { getDB } from "../../db_config/mongodb.js";

export default class UserRepository {
    constructor() {
        this.collectionName = 'users';
    }

    async signUpUser(name, email, password) {
        try {
            const db = getDB();
            const user = new UserModel(name, email, password);
            const collection = db.collection(this.collectionName);
            const result = await collection.insertOne(user);
            const insertedUser = await collection.findOne(
                {_id: result.insertedId},
                {projection: {password: 0}}
            )
            return {success: true, res: insertedUser}
        } catch (error) {
            return{
                success: false,
                error: {
                    statusCode: 500,
                    msg: error.message || "Internal Server Error"
                }
            }
        }
    }

    async signInUser() {}

    async logOutUser() {}

    async logOutAllDevices(){}
}