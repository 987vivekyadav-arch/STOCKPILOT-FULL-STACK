import mongoose from "mongoose"

const ProductSchema=
mongoose.Schema({

                        userid:String,
                        name:String,
                        price:Number ,
                        stock:Number ,
                        description:String ,
                        category:String,
                        status:String,
                        
})


const ProductModel=
mongoose.model("product",ProductSchema)

export default ProductModel;