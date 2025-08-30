const Dashboard = () => {
  // In real app -> fetch these counts from backend
  const stats = {
    totalUsers: 120,
    totalWorkflows: 45,
    activeWorkflows: 25,
    failedWorkflows: 3,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
