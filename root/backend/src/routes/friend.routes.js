import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addFriend,
    removeFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    retrieveSentRequest,
    retrieveReceivedRequest,
    retrieveFriends
} from "../controllers/friend.controller.js";


const router = Router();

router.route("/send").post(verifyJWT,addFriend);
router.route("/accept").post(verifyJWT,acceptFriendRequest);
router.route("/reject").post(verifyJWT,rejectFriendRequest);
router.route("/remove").post(verifyJWT,removeFriend);
router.route("/r_friend").post(verifyJWT,retrieveFriends);
router.route("/r_sent").post(verifyJWT,retrieveSentRequest);
router.route("/r_received").post(verifyJWT,retrieveReceivedRequest);

export default router;