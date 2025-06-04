import express from 'express';
import CommentController from './comment.controller.js';

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.get('/:postId', (req, res) => {
    commentController.getCommentById(req, res);
});
commentRoutes.post('/:postId', (req, res) => {
    commentController.addComment(req, res);
});
commentRoutes.put('/:commentId', (req, res) => {
    commentController.updateComment(req, res);
});
commentRoutes.delete('/:commentId', (req, res) => {
    commentController.deleteComment(req, res);
});

export default commentRoutes;