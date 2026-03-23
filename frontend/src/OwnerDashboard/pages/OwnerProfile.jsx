import { useState, useEffect } from "react";
import "../../css/ownerProfile.css";
import api from "../../axios.js";

const OwnerProfile = () => {
  const [edit, setEdit] = useState(false);


  const [profile, setProfile] = useState({});



  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    try {
      await api.put("/updateOwner", {
        ownerName: profile.name,
        email: profile.email,
        phone: profile.phone,
        hostelName: profile.hostel,
      });

      setEdit(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/myInfo");
        const data = response.data;

        setProfile({
          name: data.ownerName || "",
          email: data.email || "",
          phone: data.phone || "",
          hostel: data.hostelName || "",
          hostelId: data.hostelId || "",
        });

      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="profile-wrapper">

      {/* FLOATING PHOTO CARD */}
      <div className="profile-banner">
        <div className="profile-avatar">
          {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>


      {/* MAIN CARD */}
      <div className="profile-card">

        <h2 className="profile-heading">Owner Information</h2>

        <div className="input-grid">
          <label>
            Full Name
            <input
              disabled={!edit}
              name="name"
              value={profile.name || ""}
              onChange={onChange}
            />
          </label>

          <label>
            Email Address
            <input
              disabled={!edit}
              name="email"
              value={profile.email || ""}
              onChange={onChange}
            />
          </label>

          <label>
            Phone Number
            <input
              disabled={!edit}
              name="phone"
              value={profile.phone || ""}
              onChange={onChange}
            />
          </label>

          <label>
            Hostel Name
            <input
              disabled={!edit}
              name="hostel"
              value={profile.hostel || ""}
              onChange={onChange}
            />
          </label>

        </div>

        {/* BUTTONS */}
        <div className="profile-btns">
          {!edit ? (
            <button className="edit-btn" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
