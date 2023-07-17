import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  maxpeople:{
    type:Number,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  roomnumbers:[{number:Number,unavaildates: {type:[Date]}}],
    
}, {timestamps:true});
export default mongoose.model("Rooms",RoomSchema);