import React from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

function Login() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const navigate = useNavigate()

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    Stock<span>Pilot</span>
                </div>

                <h2>Welcome Back</h2>

                <p className="login-subtitle">
                    Sign in to manage your inventory.
                </p>

                <div className="login-form">

                    <label htmlFor="login-email">Email Address</label>

                    <input
                        id="login-email"
                        className="login-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={function(event) {
                            setEmail(event.target.value)
                        }}
                    />

                    <label htmlFor="login-password">Password</label>

                    <input
                        id="login-password"
                        className="login-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={function(event) {
                            setPassword(event.target.value)
                        }}
                    />

                    <button
                        className="login-button"
                        onClick={function() {
                            fetch("https://stockpilot-full-stack.onrender.com/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password
                                })
                            })
                            .then(function(response) {
                                return response.json()
                            })
                            .then(function(data) {
                                console.log(data)

                                if (data.token) {
                                    localStorage.setItem("token", data.token)
                                    navigate("/dashboard")
                                }
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
                        }}
                    >
                        Sign In →
                    </button>

                </div>

                <p className="login-register-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="login-register-link">
                        Create account
                    </Link>
                </p>

                <div className="login-footer">
                    © 2026 StockPilot. All rights reserved.
                </div>

            </div>

        </div>
    )
}

export default Login