import React from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Register.css"

function Register() {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const navigate = useNavigate()

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-logo">
                    Stock<span>Pilot</span>
                </div>

                <h2>Create Account</h2>

                <p className="register-subtitle">
                    Start managing your inventory today.
                </p>

                <div className="register-form">

                    <label htmlFor="register-name">Full Name</label>

                    <input
                        id="register-name"
                        className="register-input"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={function(event) {
                            setName(event.target.value)
                        }}
                    />

                    <label htmlFor="register-email">Email Address</label>

                    <input
                        id="register-email"
                        className="register-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={function(event) {
                            setEmail(event.target.value)
                        }}
                    />

                    <label htmlFor="register-password">Password</label>

                    <input
                        id="register-password"
                        className="register-input"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={function(event) {
                            setPassword(event.target.value)
                        }}
                    />

                    <button
                        className="register-button"
                        onClick={function() {
                            fetch("http://localhost:5000/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    name: name,
                                    email: email,
                                    password: password
                                })
                            })
                            .then(function(response) {
                                return response.json()
                            })
                            .then(function(data) {
                                console.log(data)

                                if (data.success) {
                                    navigate("/login")
                                }
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
                        }}
                    >
                        Create Account →
                    </button>

                </div>

                <p className="register-login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="register-login-link">
                        Sign in
                    </Link>
                </p>

                <div className="register-footer">
                    © 2026 StockPilot. All rights reserved.
                </div>

            </div>

        </div>
    )
}

export default Register