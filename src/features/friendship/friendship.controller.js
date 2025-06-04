import { ObjectId } from 'mongodb';
import FriendShipRepository from './friendship.repository.js';
import ErrorHandler from '../../middlewares/appErrorHandler.middleware.js';

export default class FriendshipController {
  constructor() {
    this.friendshipRepository = new FriendShipRepository();
  }

  // GET /api/friends/get-friends/:userId
  async getFriends(req, res) {
    const { userId } = req.params;
    try {
      const friends = await this.friendshipRepository.getFriendsByUserId(new ObjectId(userId));
      res.status(200).json({ success: true, res: friends });
    } catch (error) {
      throw new ErrorHandler("Failed to fetch friends", 500);
    }
  }

  // GET /api/friends/get-pending-requests
  async getPendingRequests(req, res) {
    const { userId } = req.query;
    try {
      const pendingRequests = await this.friendshipRepository.getPendingRequests(new ObjectId(userId));
      res.status(200).json({ success: true, res: pendingRequests });
    } catch (error) {
      throw new ErrorHandler("Failed to fetch pending requests", 500);
    }
  }

  // POST /api/friends/toggle-friendship/:friendId
  async toggleFriendship(req, res) {
    const { friendId } = req.params;
    // const { userId } = req.body;
    const userId = req._id;

    try {
      const response = await this.friendshipRepository.toggleFriendship(new ObjectId(userId), new ObjectId(friendId));
      res.status(200).json({ success: true, msg: response });
    } catch (error) {
      throw new ErrorHandler("Failed to toggle friendship", 500);
    }
  }

  // POST /api/friends/response-to-request/:friendId
  async respondToRequest(req, res) {
    const { friendId } = req.params;
    const { action } = req.body;
    const userId = req._id;

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ success: false, msg: "Invalid action" });
    }

    try {
      const result = await this.friendshipRepository.respondToRequest(
        new ObjectId(userId),
        new ObjectId(friendId),
        action
      );
      res.status(200).json({ success: true, msg: `Request ${action}ed successfully` });
    } catch (error) {
      throw new ErrorHandler("Failed to respond to request", 500);
    }
  }
}
