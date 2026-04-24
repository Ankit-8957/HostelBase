import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios.js";


const LoginPage = ({ user }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      let redirectPath = "";

      if (user === "Owner") {
        url = "/owner/login";
        redirectPath = "/owner/dashboard";
      } else if (user === "Student") {
        url = "/student/login";
        redirectPath = "/student/dashboard";
      }

      const res = await api.post(url, formData, { withCredentials: true });
      // const authCheck = await axios.get(
      //   "http://localhost:8080/debug-auth",
      //   { withCredentials: true }
      // );

      // console.log("DEBUG AUTH 👉", authCheck.data);


      alert(res.data.message);
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login for {user}</h2>
        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
