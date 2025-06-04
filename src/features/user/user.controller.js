import ErrorHandler from "../../middlewares/appErrorHandler.middleware.js";
import UserRepository from "./user.repository.js";
import TokenRepository from "./token.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
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
    const { email, password } = req.body;

    try {
        const result = await this.userRepository.signInUser(email, password);

        if (!result.success) {
            return res.status(400).json({ success: false, msg: "Incorrect Credentials!!" });
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
                _id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.REFRESH_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '7d'
            }
        );

        // Set refresh token as HTTP-only cookie
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { password: _, ...safeUser } = user;

        return res.status(200).json({
            success: true,
            msg: 'User Successfully Signed In',
            data: { accessToken, user: safeUser }
        });

    } catch (error) {
        console.error("SignIn error:", error);
        return res.status(500).json({
            success: false,
            msg: "Server Error! Try again later."
        });
    }
}


    async logout(req, res) {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) return res.status(400).json({ success: false, msg: 'No token provided' });

            await this.tokenRepository.deleteRefreshToken(refreshToken);
            res.clearCookie('refresh_token');
            return res.status(200).json({ success: true, msg: 'Logged out from current device' });
            } catch (err) {
            return res.status(500).json({ success: false, msg: 'Server error' });
        }
    }

    async logoutAllDevices(req, res) {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) return res.status(400).json({ success: false, msg: 'No token provided' });

            const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            await this.tokenRepository.deleteAllTokenForUser(payload._id);
            res.clearCookie('refresh_token');
            return res.status(200).json({ success: true, msg: 'Logged out from all devices' });
            } catch (err) {
            return res.status(500).json({ success: false, msg: 'Server error' });
        }
    }
    
}