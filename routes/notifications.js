import express from 'express'
import { handleError } from "../helpers.js"
import Notification from '../models/Notification.js'
import passport from 'passport'

var router = express.Router()


let security = passport.authenticate('jwt', { session: false });
/**
 * NOTIFICATION SERVICES 
 */

/** FETCH ALL */

router.get("/", (req,res, next)=>{

  try {
    Notification.find((err,data)=>{
       if(err){
          res.status(500).send(err);
       }else {
          res.status(201).send(data);
       }
   })
  } catch (error) {
    return handleError(res, err)
  }
  
})

// /** POST A FRIENDSHIP */
// router.post("/",   (req,res)=>{
//   Notification.create({
//       user1: req.body.user1,
//       user2: req.body.user2,
//       createAt: { type: Date, default: Date.now }
//   }).then( notification => res.json(notification) );
// })

// /** DELETE BY user1 AND user2 */
// router.get("/:user1/:user2", (req,res)=>{
//   Notification.deleteOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
//       if(err){
//           res.status(500).send(err);
//       }else {
//           res.status(201).send(data);
//       }
//   });
// })

// /** SEARCH BY user1 AND user2 */
// router.get("/:user1/:user2", (req,res)=>{
//   Notification.findOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
//       if(err){
//           res.status(500).send(err);
//       }else {
//           res.status(201).send(data);
//       }
//     });
// })


// /** SEARCH BY user */
// router.get("/:user",  (req,res)=>{
//   Notification.find({ 'user1': req.params.user }, (err, data) => {
//       if(err){
//           res.status(500).send(err);
//       }else {
//           res.status(201).send(data);
//       }
//   });
// })

export default router