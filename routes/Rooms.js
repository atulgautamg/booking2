import express from "express";
import Hotels from "../Models/Hotels.js";
import Rooms from "../Models/Rooms.js";
import { verifyadmin } from "./verifyauth/Verify1.js";
const router=express.Router();
router.post('/:hotelid', async(req, res,next) => {
    
    const hotelid=req.params.hotelid;
    const newroom=new Rooms(req.body);
    try {
      const savedroom=await newroom.save();
      try {
        await Hotels.findByIdAndUpdate(hotelid,{$push:{rooms:savedroom._id}})
      } catch (error) {
        next(err);
      }
      res.status(200).json(savedroom);
    } catch (error) {
      next (error)
    }


  });
  
  router.put('/:id',verifyadmin, async(req, res) => {
    try { 
     const updateroom=await Rooms.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
     res.status(200).json(updatehotel);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.delete('/:id/:hotelid', async(req, res) => {
    try { 
      const hotelid=req.params.hotelid;
     await Rooms.findByIdAndDelete(req.params.id);
     try {
      await Hotels.findByIdAndUpdate(hotelid,{$pull:{rooms:req.params.id}})
    } catch (error) {
      next(err);
    }
     res.status(200).json("room is deleted");
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/:id', async(req, res) => {
    try { 
     const roomid=await Rooms.findById(req.params.id);
     res.status(200).json(roomid);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/', async(req, res) => {
    try { 
      console.log("middleware1");
      
     const rooms=await Rooms.find();
     res.status(200).json(rooms);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    

    router.put('/availability/:id', async(req, res) => {
      try { 
       await Rooms.updateOne({"roomnumbers._id":req.params.id},
       {$push:{
          "roomnumbers.$.unavaildates":req.body.dates
       }}
       );
        res.status(200).json("rooms are updated");
      
      } catch (error) {
          res.status(200).json(error);
        }
      })
      
export default router;