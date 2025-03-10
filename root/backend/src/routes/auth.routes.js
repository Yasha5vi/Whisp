import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkAuthorized } from "../controllers/auth.controller.js"

const router = Router();

router.route("/me").get(verifyJWT,checkAuthorized)

export default router;