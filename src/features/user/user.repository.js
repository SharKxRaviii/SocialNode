import UserModel from "./user.model.js";
import { getDB } from "../../db_config/mongodb.js";
import bcrypt from 'bcrypt';

export default class UserRepository {
    constructor() {
        this.collectionName = 'users';
        this.tokenCollection = 'tokens';
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

    async signInUser(email, password) {
        try {
            const db = getDB();
            const collection = db.collection(this.collectionName);
            const user = await collection.findOne({email});
            if(!user) {
                return {
                    success: false,
                    error: {
                        statusCode: 404,
                        msg: "User not found"
                    }
                }
            }

            const comparedPass = await bcrypt.compare(password, user.password);
            if(comparedPass) {
                return {
                    success: true,
                    res: user
                }
            }else {
                return{
                    success: false,
                    error: {
                        statusCode: 400,
                        msg: "Incorrect Credentials!!"
                    }
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

}