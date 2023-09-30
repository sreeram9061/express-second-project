const express =require("express")
const productRouter=require("./routers/productRoters.js")
const usersRouter=require("./routers/usersRouters.js")
const cors = require("cors")

const app = express()

app.use(cors({
    originf:"http://localhost:5173/",
    methods:["get","post"]}))
    
app.use(express.json())

app.use('/product', productRouter)
app.use('/users',usersRouter)

module.exports=app