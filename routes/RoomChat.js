const express = require('express')
const Room = require("../models/Room.js")
// import mongoose from 'mongoose'

var router = express.Router()

/*creer un groupe*/
router.post('/',(req,res)=>{
    Room.create({
        name:req.body.name,
        createdBy:req.body.createdBy,
        membre:req.body.membre// Pour pourvoir creer un groupe en ajoutant directement plusieur membre
      
    })
    console.log(req.body.user1)
    res.send("Ok")
})

/*AJouter un new Utilsateur dans un groupe */
router.put('/',(req,res)=>{
    const _id = req.body.room_id//l'identifiant du groupe
    const newUser=req.body.newUser//l'identifiant de user
    Room.findOneAndUpdate(
        {_id}, 
        { $push: {"membre": newUser  } },
       (error, success)=>{
             if (error) {
                 res.send(error)
             } else {
                 res.send({success:true})
             }
         });
  
     
})
/*Supprimer le groupe grace a son identifiant */
router.post('/delete/',(req,res)=>{
    const _id= req.body.room_id
    Room.findByIdAndDelete({_id},(err,success)=>{
        if(err){
            res.send(err)
         }else{
             res.send({success:true})
         } 
    })
})
/*Supprimer un utilisateur dans un groupe */
 router.post('/deleteUser/',(req,res)=>{
     //code here
 })

/*Supprimer un utilisateur */
/*Changer le nom du groupe */
router.put('/GroupeName/',(req,res)=>{
    const _id = req.body.room_id//l'identifiant du groupe
    const Newname= req.body.name
    Room.findOneAndUpdate(
        {_id}, 
        {"name":Newname},
       (error, success)=>{
             if (error) {
                 res.send(error)
                 console.log(error)
             } else {
                 res.send({success:true})
             }
         }); 
})
/* */
/*Lister la liste des Groupe par l'utilisateur*/
 router.post('/ListGroup/',(req,res)=>{
     const user = req.body.user
  Room.find({membre: { "$in" : [user]} }, (err,docs)=>{
      if(err){
          res.send(err)
      }else{
          res.send(docs)
      }
  });
 })



router.post('/Group/',(req,res)=>{
    const _id = req.body.room_id
    Room.find({_id}, (err,docs)=>{
        if(err){
            res.send(err)
        }else{
            res.send(docs[0])
        }
    });
})
/* */

  




router.get("/", (req, res) => {
   Room.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  })
  
module.exports = router