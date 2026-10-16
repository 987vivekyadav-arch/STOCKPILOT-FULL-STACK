import React  from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {useNavigate} from "react-router-dom"

import Home from "./Home"
import Sidebar from "./Sidebar"

import Register from "./Register"
import Login from "./Login"

import Addproduct from "./Addproduct"
import Products from "./Products"

import Addorder from "./Addorder"
import Orders from "./Orders"

import Dashboard from "./Dashboard"
import Reports from "./Reports"

import Inventory from "./Inventory"

function App(){

  const[sidebar,setSidebar]=React.useState(true)

return(
<BrowserRouter>


<Routes>

<Route path="/"
element={<Home/>}
/>

<Route path="/register"
element={<Register/>}
/>

<Route path="/login"
element={<Login/>}
/>

<Route path="/addproduct"
element={<Addproduct/>}
/>

<Route path="/products"
element={<Products/>}
/>

<Route path="/addorder"
element={<Addorder/>}
/>

<Route path="/orders"
element={<Orders/>}
/>

<Route path="/dashboard"
element={
<>
<Sidebar
sidebar={sidebar}
setSidebar={setSidebar}
/>
<Dashboard/>

</>


}
/>

<Route path="/reports"
element={<Reports/>}
/>

<Route path="/inventory"
element={<Inventory/>}
/>


</Routes>
</BrowserRouter>
 )
}export default App;
