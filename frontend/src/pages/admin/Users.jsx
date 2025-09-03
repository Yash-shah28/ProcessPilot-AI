import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with backend API call: /admin/users
    setUsers([
      { id: 1, name: "Yash Shah", email: "yash@example.com", role: "user", status: "active" },
      { id: 2, name: "Kordia", email: "kordia@example.com", role: "admin", status: "active" },
    ]);
  }, []);

  return (
    <div className="p-6">
      {/* Header with Add User Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    u.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <Button variant="outline" size="sm" className="hover:bg-blue-100">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
