import React from "react"
import { Link } from "react-router-dom"
import RegisterDashboard from "./registerDashboard.component"

export default function LoginDashboard(params) {
    return (
        <div>
            <div className="center-text black-bg margin-10px">
                <h1><u>Login/Register Dashboard</u></h1>
            </div>
            <h1 className="center-text"><i>Login</i></h1> 
            <div className="feature-grid">
                <div className="grid-item">
                    <Link to= "/login/studentLogin" className="mylink"><b>Login As Student</b></Link>
                </div>
                <div className="grid-item">
                    <Link to= "/login/staffLogin" className="mylink"><b>Login As Staff</b></Link>
                </div>
                
            </div>
            <RegisterDashboard/>
        </div>
    )
    
}