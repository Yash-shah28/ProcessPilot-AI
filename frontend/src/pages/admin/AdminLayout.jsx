import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-indigo-500">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link to="/admin/dashboard" className="block hover:bg-indigo-600 p-2 rounded">Dashboard</Link>
          <Link to="/admin/users" className="block hover:bg-indigo-600 p-2 rounded">Users</Link>
          <Link to="/admin/workflows" className="block hover:bg-indigo-600 p-2 rounded">Workflows</Link>
          <Link to="/admin/GoogleGroup" className="block hover:bg-indigo-600 p-2 rounded">Google Group</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
