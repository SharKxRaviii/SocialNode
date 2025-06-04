import { ObjectId } from 'mongodb';
import { getDB } from '../../db_config/mongodb';
import OtpModel from './otp.model.js';
import bcrypt from 'bcrypt';

export default class OtpRepository {
    constructor() {
        this.collectionName = 'otp_requests';
    }

    // 1. Send OTP
    async sendOtp(email, otp) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        // Optional: delete existing OTPs for the same email
        await collection.deleteMany({ email });

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const newOtp = new OtpModel(email, otp, expiresAt);

        const result = await collection.insertOne(newOtp);
        return { success: true, insertedId: result.insertedId };
    }

    // 2. Verify OTP
    async verifyOtp(email, otp) {
        const db = getDB();
        const collection = db.collection(this.collectionName);

        const existingOtp = await collection.findOne({ email, otp });

        if (!existingOtp) {
            return { success: false, msg: 'Invalid OTP' };
        }

        if (existingOtp.verified) {
            return { success: false, msg: 'OTP already used' };
        }

        if (new Date() > new Date(existingOtp.expiresAt)) {
            return { success: false, msg: 'OTP expired' };
        }

        // Mark OTP as used
        await collection.updateOne({ _id: existingOtp._id }, { $set: { verified: true } });

        return { success: true, msg: 'OTP verified' };
    }

    // 3. Reset Password
    async resetPassword(email, newPassword, userCollectionName = 'users') {
        const db = getDB();
        const userCollection = db.collection(userCollectionName);
        const otpCollection = db.collection(this.collectionName);

        // Check if there's a verified OTP
        const validOtp = await otpCollection.findOne({ email, verified: true });

        if (!validOtp) {
            return { success: false, msg: 'OTP not verified' };
        }

        // hash password before storing
        const hashedPass = await bcrypt.hash(newPassword, 12);

        const result = await userCollection.updateOne(
            { email },
            { $set: { password: hashedPass } }
        );

        if (result.modifiedCount === 0) {
            return { success: false, msg: 'Password reset failed' };
        }

        // Cleanup OTPs after successful password reset
        await otpCollection.deleteMany({ email });

        return { success: true, msg: 'Password reset successful' };
    }
}

