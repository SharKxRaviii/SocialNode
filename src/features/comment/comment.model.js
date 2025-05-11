export default class CommentModel {
    constructor(userId, postId, commentText) {
        this.userId = userId;
        this.postId = postId;
        this.commentText = commentText
    }
}