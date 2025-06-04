import express from 'express';
import PostController from './post.controller.js';
import { uploadFile } from '../../middlewares/fileUploads.middleware.js';

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.get('/all', (req, res) => {
    postController.getAllPosts(req, res);
})
postRoutes.get('/:postId', (req, res) => {
    postController.getPostById(req, res);
});
postRoutes.get('/', (req, res) => {
    postController.userProfilePost(req, res);
});
postRoutes.post('/', uploadFile.single('imageUrl'), (req, res) => {
    postController.createPost(req, res);
});
postRoutes.delete('/:postId', (req, res) => {
    postController.deletePost(req, res);
});
postRoutes.put('/:postId', (req, res) => {
    postController.updatePost(req, res);
});

export default postRoutes;