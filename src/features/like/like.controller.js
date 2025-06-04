import ErrorHandler from "../../middlewares/appErrorHandler.middleware.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async postLikeById(req, res) {
        const {id} = req.params;
        const {postId} = req.body;
        const userId = req._id;
        try {
            const like = await this.likeRepository.getPostLikeById(id, userId, postId);
            if(!like.success) {
                return res.status(404).json({success: false, msg: "postId not found"});
            }
            res.status(200).json({success: true, res: like.res});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }

    async toggleLike(req, res) {
        const {id} = req.params;
        const {postId} = req.body;
        const userId = req._id;

        try {
            const like = await this.likeRepository.togglePostLike(id, userId, postId);
            if(like.res) {
                return res.status(201).json({success: true, msg: like.msg, res: like.res});
            }
            return res.status(200).json({success: true, res: like.msg});
        } catch (error) {
            throw new ErrorHandler("Server Error ! try again later!!",500);
        }
    }
}