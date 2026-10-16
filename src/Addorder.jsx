import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./Addorder.css"

function Addorder() {
    const navigate = useNavigate()
    const location = useLocation()
    const item = location.state?.item

    const [products, setProducts] = React.useState([])
    const [customer, setCustomer] = React.useState(item?.customer || "")
    const [date, setDate] = React.useState(
        item?.date ? item.date.split("T")[0] : ""
    )
    const [product, setProduct] = React.useState(
        item
            ? String(
                typeof item.product === "object"
                    ? item.product?._id || ""
                    : item.product || ""
            )
            : ""
    )
    const [quantity, setQuantity] = React.useState(item?.quantity || "")

    useEffect(function() {
        fetch("https://stockpilot-full-stack.onrender.com/addorder", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            if (Array.isArray(data)) {
                setProducts(data)

                if (item) {
                    const savedProductId =
                        typeof item.product === "object"
                            ? item.product?._id
                            : item.product

                    setProduct(String(savedProductId || ""))
                }
            } else {
                console.log(data)
                setProducts([])
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])

    function SelectedProduct() {
        const result = products.find(function(p) {
            return String(p._id) === String(product)
        })

        if (result) {
            return result
        }

        if (
            item &&
            String(item.product?._id || item.product) === String(product)
        ) {
            return {
                _id: product,
                name: item.name,
                price: item.price
            }
        }

        return undefined
    }

    const selected = SelectedProduct()
    const total = selected
        ? Number(selected.price) * Number(quantity)
        : 0

    function EditOrder() {
        const selectedProduct = SelectedProduct()

        if (!selectedProduct) {
            alert("Please select a valid product")
            return
        }

        fetch("https://stockpilot-full-stack.onrender.com/editorder/" + item._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                customer: customer,
                date: date,
                product: selectedProduct._id,
                name: selectedProduct.name,
                quantity: Number(quantity),
                price: Number(selectedProduct.price),
                total: Number(total)
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)

            if (data.success) {
                navigate("/orders")
            } else {
                alert(data.message || "Could not update order")
            }
        })
        .catch(function(error) {
            console.log(error)
            alert("Failed to update order")
        })
    }

    function CreateOrder() {
        const selectedProduct = SelectedProduct()

        if (!selectedProduct) {
            alert("Please select a valid product")
            return
        }

        fetch("https://stockpilot-full-stack.onrender.com/addorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                customer: customer,
                date: date,
                product: selectedProduct._id,
                name: selectedProduct.name,
                quantity: Number(quantity),
                price: Number(selectedProduct.price),
                total: Number(total)
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)

            if (data.message) {
                alert(data.message)
                return
            }

            navigate("/orders")
        })
        .catch(function(error) {
            console.log(error)
            alert("Failed to create order")
        })
    }

    return (
        <div className="addorder-page">

            <div className="addorder-header">
                <div>
                    <h2>{item ? "Edit Order" : "Create New Order"}</h2>
                    <p>Manage customer orders and product sales.</p>
                </div>

                <button
                    className="addorder-back-btn"
                    onClick={function() {
                        navigate("/orders")
                    }}
                >
                    Back to Orders
                </button>
            </div>

            <div className="addorder-card">

                <div className="addorder-card-heading">
                    <h3>Order Information</h3>
                    <p>Enter the customer and product details.</p>
                </div>

                <div className="addorder-form">

                    <div className="addorder-field">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            placeholder="Enter customer name"
                            value={customer}
                            onChange={function(event) {
                                setCustomer(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addorder-field">
                        <label>Order Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={function(event) {
                                setDate(event.target.value)
                            }}
                        />
                    </div>

                    <div className="addorder-field">
                        <label>Select Product</label>
                        <select
                            value={product}
                            onChange={function(event) {
                                setProduct(event.target.value)
                            }}
                        >
                            <option value="">Select a product</option>

                            {products.map(function(p) {
                                return (
                                    <option
                                        key={p._id}
                                        value={String(p._id)}
                                    >
                                        {p.name} - ₹{p.price}
                                    </option>
                                )
                            })}

                            {item && product && !products.some(function(p) {
                                return String(p._id) === String(product)
                            }) && (
                                <option value={product}>
                                    {item.name} - ₹{item.price}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="addorder-field">
                        <label>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={function(event) {
                                setQuantity(event.target.value)
                            }}
                        />
                    </div>

                </div>

                {selected && (
                    <div className="addorder-product-info">
                        <div>
                            <span>Selected Product</span>
                            <h3>{selected.name}</h3>
                        </div>

                        <div>
                            <span>Price per Item</span>
                            <h3>
                                ₹{Number(selected.price).toLocaleString("en-IN")}
                            </h3>
                        </div>
                    </div>
                )}

                <div className="addorder-total">
                    <div>
                        <p>Order Total</p>
                        <span>Price × Quantity</span>
                    </div>

                    <h2>
                        ₹{Number(total).toLocaleString("en-IN")}
                    </h2>
                </div>

                <div className="addorder-actions">

                    <button
                        className="addorder-cancel-btn"
                        onClick={function() {
                            navigate("/orders")
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="addorder-submit-btn"
                        onClick={function() {
                            if (
                                customer.trim() === "" ||
                                date === "" ||
                                product === "" ||
                                Number(quantity) < 1
                            ) {
                                alert("Please fill all fields and select a valid quantity.")
                                return
                            }

                            if (item) {
                                EditOrder()
                            } else {
                                CreateOrder()
                            }
                        }}
                    >
                        {item ? "Save Changes →" : "Create Order →"}
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Addorder