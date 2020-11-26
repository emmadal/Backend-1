const mongoose = require('mongoose')

let Schema = mongoose.Schema;

const FriendshipsSchema = new Schema({
  user1: String,
  user2: String,
  createAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('friendships', FriendshipsSchema)