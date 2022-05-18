import React , { useEffect, useState } from "react";
import '../components/staffRegister.component.css'
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretToken = process.env.React_App_TOKEN_SECRET

export default function StudentRegister(params) {
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [studentName, setStudentName ] = useState("");
    const [studentEnrollNo, setStudentEnrollNo] = useState(Number);
    const [studentGender, setStudentGender] = useState("Male");
    const [studentDateOfBirth, setStudentDateOfBirth] = useState(Date);
    const [studentCourse, setStudentCourse] = useState('');
    const [studentAddress, setStudentAddress] = useState("");
    const [studentMobileNo, setStudentMobileNo] = useState(Number(1234567890))
    const [myStatus, setMyStatus] = useState("Waiting for request");

    const [course, setCourse] = useState([]);

    const Courses = props => (
        <option value={props.course.name}>{props.course.name}</option>
    )
        
    // Fetch all courses from database. 
    useEffect(() => {
        fetch('http://localhost:5000/course/getAll')
            .then(res => res.json())
            .then(res => {
                setCourse(res)
            })
            .catch((err) => {
                console.log(err);
            })
        
        
    },[])
    function courseList() {
        return course.map(currCourse => {
            return <Courses course={currCourse}/>;
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check for specific format of user email.
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(studentEmail.match(mailformat)) {
            fetch('http://localhost:5000/student/getOne',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email : studentEmail})
            })
                .then((data) => data = data.json())
                .then((data) => {
                    if(data.length !== 0) {
                        setMyStatus('Email ID already exist !!')
                    }
                    else {
                        const student = {
                            email : studentEmail,
                            password: studentPassword,
                            name: studentName,
                            enrollNo: studentEnrollNo,
                            gender: studentGender,
                            dateOfBirth: studentDateOfBirth,
                            course: studentCourse,
                            address: studentAddress,
                            mobileNo: studentMobileNo,
                            accessToken: ""
                        }
                
                        const accessToken = jwt.sign(
                            {"email": studentEmail},
                            secretToken,
                            { expiresIn: '1d' }
                        );
                
                        student.accessToken = accessToken;
                
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(student)
                        };
                        fetch('http://localhost:5000/student/add', requestOptions)
                            .then((res) => {
                                setMyStatus("Success")
                                setStudentEmail('')
                                setStudentName('')
                                setStudentPassword('')
                                setStudentEnrollNo(Number)
                                setStudentDateOfBirth(Date)
                                setStudentAddress('')
                                setStudentMobileNo(Number(0))
                            } )
                            .catch((err) => setMyStatus("ERROR")+err);
                
                        requestOptions.body = JSON.stringify({email: studentEmail, subject: studentCourse, score: -1})
                        
                        fetch('http://localhost:5000/score/add',requestOptions)
                            .then((res) => console.log("Subject Added."))
                            .catch((err) => console.log("Error in subject adding."))
                    }
                })

        }
        else {
            setMyStatus('Email Format not valid.')
        }
        
    }

    return (
        <section id="register-page">
        <div className="register_form">
            <div style={{fontFamily: "Grape Nuts",fontSize:"2.5vw",textAlign:"center",fontWeight:"bold"}}>Customer Login</div>
            <form style={{textAlign: "center", padding: "20px"}} method="post" onSubmit = { handleSubmit }>
                <label className="register_form_label">
                    Email:
                    <input required type="text" value={studentEmail} placeholder="Shivam@gmail.com"
                        onChange={(e) => setStudentEmail(e.target.value)} 
                    />
                </label><br/>
                {/* <label className="register_form_label">
                    Name:
                    <input required type="text" value={studentName} placeholder="Shivam"
                        onChange={(e) => setStudentName(e.target.value)} 
                    />
                </label><br/> */}
                <label className="register_form_label">
                    Password:
                    <input required type="password" value={studentPassword} placeholder="*****"
                        onChange={(e) => setStudentPassword(e.target.value)} 
                    />
                </label><br/>
                {/* <label className="register_form_label">
                    PAN Number:
                    <input required type="text" value={studentEnrollNo} placeholder="12345"
                        onChange={(e) => setStudentEnrollNo(e.target.value)} 
                    />
                </label><br/>
                <label className="register_form_label">
                    Gender:
                    <select value={studentGender }
                    onChange={(e) => setStudentGender(e.target.value)}
                    >
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label><br/>
                <label className="register_form_label">
                    Date Of Birth:
                    <input required type="date" value={studentDateOfBirth}
                        onChange={(e) => setStudentDateOfBirth(e.target.value)} 
                    />
                </label><br/> */}
                {/* <label className="register_form_label">
                    License Number:
                    <select value={studentCourse} 
                    onChange={(e) => setStudentCourse(e.target.value)}
                    >
                        <option value="Select" selected>Select</option>
                        { courseList() }
                    </select>
                </label><br/> */}
                {/* <label className="register_form_label">
                    Address:
                    <input required type="text" value={studentAddress} placeholder="Dwarka, New Delhi"
                        onChange={(e) => setStudentAddress(e.target.value)} 
                    />
                </label><br/>
                <label className="register_form_label">
                    Mobile No:
                    <input required type="text" value={studentMobileNo} placeholder="12345"
                        onChange={(e) => setStudentMobileNo(e.target.value)} 
                    />
                </label> */}
               
            {/* <label>Request Status : {myStatus}</label><br/> */}
                <button className="black-button" type="submit">Login</button>
            </form>
        </div>
        <br/>
        </section>
    )
}