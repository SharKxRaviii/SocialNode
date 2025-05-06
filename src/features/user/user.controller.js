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
            
        }
    }

    async signIn(req, res) {
        const {email, password} = req.body;

        try {
           const user = await this.userRepository.signInUser(email, password);
           if(!user) {
            return res.status(400).json({success: false, msg: "Incorrect Credentials!!"});
           }

           const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
           );
            res.status(200).json({
                success: true,
                msg: 'User Successfully Signed In',
                res: token
            });
        } catch (error) {
            
        }
    }
    
}