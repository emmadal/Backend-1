import express from 'express'
import mongoose from 'mongoose'
import User from './dbModel.js'
import Friendships from './friendships/friendships.model.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*'),
    res.setHeader("Access-Control-Allow-Headers","*"),
    next() 
})

const connection_url ="mongodb+srv://wakandha:Wakandha@realmcluster.09rky.mongodb.net/wakandha?retryWrites=true&w=majority";

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true, 
})

const Singin = async UserData =>{
 await User.create(UserData)
}

/* Pour rechercher les utilisateur qui sont dans la base de donnee */
app.get("/userfind/",(req,res)=>{
   User.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(data);
        }
    })
})
/*Enregistrer les nouveaux utilisateurs */
app.post('/userInscription/',(req,res)=>{
    console.log(req.body)
         Singin(req.body)
         res.send("oui")
})


/**
 * FRIENDSHIPS SERVICE 
 */

/** FETCH ALL */
app.get("/api/friendships",(req,res)=>{
    Friendships.find((err,data)=>{
         if(err){
             res.status(500).send(err);
         }else {
             res.status(201).send(data);
         }
     })
 })

/** POST A FRIENDSHIP */
app.post("/api/friendships", (req,res)=>{
    Friendships.create({
        user1: req.body.user1,
        user2: req.body.user2,
        createAt: { type: Date, default: Date.now }
    }).then( friendships => res.json(friendships) );
})

/** DELETE BY user1 AND user2 */
app.get("/api/friendships/:user1/:user2",(req,res)=>{
    Friendships.deleteOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(data);
        }
    });
})

/** SEARCH BY user1 AND user2 */
app.get("/api/friendships/:user1/:user2",(req,res)=>{
    Friendships.findOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(data);
        }
      });
 })


/** SEARCH BY user */
app.get("/api/friendships/:user",(req,res)=>{
    Friendships.find({ 'user1': req.params.user }, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(data);
        }
    });
})


app.listen(port,()=>console.log(`Listen on localhost : ${port}`))