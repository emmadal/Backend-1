import mongoose from "mongoose";

let Schema = mongoose.Schema;

const FriendshipsSchema = new Schema({
      user1: String,
      user2: String,
      createAt: { type: Date, default: Date.now } 
}, { timestamps: true } );

export default mongoose.model('friendships', FriendshipsSchema)