import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./axios";

const ProtectedRoomRoute = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/student/info");
        setStudent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }


  if (!student?.room) {
    return <Navigate to="/student/dashboard" replace />;
  }

  
  return children;
};

export default ProtectedRoomRoute;