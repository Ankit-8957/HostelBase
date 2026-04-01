import { useState, useEffect } from "react";
import "../../css/ownerRooms.css";
import { BedDouble, Users, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../axios.js";
import toast from "react-hot-toast";

const OwnerRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRooms = () => {
    navigate("/owner/dashboard/rooms/add-room");
  };
  const handleAssignRooms = () => {
    navigate("/owner/dashboard/rooms/assign-room");
  };

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await api.get("/rooms");
       
        // ✅ important fix (based on backend response)
        setRooms(res.data || []);

      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to load rooms"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="rooms-container">
      
      <div className="header-row">
        <h1>🏨 Hostel Rooms</h1>
        <button className="add-btn" onClick={handleRooms}>
          <Plus size={18} /> Add Room
        </button>
        <button className="add-btn" onClick={handleAssignRooms}>
          <Plus size={18} /> Assign Room
        </button>
      </div>

      {/* ✅ Loading */}
      {loading && <p className="loading">Loading rooms...</p>}

      {/* ✅ Empty state */}
      {!loading && rooms.length === 0 && (
        <p className="empty">No rooms found</p>
      )}

      <div className="rooms-grid">
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`room-card ${room.status?.toLowerCase()}`}
            onClick={() => setSelectedRoom(room)}
          >
            <div className="top-row">
              <h2>{room.roomNo}</h2>
              <BedDouble size={30} />
            </div>

            <div className="details">
              <p><Users size={18} /> Capacity: {room.capacity}</p>
              <p>Occupied: {room.occupied}</p>
            </div>

            <div className={`status-tag ${room.status?.toLowerCase()}`}>
              {room.status}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Room {selectedRoom.roomNo}</h2>
            <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
            <p><strong>Occupied:</strong> {selectedRoom.occupied}</p>

            <h3>Students Living Here:</h3>

            {selectedRoom.students?.length > 0 ? (
              <ul>
                {selectedRoom.students.map((stu) => (
                  <li key={stu._id}>{stu.name}</li> // ✅ fix key
                ))}
              </ul>
            ) : (
              <p>No students in this room.</p>
            )}

            <button
              className="close-btn"
              onClick={() => setSelectedRoom(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerRooms;