import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout() {
    const [sidebar, setSidebar] = React.useState(true)

    return (
        <>
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <div className="main-content">
                <Outlet />
            </div>
        </>
    )
}

export default Layout