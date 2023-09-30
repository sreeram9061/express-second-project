const Product=require("../models/productModel")

exports.createProduct=async(req,res)=>{
    try{
        const cratedProduct=await Product.create(req.body)
        res.status(201).json({
            status:"success",
            data:{
                cratedProduct,
            }
        })
    }catch (error) {
        res.status(404).json({
            status:"fild",
            message:error.message
        })
    }
}

exports.getProducts= async(req,res)=>{
    try {
        //http://localhost:3000/Product/?ratings[gte]=2.5&price[gte]=5999
        //[gte] graterthan or equal
        const excludingFields=["sort","page","limit","fields"]
        const queryData={...req.query}

        excludingFields.forEach((item)=>{
            if(queryData.hasOwnProperty(item)) delete queryData[item]
        })

        //filtering 
        let queryStr=JSON.stringify(queryData)
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
        queryItems=JSON.parse(queryStr)           //only given propertees in the select method that will select, include 
        let query= Product.find(queryItems).select("name ratings totalRating price") 

        //sort
        if(req.query.sort){
                               //&sort=ratings,price
            query = query.sort(req.query.sort.split(",").join(" "))   
        } 

        //fields from requiest
/*         if(req.query.fields){
            query=query.select(req.query.fields.split(",").join(" "))
        }else{
            //for removing __v property from the documents in defualt fields
            query=query.select("-__v")
        } */

        //pagenation
        const page= +req.query.page || 1
        const limit= +req.query.limit || 4
        const skip= (page-1)*limit
        query= query.skip(skip).limit(limit)

        //handle error if skip is graterthan count of collections 
        if(req.query.page){
            const docs= await Product.countDocuments(queryItems)
            if(skip>=docs){
                throw new Error("data not present")
            }
        }
        
        //geting collection respons
        let products=await query;

        //give response
        res.status(200).json({
            status:"success",
            length:products.length,
            data:{
                products,
            }
        })
    
    } catch (error) {
        res.status(404).json({
            status:"fild",
            message:error.message
        })
    }
}

exports.getProduct= async (req,res)=>{
    try {
        const oneProduct= await Product.findById(req.params.id)
        res.status(200).json({
            status:"success",
            data:{
                oneProduct,
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fild",
            message:error.message
        })
    }
}

exports.updateProduct=async(req,res)=>{
    try {                                                                        //up. val will return,  //when a property will update that time validators return
        const products = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(201).json({
            status:"success",
            data:{
                products,
            }
        })
    }catch(error){
        res.status(404).json({
            status:"fild",
            message:error.message
        })
    }
}

exports.deleteProduct= async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:"success",
            data:null
        })
    }catch(error){
        res.status(404).json({
            status:"fild",
            message:error.message
        })
        
    }
}