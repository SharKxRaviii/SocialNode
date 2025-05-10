import express from 'express';
import UserProfileController from './userProfile.controller.js';


const userProfileRoutes = express.Router();

const userProfileController = new UserProfileController();

userProfileRoutes.get('/get-details/:userId', (req, res) => {
    userProfileController.getUserDetailsById(req, res);
});
userProfileRoutes.get('/get-all-details', (req, res) => {
    userProfileController.allUserDetails(req, res);
});
userProfileRoutes.put('/update-details/:userId', (req, res) => {
    userProfileController.updateDetailsById(req, res);
});

export default userProfileRoutes;