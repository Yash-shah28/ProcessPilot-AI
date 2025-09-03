
import axios from "axios";
import { createContext, useState } from "react";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

	const [userAuth, setUserAuth] = useState({
		user: null,
		isAuthenticated: false,
		error: null,
		isLoading: false,
		isCheckingAuth: true,
		message: null,
	})


	const signup = async (email, password, name) => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.post(`${API_URL}/signup`, { email, password, name });
			setUserAuth(prev => ({...prev, user: response.data.user, isAuthenticated: true, isLoading: false }));
		} catch (error) {
			setUserAuth(prev => ({...prev, error: error.response.data.message || "Error signing up", isLoading: false }));
			throw error;
		}
	};

	const login = async (email, password) => {
		console.log(email,password)
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			setUserAuth(prev =>({
				...prev,
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			}));
		} catch (error) {
			setUserAuth(prev =>({ ...prev, error: error.response?.data?.message || "Error logging in", isLoading: false }));
			throw error;
		}
	};

	const logout = async () => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			await axios.post(`${API_URL}/logout`);
			setUserAuth(prev => ({...prev, user: null, isAuthenticated: false, error: null, isLoading: false }));
		} catch (error) {
			setUserAuth(prev =>({ ...prev, error: "Error logging out", isLoading: false }));
			throw error;
		}
	};
	const verifyEmail = async (code) => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			setUserAuth(prev =>({ ...prev, user: response.data.user, isAuthenticated: true, isLoading: false }));
			return response.data;
		} catch (error) {
			setUserAuth(prev => ({...prev, error: error.response.data.message || "Error verifying email", isLoading: false }));
			throw error;
		}
	};
	const checkAuth = async () => {
		setUserAuth(prev => ({ ...prev, isCheckingAuth: true, error: null }));
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			setUserAuth(prev =>({...prev, user: response.data.user, isAuthenticated: true, isCheckingAuth: false }));
		} catch (error) {
			setUserAuth(prev  =>({...prev, error: null, isCheckingAuth: false, isAuthenticated: false }));
		}
	};
	const forgotPassword = async (email) => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			setUserAuth(prev => ({...prev, message: response.data.message, isLoading: false }));
		} catch (error) {
			setUserAuth(prev =>({
				...prev,
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			}));
			throw error;
		}
	};
	const resetPassword = async (token, password) => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			setUserAuth(prev => ({...prev, message: response.data.message, isLoading: false }));
		} catch (error) {
			setUserAuth(prev => ({
				...prev,
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			}));
			throw error;
		}
	};

	const getProfile = async () => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.get(`${API_URL}/profile`);
			setUserAuth(prev => ({...prev, user: response.data.profile,  isLoading: false }));
		} catch (error) {
			setUserAuth(prev => ({...prev, error: error.response.data.message || "Error fecting user", isLoading: false }));
			throw error;
		}
	};

	const updateProfile = async (email, name) => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.put(`${API_URL}/profile`, { email, name });
			setUserAuth(prev => ({...prev, user: response.data.profile, isLoading: false }));
		} catch (error) {
			setUserAuth(prev => ({...prev, error: error.response.data.message || "Error ", isLoading: false }));
			throw error;
		}
	};

	const googlelogin = async() => {
		setUserAuth(prev => ({ ...prev, isLoading: true, error: null }));
		try {
			const response = await axios.get(`${API_URL}/google`);
			setUserAuth(prev =>({...prev, message: response.data.mesage, isAuthenticated: true, isLoading: false}));
		} catch (error) {
			setUserAuth(prev =>({ ...prev, error: error.response?.data?.message || "Error logging in", isLoading: false }));
		}
	};


	return (
		<UserContext.Provider value={{ userAuth, setUserAuth, signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, googlelogin, getProfile, updateProfile }}>
			{children}
		</UserContext.Provider>
	)
};

export default UserContextProvider;
