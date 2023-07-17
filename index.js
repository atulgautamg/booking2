import express from 'express';
import  dotenv from 'dotenv';
import mongoose from "mongoose";
import auth from "./routes/Auth.js";
import hotels from "./routes/Hotels.js";
import rooms from "./routes/Rooms.js";
import routes from "./routes/Routes.js";
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();
const port=4000;
import cors from "cors";
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  const connect=async()=>{
 try{
    await mongoose.connect(process.env.CLOUD_URL);
    console.log("connected to mongodb");
 }catch(error){
    throw error  
 }}
 app.use(cookieParser());
 app.use("/auth",auth);
 app.use("/hotels",hotels);
 app.use("/rooms",rooms);
 app.use("/routes",routes);
 app.use((err,req,res,next)=>{
   const errorstatus=err.status || 500;
   const errormessage=err.message || "Server Failed";
   return res.status(errorstatus).json({success:false,status:errorstatus, message:errormessage,stack:err.stack});
 })

 app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`)
  })
  app.get('/', (req, res) => {
   res.send('Hello World!')
 })
 
  mongoose.connection.on("disconnected",()=>{
   console.log("mongodb disconnected");
  })