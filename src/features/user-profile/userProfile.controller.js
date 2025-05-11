import UserProfileRepository from "./userProfile.repository.js"
import ErrorHandler from "../../middlewares/appErrorHandler.middleware.js";

export default class UserProfileController {
    constructor() {
        this.userProfileRepository = new UserProfileRepository();
    }

    async getUserDetailsById(req, res) {
        const {userId} = req.params;

        try {
            const user = await this.userProfileRepository.getUserDetailsById(userId);
            if(!user.success) {
                return res.status(user.error.statusCode).json({success: false, msg: user.error.msg});
            }
            res.status(200).json({success: true, res: user.res});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async allUserDetails (req, res) {
        try {
            const allUsers = await this.userProfileRepository.allUserDetails();
            if(!allUsers.success) {
                return res.status(allUsers.error.statusCode).json({success: false, msg: allUsers.error.msg});
            }
            res.status(200).json({success: true, res: allUsers.res});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async updateDetailsById (req, res) {
        const {userId} = req.params;
        const userData = req.body;

        try {
            const updatedData = await this.userProfileRepository.updateDetailsById(userId, userData);
            if(!updatedData.success) {
                return res.status(updatedData.error.statusCode).json({success: false, msg: updatedData.error.msg});
            }
            res.status(200).json({success: true, msg: updatedData.msg , res: updatedData.modifiedCount});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }
}