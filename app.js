import express from 'express';
import userRoutes from './src/features/user/user.routes.js';
import userProfileRoutes from './src/features/user-profile/userProfile.routes.js';
import postRoutes from './src/features/post/post.routes.js';
import commentRoutes from './src/features/comment/comment.routes.js';
import likeRoutes from './src/features/like/like.routes.js';
import friendshipRoutes from './src/features/friendship/friendship.routes.js';
import otpRoutes from './src/features/otp/otp.routes.js';
import { appErrorHandlerMiddleware } from './src/middlewares/appErrorHandler.middleware.js';
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import cookieParser from 'cookie-parser';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';

const app = express();

// cookie-parser
app.use(cookieParser());

app.use(express.json());

// logger middleware
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to PostAway-II Project');
});

app.use('/api/users', userRoutes);
app.use('/api/users', jwtAuth, userProfileRoutes);
app.use('/api/posts', jwtAuth, postRoutes);
app.use('/api/likes', jwtAuth, likeRoutes);
app.use('/api/comments', jwtAuth, commentRoutes);
app.use('/api/friends', jwtAuth, friendshipRoutes);
app.use('/api/otp', jwtAuth, otpRoutes);

app.use(appErrorHandlerMiddleware);
export default app
