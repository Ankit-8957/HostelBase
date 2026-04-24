// SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";
import api from "../axios.js"

const SignupPage = ({ user }) => {
    const navigate = useNavigate();
    // student + owner fields
    const [formData, setFormData] = useState({
        // common
        email: "",
        password: "",
        phone: "",

        // owner fields
        ownerName: "",
        hostelName: "",

        // student fields
        name: "",
        hostelId: "",
        course: "",
        year: "",
        admissionDate: "",
        father: "",
        parentPhone: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user === "Owner") {
                const res = await api.post("/owner/signup", {
                    ownerName: formData.ownerName,
                    hostelName: formData.hostelName,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password
                });

                console.log(res.data);
                alert(res.data.message + " | Hostel ID: " + res.data.hostelId);
                if(res.data.success == true){
                    navigate("/owner/dashboard");
                }else{
                    navigate("/owner/signup");
                }
                
            }

            if (user === "Student") {
                const res = await api.post("/student/signup", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    course: formData.course,
                    year: formData.year,
                    hostelId: formData.hostelId,
                    room: formData.room,
                    admissionDate: formData.admissionDate,
                    father: formData.father,
                    parentPhone: formData.parentPhone
                });

                console.log(res.data);
                alert(res.data.message);
                if(res.data.success == true){
                    navigate("/student/dashboard");
                }else{
                    navigate("/student/signup");
                }
                
            }

        } catch (err) {
            console.log(err);
            alert("Signup Failed");
            if(user === "Student"){
                navigate("/student/signup");
            }
            if(user === "Owner"){
                navigate("/owner/signup");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2>{user} Signup</h2>

                <form onSubmit={handleSubmit}>

                    {/* OWNER SIGNUP FIELDS */}
                    {user === "Owner" && (
                        <>
                            <label>Owner Name</label>
                            <input
                                type="text"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                required
                                placeholder="Enter owner name"
                            />

                            <label>Hostel Name</label>
                            <input
                                type="text"
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handleChange}
                                required
                                placeholder="Enter hostel name"
                            />

                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone number"
                            />
                        </>
                    )}

                    {/* STUDENT SIGNUP FIELDS */}
                    {user === "Student" && (
                        <>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />

                            <label>Hostel Unique ID</label>
                            <input
                                type="text"
                                name="hostelId"
                                value={formData.hostelId}
                                onChange={handleChange}
                                required
                                placeholder="Enter hostel unique ID"
                            />

                            <label>Phone</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone number"
                            />

                            <label>Course</label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}                                
                                required
                            >
                                <option value="">Select course</option>
                                <option value="BCA">BCA</option>
                                <option value="BSc">BSc</option>
                                <option value="BTech">BTech</option>
                                <option value="MCA">MCA</option>
                            </select>

                            <label>Year</label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select year</option>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>

    

                            <label>Admission Date</label>
                            <input
                                type="date"
                                name="admissionDate"
                                value={formData.admissionDate}
                                onChange={handleChange}
                                required
                            />

                            <label>Father Name</label>
                            <input
                                type="text"
                                name="father"
                                value={formData.father}
                                onChange={handleChange}
                                required
                                placeholder="Enter father's name"
                            />

                            <label>Parent Phone</label>
                            <input
                                type="number"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                required
                                placeholder="Enter parent phone"
                            />
                        </>
                    )}

                    {/* COMMON FIELDS */}
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                    />

                    <button type="submit">Sign Up</button>
                </form>

                <p>
                    Already have account?{" "}
                    <Link to="/login" className="link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
