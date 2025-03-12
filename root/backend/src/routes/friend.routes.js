import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addFriend,
    removeFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriendRequest,
    getSentRequest,
    getReceivedRequest,
    getFriends
} from "../controllers/friend.controller.js";


const router = Router();

router.route("/send").post(verifyJWT,addFriend);
router.route("/remove").post(verifyJWT,removeFriend);
router.route("/accept").post(verifyJWT,acceptFriendRequest);
router.route("/reject").post(verifyJWT,rejectFriendRequest);
router.route("/removeRequest").post(verifyJWT,removeFriendRequest);

router.route("/getFriend").get(verifyJWT,getFriends);
router.route("/getSent").get(verifyJWT,getSentRequest);
router.route("/getReceived").get(verifyJWT,getReceivedRequest);

export default router;