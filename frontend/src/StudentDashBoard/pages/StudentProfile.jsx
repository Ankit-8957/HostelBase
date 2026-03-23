import { useState, useEffect } from "react";
import { Edit2, Save, User, Home, LogOut } from "lucide-react";
import "../../css/StudentProfile.css";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

export default function StudentProfile() {
    const [tab, setTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);

    const [data, setData] = useState({});
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get("/student/info");

            const data = response.data;

            setData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                course: data.course,
                year: data.year,
                hostelId: data.hostelId,
                room: data.room,
                admissionDate: data.admissionDate
            });

        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
}, []);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const saveData = async() => {
        try {
            await api.put("/student/updateInfo",{
                name: data.name,
                email: data.email,
                phone: data.phone,
                course: data.course,
                year: data.year,
                room: data.room,
                admissionDate: data.admissionDate
            });
            setIsEditing(false);
            alert("Profile Updated Successfully!");
        } catch (err) {
            console.error("Update failed", err);
        }
       
    };


    return (
        <div className="profile-wrapper">



            {/* ===== Top Banner ===== */}
            <div className="profile-banner"></div>

            {/* ===== Avatar ===== */}
            <div className="profile-avatar">
                {data.name ? data.name.charAt(0) : "?"}
            </div>

            {/* ===== Name & Basic Info ===== */}
            <div className="profile-header">
                <h2>{data.name}</h2>
                <p>Student • HostelBase</p>
            </div>

            {/* ===== Tabs ===== */}
            <div className="profile-tabs">
                <button
                    className={tab === "personal" ? "active" : ""}
                    onClick={() => setTab("personal")}
                >
                    <User size={18} /> Personal Info
                </button>

                <button
                    className={tab === "hostel" ? "active" : ""}
                    onClick={() => setTab("hostel")}
                >
                    <Home size={18} /> Hostel Info
                </button>
            </div>

            {/* ===== Content Cards ===== */}
            <div className="profile-card">

                {tab === "personal" && (
                    <div className="card-content">

                        <div className="form-row">
                            <label>Name</label>
                            <input disabled={!isEditing} name="name" value={data.name} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Email</label>
                            <input disabled={!isEditing} name="email" value={data.email} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Phone</label>
                            <input disabled={!isEditing} name="phone" value={data.phone} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Course</label>
                            <input disabled={!isEditing} name="course" value={data.course} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Year</label>
                            <input disabled={!isEditing} name="year" value={data.year} onChange={handleChange} />
                        </div>

                    </div>
                )}

                {tab === "hostel" && (
                    <div className="card-content">

                        <div className="form-row">
                            <label>Hostel ID</label>
                            <input disabled={true} value={data.hostelId} />
                        </div>

                        <div className="form-row">
                            <label>Room Number</label>
                            <input disabled={!isEditing} name="room" value={data.room} onChange={handleChange} />
                        </div>

                        <div className="form-row">
                            <label>Admission Date</label>
                            <input disabled={true} value={data.admissionDate} />
                        </div>

                    </div>
                )}
            </div>

            {/* ===== Buttons ===== */}
            {tab === "personal" && <div className="profile-actions">
                {!isEditing ? (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        <Edit2 size={18} /> Edit Profile
                    </button>
                ) : (
                    <button className="save-btn" onClick={saveData}>
                        <Save size={18} /> Save Changes
                    </button>
                )}
            </div>}

        </div>
    );
}
