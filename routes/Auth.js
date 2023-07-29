import express from "express";
import Routes from "../Models/Routes.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
const router=express.Router();

  router.post('/register', async(req, res) => {
    
    try {
      
      var salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
      const newuser=new Routes({
        ...req.body,
        password:hash,
        
      })
      await newuser.save();
      res.status(200).json("user has been created");
    } catch (error) {
      res.status(500).json(error);
    }
  })
  router.post('/login', async(req, res) => {
    
    try {
      
      const user=await Routes.findOne({username:req.body.username});
      if(!user) return res.status(404).json("user not found");
    
     const ispassword=await bcrypt.compare(req.body.password,user.password);
      if(!ispassword) return res.status(400).json("Wrong Username or Password");
      const token=jwt.sign({id:user._id},"hh");
      const {password,...otherDetails}=user._doc;
      res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails}});

      
    } catch (error) {
      res.status(500).json("password wrong");
    }
  })


export default router;