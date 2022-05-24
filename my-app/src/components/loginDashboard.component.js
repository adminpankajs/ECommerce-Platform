import React, { useRef, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UserContext from '../services/ContextService';

import './loginDashboard.css';
var constants = require('../constants/constants');
const AuthService = require('../services/AuthService.js')

export default function LoginDashboard(params) {
    // const userRef = useRef();
    const [userName ,setUserName ] = useContext(UserContext);
    const [cookies, setCookie, removeCookie ] = useCookies();
    const [status, setStatus] = useState('')

    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [authenticated,setAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    // Handles the checks for user authentication.
    useEffect(() => {
        console.log(userName);
        const token = cookies.accessToken;
        if(token !== undefined) {
            (AuthService.AuthTokenStaff(cookies.accessToken))
            .then((res) => {
                if(res!=="TokenFailed") {
                    setAuthenticated(true);
                    setStatus('')
                    }
                    else {
                        setAuthenticated(false);
                    }
                })
        }
    },[cookies])

    // Handles the user login form submission.
    const handleSubmit = async() => {
        console.log('Form working');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: pwd})
        };

        fetch('http://localhost:5000/login/customer/generateToken',requestOptions)
            .then(res => res = res.json())
            .then(res => {
                setCookie('accessToken',res[0].accessToken,{path: '/'});
                setCookie('role','staff',{path: '/'});
                setUserName('abc')
                setAuthenticated(true);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
        setStatus("Something went wrong.")
        setEmail('');
        setPwd('');
    } 

    // Handles the logout of the current logged-in user.
    const handleLogout = async() => {
        removeCookie("accessToken",{path:'/'});
        setAuthenticated(false);
        navigate('/');
    }

    return (
        
        <>
            {authenticated ? (
                <section style={{display: "flex", margin:"auto", justifyContent:"center", flexDirection:"column"}}>
                    <h1>You are logged in !!</h1>
                    <form onSubmit={handleLogout}>
                        <button className="button submitButton  gsc_col-xs-12 gsc_col-md-12 " type="submit">Logout</button>
                    </form>
                </section>

            ) : (
                <div className="loginDashboard-main">
                    <div className="loginDashboard-main-img">
                        <b>Hello, Welcome to EzySell</b>
                        <br></br>
                        Enter your details and start your journey now.
                    </div>
                    <div className="loginDashboard-main-form">
                        <img className="loginImg" src={`${constants.websiteImages}/login-icon.png`}></img>
                        <b>Account Login</b>
                        <input value={email} onChange={(e) => {setEmail(e.target.value); setStatus('')}} type={"text"} placeholder={"username"}/>
                        <input value={pwd} onChange={(e) => {setPwd(e.target.value); setStatus('')}} type={"password"} placeholder={"password"}/>
                        <h3 style={{color: "red"}}>{status}</h3>
                        <button onClick={handleSubmit} style={{float: "right"}} type="button" name="submitBtn" className="button submitButton  gsc_col-xs-12 gsc_col-md-12 "><div style={{fontWeight:"900"}}>Sign In</div></button>
                        <Link style={{fontSize: "1vw", textDecoration: "underline", color: "blue"}} to={"/newlunk"}>Not having an account ?</Link>
                    </div>
                </div>

            )}
        </>
    )
    
}