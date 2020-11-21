import mongoose from "mongoose"

const tiktokSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
    phoneNumber:{type:Number},
    email:String,
    messages:[],
    friends:[],
    pictures:[],
    other:[]
    
    
});
//Collection inside the database
export default mongoose.model('wakandha',tiktokSchema)
 