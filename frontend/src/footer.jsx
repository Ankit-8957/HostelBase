import "./css/footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import HouseIcon from '@mui/icons-material/House';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
         <h2><HouseIcon className="icon" /> HostelBase</h2>
  
          <p>Ready to simplify your hostel management?</p>
        </div>

        <div className="footer-links">
          <ul>
            <li><strong>Product</strong></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="#">Pricing</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <ul>
            <li><strong>Company</strong></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>

          <ul>
            <li><strong>Support</strong></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HostelBase. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#"><FacebookIcon /></a>
          <a href="#"><XIcon /></a>
          <a href="#"><LinkedInIcon /></a>
          <a href="#"><InstagramIcon /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
