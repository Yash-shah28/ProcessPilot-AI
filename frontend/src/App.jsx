/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";


import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Inputs from "./pages/Inputs";
import Guide from "./pages/Guide";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import UserProfile from "./pages/UserProfile";
import Anyalytics from "./pages/Anyalytics";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Workflows from "./pages/admin/Workflows";
import GoogleGroups from "./pages/admin/GoogleGroups";




// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { userAuth } = useContext(UserContext);

	if (!userAuth.isAuthenticated) {
		return <Navigate to='/login' replace />;
	}


	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { userAuth } = useContext(UserContext);

	if (userAuth.isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { userAuth, checkAuth } = useContext(UserContext);

	useEffect(() => {
		checkAuth();
	}, []);

	if (userAuth.isCheckingAuth) return <LoadingSpinner />;

	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/aboutus'
					element={
						<ProtectedRoute>
							<AboutUs />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/inputs'
					element={
						<ProtectedRoute>
							<Inputs />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/guide'
					element={
						<ProtectedRoute>
							<Guide />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/userprofile'
					element={
						<ProtectedRoute>
							<UserProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/analytics'
					element={
						<ProtectedRoute>
							<Anyalytics />
						</ProtectedRoute>
					}
				/>
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="users" element={<Users />} />
					<Route path="workflows" element={<Workflows />} />
					<Route path="GoogleGroup" element={<GoogleGroups />} />
				</Route>

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
