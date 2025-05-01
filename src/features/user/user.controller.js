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
            const user = await this.userRepository.signUpUser(name, email, hashedPass);
            res.status(201).json({
                success: true,
                msg: 'User Successfully Signed Up',
                res: user
            });
        } catch (error) {
            
        }
    }
    
}