import React, { useState } from 'react';
import Footer from '../components/Footer';
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('lastModified');
    const [statusFilter, setStatusFilter] = useState('all');
    // Mock data for workflows
    const workflows = [
        {
            id: 1,
            name: 'Customer Onboarding',
            description: 'Process for new customer registration and setup',
            status: 'active',
            lastModified: '2025-06-25',
            steps: 8,
            owner: 'John Smith',
            category: 'Customer Service'
        },
        {
            id: 2,
            name: 'Invoice Approval',
            description: 'Financial approval process for invoices',
            status: 'paused',
            lastModified: '2025-06-20',
            steps: 5,
            owner: 'Sarah Johnson',
            category: 'Finance'
        },
        {
            id: 3,
            name: 'Content Publishing',
            description: 'Review and publish process for marketing content',
            status: 'completed',
            lastModified: '2025-06-15',
            steps: 6,
            owner: 'Michael Chen',
            category: 'Marketing'
        },
        {
            id: 4,
            name: 'Employee Onboarding',
            description: 'New employee setup and training workflow',
            status: 'active',
            lastModified: '2025-06-22',
            steps: 12,
            owner: 'Lisa Rodriguez',
            category: 'HR'
        },
        {
            id: 5,
            name: 'Product Release',
            description: 'Process for releasing new product versions',
            status: 'active',
            lastModified: '2025-06-26',
            steps: 10,
            owner: 'David Wilson',
            category: 'Product'
        },
        {
            id: 6,
            name: 'Bug Resolution',
            description: 'Process for tracking and fixing software bugs',
            status: 'paused',
            lastModified: '2025-06-18',
            steps: 7,
            owner: 'Emma Taylor',
            category: 'Development'
        },
    ];
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
    const StatusBadge = ({ status }: { status: string }) => {
        let bgColor = '';
        let textColor = 'text-white';
        let statusText = '';
        switch (status) {
            case 'active':
                bgColor = 'bg-green-500';
                statusText = 'Active';
                break;
            case 'paused':
                bgColor = 'bg-yellow-500';
                statusText = 'Paused';
                break;
            case 'completed':
                bgColor = 'bg-blue-500';
                statusText = 'Completed';
                break;
            default:
                bgColor = 'bg-gray-500';
                statusText = 'Unknown';
        }
        return (
            <span className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                {statusText}
            </span>
        );
    };
    return (
        <div className="min-h-screen bg-gray-50">
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
                                        <StatusBadge status={workflow.status} />
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
                                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium cursor-pointer whitespace-nowrap !rounded-button">
                                            View Details
                                        </button>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                <i className="fas fa-copy"></i>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
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
                                                <div className="flex flex-col items-end">
                                                    <div className="text-sm text-gray-500">Last Modified</div>
                                                    <div className="text-sm font-medium">{workflow.lastModified}</div>
                                                </div>
                                                <StatusBadge status={workflow.status} />
                                                <div className="flex space-x-2">
                                                    <button className="text-gray-400 hover:text-indigo-600 cursor-pointer whitespace-nowrap !rounded-button">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                        <i className="fas fa-copy"></i>
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-500 cursor-pointer whitespace-nowrap !rounded-button">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
export default App;