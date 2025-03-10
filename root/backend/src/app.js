import env from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

env.config({
    path:'./.env'
}); 

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limits:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))   // static files
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";
import friendRouter from "./routes/friend.routes.js";
import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js"

app.use("/api/users",userRouter);
app.use("/api/friends",friendRouter);
app.use("/api/message",messageRouter);
app.use("/api/auth",authRouter);

export default app; 