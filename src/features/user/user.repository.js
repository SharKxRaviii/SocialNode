import UserModel from "./user.model.js";
import { getDB } from "../../db_config/mongodb.js";

export default class UserRepository {
    constructor() {
        this.collection = 'users';
    }

    async signUpUser(name, email, password) {

    }

    async signInUser() {}

    async logOutUser() {}

    async logOutAllDevices(){}
}