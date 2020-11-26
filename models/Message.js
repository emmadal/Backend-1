const mongoose = require('mongoose')

let Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // message_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  rooms_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: {
    type: { type: String }, //{ text, gif, video, photo, ...}
    content: [// contient les files id
      { type: String },
    ]
  },
  replyTO: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  receiver: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ], 
  isRead: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('message', MessageSchema)