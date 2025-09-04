/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { WorkflowContext } from '../Context/WorkflowContext';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Eye, Edit, Trash } from 'lucide-react';
const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('lastModified');
    const [statusFilter, setStatusFilter] = useState('all');
    const { workflow, getWorkflow, updateworkflow, deleteWorkflow, getWorkflowById } = useContext(WorkflowContext)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [editData, setEditData] = useState({ name: "", description: "" })
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);

    const handleEdit = (workflow) => {
        setSelectedWorkflow(workflow)
        setEditData({ name: workflow.name, description: workflow.description })
        setIsEditOpen(true)
    }

    const handleSaveEdit = async () => {
        try {
            await updateworkflow(selectedWorkflow.id, { description: editData.description });
            getWorkflow(); // refresh list
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating workflow:", error.message);
        }
    };

    const handleDelete = (workflow) => {
        setSelectedWorkflow(workflow)
        setIsDeleteOpen(true)
    }

    const confirmDelete = async () => {
        try {
            await deleteWorkflow(selectedWorkflow.id);
            getWorkflow(); // refresh list
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Error deleting workflow:", error);
        }
    };
    const handleView = async (workflow) => {
        try {
            const wf = await getWorkflowById(workflow.id);
            setSelectedWorkflow(wf);
            setIsViewOpen(true);
        } catch (error) {
            console.error("Error fetching workflow:", error);
        }
    };

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            getWorkflow();
        }
    }, [location.pathname]);

    // useEffect(() => {
    //         const get = async () => {
    //             try {
    //                 await getWorkflow();
    //             } catch (error) {
    //                 console.error('Error loading Workflow', error);
    //             }
    //         };
    //         get();
    //     }, []);

    const workflowData = workflow.workflow;

    console.log("Workflow Data:", workflowData);



    // Mock data for workflows
    const workflows = workflowData?.map(wf => ({
        id: wf._id,
        name: wf.name, // You can improve this if you store names separately
        description: wf.description,
        status: wf.status || 'idle',
        lastModified: new Date(wf.updatedAt).toISOString().split('T')[0],
        steps: wf.steps?.length || 0,
        owner: wf.userId.name,
        category: 'Automation' // Static, unless you have this field in DB
    })) || [];
    // Filter workflows based on search query and status filter
    const filteredWorkflows = workflows.filter(workflow => {
        const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    // Sort workflows
    const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'lastModified') {
            return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        } else if (sortBy === 'status') {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });
    // Status badge component
    // const StatusBadge = ({ status }) => {
    //     let bgColor = '';
    //     let textColor = 'text-white';
    //     let statusText = '';
    //     switch (status) {
    //         case 'active':
    //             bgColor = 'bg-green-500';
    //             statusText = 'Active';
    //             break;
    //         case 'paused':
    //             bgColor = 'bg-yellow-500';
    //             statusText = 'Paused';
    //             break;
    //         case 'completed':
    //             bgColor = 'bg-blue-500';
    //             statusText = 'Completed';
    //             break;
    //         default:
    //             bgColor = 'bg-gray-500';
    //             statusText = 'Unknown';
    //     }
    //     return (
    //         <span className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
    //             {statusText}
    //         </span>
    //     );
    // };
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="md:flex md:items-center md:justify-between mb-6">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Workflows Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and Monitor all your workflow processes at one place
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link to="/inputs">
                            <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-button shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none whitespace-nowrap cursor-pointer">
                                <i className="fas fa-plus -ml-1 mr-2"></i>
                                Create Workflow
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Filters and Search */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <div className="mt-1 relative rounded-md ">
                                    <input
                                        type="text"
                                        className="py-1 block w-full pl-10 sm:text-base border-b border-gray-200 rounded-full text-base"
                                        placeholder="Search workflows..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {/* Search Icon aligned to the right */}
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Search className="text-gray-600 text-sm" />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-1 py-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className=" fas fa-filter text-gray-400 text-sm"></i>
                                    </div>
                                    <select
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-500 rounded-md text-sm"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="paused">Paused</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-1 py-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-sort text-gray-400 text-sm"></i>
                                    </div>
                                    <select
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-sm"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="lastModified">Last Modified</option>
                                        <option value="name">Name</option>
                                        <option value="status">Status</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-1 flex justify-end">
                                <div className="inline-flex rounded-md shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:outline-none cursor-pointer whitespace-nowrap`}
                                    >
                                        <i className="fas fa-th-large"></i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:outline-none cursor-pointer whitespace-nowrap`}
                                    >
                                        <i className="fas fa-list"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Workflow Cards/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedWorkflows.map((workflow) => (
                            <div key={workflow.id} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">{workflow.name}</h3>
                                        {/* <StatusBadge status={workflow.status} /> */}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{workflow.description}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Last Modified</p>
                                            <p className="font-medium">{workflow.lastModified}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Steps</p>
                                            <p className="font-medium">{workflow.steps}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Owner</p>
                                            <p className="font-medium truncate">{workflow.owner}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Category</p>
                                            <p className="font-medium">{workflow.category}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <Button
                                            onClick={() => handleView(workflow)}
                                            className="bg-white hover:bg-gray-200 text-gray-700 border">
                                            View Details
                                        </Button>
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => handleEdit(workflow)}
                                                className="bg-white hover:bg-gray-200 text-gray-700 border">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            {/* <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                <i className="fas fa-copy"></i>
                                            </button> */}
                                            <Button
                                                onClick={() => handleDelete(workflow)}
                                                className="bg-white hover:bg-red-100 text-red-600 border">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {sortedWorkflows.map((workflow) => (
                                <li key={workflow.id}>
                                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-sitemap text-indigo-600"></i>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-indigo-600">{workflow.name}</div>
                                                    <div className="text-sm text-gray-500">{workflow.description}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                {/* <div className="flex flex-col items-end">
                                                    <div className="text-sm text-gray-500">Last Modified</div>
                                                    <div className="text-sm font-medium">{workflow.lastModified}</div>
                                                </div> */}
                                                {/* <StatusBadge status={workflow.status} /> */}
                                                <div className="flex space-x-2">
                                                    <Button
                                                        onClick={() => handleView(workflow)}
                                                        className="bg-white hover:bg-gray-200 text-gray-700 border">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleEdit(workflow)}
                                                        className="bg-white hover:bg-gray-200 text-gray-700 border">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    {/* <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                        <i className="fas fa-copy"></i>
                                                    </button> */}
                                                    <Button
                                                        onClick={() => handleDelete(workflow)}
                                                        className="bg-white hover:bg-red-100 text-red-600 border">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Footer row: Last Modified */}
                                        <div className="mt-4 flex justify-between text-xs text-gray-500">
                                            <span>Owner: {workflow.owner}</span>
                                            <span>Last Modified: {workflow.lastModified}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* ---- View Dialog ---- */}
                <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Workflow Details</DialogTitle>
                        </DialogHeader>
                        {console.log(selectedWorkflow)}
                        {selectedWorkflow && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{selectedWorkflow.name}</h3>
                                    <p className="text-gray-600">{selectedWorkflow.description}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium">Owner: {selectedWorkflow.owner || "Current User"}</h4>
                                    <h4 className="font-medium">Steps: {selectedWorkflow.executionCount}</h4>
                                    <h4 className="font-medium">Last Modified: {new Date(selectedWorkflow.updatedAt).toLocaleDateString()}</h4>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="outline"
                                        className=" bg-gray-100 text-black hover:bg-red-600 hover:text-white"
                                        onClick={() => setIsViewOpen(false)}>Close</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
                {/* ---- Edit Dialog ---- */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Workflow Description</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <Label>Description</Label>
                                <Textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    rows={4}
                                    className="w-full border rounded-md p-2 mt-1"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" className=" bg-gray-100 text-black hover:bg-red-600 hover:text-white"
                                    onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveEdit} variant="outline" className=" bg-gray-100 text-black hover:bg-blue-600 hover:text-white ">Save</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* ---- Delete Confirmation Dialog ---- */}
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Delete</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p>Are you sure you want to delete the workflow "{selectedWorkflow?.name}"? This action cannot be undone.</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow mt-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                            Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedWorkflows.length}</span> of{' '}
                                <span className="font-medium">{sortedWorkflows.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                    3
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap !rounded-button">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Dashboard;