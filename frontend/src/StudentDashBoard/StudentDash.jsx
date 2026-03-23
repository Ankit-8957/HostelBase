// DashboardHome.jsx
import Sidebar from "./components/sideBar";
import "../css/StudentDashboard.css";
const StudentDash = ({children}) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        {children}        
      </div>
    </div>
  );
};

export default StudentDash;
