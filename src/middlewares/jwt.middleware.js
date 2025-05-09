import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_SECRET);
        console.log("payload:", payload);
        req._id = payload._id;
        req.name = payload.name;

        next();
    } catch (error) {

        // Check refresh token from cookies if access token is expired
        const refreshToken = req.cookies?.refresh_token;

        if(refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
                const newAccessToken = jwt.sign({_id: payload._id, name: payload.name}, process.env.ACCESS_SECRET, {expiresIn: '15min'});
                res.setHeader('x-access-token', newAccessToken);

                req._id = payload._id,
                req.name = payload.name

                next();
            } catch (error) {
                return res.status(403).json({ message: "Invalid or expired token"});
            }
        }else {
            return res.status(403).json({message: 'Invalid or expired token'});
        }
        
    }
}