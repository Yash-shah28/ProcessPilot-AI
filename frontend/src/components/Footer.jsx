import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-8">
        {/* Logo and Socials */}
        <div>
          <h2 className="text-2xl font-bold italic mb-2">ProcessPilot Ai</h2>
          <p className="text-sm mb-4 text-gray-200 leading-relaxed">
            Welcome to ProcessPilot AI, your intelligent partner in automating everyday business workflows. Born out of a vision to reduce repetitive tasks and let teams focus on what truly matters, ProcessPilot AI brings the power of automation and artificial intelligence into one seamless platform.
          </p>
          <div className="flex space-x-4 text-white text-xl">
            <FontAwesomeIcon icon={faFacebookF} className="hover:text-blue-400 cursor-pointer" />
            <FontAwesomeIcon icon={faInstagram} className="hover:text-red-400 cursor-pointer" />
            <FontAwesomeIcon icon={faTwitter}   className="hover:text-blue-400 cursor-pointer" />
          </div>
          {/* <div className="flex space-x-4 text-white text-xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div> */}
        </div>

        {/* Quick Links */}
        <div className="space-y-4 ml-32">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <Link to="/AboutUs" className="hover:text-white">About Us</Link>
            {/* <li>Our Collection</li>
            <li>Diamond Education</li>
            <li>Custom Design</li> */}
            <li  className="hover:text-white"><Link to="/Dashboard">Dashboard</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1 text-sm text-gray-300 hover:text-white">
            {/* <li>Shipping Policy</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
            <li>Care Instructions</li> */}
            <Link to="/guide">User Guide </Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 px-8">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1" />
              123 Fifth Avenue, New York, NY 10160
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              +1 (800) 123-4567
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              contact@example.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <p>© ProcessPilot Ai. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0 ">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



