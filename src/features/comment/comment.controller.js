import CommentRepository from "../comment/comment.repository.js";

export default class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    getCommentById = async (req, res) => {
    const { id, postId } = req.params;
    const userId = req._id;

    const result = await this.commentRepository.getCommentById(id, userId, postId);
    if (!result.success) {
        return res.status(result.error.statusCode).json({ error: result.error.msg });
    }

    res.status(200).json(result.res);
};

addComment = async (req, res) => {
    const { postId, commentText } = req.body;
    const userId = req._id;

    const result = await this.commentRepository.addComment(userId, postId, commentText);
    if (!result.success) {
        return res.status(result.error.statusCode).json({ error: result.error.msg });
    }

    res.status(201).json(result.res);
};

updateComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req._id;
    const updateData = req.body;

    const result = await this.commentRepository.updateCommentById(commentId, userId, postId, updateData);
    if (!result.success) {
        return res.status(result.error.statusCode).json({ error: result.error.msg });
    }

    res.status(200).json({
        message: result.msg,
        updatedComment: result.res
    });
};

deleteComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req._id;

    const result = await this.commentRepository.deleteCommentById(commentId, userId, postId);
    if (!result.success) {
        return res.status(result.error.statusCode).json({ error: result.error.msg });
    }

    res.status(200).json({ message: result.msg });
};
}