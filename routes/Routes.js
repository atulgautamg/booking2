import express from "express";
const router=express.Router();
import Routes from "../Models/Routes.js";
import { verifyadmin,verifytoken,verifyuser } from "./verifyauth/Verify1.js";
router.get("/checkauth",verifytoken,(req,res)=>{
  res.send(" you are logged in");
  
})
router.get("/checkuser/:id",verifyuser,(req,res)=>{
  res.send(" user are logged in");
})


router.get("/checkadmin/:id",verifyadmin,(req,res)=>{
  res.send(" admin are logged in  skncksnc");
})

  router.put('/:id',verifyuser, async(req, res) => {
    try { 
     const updateuser=await Routes.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
     res.status(200).json(updateuser);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.delete('/:id', async(req, res) => {
    try { 
     await Routes.findByIdAndDelete(req.params.id);
     res.status(200).json("user is deleted");
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/:id', async(req, res) => {
    try { 
     const userid=await Routes.findById(req.params.id);
     res.status(200).json(userid);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/', async(req, res) => {
    try { 
      console.log("middleware1");
      
     const Routes1=await Routes.find();
     res.status(200).json(Routes1);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
export default router;