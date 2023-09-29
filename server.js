const app=require("./app")
const dotenv =require("dotenv")
const mongoose=require("mongoose")
dotenv.config({path:'./config.env'})
const morgan=require("morgan")



const conectMongoDb= async ()=>{
    try {
        await mongoose.connect(process.env.CONN_STR,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log("db connection successful")
    } catch (error) {
        console.log(error)
    }
}
conectMongoDb()




if(process.env.NODE_ENV=="development"){
    app.use(morgan("dev"))
}

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server has started...")
})

