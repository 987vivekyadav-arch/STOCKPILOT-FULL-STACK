import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import "./Reports.css";

function Reports() {

    const navigate = useNavigate();

    const [reports, setReports] = React.useState({
        products: [],
        orders: []
    });

    const [startdate, setStartDate] = React.useState("");
    const [enddate, setEndDate] = React.useState("");

    useEffect(function() {

        fetch("http://localhost:5000/reports", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            setReports({
                products: data.products || [],
                orders: data.orders || []
            });
        })
        .catch(function(error) {
            console.log(error);
        });

    }, []);

    // Filter orders by date

    function FilteredData() {

        const result = reports.orders.filter(function(item) {

            if (
                (!startdate || item.date.split("T")[0] >= startdate) &&
                (!enddate || item.date.split("T")[0] <= enddate)
            ) {
                return true;
            }

            return false;

        });

        return result;
    }

    // Sales by category

    const chart = FilteredData().map(function(order) {

        const product = reports.products.find(function(item) {
            return item._id === order.product;
        });

        return {
            category: product ? product.category : "Unknown",
            sales: Number(order.total) || 0
        };

    });

    // Combine sales by category

    const categoryData = chart.reduce(function(result, item) {

        const existing = result.find(function(category) {
            return category.category === item.category;
        });

        if (existing) {
            existing.sales += item.sales;
        } else {
            result.push({
                category: item.category,
                sales: item.sales
            });
        }

        return result;

    }, []);

    // Monthly sales

    const monthlyData = FilteredData().reduce(function(result, order) {

        const month = new Date(order.date).toLocaleString("en-US", {
            month: "short",
            year: "numeric"
        });

        const existing = result.find(function(item) {
            return item.month === month;
        });

        if (existing) {
            existing.sales += Number(order.total) || 0;
        } else {
            result.push({
                month: month,
                sales: Number(order.total) || 0
            });
        }

        return result;

    }, []);

    const COLORS = [
        "#5145f5",
        "#42bd8c",
        "#ffbd45",
        "#ff795f",
        "#31a4e8",
        "#9b65e8"
    ];

    return (

        <div className="reports-page">

            {/* Header */}

            <div className="reports-header">

                <div>
                    <h1>Reports & Analytics</h1>

                    <p>
                        Track your sales performance and business growth.
                    </p>
                </div>

            </div>

            {/* Date Filter */}

            <div className="reports-filter">

                <div className="date-field">

                    <label>Start Date</label>

                    <input
                        type="date"
                        value={startdate}
                        onChange={function(event) {
                            setStartDate(event.target.value);
                        }}
                    />

                </div>

                <span className="date-separator">to</span>

                <div className="date-field">

                    <label>End Date</label>

                    <input
                        type="date"
                        value={enddate}
                        onChange={function(event) {
                            setEndDate(event.target.value);
                        }}
                    />

                </div>

                <button
                    className="generate-report-btn"
                    onClick={function() {
                        if (startdate && enddate && startdate > enddate) {
                            alert("Start date cannot be after end date");
                        }
                    }}
                >
                    Generate Report
                </button>

            </div>

            {/* Summary Cards */}

            <div className="reports-summary">

                <div className="report-summary-card">

                    <div className="summary-icon purple-icon">₹</div>

                    <div>
                        <p>Total Sales</p>

                        <h2>
                            ₹{FilteredData().reduce(function(total, order) {
                                return total + (Number(order.total) || 0);
                            }, 0).toLocaleString("en-IN")}
                        </h2>
                    </div>

                </div>

                <div className="report-summary-card">

                    <div className="summary-icon green-icon">▤</div>

                    <div>
                        <p>Total Orders</p>
                        <h2>{FilteredData().length}</h2>
                    </div>

                </div>

                <div className="report-summary-card">

                    <div className="summary-icon orange-icon">▥</div>

                    <div>
                        <p>Categories Sold</p>
                        <h2>{categoryData.length}</h2>
                    </div>

                </div>

            </div>

            {/* Charts */}

            <div className="reports-charts">

                {/* Sales by Category */}

                <div className="report-chart-card">

                    <div className="chart-heading">
                        <h2>Sales by Category</h2>

                        <p>
                            Revenue distribution across categories
                        </p>
                    </div>

                    {categoryData.length > 0 ? (

                        <div className="pie-chart-container">

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="sales"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="70%"
                                        innerRadius="35%"
                                        paddingAngle={3}
                                    >

                                        {categoryData.map(function(item, index) {

                                            return (
                                                <Cell
                                                    key={item.category}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            );

                                        })}

                                    </Pie>

                                    <Tooltip
                                        formatter={function(value) {
                                            return "₹" + Number(value).toLocaleString("en-IN");
                                        }}
                                    />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    ) : (

                        <div className="no-chart-data">
                            No sales data for this date range.
                        </div>

                    )}

                </div>

                {/* Monthly Sales */}

                <div className="report-chart-card">

                    <div className="chart-heading">
                        <h2>Monthly Sales</h2>

                        <p>
                            Revenue over time
                        </p>
                    </div>

                    {monthlyData.length > 0 ? (

                        <div className="bar-chart-container">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={monthlyData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis dataKey="month" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={function(value) {
                                            return "₹" + Number(value).toLocaleString("en-IN");
                                        }}
                                    />

                                    <Bar
                                        dataKey="sales"
                                        name="Sales"
                                        fill="#5145f5"
                                        radius={[5, 5, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    ) : (

                        <div className="no-chart-data">
                            No sales data for this date range.
                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Reports;