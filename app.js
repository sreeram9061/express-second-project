const express =require("express")
const productRouter=require("./routers/productRoters.js")

const app = express()
app.use(express.json())

app.use('/Product',productRouter)
module.exports=app