import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limits:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))   // static files
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";
import friendRouter from "./routes/friend.routes.js";
import messageRouter from "./routes/message.route.js";

app.use("/api/users",userRouter);
app.use("/api/friends",friendRouter);
app.use("/api/message",messageRouter);

export default app; 