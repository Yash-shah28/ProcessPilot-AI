import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="bg-white min-h-screen">
			<div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">			{/* Simple Loading Spinner */}
					<motion.div
						className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
