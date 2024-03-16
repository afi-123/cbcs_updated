import React, { useEffect, useState } from 'react';
import './StudentInfo.css'; // Import CSS file
import logo from './logo.jpg'; // Import logo image

const StudentInfo = ({ user }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/cbcs/course/${user.user_id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            if (!response.ok) {
                console.log("Error in response");
            }
            if (response.ok) {
                setData(json);
            }
        }
        fetchData();
    }, [user.user_id, user.token]);

    return (
        <>
            <div className="main-container">
                <nav className="navbar">
                    <img src={logo} alt="Logo" className="logo" />
                    <ul className="menu">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="https://sathyabama.cognibot.in/">Lms</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </nav>
                <div className="student-container">
                    {data.map((value, index) => (
                        <div className="student-details" key={index}>
                            <img src={value.profilePic} alt="Student Profile" className="profile-pic" />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{value.Name}</td>
                                    </tr>
                                    <tr>
                                        <td>Register Number:</td>
                                        <td>{value.RegNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Roll Number:</td>
                                        <td>{value.RollNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender:</td>
                                        <td>{value.Gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth:</td>
                                        <td>{value.DOB}</td>
                                    </tr>
                                    <tr>
                                        <td>Department:</td>
                                        <td>{value.Dept}</td>
                                    </tr>
                                    <tr>
                                        <td>Course:</td>
                                        <td>{value.CourseInfo.CourseName}</td>
                                    </tr>
                                    <tr>
                                        <td>Marks:</td>
                                        <td><a href="#">{value.Marks}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
            <nav className="bottom-navbar">
                <ul className="menu">
                    <li>&copy; @sathyabama university. All rights reserved.</li>
                </ul>
            </nav>
        </>
    );
}

export default StudentInfo;
