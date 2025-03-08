import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addFriend,
    removeFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    getSentRequest,
    getReceivedRequest,
    getFriends
} from "../controllers/friend.controller.js";


const router = Router();

router.route("/send").post(verifyJWT,addFriend);
router.route("/accept").post(verifyJWT,acceptFriendRequest);
router.route("/reject").post(verifyJWT,rejectFriendRequest);
router.route("/remove").post(verifyJWT,removeFriend);

router.route("/getFriend").get(verifyJWT,getFriends);
router.route("/getSent").get(verifyJWT,getSentRequest);
router.route("/getReceived").get(verifyJWT,getReceivedRequest);

export default router;