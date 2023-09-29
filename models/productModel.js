const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required field"],
        unique:true,
        trim:true,//remove white space before and after the name
    },
    description:{
        type:String,
        required:[true,"Description is required field"],
        trim:true,//remove white space before and after the name
    },
    highlights:{
        "type": [String],
    },
    ratings:{
        type:Number,
        trim:true
    },
    totalRating:{
        type:Number
    },
    price:{
        type:Number,
        required:[true,'price is required field']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    stock:{
        type:Number,
    }
})

const Product= mongoose.model("Product",productsSchema)
module.exports= Product;