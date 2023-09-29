const express =require("express")
const router=require("./routers/productRoters.js")

const app = express()
app.use(express.json())


app.use('/Product',router)
module.exports=app