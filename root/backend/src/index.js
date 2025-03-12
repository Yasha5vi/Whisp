import env from "dotenv";
import connectDB from "./DB/index_db.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";

env.config({
    path:'./.env'
}); 

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("ERR : ",err);
        throw err;
    })
    // console.log("MongoDB connected Successfully")
})
.catch((err)=>{
    console.log("MONGO db connection failed",err);
    process.exit(1);
})    

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: process.env.CORS_ORIGIN, // allow requests from your client
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.set("io", io);

// socket - client
io.on("connection",(socket)=>{
    console.log("user connect via id : ",socket.id);
    // client login krega so ek room bna de
    // using join event
    socket.on("joinRoom", ( roomId )=>{
        // socket.userId = userId; 
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}\n`);
    })  

    socket.on("disconnect",()=>{
        console.log("User disconnected:", socket.id);
    })
});

server.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})

