import env from "dotenv";
import connectDB from "./DB/index_db.js";
import app from "./app.js";

env.config({
    path:'./.env'
}); 

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("ERR : ",err);
        throw err;
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App listening on ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed",err);
    process.exit(1);
})    

