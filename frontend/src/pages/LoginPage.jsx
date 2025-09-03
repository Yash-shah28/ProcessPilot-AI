/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { UserContext } from "../Context/UserContext";
import Googlelogo from "../assets/google-logo.png";


const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { userAuth, login, googlelogin } = useContext(UserContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.log(error)
		}
	};

	const handlegoogle = async () => {
		try {
			await googlelogin();
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="bg-white min-h-screen">
			<Navbar />
			<div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
					<h2 className="text-2xl font-semibold text-center mb-4">
						Welcome back to ProcessPilot AI
					</h2>
					<form onSubmit={handleLogin}>
						<Input
							icon={Mail}
							type="email"
							placeholder="Email*"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							icon={Lock}
							type="password"
							placeholder="Password*"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="flex items-center justify-between mb-4">
							<Link
								to='/forgot-password'
								className="text-center block text-[#111] text-lg hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
						{userAuth.error && (
							<p className="text-red-500 font-semibold mt-2">{userAuth.error}</p>
						)}
						<button
							type="submit"
							className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
						>
							{userAuth.isLoading ? (
								<Loader className="animate-spin mx-auto" size={24} />
							) : (
								"Login"
							)}
						</button>
					</form>
					<div className="text-center mt-4">
						<Link
							to='/signup'
							className="text-center block text-[#111] text-lg hover:underline"
						>
							Don't have an account? Signup
						</Link>
					</div>
					<div className="flex items-center my-4">
						<hr className="flex-grow border-t border-gray-300" />
						<p className="mx-4 text-gray-600  text-sm">Or Login with</p>
						<hr className="flex-grow border-t border-gray-300" />
					</div>
					<div className="mt-4">
						<a href="http://localhost:5000/api/auth/google">
							<button
								className="w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
							>
								<img src={Googlelogo} alt="Google Logo" className="h-5 mr-2" />
								<span className="text-gray-700"> Google</span>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;