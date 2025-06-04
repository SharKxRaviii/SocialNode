import express from 'express';
import UserController from './user.controller.js';
import { jwtAuth } from '../../middlewares/jwt.middleware.js';


const userRoutes = express.Router();

const userController = new UserController();

userRoutes.post('/signup', (req, res) => {
    userController.signUp(req, res);
});
userRoutes.post('/signin', (req, res) => {
    userController.signIn(req, res);
});
userRoutes.post('/logout', jwtAuth, (req, res) => {
    userController.logout(req, res);
});
userRoutes.post('/logout-all-devices', jwtAuth, (req, res) => {
    userController.logoutAllDevices(req, res);
});
export default userRoutes;