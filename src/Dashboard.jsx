import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import "./Dashboard.css"

function Dashboard() {
    const navigate = useNavigate()

    const [dashboard, setDashboard] = React.useState({
        products: [],
        orders: []
    })

    useEffect(function() {
        fetch("http://localhost:5000/dashboard", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            setDashboard(data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])

    const totalorders = dashboard.orders.length

    const totalproducts = dashboard.products.length

    const totalstocks = dashboard.products.reduce(function(acc, item) {
        return acc + Number(item.stock || 0)
    }, 0)

    const lowstock = dashboard.products.reduce(function(acc, item) {
        if (
            Number(item.stock) === 0 ||
            item.status === "lowstock" ||
            item.status === "Low Stock" ||
            item.status === "low stock"
        ) {
            return acc + 1
        }
        return acc
    }, 0)

    const totalvalue = dashboard.orders.reduce(function(acc, item) {
        return acc + Number(item.total || 0)
    }, 0)

    const chartdata = dashboard.orders.map(function(item) {
        return {
            name: item.customer,
            total: Number(item.total || 0)
        }
    })

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Here's your business overview.</p>
                </div>

                <button
                    className="dashboard-create-btn"
                    onClick={function() {
                        navigate("/addorder")
                    }}
                >
                    + Create Order
                </button>
            </div>

            <div className="dashboard-summary">

                <div className="dashboard-card">
                    <div className="dashboard-card-icon purple-icon">▦</div>
                    <p>Total Products</p>
                    <h2>{totalproducts}</h2>
                    <span>Products in your inventory</span>
                </div>

                <div className="dashboard-card">
                    <div className="dashboard-card-icon green-icon">▤</div>
                    <p>Total Stock</p>
                    <h2>{totalstocks.toLocaleString("en-IN")}</h2>
                    <span>Total units available</span>
                </div>

                <div className="dashboard-card">
                    <div className="dashboard-card-icon orange-icon">⚠</div>
                    <p>Low Stock</p>
                    <h2>{lowstock}</h2>
                    <span>Products needing attention</span>
                </div>

                <div className="dashboard-card">
                    <div className="dashboard-card-icon blue-icon">↗</div>
                    <p>Total Orders</p>
                    <h2>{totalorders}</h2>
                    <span>Orders recorded</span>
                </div>

            </div>

            <div className="dashboard-middle">

                <div className="dashboard-panel dashboard-chart-panel">
                    <div className="dashboard-panel-heading">
                        <div>
                            <h3>Order Overview</h3>
                            <p>Value of each recorded order</p>
                        </div>
                    </div>

                    {chartdata.length > 0 ? (
                        <div className="dashboard-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartdata}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={function(value) {
                                            return "₹" + Number(value).toLocaleString("en-IN")
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#5145e5" radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="dashboard-empty">No orders to display yet.</p>
                    )}
                </div>

                <div className="dashboard-panel dashboard-value-panel">
                    <div className="dashboard-panel-heading">
                        <div>
                            <h3>Total Order Value</h3>
                            <p>Value of all recorded orders</p>
                        </div>
                    </div>

                    <div className="dashboard-value">
                        ₹{totalvalue.toLocaleString("en-IN")}
                    </div>

                    <p className="dashboard-value-note">
                        Calculated from your saved orders.
                    </p>
                </div>

            </div>

            <div className="dashboard-panel dashboard-recent-panel">
                <div className="dashboard-panel-heading">
                    <div>
                        <h3>Recent Orders</h3>
                        <p>Your latest recorded orders</p>
                    </div>

                    <button
                        className="dashboard-view-btn"
                        onClick={function() {
                            navigate("/orders")
                        }}
                    >
                        View All →
                    </button>
                </div>

                <div className="dashboard-table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dashboard.orders.slice(-5).reverse().map(function(item) {
                                return (
                                    <tr key={item._id}>
                                        <td>#{item._id.slice(-6)}</td>

                                        <td>{item.customer}</td>

                                        <td>
                                            {item.date
                                                ? new Date(item.date).toLocaleDateString("en-IN")
                                                : "-"}
                                        </td>

                                        <td>{item.quantity}</td>

                                        <td className="dashboard-order-total">
                                            ₹{Number(item.total || 0).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                )
                            })}

                            {dashboard.orders.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="dashboard-empty">
                                        No orders found. Create your first order.
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

export default Dashboard