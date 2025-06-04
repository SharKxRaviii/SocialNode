export default class OtpModel {
    constructor(email, otp, expiresAt) {
        this.email = email;
        this.otp = otp;
        this.expiresAt = expiresAt;
        this.verified = false;
    }
}
