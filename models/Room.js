import mongoose from "mongoose";

let Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({  
  rooms_id: { type:mongoose.Schema.Types.ObjectId, required:true },
  createdBy: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  membre:[
          { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
          { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
          { type:mongoose.Schema.Types.ObjectId, ref:'User'},
      ],
  createDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('room', RoomSchema) 