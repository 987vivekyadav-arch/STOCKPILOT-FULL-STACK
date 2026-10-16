import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import UsersModel from "./users.js"
import ProductModel from "./product.js"
import verify from "./verify.js"
import OrderModel from "./order.js"

const app=express()

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

app.use(express.json())
app.use(cors())

{/*----------------------------------------------------Register-------------------------------------------------- */}

app.post("/register",function(req,res){
    UsersModel.create(req.body)
    .then(function(data){
        console.log(data)
     res.json(data)
    })
})

{/*----------------------------------------------------Login-------------------------------------------------- */}


app.post("/login",function(req,res){
    UsersModel.findOne(req.body)
    .then(function(data){
        console.log(data)

     const token=jwt.sign({userid:data._id},"secret")   
     res.json({token:token})
    })
})


{/*----------------------------------------------------AddProduct-------------------------------------------------- */}

app.post("/addproduct",verify,function(req,res){
    ProductModel.create({...req.body,userid:req.userid})
    .then(function(data){
        console.log(data)
     res.json(data)
    })
})

app.put("/edit/:id",verify,function(req,res){
    ProductModel.findOneAndUpdate({_id:req.params.id,userid:req.userid,},req.body,{new:true})
    .then(function(data){
        console.log(data)
     res.json(data)
    })
})


{/*----------------------------------------------------Products-------------------------------------------------- */}

app.get("/products",verify,function(req,res){
    ProductModel.find({userid:req.userid})
    .then(function(data){
        console.log({"Products":data})
     res.json(data)
    })
})



app.delete("/delete/:id",verify,function(req,res){
    ProductModel.findOneAndDelete({userid:req.userid,_id:req.params.id})
    .then(function(data){
        console.log(data)
     res.json(data)
    })
})

{/*----------------------------------------------------Add-Order-------------------------------------------------- */}

app.get("/addorder",verify,function(req,res){
    ProductModel.find({userid:req.userid})
    .then(function(data){
        console.log({"Order":data})
     res.json(data)
    })
})

app.post("/addorder",verify,function(req,res){
    ProductModel.findById(req.body.product)
    .then(function(product){
if(product){
    if(product.stock>=req.body.quantity){
OrderModel.create({...req.body,userid:req.userid})
.then(function(data){
   product.stock=product.stock-req.body.quantity;
   product.save() 
   .then(function(){
    res.json(data)
   })
})
    }else{
        res.json({message:"Not enough stocks"})
    }
}else{
  res.json({message:"Product not found"})  
}
 })
    })

app.put("/editorder/:id", verify, function(req, res) {
    OrderModel.findOneAndUpdate(
        {
            _id: req.params.id,
            userid: req.userid
        },
        {
            $set: {
                customer: req.body.customer,
                date: req.body.date,
                product: req.body.product,
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                total: req.body.total
            }
        },
        { new: true, runValidators: true }
    )
    .then(function(data) {
        if (data) {
            res.json({
                success: true,
                order: data
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
    })
    .catch(function(error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Failed to update order"
        })
    })
})






    

{/*----------------------------------------------------Orders-------------------------------------------------- */}

app.get("/orders",verify,function(req,res){
    console.log("logged:",req.userid)
    OrderModel.find({userid:req.userid})
    .then(function(data){
        console.log({"OrdersGet":data})
     res.json(data)
    })
})

app.delete("/deleteorder/:id",verify,function(req,res){
    OrderModel.findOneAndDelete({userid:req.userid,_id:req.params.id})
    .then(function(data){
        console.log(data)
     res.json(data)
    })
})




{/*----------------------------------------------------Inventory-------------------------------------------------- */}

app.get("/orders",verify,function(req,res){
    OrderModel.find({userid:req.userid})
    .then(function(data){
        console.log({"OrdersGet":data})
     res.json(data)
    })
})

{/*----------------------------------------------------Dashboard-------------------------------------------------- */}

app.get("/dashboard",verify,function(req,res){
ProductModel.find({userid:req.userid})
.then(function(products){
 return OrderModel.find({userid:req.userid})
.then(function(orders){
res.json({
    products:products,
    orders:orders
    })
})
})
})

{/*----------------------------------------------------Reports-------------------------------------------------- */}

app.get("/reports",verify,function(req,res){
ProductModel.find({userid:req.userid})
.then(function(products){
 return OrderModel.find({userid:req.userid})
.then(function(orders){
res.json({
    products:products,
    orders:orders
    })
})
})
})

{/*----------------------------------------------------Inventory-------------------------------------------------- */}

app.get("/inventory",verify,function(req,res){
    ProductModel.find({userid:req.userid})
    .then(function(data){
        console.log({"Inventory":data})
     res.json(data)
    })
})


app.listen(5000);