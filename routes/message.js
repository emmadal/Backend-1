import express from 'express'
import passport from "passport"
import bodyParser from "body-parser"
import Message from '../models/Message.js'


var router = express.Router()

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
// router.use(bodyParser.raw());

/**
 * MESSAGE SERVICE 
 */
// router.use(bodyParser.json())

/** FETCH ALL */
router.get("/:user_id/:room_id",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
    Message.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  })

/** POST A MESSAGE */
/**
 * @user_id user id
 * @room_id room id
 * @message_id (optional) if replyTO message 
 */

router.post("/:user_id/:room_id/:message_id?",
  // passport.authenticate('/', { session: false }),
  // express.json({"Content-Type": 'application/json'}),
  (req, res) => {
    // request to room services for getting all use of a room add this list to receiver

    // .....


    const messageData = {
      // message_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      rooms_id: req.params.room_id, // require 
      from: req.params.user_id, // require
      body: {
        type: req.body.type, // require //{ text, gif, video, photo, ...}
        content: req.body.content // [] > 0 // require  // contient les files id
      },
      replyTO: req.params.message_id ? req.params.message_id : {} ,
      receiver: [
        // { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      ],
      isRead: false,
      
      createAt: new Date()
    };

    // console.log('JSON.parse(messageData) :>> ', messageData);

    let message = new Message(messageData);
    // // console.log('req.body :>> ', req.body);
    // res.send(messageData);

    Message.create(message).then(message => res.send(message));
  });

/** DELETE BY user1 AND user2 */
router.get("/:message_id", (req, res) => {
  Message.deleteOne({ '_id': req.params.message_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

// /** SEARCH BY user1 AND user2 */
// router.get("/:user1/:user2", (req, res) => {
//   Friendships.findOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// })


// /** SEARCH BY user */
// router.get("/:user", (req, res) => {
//   Friendships.find({ 'user1': req.params.user }, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// })

export default router