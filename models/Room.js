import mongoose from "mongoose";

let Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({  
  name:{type:String,require:true},
  image:{type:String},//On stocke l'image du groupe par defaut on met une image qui est possible d'etre changer
  createdBy: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  membre:[
          { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
          { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
          { type:mongoose.Schema.Types.ObjectId, ref:'User'},
      ],
  createDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('room', RoomSchema) 