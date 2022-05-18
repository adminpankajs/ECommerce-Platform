import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import './navbar.component.css';
import { useCookies } from "react-cookie";

// import of service for authentication.
const AuthService = require('../services/AuthService.js')

export default function Navbar() {
    var constants =  require('../constants/constants');
    const [cookies, , deleteCookie] = useCookies();
    const [authenticated, setAuthenticated] = useState(false);
    const [name, setName] = useState('<name>');
    const navigate = useNavigate();

    function handleLogout(params) {
        deleteCookie("accessToken",{path:'/'});
        deleteCookie("role",{path: '/'});
        setAuthenticated(false);
        navigate('/');
        
    }

    useEffect(() => {
        const token = cookies.accessToken;
        if(token !== undefined) {
            if(cookies.role==='staff') {
                (AuthService.AuthTokenStaff(cookies.accessToken))
                    .then((res) => {
                        if(res!=="TokenFailed") {
                            setAuthenticated(true);
                            setName(res[0].name)
                        }
                        else {
                            setAuthenticated(false);
                        }
                })
            }
            else if(cookies.role==='student') {
                (AuthService.AuthTokenStudent(cookies.accessToken))
                    .then((res) => {
                        if(res!=="TokenFailed") {
                            setAuthenticated(true);
                            setName(res[0].name)
                        }
                        else {
                            setAuthenticated(false);
                        }
                    })   
            }
        }
    },[cookies])


    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link float-left">
                <img style={{width: "5vw", margin: "0vw 2vw"}} src={constants.websiteImages+'/brand-logo.jpeg'}></img>
                {/* E-Commerece<div className="nav-app-head" >Portal</div>&nbsp;|&nbsp; */}
            </Link>
            <Link to="/" className="navbar-link justify-right">
                Home
            </Link>
            <a style={{animationDelay: "1s"}} className="navbar-link justify-right" href="/#homepage-product-grid">Categories</a>
            <Link to="/products/dashboard" className="navbar-link justify-right">
                Mobile Phones
            </Link>
            <a className="navbar-link justify-right" href={"/product/categories/tv#tv-main"} >
                Television
            </a>
            <Link to="/products/dashboard" className="navbar-link justify-right">
                Earphones
            </Link>
            <Link to="/products/dashboard" className="navbar-link justify-right">
                Shoes
            </Link>
            <Link to="/student/dashboard" className="navbar-link justify-right">
                About
            </Link>
            <input className="searchBar" type={"text"} placeholder="search"></input>
            <div className="nav-account">
                {authenticated ? (
                    <button onClick={handleLogout} className="navbar-link ">
                        <u>Hello, {name}</u>
                    </button>
                ) : (
                    <Link style={{fontSize: "2vw",fontFamily: "Grape Nuts, cursive", padding: "0vw 2vw",backgroundColor: "#f10f75", color: "black", borderRadius: "10px", paddingBlock: "0.5vw"}} to="login/" className="navbar-link float-right">
                        <u><b>Login</b></u>
                    </Link>
                )}
            </div>

        </nav>
    );
}