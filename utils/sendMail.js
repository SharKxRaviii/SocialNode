import nodemailer from 'nodemailer';

export async function sendOTPEmail(to, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: `"Postify" <${process.env.EMAIL}>`,
        to,
        subject: 'Your OTP for Password Reset',
        html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`
    };

    await transporter.sendMail(mailOptions);
}
