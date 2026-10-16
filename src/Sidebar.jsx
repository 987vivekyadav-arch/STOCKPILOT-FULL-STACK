import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ sidebar, setSidebar }) {

    const location = useLocation();

    return (
        <>
            <button
                className="sidebar-toggle"
                onClick={function () {
                    if (sidebar === true) {
                        setSidebar(false);
                    } else {
                        setSidebar(true);
                    }
                }}
            >
                {sidebar ? "✕" : "☰"}
            </button>


            {sidebar && (
                <>
                    <div
                        className="sidebar-overlay"
                        onClick={function () {
                            setSidebar(false);
                        }}
                    ></div>

                    <aside className="sidebar">

                        <div className="sidebar-header">

                            <div className="sidebar-logo">S</div>

                            <div className="sidebar-brand">
                                <h2>Stock<span>Pilot</span></h2>
                                <p>Inventory Management</p>
                            </div>

                            <button
                                className="sidebar-close"
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                ✕
                            </button>

                        </div>


                        <div className="sidebar-section">
                            <p className="sidebar-heading">MAIN MENU</p>

                            <Link
                                to="/"
                                className={
                                    location.pathname === "/"
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">⌂</span>
                                <span>Home</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>


                            <Link
                                to="/dashboard"
                                className={
                                    location.pathname === "/dashboard"
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">▦</span>
                                <span>Dashboard</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>


                            <Link
                                to="/products"
                                className={
                                    location.pathname.startsWith("/products")
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">▣</span>
                                <span>Products</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>


                            <Link
                                to="/inventory"
                                className={
                                    location.pathname === "/inventory"
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">▤</span>
                                <span>Inventory</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>


                            <Link
                                to="/orders"
                                className={
                                    location.pathname.startsWith("/orders")
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">🛒</span>
                                <span>Orders</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>


                            <Link
                                to="/reports"
                                className={
                                    location.pathname === "/reports"
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false);
                                }}
                            >
                                <span className="sidebar-icon">▥</span>
                                <span>Reports</span>
                                <span className="sidebar-arrow">›</span>
                            </Link>

                        </div>


                        <div className="sidebar-bottom">

                            <div className="sidebar-help">
                                <div className="help-icon">✦</div>

                                <div>
                                    <h4>StockPilot</h4>
                                
                                </div>
                            </div>


                            <Link
                                to="/login"
                                className={
                                    location.pathname === "/profile"
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                                onClick={function () {
                                    setSidebar(false)
                                    localStorage.removeItem("token");
                                }}
                            >
                                <span className="sidebar-icon">◎</span>
                                <span>Logout</span>
                            </Link>

                        </div>

                    </aside>
                </>
            )}

        </>
    );
}

export default Sidebar;