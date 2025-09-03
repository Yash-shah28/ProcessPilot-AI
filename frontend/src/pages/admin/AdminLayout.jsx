import { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, LayoutDashboard, Users, Workflow, Globe, Search, User2,UserRoundCheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { UserContext } from "../../Context/UserContext";
import Footer from "../../components/Footer";
import logo from "../../assets/logo2.png";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header / Top Navbar */}
      <header className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        {/* Left: Search bar */}
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 group transition-all duration-300 ease-in-out"
          >
            <img src={logo} alt="" className="h-14 sm:h-16 md:h-20 w-auto object-contain bg-black rounded-lg shadow-md p-1 transform group-hover:scale-105 transition duration-300" />
            <span className="text-xl sm:text-2xl font-bold italic text-black group-hover:text-black-600 transition-colors duration-300">ProcessPilot
              <span className="text-xl sm:text-2xl not-italic font-bold">AI</span>
            </span>

          </Link>
        </div>
        {/* Center: Search Input */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search users, workflows..."
              className="w-full sm:text-base border border-gray-200 rounded-full text-base pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {/* Search Icon inside input on right */}
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Add User */}
          {/* <Button size="sm" className="flex items-center gap-2">
            <Plus size={16} /> Add User
          </Button> */}
          <div className="flex-none reltive mr-10" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)} className="hover:text-black" title="Acccount">
              <User2 className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                {userAuth.isAuthenticated && userAuth.user.name ?
                  <>
                    <div className="block px-4 py-2 text-gray-700 border-b border-gray-200 text-sm">
                      Hello, {userAuth.user.name}
                    </div>
                    <Link
                      to="AdminProfile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>
                  </>
                  :
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      Login
                    </Link>
                    <div className="border-t border-gray-200"></div>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
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

      {/* Main content area (Sidebar + Page content) */}
      <div className="flex flex-1 mt-2">
        {/* Sidebar */}
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`${isOpen ? "w-64" : "w-16"
            } bg-gray-100 text-gray-800 border-r border-gray-300 flex flex-col transition-all duration-300`}
        >
          <div className="p-4 text-xl font-bold border-b border-gray-300 flex items-center justify-center">
            {isOpen ? "Admin Panel" : <Menu size={24} />}
          </div>

          <nav className="flex-1 p-2 space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <LayoutDashboard className="mr-2" size={20} />
              {isOpen && "Dashboard"}
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <Users className="mr-2" size={20} />
              {isOpen && "Users"}
            </Link>

            <Link
              to="/admin/workflows"
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <Workflow className="mr-2" size={20} />
              {isOpen && "Workflows"}
            </Link>

            <Link
              to="/admin/GoogleGroup"
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <Globe className="mr-2" size={20} />
              {isOpen && "Google Group"}
            </Link>
            <Link
              to="/admin/AdminProfile"
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <UserRoundCheckIcon className="mr-2" size={20} />
              {isOpen && "Admin Profile"}
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-white border-t border-gray-300">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
