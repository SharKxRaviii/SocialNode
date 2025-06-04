import express from 'express';
import FriendshipController from './friendship.controller.js';

const friendshipRoutes = express.Router();
const friendshipController = new FriendshipController();

friendshipRoutes.get('/get-friends/:userId', (req, res) => {
    friendshipController.getFriends(req, res);
});
friendshipRoutes.get('/get-pending-requests', (req, res) => {
    friendshipController.getPendingRequests(req, res);
});
friendshipRoutes.post('/toggle-friendship/:friendId', (req, res) => {
    friendshipController.toggleFriendship(req, res);
});
friendshipRoutes.post('/response-to-request/:friendId', (req, res) => {
    friendshipController.respondToRequest(req, res);
});

export default friendshipRoutes;