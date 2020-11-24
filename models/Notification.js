import mongoose from "mongoose";
import User from "./User.js";

let Schema = mongoose.Schema;

const NotificationSchema = new Schema({
      toUser: { userID: String, id: String },
      seen: Boolean,
      body: String,
      createAt: { type: Date, default: Date.now } ,
      toUserID: String,
      id: String,
      metadata: { outBound: { type: Map } }, // the user infos
      type: String,
      title: String,
}, { timestamps: true } );

export default mongoose.model('notification', NotificationSchema );