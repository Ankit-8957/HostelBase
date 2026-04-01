import ReactDOM from "react-dom/client";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./Authentication/signupPage"
import LandingPage from "./landingPage";
import LoginPage from "./Authentication/loginPage"
import StudentDash from "./StudentDashBoard/StudentDash"
import StudentDashboard from "./StudentDashBoard/pages/dashBoard";
import StudentPayments from "./StudentDashBoard/pages/payment";
import StudentNotices from "./StudentDashBoard/pages/Notices";
import StudentComplaints from "./StudentDashBoard/pages/Complaints";
import StudentProfile from "./StudentDashBoard/pages/StudentProfile";
import OwnerDash from "./OwnerDashboard/OwnerDash";
import OwnerOverview from "./OwnerDashboard/pages/Overview";
import OwnerStudents from "./OwnerDashboard/pages/Students";
import OwnerPayment from "./OwnerDashboard/pages/OwnerPayment";
import OwnerRooms from "./OwnerDashboard/pages/OwnerRooms";
import OwnerComplaints from "./OwnerDashboard/pages/OwnerComplaints";
import OwnerNotices from "./OwnerDashboard/pages/OwnerNotices";
import OwnerProfile from "./OwnerDashboard/pages/OwnerProfile";
import LandingFeatures from "./landingPage/Feature/FeaturePage";
import Solutions from "./landingPage/Solution/Solutions";
import ContactPage from "./landingPage/Contact/ContactPage";
import AddRoom from "./OwnerDashboard/pages/AddRoom";
import AssignRoom from "./OwnerDashboard/pages/assignRoom";
import { Toaster } from "react-hot-toast";
import ProtectedRoomRoute from "./ProtectedRoomRoute";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/login" element={<LoginPage user="Student" />} />
        <Route path="/owner/login" element={<LoginPage user="Owner" />} />
        <Route path="/student/signup" element={<SignupPage user="Student" />} />
        <Route path="/owner/signup" element={<SignupPage user="Owner" />} />
        <Route path="/features" element={<LandingFeatures />} />
        <Route path="/solution" element={<Solutions />} />
        <Route path="/contact" element={<ContactPage />} />


        
        <Route path="/student/dashboard" element={<StudentDash><StudentDashboard /></StudentDash>} />
        <Route path="/student/dashboard/payments" element={<StudentDash><ProtectedRoomRoute><StudentPayments /></ProtectedRoomRoute></StudentDash>} />
        <Route path="/student/dashboard/notices" element={<StudentDash><ProtectedRoomRoute><StudentNotices /></ProtectedRoomRoute></StudentDash>} />
        <Route path="/student/dashboard/complaints" element={<StudentDash><ProtectedRoomRoute><StudentComplaints /></ProtectedRoomRoute></StudentDash>} />
        <Route path="/student/dashboard/profile" element={<StudentDash><StudentProfile /></StudentDash>} />

        <Route path="/owner/dashboard" element={<OwnerDash><OwnerOverview /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/students" element={<OwnerDash><OwnerStudents /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/payments" element={<OwnerDash><OwnerPayment /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/rooms" element={<OwnerDash><OwnerRooms /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/rooms/add-room" element={<OwnerDash><AddRoom /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/rooms/assign-room" element={<OwnerDash><AssignRoom /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/complaints" element={<OwnerDash><OwnerComplaints /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/notices" element={<OwnerDash><OwnerNotices /></OwnerDash>}></Route>
        <Route path="/owner/dashboard/profile" element={<OwnerDash><OwnerProfile /></OwnerDash>}></Route>


      </Routes>
    </BrowserRouter>
  </>

);
