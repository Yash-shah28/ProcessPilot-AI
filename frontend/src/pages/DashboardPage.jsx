import { formatDate } from "../utils/date";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Footer from "../components/Footer";

const DashboardPage = () => {
    const { userAuth, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="bg-white min-h-screen">
            <main className="pt-25 flex-grow flex items-center justify-center bg-gray-100">
                <div className="pt-25 flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-2xl font-semibold text-center mb-4">
                            Welcome to ProcessPilot AI
                        </h2>

                        <div className="space-y-6 p-4 bg-black-800 bg-opacity-50 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-semibold text-black-400 mb-3">
                                Profile Information
                            </h3>
                            <p className="text-black-500">Name: {userAuth.user.name}</p>
                            <p className="text-black-500">Email: {userAuth.user.email}</p>
                        </div>
                        <div className="space-y-6 p-4 mt-4 bg-black-800 bg-opacity-50 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-semibold text-black-400 mb-3">
                                Account Activity
                            </h3>
                            <p className="text-black-500">
                                <span>Joined: </span>
                                {new Date(userAuth.user.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p className="text-black-500">
                                <span>Last Login: </span>
                                {formatDate(userAuth.user.lastLogin)}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full bg-black text-white py-2 mt-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            Logout
                        </button>

                        {/* Moved this inside the card */}
                        <div className="text-center mt-4">
                            <p className="text-black-500">Thank you for using ProcessPilot AI!</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
