import express from 'express';
import UserController from './user.controller.js';


const userRoutes = express.Router();

const userController = new UserController();

userRoutes.post('/signup', (req, res) => {
    userController.signUp(req, res);
});
userRoutes.post('/signin', (req, res) => {
    userController.signIn(req, res);
});

export default userRoutes;