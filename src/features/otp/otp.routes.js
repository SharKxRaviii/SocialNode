import express from 'express';
import OtpController from './otp.controller.js';

const otpRoutes = express.Router();
const otpController = new OtpController();

otpRoutes.post('/send', (req, res) => {
    otpController.sendOtp(req, res);
});
otpRoutes.get('/verify', (req, res) => {
    otpController.verifyOtp(req, res);
});
otpRoutes.post('/reset-password', (req, res) => {
    otpController.resetPassword(req, res);
});
export default otpRoutes;