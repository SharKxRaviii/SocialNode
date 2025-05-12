import express from 'express';
import LikeController from './like.controller.js';

const likeRoutes = express.Router();

const likeController = new LikeController();

likeRoutes.get('/:id', (req, res) => {
    likeController.postLikeById(req, res);
});
likeRoutes.put('/toggle/:id', (req, res) => {
    likeController.toggleLike(req, res);
});

export default likeRoutes;