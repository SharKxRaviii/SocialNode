import ErrorHandler from "../../middlewares/appErrorHandler.middleware.js";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        const {name, email, password} = req.body;

        try {
            const hashedPass = await bcrypt.hash(password, 12);
            const newUser = await this.userRepository.signUpUser(name, email, hashedPass);
            res.status(201).json({
                success: true,
                msg: 'User Successfully Signed Up',
                res: newUser
            });
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async signIn(req, res) {
        const {email, password} = req.body;

        try {
           const result = await this.userRepository.signInUser(email, password);
           if(!result.success) {
            return res.status(400).json({success: false, msg: "Incorrect Credentials!!"});
           }

           const user = result.res;

           const accessToken = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.ACCESS_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '15m'
            }
           );

           const refreshToken = jwt.sign(
            {
                _id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.REFRESH_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '7d'
            }
            );

            // store refresh token
            res.cookies('refresh-token', refreshToken, {httpOnly: true, secure: true});
            res.status(200).json({
                success: true,
                msg: 'User Successfully Signed In',
                data: {accessToken, user: {...user, password: undefined}}
            });
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }
    
}