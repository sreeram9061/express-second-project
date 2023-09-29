const app=require("./app")
const dotenv =require("dotenv")
const mongoose=require("mongoose")
dotenv.config({path:'./config.env'})
const morgan=require("morgan")


mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
}).then((conn)=>{
    console.log("db connection successful")
}).catch((err)=>{
    console.log(err)
})


if(process.env.NODE_ENV=="development"){
    app.use(morgan("dev"))
}

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server has started...")
})

