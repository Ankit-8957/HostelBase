import "./solutions.css";
import {
  Users,
  Bell,
  Wallet,
  ClipboardList,
  KeyRound,
  Building2,
} from "lucide-react";
import Navbar from "../../Navbar";
import Footer from "../../footer";
export default function Solutions() {
  return (<>
  <Navbar/>
    <div className="solutions-container">

      {/* ===== Header ===== */}
      <section className="solutions-hero">
        <h1>Smart Solutions for Modern Hostel Management</h1>
        <p>
          HostelBase simplifies your entire hostel or PG workflow — from payments
          to attendance to room allocation — all in one powerful dashboard.
        </p>
      </section>

      {/* ===== Solutions Grid ===== */}
      <section className="solutions-grid">

        <div className="solution-card">
          <Users size={42} />
          <h3>Student Management</h3>
          <p>
            Add, edit, and track student details, parent info, room assignments
            and payment history in seconds.
          </p>
        </div>

        <div className="solution-card">
          <Wallet size={42} />
          <h3>Rent & Payment Tracking</h3>
          <p>
            View paid & pending rents, generate payment reports, and allow online
            payments directly from the student’s dashboard.
          </p>
        </div>

        <div className="solution-card">
          <ClipboardList size={42} />
          <h3>Complaints & Support System</h3>
          <p>
            Students can submit complaints, and owners can resolve them with real-time status updates.
          </p>
        </div>

        <div className="solution-card">
          <Bell size={42} />
          <h3>Notices & Announcements</h3>
          <p>
            Send instant hostel-wide notices that appear inside every student’s dashboard.
          </p>
        </div>

        <div className="solution-card">
          <KeyRound size={42} />
          <h3>Smart Entry System (QR)</h3>
          <p>
            Track student entry/exit using a secure QR code system managed by the hostel security team.
          </p>
        </div>

        <div className="solution-card">
          <Building2 size={42} />
          <h3>Room Management</h3>
          <p>
            Allocate, modify and manage room occupancy with complete transparency.
          </p>
        </div>

      </section>

      {/* ===== CTA Section ===== */}
      <section className="solutions-cta">
        <h2>Start Managing Your Hostel Smarter</h2>
        <p>
          Digitize your hostel operations and let HostelBase handle the hard work for you.
        </p>
        <button className="cta-btn">Get Started</button>
      </section>
    </div>
    <Footer/>
    </>
  );
}
