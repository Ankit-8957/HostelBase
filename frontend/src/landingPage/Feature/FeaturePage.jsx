import {
  ShieldCheck,
  Users,
  BedDouble,
  Wallet,
  QrCode,
  ClipboardList,
  Bell,
  FileWarning,
  Smartphone
} from "lucide-react";
import "./landingFeatures.css";
import Navbar from "../../Navbar";
import Footer from "../../footer";
export default function LandingFeatures() {
  const features = [
    {
      icon: <Users size={34} />,
      title: "Smart Student Management",
      desc: "Manage student profiles, documents, room allocations, and parents info seamlessly."
    },
    {
      icon: <BedDouble size={34} />,
      title: "Room & Bed Tracking",
      desc: "Track room availability, allocations and maintain a digital room inventory."
    },
    {
      icon: <Wallet size={34} />,
      title: "Online Rent Payments",
      desc: "Students can pay rent online and owners can track payment status instantly."
    },
    {
      icon: <QrCode size={34} />,
      title: "QR Entry Security",
      desc: "Smart QR-based entry/exit logging to maintain a secure hostel environment."
    },
    {
      icon: <ClipboardList size={34} />,
      title: "Digital Mess Timetable",
      desc: "Upload & update mess schedules that students can access anytime."
    },
    {
      icon: <Bell size={34} />,
      title: "Instant Notice Board",
      desc: "Send important announcements directly to student dashboards."
    },
    {
      icon: <FileWarning size={34} />,
      title: "Complaint Tracking System",
      desc: "Students can raise complaints and track status transparently."
    },
    {
      icon: <Smartphone size={34} />,
      title: "Fully Responsive UI",
      desc: "Every feature works on mobile, tablet, and desktop smoothly."
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Advanced Security",
      desc: "Security logs, guard monitoring, and student verification features included."
    },
  ];

  return (<>
  <Navbar/>
    <section className="landing-features">
      <h2 className="section-title">Powerful Features That Make HostelBase Stand Out</h2>
      <p className="section-subtitle">
        A complete digital solution for hostels & PGs to manage students, payments and security effortlessly.
      </p>

      <div className="feature-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="icon-box">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
  </>

  );
}
