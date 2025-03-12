import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    sendMessage,
    getMessage,
    getChats,
    getUser,
    deleteChats,
    createGroupChatHandler,
    createConversation
} from "../controllers/message.controller.js"

const router = Router();

router.route("/send").post(verifyJWT,sendMessage);
router.route("/delete").post(verifyJWT,deleteChats);
router.route("/createGroup").post(verifyJWT,createGroupChatHandler);
router.route("/getUser").post(verifyJWT,getUser);
router.route("/createConversation").post(verifyJWT,createConversation);

router.route("/getChats").get(verifyJWT,getChats);
router.route("/getMessage").get(verifyJWT,getMessage);

export default router;