import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({
    limits:"16kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

// generally used for static files
app.use(express.static("public"))
app.use(cookieParser())

export default app;