/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";

import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

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
							<DashboardPage />
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
							<AboutUs />
					}
				/>


				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
