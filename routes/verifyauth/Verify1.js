import jwt  from "jsonwebtoken";
const verifytoken=(req,res,next)=>{
    const token=req.cookies.access_token;
    
    if(!token) return res.status(404).json("token not found");
    jwt.verify(token,"hh",(err,user)=>{
    if(err) return res.status(403).json("verification failed");
    req.user=user;
   next();
});
}
const verifyuser=(req,res,next)=>{
  verifytoken(req,res,next, ()=>{
   if(req.user.id===req.params.id || req.user.isadmin)
   {
next();
   }
   else {
if(err) return res.status(403).json("Not authorized");
   }
  })
}
const verifyadmin=(req,res,next)=>{
  verifytoken(req,res,next, ()=>{
   if(req.user.isadmin)
   {
next();
   }
   else {
if(err) return res.status(403).json("Not authorized");
   }
  })
}
export {verifytoken,verifyuser,verifyadmin};