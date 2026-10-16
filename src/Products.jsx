import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

function Products() {
    const navigate = useNavigate()

    const [products, setProducts] = React.useState([])
    const [category, setCategory] = React.useState("all")
    const [search, setSearch] = React.useState("")

    useEffect(function() {
        fetch("http://localhost:5000/products", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setProducts(data)
        })
        .catch(function(error) {
            console.log(error)
        })
    }, [])

    function FilteredData() {
        const result = products.filter(function(item) {
            if (category === "all") {
                return true
            }

            if (category === item.category) {
                return true
            }

            return false
        })

        return result
    }

    function FilteredSearch() {
        const final = FilteredData().filter(function(item) {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })

        return final
    }


function Delete(id){
fetch("http://localhost:5000/delete/"+id, {
    method:"DELETE",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            setProducts(data)
          const newProducts=products.filter(function(item){
if(id!==item._id){return true}{return false}
          },
       
        )
         setProducts(newProducts)
        })
        
    }





    return (
        <div className="products-page">

            <div className="products-header">
                <div>
                    <h1>Products</h1>
                    <p>Manage and organize your products</p>
                </div>

                <button
                    className="products-add-button"
                    onClick={function() {
                        navigate("/addproduct")
                    }}
                >
                    <span>+</span> Add Product
                </button>
            </div>

            <div className="products-stats">
                <div className="products-stat-card">
                    <p>Total Products</p>
                    <h2>{products.length}</h2>
                </div>

                <div className="products-stat-card">
                    <p>Categories</p>
                    <h2>
                        {new Set(products.map(function(item) {
                            return item.category
                        }).filter(Boolean)).size}
                    </h2>
                </div>

                <div className="products-stat-card">
                    <p>Low Stock</p>
                    <h2>
                        {products.filter(function(item) {
                            return Number(item.stock) < 10
                        }).length}
                    </h2>
                </div>
            </div>

            <div className="products-container">

                <div className="products-toolbar">
                    <div className="products-search">
                        <span>⌕</span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={function(event) {
                                setSearch(event.target.value)
                            }}
                        />
                    </div>

                    <select
                        className="products-category-select"
                        value={category}
                        onChange={function(event) {
                            setCategory(event.target.value)
                        }}
                    >
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Other">Other</option>
                    </select>

                    <span className="products-count">
                        {FilteredSearch().length} products
                    </span>
                </div>

                <div className="products-table-wrapper">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {FilteredSearch().map(function(product) {
                                return (
                                    <tr key={product._id}>
                                        <td>
                                            <div className="products-name-cell">
                                                <div className="products-product-icon">
                                                    {product.name.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <h4>{product.name}</h4>
                                                    <p>{product.description}</p>
                                                    <button onClick={function(){
                                                        Delete(product._id)
                                                    }}
                                                  >Delete</button>
                                                <button onClick={function(){
                                                        navigate("/addproduct",{
                                                            state:{product:product}
                                                        })
                                                    }}
                                                  >Edit</button>


                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="products-category">
                                                {product.category || "Uncategorized"}
                                            </span>
                                        </td>

                                        <td className="products-price">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </td>

                                        <td>{product.stock}</td>

                                        <td>
                                            <span className={
                                                Number(product.stock) < 10
                                                    ? "products-status low"
                                                    : "products-status available"
                                            }>
                                                {Number(product.stock) < 10
                                                    ? "Low Stock"
                                                    : "In Stock"}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {FilteredSearch().length === 0 && (
                        <div className="products-empty">
                            <h3>No products found</h3>
                            <p>Try another search or category.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Products