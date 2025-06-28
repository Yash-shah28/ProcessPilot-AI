import { Link } from "react-router-dom";
import { User } from "lucide-react";
import{useState, useEffect, useRef} from "react";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
    return (
        <header className="bg-white shadow-md">
            <div className="w-full py-4 flex items-center justify-between px-4">

                {/* Left Section: App Name */}
                <div className="flex-none">
                    <Link
                        to="/"
                        className="text-2xl font-bold italic text-black hover:text-black-800 transition-colors duration-200"
                    >
                        <img src="/logo.png" alt="" className="h-8 w-8 mr-2 inline" />
                        <span className="text-2xl font-italic">ProcessPilot AI</span>

                    </Link>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="flex-1 flex justify-center">
                    <nav className="hidden md:flex space-x-6 font-medium text-gray-600">
                        <Link to="/contactus" className="hover:text-black">Contact Us</Link>
                        <Link to="/aboutus" className="hover:text-black">About Us</Link>
                    </nav>
                </div>

                {/* Right Section: User Icon */}
                <div className="flex-none reltive mr-12" ref={dropdownRef}>
                    <button onClick={() => setShowDropdown(!showDropdown)} className="hover:text-black" title="Acdcount">
                         <User className="w-5 h-5 text-gray-600" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                            <Link
                                to="/login"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowDropdown(false)}
                                >
                                    Login
                                </Link>
                                <div className="border-t border-gray-200"></div>
                                <Link
                                to="/signup"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowDropdown(false)}
                                >
                                    Sign Up
                                </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
