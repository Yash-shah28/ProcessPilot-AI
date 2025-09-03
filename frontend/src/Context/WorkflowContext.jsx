
import axios from "axios";
import { createContext, useState } from "react";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/workflow" : "/api/workflow";

axios.defaults.withCredentials = true;

export const WorkflowContext = createContext();

export const WorkflowContextProvider = ({ children }) => {

    const [workflow, setworkflow] = useState({
        workflow: null,
        error: null,
        isLoading: false,
        message: null,
        userprofile: null,
        activity: null
    })

    const createWorkflow = async (description) => {
        setworkflow(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.post(`${API_URL}/`, { description });
            setworkflow(prev => ({ ...prev, workflow: response.data.data, isLoading: false, message: "Workflow created successfully" }));
        } catch (error) {
            setworkflow(prev => ({ ...prev, error: error.response?.data?.message || "Error creating workflow", isLoading: false }));
            throw error;
        }
    }

    const getWorkflow = async () => {
        setworkflow(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`${API_URL}/`);
            console.log(response.data);
            setworkflow(prev => ({ ...prev, workflow: response.data.data, isLoading: false }));
        } catch (error) {
            setworkflow(prev => ({ ...prev, error: error.response?.data?.message || "Error fetching workflows", isLoading: false }));
            throw error;
        }
    }

    const getUserProfile = async () => {
        setworkflow(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`${API_URL}/profile`);

            console.log(response.data);
            setworkflow(prev => ({ ...prev, userprofile: response.data.data, isLoading: false }));
        } catch (error) {
            setworkflow(prev => ({ ...prev, error: error.response?.data?.message || "Error", isLoading: false }));
            throw error;
        }
    }
    const getUserActivity = async () => {
        setworkflow(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`${API_URL}/activity`);

            console.log(response.data);
            setworkflow(prev => ({ ...prev, activity: response.data, isLoading: false }));
        } catch (error) {
            setworkflow(prev => ({ ...prev, error: error.response?.data?.message || "Error", isLoading: false }));
            throw error;
        }
    }




    return (
        <WorkflowContext.Provider value={{ workflow, setworkflow, createWorkflow, getWorkflow, getUserProfile, getUserActivity }}>
            {children}
        </WorkflowContext.Provider>
    )
};

export default WorkflowContextProvider;
