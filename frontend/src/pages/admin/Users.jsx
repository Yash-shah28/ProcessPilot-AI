import { useEffect, useState } from "react";

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">{u.status}</td>
              <td className="p-3 space-x-2">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
