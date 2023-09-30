const express =require("express")
const productRouter=require("./routers/productRoters.js")
const usersRouter=require("./routers/usersRouters.js")

const app = express()
app.use(express.json())

app.use('/product',productRouter)
app.use('/users',usersRouter)
module.exports=app