import express from "express";
const router=express.Router();
import Hotels from "../Models/Hotels.js";
import { verifyadmin,verifytoken,verifyuser } from "./verifyauth/Verify1.js";
import { promises } from "dns";
import Rooms from "../Models/Rooms.js";
router.post('/', async(req, res) => {
  
  const newhotel=new Hotels(req.body);  
  try { 
   const savehotel=await newhotel.save();
   res.status(200).json(savehotel);
    } catch (error) {
      res.status(200).json(error);
    }
  })
  router.put('/:id',verifyadmin, async(req, res) => {
    try { 
     const updatehotel=await Hotels.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
     res.status(200).json(updatehotel);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.delete('/:id', async(req, res) => {
    try { 
     await Hotels.findByIdAndDelete(req.params.id);
     res.status(200).json("hotel is deleted");
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/find/:id', async(req, res) => {
    try { 
     const hotelid=await Hotels.findById(req.params.id);
     res.status(200).json(hotelid);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/', async(req, res) => {
    const {min,max,...others}=req.query;
    try { 
     const hotels=await Hotels.find({...others,cheapestprice:{$gt:min | 1, $lt:max || 1000000},}).limit(req.query.limit);
     res.status(200).json(hotels);
      } catch (error) {
        res.status(200).json(error);
      }
    })
    
  router.get('/countcity', async(req, res) => {
    
     const cities=req.query.cities.split(",");
     try {
      const list=await Promise.all(cities.map((city)=>{
        return Hotels.countDocuments({city:city});
      }));
      res.status(200).json(list);
      
     } catch (err) {
     }
     
      
    })
    
  router.get('/counttype', async(req, res) => {
    try { 
      const hotelcount=await Hotels.countDocuments({type:"hotel"})
      const apartcount=await Hotels.countDocuments({type:"apartment"})
      const resortcount=await Hotels.countDocuments({type:"resort"})
      const villacount=await Hotels.countDocuments({type:"villa"})
      res.status(200).json([
        {type:"villa", count:villacount},
        {type:"hotel", count:hotelcount},
        {type:"apartment", count:apartcount},
        {type:"resort", count:resortcount},
      ]

      );
      
      } catch (error) {
        res.status(200).json(error);
      }
    })
    router.get('/rooms/:id', async(req, res) => {
      try { 

        const hotel=await Hotels.findById(req.params.id)
        const list =await Promise.all(hotel.rooms.map(room=>{return Rooms.findById(room)}))
          res.status(200).json(list);
        } catch (error) {
          res.status(200).json(error);
        }
      })

export default router;