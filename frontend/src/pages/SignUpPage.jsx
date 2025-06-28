import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { UserContext } from "../Context/UserContext";
import Googlelogo from "../assets/google-logo.png";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, userAuth } = useContext(UserContext);

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="bg-white min-h-screen">
			<div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
					<h2 className="text-2xl font-semibold text-center mb-4">
						Create Your Account
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{userAuth.error && <p className='text-red-500 font-semibold mt-2'>{userAuth.error}</p>}
						<PasswordStrengthMeter password={password} />

						<button
							className="w-full bg-black text-white py-1.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mt-3"
							type='submit'
							disabled={userAuth.isLoading}
						>
							{userAuth.isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
						</button>
					</form>

					<div className='text-center mt-4'>
							<Link to={"/login"} className='text-center block text-[#111] text-lg hover:underline'>
								Already have an account? Login
							</Link>
					</div>
					<div className="flex items-center my-4">
						<hr className="flex-grow border-t border-gray-300" />
						<p className="mx-4 text-gray-600  text-sm">Or Signup with</p>
						<hr className="flex-grow border-t border-gray-300" />
					</div>
					<div className="mt-4">
						<button
						onClick={() => alert("Google login functionality will go here")}
						className="w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
						>
							<img src={Googlelogo} alt="Google Logo" className="h-5 mr-2" />
							<span className="text-gray-700"> Google</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
