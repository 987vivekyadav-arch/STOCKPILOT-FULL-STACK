import React, { useEffect } from "react";
import "./Inventory.css";

function Inventory() {

    const [inventory, setInventory] = React.useState([]);

    useEffect(function() {

        fetch("http://localhost:5000/inventory", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setInventory(data);
        })
        .catch(function(error) {
            console.log(error);
        });

    }, []);

    return (
        <div className="inventory-page">

            <div className="inventory-header">
                <div>
                    <h1>Inventory Management</h1>
                    <p>Track stock levels and update quantities.</p>
                </div>
            </div>

            <div className="inventory-table-container">

                <table className="inventory-table">

                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {inventory.map(function(item) {

                            let status = "In Stock";

                            if (item.stock === 0) {
                                status = "Out of Stock";
                            } else if (item.stock <= 5) {
                                status = "Low Stock";
                            }

                            return (
                                <tr key={item._id}>

                                    <td>{item.name}</td>

                                    <td>{item.stock}</td>

                                    <td>
                                        <span className={
                                            "inventory-status " +
                                            status.toLowerCase().replaceAll(" ", "-")
                                        }>
                                            {status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className="inventory-update-btn"
                                            onClick={function() {
                                                alert("Update stock for " + item.name);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>

                                </tr>
                            );

                        })}

                    </tbody>

                </table>

                {inventory.length === 0 && (
                    <p className="inventory-empty">
                        No inventory products found.
                    </p>
                )}

            </div>

        </div>
    );
}

export default Inventory;