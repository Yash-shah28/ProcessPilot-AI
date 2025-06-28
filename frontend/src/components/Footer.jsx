import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Socials */}
        <div>
          <h2 className="text-2xl font-bold italic mb-2">ProcessPilot Ai</h2>
          <p className="text-sm mb-4 text-gray-300">
            Experience the extraordinary beauty of untouched diamonds, each telling its own unique story.
          </p>
          <div className="flex space-x-4 text-white text-xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>About Us</li>
            {/* <li>Our Collection</li>
            <li>Diamond Education</li>
            <li>Custom Design</li> */}
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {/* <li>Shipping Policy</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
            <li>Care Instructions</li> */}
            <li>FAQ</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
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
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
