import React from "react"
import { useNavigate,useLocation } from "react-router-dom"
import "./Addproduct.css"

function AddProduct(){

const navigate = useNavigate()
const location=useLocation()
const item=location.state?.product
console.log(item)

const[products,setProducts]=React.useState()

    const [name, setName] = React.useState(item?.name||"")
    const [price, setPrice] = React.useState(item?.price||"")
    const [stock, setStock] = React.useState(item?.stock||"")
    const [description, setDescription] = React.useState(item?.description||"")
    const [category, setCategory] = React.useState(item?.category||"")
    const [status, setStatus] = React.useState(item?.status||"")




function Edit(item) {
    fetch("https://stockpilot-full-stack.onrender.com/edit/" + item._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            name: name,
            price: Number(price),
            stock: Number(stock),
            description: description,
            category: category,
            status: status
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        navigate("/products")
    })
       
}






    return (
        <div className="addproduct-page">
            <div className="addproduct-container">

                <div className="addproduct-header">
                    <h2>Add New Product</h2>
                    <p>Add a product to your inventory</p>
                </div>

                <div className="addproduct-form">

                    <div className="addproduct-field">
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={function(event) {
                                setName(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addproduct-field">
                        <label>Category</label>
                        <input
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={function(event) {
                                setCategory(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addproduct-field">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={function(event) {
                                setPrice(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addproduct-field">
                        <label>Stock Quantity</label>
                        <input
                            type="number"
                            placeholder="Enter quantity"
                            value={stock}
                            onChange={function(event) {
                                setStock(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addproduct-field addproduct-description">
                        <label>Description</label>
                        <textarea
                            placeholder="Enter product description..."
                            value={description}
                            onChange={function(event) {
                                setDescription(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addproduct-field">
                        <label>Status</label>
                        <input
                            type="text"
                            placeholder="Enter status"
                            value={status}
                            onChange={function(event) {
                                setStatus(event.target.value)
                            }}
                        />
                    </div>

                </div>

                <div className="addproduct-actions">
                    <button
                        className="addproduct-cancel"
                        onClick={function() {
                            navigate("/products")
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="addproduct-save"

                        
                        onClick={function() {

if(item){Edit(item)}else{



                            fetch("https://stockpilot-full-stack.onrender.com/addproduct", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "authorization": "Bearer " + localStorage.getItem("token")
                                },
                                body: JSON.stringify({
                                    name: name,
                                    price: Number(price),
                                    stock: Number(stock),
                                    description: description,
                                    category: category,
                                    status: status
                                })
                            })
                            .then(function(response) {
                                return response.json()
                            })
                            .then(function(data) {
                                console.log(data)
                                if (data.success) {
                                    navigate("/products")
                                }
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
                        }}}
                    >
                        Save Product
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddProduct