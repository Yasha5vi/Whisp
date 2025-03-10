import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    sendMessage,
    getMessage,
    getChats,
    deleteChats,
    createGroupChatHandler,
} from "../controllers/message.controller.js"

const router = Router();

router.route("/send").post(verifyJWT,sendMessage);
router.route("/delete").post(verifyJWT,deleteChats);
router.route("/createGroup").post(verifyJWT,createGroupChatHandler);

router.route("/getChats").get(verifyJWT,getChats);
router.route("/getMessage").get(verifyJWT,getMessage);

export default router;