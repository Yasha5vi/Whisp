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
const io = new Server(server);
app.set("io", io);

// socket - client
io.on("connection",(socket)=>{
    console.log("user connect via id : ",socket.id);
    
    // client login krega so ek room bna de
    // using join event
    socket.on("join", ( userId )=>{
        socket.userId = userId;
        socket.join(userId);
        console.log(`Socket ${socket.id} joined room ${userId}`);
    })  

    socket.on("disconnect",()=>{
        console.log("User disconnected:", socket.id);
    })
});

server.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})

