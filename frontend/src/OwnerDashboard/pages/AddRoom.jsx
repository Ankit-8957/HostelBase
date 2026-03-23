import { useState, useEffect } from "react";
import "../../css/AddRoom.css";
import api from "../../axios.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddRoom = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    roomNo: "",
    capacity: "",
    students: [],
  });

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/getStudents");
        setStudents(res.data.students || res.data); // ✅ safe
      } catch (err) {
        console.log("Fetch error:", err);
        toast.error("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle student selection with capacity check
  const handleStudentSelect = (id, checked) => {
    let updated = [...formData.students];

    if (checked) {
      if (updated.length >= Number(formData.capacity)) {
        toast.error("Cannot select more than capacity");
        return;
      }
      updated.push(id);
    } else {
      updated = updated.filter((stu) => stu !== id);
    }

    setFormData({ ...formData, students: updated });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        capacity: Number(formData.capacity), // ✅ FIX
      };

      console.log("Sending:", payload); // DEBUG

      await api.post("/addRoom", payload);

      toast.success("Room added successfully!");
      navigate("/owner/dashboard/rooms");

      setFormData({
        roomNo: "",
        capacity: "",
        students: [],
      });

    } catch (err) {
  console.log("ERROR:", err.response?.data);

  toast.error(
    err.response?.data?.message ||   // ✅ FIX HERE
    err.response?.data?.error ||
    "Failed to add room"
  );
}
  };

  return (
    <div className="addroom-wrapper">
      <div className="form-card">
        <h2>Add New Room</h2>
        <p className="subtitle">
          Enter room details and assign students
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* ROOM NO */}
          <div className="form-group">
            <label>Room Number</label>
            <input
              type="text"
              name="roomNo"
              placeholder="Ex: A-101"
              value={formData.roomNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* CAPACITY */}
          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Ex: 2"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          {/* STUDENTS */}
          <div className="form-group">
            <label>Select Students</label>

            <div className="students-checkbox-list">
              {students?.map((stu) => (
                <label key={stu._id} className="student-option">
                  <input
                    type="checkbox"
                    checked={formData.students.includes(stu._id)}
                    onChange={(e) =>
                      handleStudentSelect(stu._id, e.target.checked)
                    }
                  />
                  {stu.name}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;