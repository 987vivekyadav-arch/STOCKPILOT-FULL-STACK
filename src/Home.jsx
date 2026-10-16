import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">

            <nav className="home-navbar">

                <Link to="/" className="home-logo">
                    <div className="home-logo-icon">S</div>
                    <span>Stock<span className="logo-highlight">Pilot</span></span>
                </Link>

                <div className="home-nav-buttons">
                    <Link to="/login" className="home-login">
                        Login
                    </Link>

                    <Link to="/register" className="home-register">
                        Get Started <span>→</span>
                    </Link>
                </div>

            </nav>


            <main className="home-hero">

                <div className="home-content">

                    <div className="home-badge">
                        <span className="badge-dot"></span>
                        SMART INVENTORY MANAGEMENT
                    </div>

                    <h1>
                        Manage Your Stock.
                        <br />
                        <span>Master Your Business.</span>
                    </h1>

                    <p className="home-description">
                        Take control of your inventory, track every order,
                        and make smarter business decisions with StockPilot.
                        Everything your business needs, in one place.
                    </p>

                    <div className="home-hero-buttons">

                        <Link to="/register" className="hero-primary">
                            Get Started Free
                            <span>→</span>
                        </Link>

                        <Link to="/login" className="hero-secondary">
                            Login to Dashboard
                        </Link>

                    </div>

                    <div className="home-benefits">

                        <div className="home-benefit">
                            <span className="benefit-check">✓</span>
                            Easy to manage
                        </div>

                        <div className="home-benefit">
                            <span className="benefit-check">✓</span>
                            Real-time stock tracking
                        </div>

                        <div className="home-benefit">
                            <span className="benefit-check">✓</span>
                            Clear business insights
                        </div>

                    </div>

                </div>


                <div className="home-visual">

                    <div className="visual-glow"></div>

                    <div className="dashboard-preview">

                        <div className="preview-header">

                            <div className="preview-title">
                                <div className="preview-logo">S</div>

                                <div>
                                    <h3>StockPilot</h3>
                                    <p>Business Overview</p>
                                </div>
                            </div>

                            <div className="preview-status">
                                <span></span>
                                Overview
                            </div>

                        </div>


                        <div className="preview-welcome">
                            <div>
                                <h2>Dashboard</h2>
                                <p>Here's your inventory overview</p>
                            </div>

                            <div className="preview-avatar">A</div>
                        </div>


                        <div className="preview-stats">

                            <div className="preview-card">
                                <div className="stat-top">
                                    <span className="stat-icon purple">▦</span>
                                    <span className="stat-trend">↗ 12%</span>
                                </div>

                                <p>Total Products</p>
                                <h2>1,248</h2>
                            </div>

                            <div className="preview-card">
                                <div className="stat-top">
                                    <span className="stat-icon green">₹</span>
                                    <span className="stat-trend">↗ 8%</span>
                                </div>

                                <p>Stock Value</p>
                                <h2>₹8.4L</h2>
                            </div>

                        </div>


                        <div className="preview-inventory">

                            <div className="inventory-heading">
                                <div>
                                    <h3>Recent Inventory</h3>
                                    <p>Product stock overview</p>
                                </div>

                                <span className="inventory-dots">•••</span>
                            </div>


                            <div className="inventory-row">
                                <div className="product-symbol laptop">▣</div>

                                <div className="product-details">
                                    <h4>MacBook Pro</h4>
                                    <p>Electronics</p>
                                </div>

                                <div className="product-price">
                                    <h4>₹85,000</h4>
                                    <span className="stock-good">In Stock</span>
                                </div>
                            </div>


                            <div className="inventory-row">
                                <div className="product-symbol mouse">▣</div>

                                <div className="product-details">
                                    <h4>Wireless Mouse</h4>
                                    <p>Accessories</p>
                                </div>

                                <div className="product-price">
                                    <h4>₹799</h4>
                                    <span className="stock-low">Low Stock</span>
                                </div>
                            </div>


                            <div className="inventory-row">
                                <div className="product-symbol keyboard">▣</div>

                                <div className="product-details">
                                    <h4>Keyboard</h4>
                                    <p>Accessories</p>
                                </div>

                                <div className="product-price">
                                    <h4>₹1,499</h4>
                                    <span className="stock-good">In Stock</span>
                                </div>
                            </div>

                        </div>


                        <div className="preview-footer">
                            <span className="footer-dot"></span>
                            Inventory overview
                            <span className="footer-time">Updated just now</span>
                        </div>

                    </div>


                    <div className="floating-card floating-stock">
                        <div className="floating-icon">✓</div>

                        <div>
                            <h4>Stock organized</h4>
                            <p>Your inventory at a glance</p>
                        </div>
                    </div>


                    <div className="floating-card floating-orders">
                        <div className="floating-order-icon">↗</div>

                        <div>
                            <p>Orders managed</p>
                            <h3>Effortlessly.</h3>
                        </div>
                    </div>

                </div>

            </main>


            <section className="home-features">

                <div className="feature-item">
                    <div className="feature-icon feature-purple">▦</div>

                    <div>
                        <h3>Product Management</h3>
                        <p>Keep your product information organized.</p>
                    </div>
                </div>


                <div className="feature-item">
                    <div className="feature-icon feature-blue">↗</div>

                    <div>
                        <h3>Inventory Tracking</h3>
                        <p>Know what's available and what needs attention.</p>
                    </div>
                </div>


                <div className="feature-item">
                    <div className="feature-icon feature-green">₹</div>

                    <div>
                        <h3>Business Insights</h3>
                        <p>Understand your stock and order activity.</p>
                    </div>
                </div>

            </section>


            <footer className="home-footer">
                <p>© 2026 StockPilot. Built for smarter inventory management.</p>
            </footer>

        </div>
    );
}

export default Home;