import  { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { WorkflowContext } from '../Context/WorkflowContext';


const Inputs = () => {
    const [description, setDescription] = useState("");

    const {workflow, createWorkflow} = useContext(WorkflowContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await createWorkflow(description);
            setDescription(""); 
            
        }
        catch(error) {
            console.error("Error creating workflow:", error);
        }
        console.log("Submitted Description:", description);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Create New Workflow
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Define your workflow process step by step
                        </p>
                    </div>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg mb-7">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="description" className="block text-base font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-32 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Describe the Prompt for workflow"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Navigation */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                             {workflow.isLoading ? (
                                              <>
                                                Creating Workflow...
                                                </>
                                            ) : (
                                                'Create Workflow'
                                            )}
                        </button>
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/guide" className="block text-[#111] text-lg hover:underline">
                            Need help? Check out our guide
                        </Link>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Inputs;
