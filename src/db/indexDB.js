import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        // console.log(process.env.MONGODB_URL);
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log(`\nMongoDB connected \nHOST : ${connectionInstance.connection.host}\n`)
    }catch(err){
        console.log("DB connection Failed",err);
        throw err;
        //process.exit(1);
    }
}

export default connectDB;
