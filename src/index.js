import env from "dotenv";
import express from "express"
import connectDB from "./db/indexDB.js";

env.config(); 

connectDB()     