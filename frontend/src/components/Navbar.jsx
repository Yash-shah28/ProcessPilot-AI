import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import logo from "../assets/logo2.png"
const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const { userAuth, logout } = useContext(UserContext)

    const handleLogout = async () => {
        await logout();
    }

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
                <div className="flex items-center space-x-3">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group transition-all duration-300 ease-in-out"
                    // className="text-2xl font-bold italic text-black hover:text-black-800 transition-colors duration-200"
                    >
                        <img src={logo} alt="" className="h-14 sm:h-16 md:h-20 w-auto object-contain bg-black rounded-lg shadow-md p-1 transform group-hover:scale-105 transition duration-300" />
                        <span className="text-xl sm:text-2xl font-bold italic text-black group-hover:text-black-600 transition-colors duration-300">ProcessPilot
                            <span className="text-xl sm:text-2xl not-italic font-bold">AI</span>
                        </span>

                    </Link>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="flex-1 flex justify-center">
                    <nav className="hidden md:flex space-x-6 font-medium text-gray-600">
                        <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
                        <Link to="/analytics" className="hover:text-black">Analytics</Link>
                        {/* <Link to="/settings" className="hover:text-black">Settings</Link> */}
                        <Link to="/aboutus" className="hover:text-black">About Us</Link>
                    </nav>
                </div>

                {/* Right Section: User Icon */}
                <div className="flex-none reltive mr-10" ref={dropdownRef}>
                    <button onClick={() => setShowDropdown(!showDropdown)} className="hover:text-black" title="Acccount">
                        <User className="w-5 h-5 text-gray-600 hover:text-blue-500" />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                            {userAuth.isAuthenticated && userAuth.user.name ?
                                <>
                                    <div className="block px-4 py-2 text-gray-700 border-b border-gray-200 text-sm">
                                        Hello, {userAuth.user.name}
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <div className="border-t border-gray-200"></div>
                                    <Link
                                        className="block px-4 py-2.5 text-gray-700 hover:bg-gray-200 transition-colors"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Link>
                                </>
                                :
                                <>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Login
                                    </Link>
                                    <div className="border-t border-gray-200"></div>
                                    <Link
                                        to="/signup"
                                        className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            }

                        </div>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Navbar;
