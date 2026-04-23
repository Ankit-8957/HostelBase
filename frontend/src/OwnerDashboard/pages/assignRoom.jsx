import { useEffect, useState } from "react";
import api from "../../axios";
import "../../css/assignRoom.css";
import toast from "react-hot-toast";

export default function AssignRoom() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/getStudents");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students ❌");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load rooms ❌");
    }
  };

  // Toggle select
  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleAssign = async () => {
    if (selectedStudents.length === 0 || !selectedRoom) {
      toast.error("Select students and room ❌");
      return;
    }

    const room = rooms.find((r) => r._id === selectedRoom);

    // Capacity check
    if (
      selectedStudents.length + (room?.students?.length || 0) >
      room.capacity
    ) {
      toast.error("Room capacity exceeded ❌");
      return;
    }

    try {
      await api.post("/assignRoom", {
        studentIds: selectedStudents,
        roomId: selectedRoom,
      });

      toast.success("Room assigned successfully ✅");

      // refresh UI
      fetchRooms();
      setSelectedStudents([]);
      setSelectedRoom("");
    } catch (err) {
      console.error(err);
      toast.error("Error assigning room ❌");
    }
  };

  return (
    <div className="app">
      <div className="main">
        <h1 className="header">🏠 Assign Room</h1>

        <div className="grid">
          {/* Students */}
          <div className="section">
            <h3>Students</h3>
            {students.map((s) => (
              <div
                key={s._id}
                className={`card ${
                  selectedStudents.includes(s._id) ? "active" : ""
                }`}
                onClick={() => toggleStudent(s._id)}
              >
                👨‍🎓 {s.name}
              </div>
            ))}
          </div>

          {/* Rooms */}
          <div className="section">
            <h3>Rooms</h3>
            {rooms.map((r) => {
              const isFull = (r.students?.length || 0) >= r.capacity;

              return (
                <div
                  key={r._id}
                  className={`card 
                    ${selectedRoom === r._id ? "active" : ""} 
                    ${isFull ? "disabled" : ""}
                  `}
                  onClick={() => {
                    if (!isFull) setSelectedRoom(r._id);
                  }}
                >
                  🏠 Room {r.roomNo}
                  <p>
                    {r.students?.length || 0} / {r.capacity} occupied
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <button className="assign-btn" onClick={handleAssign}>
          Assign Room 🚀
        </button>
      </div>
    </div>
  );
}