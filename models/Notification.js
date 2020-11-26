const mongoose = require('mongoose')

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

module.exports = mongoose.model('notification', NotificationSchema );
