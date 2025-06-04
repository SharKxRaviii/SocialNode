import { ObjectId } from 'mongodb';
import { generateOTP } from '../../../utils/otpGenerator.js';
import { sendOTPEmail } from '../../../utils/sendMail.js';
import ErrorHandler from '../../middlewares/appErrorHandler.middleware.js';

export default class OtpController {
    constructor(otpRepository, userRepository) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
    }

    async sendOtp(req, res) {
        const { email } = req.body;
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

            const otp = generateOTP();
            await this.otpRepository.saveOTP(email, otp);
            await sendOTPEmail(email, otp);

            return res.status(200).json({ success: true, msg: 'OTP sent successfully' });
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async verifyOtp(req, res) {
        const { email, otp } = req.body;
        try {
            const isValid = await this.otpRepository.verifyOTP(email, otp);
            if (!isValid) {
                return res.status(400).json({ success: false, msg: 'Invalid or expired OTP' });
            }
            return res.status(200).json({ success: true, msg: 'OTP verified successfully' });
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async resetPassword(req, res) {
        const { email, newPassword } = req.body;
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

            await this.userRepository.updatePassword(email, newPassword);
            await this.otpRepository.deleteOTP(email);

            return res.status(200).json({ success: true, msg: 'Password updated successfully' });
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }
}
