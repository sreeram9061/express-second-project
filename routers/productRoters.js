const express= require("express")
const router=express.Router()
const {createProduct, getProduct, getProducts, updateProduct, deleteProduct}=require("../controllers/productsController")


router.route("/")
      .get(getProducts)
      .post(createProduct)
router.route('/:id')
      .get(getProduct)
      .patch(updateProduct)
      .delete(deleteProduct)

module.exports=router