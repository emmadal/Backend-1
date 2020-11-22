import mongoose from "mongoose"

const WakandhaSchema = mongoose.Schema({
      firstName:String,
      lastName:String,
      email:String,
      password:String,
      phone:{type:Number},
      isOnline:Boolean,
      profilePictureURL:String,
      createAt:{type:Date,default:Date.now},
      friends:[],//Pour stocker l'indentifiant de ses amis 
      message:[],//Chaque fois qui a ajoute un ami on ajout un objet dans le tableau qui correspond a l'identifiant de son amis pour stocker leurs message ,
      lastOnlineTimestamp:{type:Date},
      coverPictureURL:String,
      location:{},
      pushToken:String,
      signUpLocation:String

 

    
    
});
//Collection inside the database
export default mongoose.model('users',WakandhaSchema)
 