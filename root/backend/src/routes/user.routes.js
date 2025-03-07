import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)

export default userRouter;