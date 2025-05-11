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
            res.status(200).json({success: true, res: user});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }
}