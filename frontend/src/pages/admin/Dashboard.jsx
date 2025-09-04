/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect } from "react";
import { WorkflowContext } from "../../Context/WorkflowContext"
import { UserContext } from "../../Context/UserContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";



const Dashboard = () => {
  // Example stats (could be fetched from backend)

  const { workflow, getTotalProfile, getUserActivity, getWorkflow } = useContext(WorkflowContext);
  const { userAuth, getAllUser } = useContext(UserContext);




  useEffect(() => {
    getTotalProfile()
    getUserActivity()
    getWorkflow()
    getAllUser()
  }, [])

  const stats = {
    totalUsers: userAuth?.users?.length,
    totalWorkflows: workflow?.userprofile?.totalWorkflows,
    activeWorkflows: workflow?.userprofile?.activeWorkflows,
    // failedWorkflows: 3,
  };

  // Prepare data for bar chart
  const barData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Workflows", value: stats.totalWorkflows },
    { name: "Active", value: stats.activeWorkflows },
    // { name: "Failed", value: stats.failedWorkflows },
  ];

  // Prepare data for pie chart
  const pieData = [
    { name: "Active", value: stats.activeWorkflows },
    // { name: "Failed", value: stats.failedWorkflows },
    { name: "Inactive", value: stats.totalWorkflows - (stats.activeWorkflows + stats.failedWorkflows) },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"]; // green, red, blue

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stat Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-10">
        <Card className="lg:col-span-1" >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              Overview
            </CardTitle>
            <CardDescription>Key metrics for your organization</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-5">
            <div>
              <p className="text-sm text-gray-800">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              {/* <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+9.8% </span>
              </div> */}
            </div>
            <div>
              <p className="text-sm text-gray-800">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeWorkflows}</p>
              {/* <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+3.1% </span>
              </div> */}
            </div>
            <div>
              <p className="text-sm text-gray-800">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWorkflows}</p>
              {/* <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+4.0% </span>
              </div> */}
            </div>
            
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Workflow Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
