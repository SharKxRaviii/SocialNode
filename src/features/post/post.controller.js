import PostRepository from "./post.repository.js";

export default class PostController{
    constructor() {
        this.postRepository = new PostRepository();
    }

    getAllPosts = async (req, res) => {
    const result = await this.postRepository.getAllUsersPost();
    if (!result.success) {
        return res.status(result.error.statusCode).json({ error: result.error.msg });
    }
    res.status(200).json(result.res);
    };

    getPostById = async (req, res) => {
        const { postId } = req.params;
        const result = await this.postRepository.getPostById(postId);
        if (!result.success) {
            return res.status(result.error.statusCode).json({ error: result.error.msg });
        }
        res.status(200).json(result.res);
    };

    userProfilePost = async (req, res) => {
        const userId  = req._id;
        // console.log('userId:', userId);
        const result = await this.postRepository.getProfilePost(userId);
        if (!result.success) {
            return res.status(result.error.statusCode).json({ error: result.error.msg });
        }
        res.status(200).json(result.res);
    };

    createPost = async (req, res) => {
        const { imageUrl, caption } = req.body;
        const userId = req._id;
        const result = await this.postRepository.createNewPost(userId, imageUrl, caption);
        if (!result.success) {
            return res.status(result.error.statusCode).json({ error: result.error.msg });
        }
        res.status(201).json(result.res);
    };

    updatePost = async (req, res) => {
        const { postId } = req.params;
        const { userId, ...postData } = req.body;
        const result = await this.postRepository.updatePostById(postId, userId, postData);
        if (!result.success) {
            return res.status(result.error.statusCode).json({ error: result.error.msg });
        }
        res.status(200).json({ message: result.msg });
    };

    deletePost = async (req, res) => {
        const { postId } = req.params;
        const { userId } = req.body;
        const result = await this.postRepository.deletePostById(postId, userId);
        if (!result.success) {
            return res.status(result.error.statusCode).json({ error: result.error.msg });
        }
        res.status(200).json({ message: result.msg });
    };

}