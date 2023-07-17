import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoutesSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  
  city:{
    type:String,
    
  },
  country:{
    type:String,
    required:true,
    
  },
  img:{
    type:String,
  },
  
  phone:{
    type:String,
    required:true,
    
  },
  
  isadmin:{
    type:Boolean,
    default:false,
  },
  
},{timestamps:true} );
export default mongoose.model("Routes",RoutesSchema);