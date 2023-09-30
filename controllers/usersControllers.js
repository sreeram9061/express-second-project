const multer= require("multer")
const User = require("../models/usersModel")
const fs = require("fs")



const Storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

exports.upload=multer({
    storage:Storage
}).single('testImage')


exports.postNewUser=async(req,res)=>{
    try {
        const user= await User.create({
            ...req.body,
            image:{
                data: fs.readFileSync("uploads/"+req.file.filename),
                contentType:'image/jpg'
            }
        })
        res.status(201).json({
            status:"success",
            data:user
        })
    } catch (error) {
        res.status(404).json({
            status:"failed",
            message:error.message
        })
    }
}

exports.getUsers= async(req,res)=>{
    try {
        const allUsers= await User.find()
        res.status(200).json({
            status:"success",
            length:allUsers.length,
            data:{
                allUsers,
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"failed",
            message:error.message
        })
    }
}