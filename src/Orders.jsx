import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Orders.css"

function Orders() {
    const navigate = useNavigate()

    const [orders, setOrders] = React.useState([])

    useEffect(function() {
        fetch("https://stockpilot-full-stack.onrender.com/orders", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setOrders(data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])



    function Delete(id){
fetch("https://stockpilot-full-stack.onrender.com/deleteorder/"+id, {
    method:"DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setOrders(data)
          const newOrders=orders.filter(function(item){
if(id!==item._id){return true}{return false}
          },
       
        )
         setOrders(newOrders)
        })
        
    }

    return (
        <div className="orders-page">

            <div className="orders-header">
                <div>
                    <h2>Orders</h2>
                    <p>Manage and track your customer orders.</p>
                </div>

                <button
                    className="orders-create-btn"
                    onClick={function() {
                        navigate("/addorder")
                    }}
                >
                    + Create Order
                </button>
            </div>

            <div className="orders-summary">
                <div className="orders-summary-card">
                    <p>Total Orders</p>
                    <h3>{orders.length}</h3>
                </div>

                <div className="orders-summary-card">
                    <p>Total Order Value</p>
                    <h3>
                        ₹{orders.reduce(function(acc,item) {
                            return acc + Number(item.total||(item.price*item.quantity))
                        }, 0).toLocaleString("en-IN")}
                    </h3>
                </div>
            </div>

            <div className="orders-table-container">
                <div className="orders-table-heading">
                    <h3>All Orders</h3>
                    <span>{orders.length} orders</span>
                </div>

                <div className="orders-table-scroll">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(function(item) {
                                return (
                                    <tr key={item._id}>
                                        
                                        <td className="orders-id">
                                            #{item._id.slice(-6)}
                                        </td>

                                        <td>{item.customer}</td>

                                        <td>
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString("en-IN")
                                                : "-"}
                                        </td>

                                        <td>{item.name}</td>

                                        <td>{item.quantity}</td>

                                        <td className="orders-total">
                                            ₹{Number(item.total || Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}
                                        </td>

<td>
<button onClick={function(){
    Delete(item._id)
}}

>

Delete
</button>

</td>

<td>
<button onClick={function(){
 navigate("/addorder",{
    state:{item:item}
 })
}}

>

Edit
</button>

</td>



                                    </tr>
                                )
                            })}

                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="orders-empty">
                                        No orders found. Create your first order to see it here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Orders