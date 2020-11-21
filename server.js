import express from 'express'
import mongoose from 'mongoose'
import User from './dbModel.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*'),
    res.setHeader("Access-Control-Allow-Headers","*"),
    next() 
})

const connection_url ="mongodb://localhost:27017"
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
})

app.listen(port,()=>console.log(`Listen on localhost : ${port}`))