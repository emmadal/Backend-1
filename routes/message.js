import express from 'express'
import passport from "passport"
import bodyParser from "body-parser"
import Message from '../models/Message.js'
import Room from '../models/Room.js'


var router = express.Router()

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
// router.use(bodyParser.raw());

/**
 * MESSAGE SERVICE 
 */
// router.use(bodyParser.json())

/** FETCH ALL PER ROOM */
router.get("/:room_id",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
    Message.find({ rooms_id : req.params.room_id }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  })

/** POST A MESSAGE (send message)*/
/**
 * @user_id       user id
 * @room_id       room id
 * @message_id    (optional) if replyTO message 
 */

router.post("/:user_id/:room_id/:message_id?",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
    
    var messageData = {
      rooms_id: req.params.room_id, // require 
      from: req.params.user_id, // require
      body: {
        type: req.body.type, // require //{ text, gif, video, photo, ...}
        content: req.body.content // [] > 0 // require  // contient les files id
      },
      replyTO: req.params.message_id ? req.params.message_id : "------------" ,
      receiver: [
        // { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      ],
      isRead: false,
      createAt: new Date()
    };

    const _id = req.params.room_id;
    Room.find({_id}, async (err,docs)=>{
      if(err){
          res.send(err)
      }else{
          messageData.receiver = docs[0].membre;
          console.log('messageData.receiver :>> ', messageData.receiver);
          console.log('JSON.parse(messageData) :>> ', messageData);
          Message.create(messageData).then(message => res.send(message));
      }
    })
  });

/** UPDATE A MESSAGE CONTENT  */
/**
 * @user_id     user id
 * @room_id     room id
 * @message_id  message id
 */

router.put("/:user_id/:room_id/:message_id",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
    const _id = req.params.message_id;
    Message.findByIdAndUpdate({ _id }, { body : { type : req.body.type, content : req.body.content } }, {new: true} ,(err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      })
    });

/** UPDATE IF A MESSAGE IS READED (isread or seen) */
/**
 * @user_id     user id
 * @room_id     room id
 * @message_id  message id
 */

router.put("/:user_id/:room_id/:message_id",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
    const _id = req.params.message_id;
    Message.findByIdAndUpdate({ _id }, { isRead : req.body.isRead }, {new: true} ,(err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      })
    });

/** DELETE BY message id */
router.post("/:user_id/:message_id", (req, res) => {
  Message.deleteOne({ '_id': req.params.message_id, 'from': req.params.user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("success");
    }
  });
})

/** UPDATE BY message id */
router.get("/:user_id/:message_id", (req, res) => {
  Message.deleteOne({ '_id': req.params.message_id, 'from': req.params.user_id  }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

export default router