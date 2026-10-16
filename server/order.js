import mongoose from "mongoose"

const OrderSchema=
mongoose.Schema({

                        userid:String,
                        customer:String ,
                        date:Date,
                        product:String,
                        quantity:Number,
                        price:Number,
                        total:Number,
                        name:String
})


const OrderModel=
mongoose.model("order",OrderSchema)

export default OrderModel;