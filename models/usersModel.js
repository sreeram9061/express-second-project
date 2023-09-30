const mongoose=require("mongoose")


const usersModel= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    age:{
        type:Number,
        required:[true,"age is required"]
    },
    image:{
        data:Buffer,
        contentType:String
    }

})

const User= mongoose.model("User",usersModel)
module.exports=User