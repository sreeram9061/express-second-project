const express= require("express")
const { postNewUser, getUsers, upload } = require("../controllers/usersControllers")
const router=express.Router()

router.route("/")
      .post(upload,postNewUser)
      .get(getUsers)


module.exports=router